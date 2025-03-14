"use client"
import { useState, useEffect } from "react"
import { db } from "@/services/firebase"
import { doc, getDoc } from "firebase/firestore"
import EarningsChart from "./earnings-chart"
import OrderStatusCards from "./order-status-cards"
import RecentOrders from "./recent-orders"

interface EarningsData {
  chartData: { date: string; total: number }[]
  totalEarnings: number
}

interface OrderStats {
  totalOrders: number
  pendingOrders: number
  completedOrders: number
}

export default function SummaryContent({
  userId,
  commerceId,
}: {
  userId: string
  commerceId: string
}) {
  const [earningsData, setEarningsData] = useState<EarningsData>({ chartData: [], totalEarnings: 0 })
  const [orderStats, setOrderStats] = useState<OrderStats>({ totalOrders: 0, pendingOrders: 0, completedOrders: 0 })
  const [recentOrders, setRecentOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (userId && commerceId) {
      fetchData()
    }
  }, [userId, commerceId])

  const fetchData = async () => {
    setLoading(true)
    try {
      await Promise.all([fetchEarningsData(), fetchOrderStats(), fetchRecentOrders()])
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const getLocalDateString = () => {
    const now = new Date()
    const offset = now.getTimezoneOffset() * 60000
    return new Date(now.getTime() - offset).toISOString().split("T")[0]
  }

  const fetchEarningsData = async () => {
    try {
      const today = new Date()
      const chartData: { date: string; total: number }[] = []
      let totalEarnings = 0
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today)
        date.setDate(date.getDate() - i)
        const dateStr = date.toISOString().split("T")[0]
        const billRef = doc(db, "users", userId, "commerces", commerceId, "bill", dateStr)
        const billSnap = await getDoc(billRef)
        let dailyTotal = 0
        if (billSnap.exists()) {
          const payments: { total?: number }[] = billSnap.data().payments || []
          dailyTotal = payments.reduce((sum: number, payment: { total?: number }) => sum + (payment.total || 0), 0)
        }
        totalEarnings += dailyTotal
        chartData.push({ date: dateStr, total: totalEarnings })
      }
      setEarningsData({ chartData, totalEarnings })
    } catch (error) {
      console.error("Error fetching earnings data:", error)
    }
  }

  const fetchOrderStats = async () => {
    try {
      const today = getLocalDateString()
      const ordersRef = doc(db, "users", userId, "commerces", commerceId, "orders", today)
      const ordersSnap = await getDoc(ordersRef)
      if (!ordersSnap.exists()) {
        setOrderStats({ totalOrders: 0, pendingOrders: 0, completedOrders: 0 })
        return
      }
      const ordersData = ordersSnap.data()
      const orders = Object.values(ordersData).filter((order) => order && order.id)
      const totalOrders = orders.length
      const pendingOrders = orders.filter((order: any) => order.status === "pending").length
      const completedOrders = orders.filter((order: any) => order.status === "completed").length
      setOrderStats({ totalOrders, pendingOrders, completedOrders })
    } catch (error) {
      console.error("Error fetching order stats:", error)
      setOrderStats({ totalOrders: 0, pendingOrders: 0, completedOrders: 0 })
    }
  }

  const fetchRecentOrders = async () => {
    try {
      const today = getLocalDateString()
      const ordersRef = doc(db, "users", userId, "commerces", commerceId, "orders", today)
      const ordersSnap = await getDoc(ordersRef)
      if (!ordersSnap.exists()) {
        setRecentOrders([])
        return
      }
      const ordersData = ordersSnap.data()
      const orders = Object.values(ordersData).filter((order) => order && order.id)
      const sortedOrders = orders.sort((a: any, b: any) => {
        const timeA = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : new Date(a.createdAt).getTime()
        const timeB = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : new Date(b.createdAt).getTime()
        return timeB - timeA
      })
      setRecentOrders(sortedOrders.slice(0, 5))
    } catch (error) {
      console.error("Error fetching recent orders:", error)
      setRecentOrders([])
    }
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl text-zinc-900 mb-6 md:mb-8">Hola Nuevamente ✌️</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="md:col-span-2 lg:col-span-3">
          <h2 className="text-2xl md:text-3xl text-zinc-900 mb-3">Ganancias</h2>
          <EarningsChart data={earningsData.chartData} totalEarnings={earningsData.totalEarnings} loading={loading} />
        </div>
        <div className="md:col-span-2 lg:col-span-4 flex flex-col">
          <h3 className="text-2xl md:text-3xl text-zinc-900 mb-3">Estado de Pedidos</h3>
          <OrderStatusCards stats={orderStats} loading={loading} />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 md:gap-6">
        <div className="lg:col-span-4 bg-white rounded-3xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-3xl text-zinc-900">Últimos Pedidos</h2>
          </div>
          <RecentOrders orders={recentOrders} loading={loading} />
        </div>
        <div className="lg:col-span-3 bg-white rounded-3xl">
          <div className="p-4 bg-[#0a0104] rounded-3xl h-full flex justify-center items-center">
            <p className="text-white text-xl text-center">
              🚀 <span className="text-lg">¡Próximamente!</span> ⏳ <br />
              Estamos trabajando en algo increíble, ¡mantente atento! 👀✨
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
