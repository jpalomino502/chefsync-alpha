"use client"
import { ShoppingBag, AlertCircle, CheckCircle, TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { textos } from "@/constants/texts"

interface OrderStats {
  totalOrders: number
  pendingOrders: number
  completedOrders: number
}

interface OrderStatusCardsProps {
  stats: OrderStats
  loading?: boolean
}

export function OrderStatusCards({ stats, loading = false }: OrderStatusCardsProps) {
  const t = textos.orderCards

  const cards = [
    {
      bg: "bg-[#e8dcec]",
      icon: <ShoppingBag className="w-5 h-5 text-zinc-900" />,
      title: t.totalOrders,
      value: stats.totalOrders,
      percent: "100",
      trend: "up",
    },
    {
      bg: "bg-[#d7ecd6]",
      icon: <AlertCircle className="w-5 h-5 text-zinc-900" />,
      title: t.pending,
      value: stats.pendingOrders,
      percent: stats.totalOrders > 0 ? ((stats.pendingOrders / stats.totalOrders) * 100).toFixed(1) : "0",
      trend: "down",
    },
    {
      bg: "bg-[#fff0f5]",
      icon: <CheckCircle className="w-5 h-5 text-zinc-900" />,
      title: t.completed,
      value: stats.completedOrders,
      percent: stats.totalOrders > 0 ? ((stats.completedOrders / stats.totalOrders) * 100).toFixed(1) : "0",
      trend: "up",
    },
  ]

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 flex-grow">
        {cards.map((_, index) => (
          <Card key={index} className="bg-muted/50">
            <CardContent className="p-4 flex flex-col justify-between h-full">
              <div className="flex justify-between items-start">
                <Skeleton className="w-5 h-5 rounded-full" />
                <Skeleton className="w-10 h-4 rounded" />
              </div>
              <div>
                <Skeleton className="w-20 h-4 rounded mb-1" />
                <Skeleton className="w-12 h-6 rounded" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 flex-grow">
      {cards.map((card, index) => (
        <Card key={index} className={`${card.bg} border-none shadow-sm`}>
          <CardContent className="p-4 flex flex-col justify-between h-full">
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
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

