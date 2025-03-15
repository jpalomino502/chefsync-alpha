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
    const today = new Date();
    const chartData: { date: string; total: number }[] = [];
    let totalEarnings = 0;

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];

      const billRef = doc(db, "users", userId, "commerces", commerceId, "bill", dateStr);
      const billSnap = await getDoc(billRef);

      let dailyTotal = 0;
      if (billSnap.exists()) {
        const payments: { total?: number }[] = billSnap.data().payments || [];
        dailyTotal = payments.reduce(
          (sum: number, payment: { total?: number }) => sum + (payment.total || 0),
          0
        );
      }

      totalEarnings += dailyTotal;
      chartData.push({ date: dateStr, total: totalEarnings });
    }

    return NextResponse.json({ chartData, totalEarnings });
  } catch (error) {
    console.error("Error fetching earnings data:", error);
    return NextResponse.json({ error: "Failed to fetch earnings data" }, { status: 500 });
  }
}
