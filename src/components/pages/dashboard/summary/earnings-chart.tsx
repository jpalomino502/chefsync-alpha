"use client"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { textos } from "@/constants/texts"

interface EarningsChartProps {
  data: { date: string; total: number }[]
  totalEarnings: number
  loading?: boolean
}

export function EarningsChart({ data, totalEarnings, loading = false }: EarningsChartProps) {
  const t = textos.summary

  if (loading) {
    return (
      <Card className="bg-[#e4f4ff]">
        <CardHeader className="pb-2">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-4 w-40" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[200px] w-full" />
          <div className="mt-4 flex flex-wrap gap-2">
            {[1, 2, 3, 4].map((_, index) => (
              <Skeleton key={index} className="h-6 w-10" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-[#e4f4ff]">
      <CardHeader className="pb-2">
        <CardTitle className="text-3xl text-zinc-900">${totalEarnings.toFixed(2)}</CardTitle>
        <CardDescription className="text-zinc-900">{t.balancePeriod}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: "#64748B", fontSize: 10 }} dy={5} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748B", fontSize: 10 }} width={30} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="total"
                stroke="#3B82F6"
                fill="url(#colorTotal)"
                strokeWidth={2}
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            { key: "day", label: t.timePeriods.day },
            { key: "week", label: t.timePeriods.week },
            { key: "month", label: t.timePeriods.month },
            { key: "year", label: t.timePeriods.year },
          ].map((period) => (
            <Button key={period.key} variant="ghost" size="sm" className="text-xs text-zinc-900 hover:bg-blue-100">
              {period.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

