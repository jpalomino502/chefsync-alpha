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
      return NextResponse.json({ totalOrders: 0, pendingOrders: 0, completedOrders: 0 });
    }

    const ordersData = ordersSnap.data();
    const orders = Object.values(ordersData).filter((order: any) => order && order.id);

    const totalOrders = orders.length;
    const pendingOrders = orders.filter((order: any) => order.status === "pending").length;
    const completedOrders = orders.filter((order: any) => order.status === "completed").length;

    return NextResponse.json({ totalOrders, pendingOrders, completedOrders });
  } catch (error) {
    console.error("Error fetching order stats:", error);
    return NextResponse.json({ error: "Failed to fetch order stats" }, { status: 500 });
  }
}
