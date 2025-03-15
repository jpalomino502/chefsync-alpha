import { NextResponse } from "next/server";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/services/firebase";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const commerceId = searchParams.get("commerceId");
  const userId = searchParams.get("userId");

  if (!commerceId || !userId) {
    return NextResponse.json(
      { error: "Missing commerceId or userId parameter" },
      { status: 400 }
    );
  }

  try {
    const getLocalDateString = (): string => {
      const now = new Date();
      const offset = now.getTimezoneOffset() * 60000;
      return new Date(now.getTime() - offset).toISOString().split("T")[0];
    };

    const today = getLocalDateString();
    const ordersRef = doc(db, "users", userId, "commerces", commerceId, "orders", today);
    const ordersSnap = await getDoc(ordersRef);

    if (!ordersSnap.exists()) {
      return NextResponse.json([]);
    }

    const ordersData = ordersSnap.data();
    const orders = Object.values(ordersData).filter((order: any) => order && order.id);

    const getTime = (date: any): number => {
      return date?.toDate ? date.toDate().getTime() : new Date(date).getTime();
    };

    const sortedOrders = orders.sort((a: any, b: any) => getTime(b.createdAt) - getTime(a.createdAt));

    return NextResponse.json(sortedOrders.slice(0, 5));
  } catch (error) {
    console.error("Error fetching recent orders:", error);
    return NextResponse.json({ error: "Failed to fetch recent orders" }, { status: 500 });
  }
}
