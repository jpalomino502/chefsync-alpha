"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EarningsChart } from "./summary/earnings-chart";
import { OrderStatusCards } from "./summary/order-status-cards";
import { RecentOrders } from "./summary/recent-orders";
import { textos } from "@/constants/texts";

interface SummaryProps {
  commerceId: string;
}

export function Summary({ commerceId }: SummaryProps) {
  const [earningsData, setEarningsData] = React.useState({ chartData: [], totalEarnings: 0 });
  const [orderStats, setOrderStats] = React.useState({ totalOrders: 0, pendingOrders: 0, completedOrders: 0 });
  const [recentOrders, setRecentOrders] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const t = textos.summary;

  React.useEffect(() => {
    if (commerceId) {
      fetchData();
    }
  }, [commerceId]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const userId =
        JSON.parse(localStorage.getItem("user") || "{}")?.uid ||
        JSON.parse(localStorage.getItem("employeeSession") || "{}")?.userId;

      const [earningsResponse, statsResponse, ordersResponse] = await Promise.all([
        fetch(`/api/dashboard/earnings?commerceId=${commerceId}&userId=${userId}`),
        fetch(`/api/dashboard/order-stats?commerceId=${commerceId}&userId=${userId}`),
        fetch(`/api/dashboard/recent-orders?commerceId=${commerceId}&userId=${userId}`),
      ]);

      if (!earningsResponse.ok || !statsResponse.ok || !ordersResponse.ok) {
        throw new Error("Failed to fetch data");
      }

      const [earnings, stats, orders] = await Promise.all([
        earningsResponse.json(),
        statsResponse.json(),
        ordersResponse.json(),
      ]);

      setEarningsData(earnings);
      setOrderStats(stats);
      setRecentOrders(orders);
    } catch (error) {
      console.error("Error fetching data:", error);
      setEarningsData({ chartData: [], totalEarnings: 0 });
      setOrderStats({ totalOrders: 0, pendingOrders: 0, completedOrders: 0 });
      setRecentOrders([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl">{t.greeting}</h1>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
        <div className="md:col-span-3">
          <h2 className="text-2xl mb-3">{t.earnings}</h2>
          <EarningsChart data={earningsData.chartData} totalEarnings={earningsData.totalEarnings} loading={loading} />
        </div>
        <div className="md:col-span-4 flex flex-col">
          <h2 className="text-2xl mb-3">{t.orderStatus}</h2>
          <OrderStatusCards stats={orderStats} loading={loading} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>{t.latestOrders}</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentOrders orders={recentOrders} loading={loading} />
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 bg-[#0a0104] text-white">
          <CardContent className="flex items-center justify-center h-full p-6">
            <p className="text-center text-xl whitespace-pre-line">{t.comingSoon}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}