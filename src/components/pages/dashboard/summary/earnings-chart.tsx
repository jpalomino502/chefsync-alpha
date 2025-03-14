"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface EarningsChartProps {
  data: any[]
  totalEarnings: number
  loading: boolean
}

export default function EarningsChart({ data, totalEarnings, loading }: EarningsChartProps) {
  if (loading) {
    return (
      <div className="bg-[#e4f4ff] rounded-3xl border border-gray-100 shadow-sm p-4 md:p-6 flex flex-col animate-pulse">
        <div className="mb-2 md:mb-4">
          <div className="w-32 h-8 bg-gray-300 rounded mb-1"></div>
          <div className="w-40 h-4 bg-gray-300 rounded"></div>
        </div>
        <div className="h-[150px] md:h-[200px] mb-4 bg-gray-300 rounded"></div>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} className="w-10 h-6 bg-gray-300 rounded"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#e4f4ff] rounded-3xl border border-gray-100 shadow-sm p-4 md:p-6 flex flex-col">
      <div className="mb-2 md:mb-4">
        <h2 className="text-3xl mb-1 text-zinc-900">${totalEarnings.toFixed(2)}</h2>
        <p className="text-sm text-zinc-900">Balance del período</p>
      </div>
      <div className="h-[150px] md:h-[200px] mb-4">
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
      <div className="flex flex-wrap gap-2">
        {["24h", "7d", "30d", "1a"].map((period) => (
          <button
            key={period}
            className="px-2 py-1 text-xs rounded-lg transition-colors text-zinc-900 hover:bg-blue-100"
          >
            {period}
          </button>
        ))}
      </div>
    </div>
  )
}

