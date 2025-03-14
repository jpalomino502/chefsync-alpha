"use client"

import { ShoppingBag, AlertCircle, CheckCircle, TrendingUp, TrendingDown } from "lucide-react"

interface OrderStatusCardsProps {
  stats: {
    totalOrders: number
    pendingOrders: number
    completedOrders: number
  }
  loading: boolean
}

export default function OrderStatusCards({ stats, loading }: OrderStatusCardsProps) {
  const cards = [
    {
      bg: "bg-[#e8dcec]",
      icon: <ShoppingBag className="w-5 h-5 text-zinc-900" />,
      title: "Total Pedidos",
      value: stats.totalOrders,
      percent: "100",
      trend: "up",
    },
    {
      bg: "bg-[#d7ecd6]",
      icon: <AlertCircle className="w-5 h-5 text-zinc-900" />,
      title: "Pendientes",
      value: stats.pendingOrders,
      percent: stats.totalOrders > 0 ? ((stats.pendingOrders / stats.totalOrders) * 100).toFixed(1) : "0",
      trend: "down",
    },
    {
      bg: "bg-[#fff0f5]",
      icon: <CheckCircle className="w-5 h-5 text-zinc-900" />,
      title: "Finalizados",
      value: stats.completedOrders,
      percent: stats.totalOrders > 0 ? ((stats.completedOrders / stats.totalOrders) * 100).toFixed(1) : "0",
      trend: "up",
    },
  ]

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 flex-grow">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`${card.bg} rounded-3xl border border-gray-100 shadow-sm p-3 md:p-4 flex flex-col justify-between animate-pulse`}
          >
            <div className="flex justify-between items-start">
              <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
              <div className="w-10 h-4 bg-gray-300 rounded"></div>
            </div>
            <div>
              <div className="w-20 h-4 bg-gray-300 rounded mb-1"></div>
              <div className="w-12 h-6 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 flex-grow">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`${card.bg} rounded-3xl border border-gray-100 shadow-sm p-3 md:p-4 flex flex-col justify-between`}
        >
          <div className="flex justify-between items-start">
            {card.icon}
            <span className="text-xs font-medium flex items-center">
              {card.percent}%
              {card.trend === "up" ? (
                <TrendingUp className="w-3 h-3 ml-1 text-green-500" />
              ) : (
                <TrendingDown className="w-3 h-3 ml-1 text-red-500" />
              )}
            </span>
          </div>
          <div>
            <h2 className="text-sm mb-1 text-zinc-900">{card.title}</h2>
            <p className="text-lg text-zinc-900">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

