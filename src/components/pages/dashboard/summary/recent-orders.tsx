"use client"

interface RecentOrder {
  id: string
  type: string
  number: string
  status: string
  total: number
  createdAt: any
}

interface RecentOrdersProps {
  orders: RecentOrder[]
  loading: boolean
}

export default function RecentOrders({ orders, loading }: RecentOrdersProps) {
  if (loading) {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="pr-4 py-3 text-left text-xs font-medium text-zinc-900 uppercase tracking-wider">Nº</th>
              <th className="pr-4 py-3 text-left text-xs font-medium text-zinc-900 uppercase tracking-wider">
                Mesa/Domicilio
              </th>
              <th className="pr-4 py-3 text-left text-xs font-medium text-zinc-900 uppercase tracking-wider">Estado</th>
              <th className="pr-4 py-3 text-left text-xs font-medium text-zinc-900 uppercase tracking-wider">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <tr key={index} className="animate-pulse">
                <td className="pr-4 py-4 whitespace-nowrap">
                  <div className="w-8 h-4 bg-gray-300 rounded"></div>
                </td>
                <td className="pr-4 py-4 whitespace-nowrap">
                  <div className="w-24 h-4 bg-gray-300 rounded"></div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="w-20 h-6 bg-gray-300 rounded-full"></div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="w-16 h-4 bg-gray-300 rounded"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  // Traducir los textos en el componente
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="pr-4 py-3 text-left text-xs font-medium text-zinc-900 uppercase tracking-wider">Nº</th>
            <th className="pr-4 py-3 text-left text-xs font-medium text-zinc-900 uppercase tracking-wider">
              Mesa/Domicilio
            </th>
            <th className="pr-4 py-3 text-left text-xs font-medium text-zinc-900 uppercase tracking-wider">Estado</th>
            <th className="pr-4 py-3 text-left text-xs font-medium text-zinc-900 uppercase tracking-wider">Total</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50 transition-colors">
              <td className="pr-4 py-4 whitespace-nowrap text-sm text-zinc-900">#{order.id}</td>
              <td className="pr-4 py-4 whitespace-nowrap text-sm text-zinc-900">
                {`${order.type === "mesa" ? "Mesa" : "Domicilio"}: ${order.number}`}
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <span
                  className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${
                    order.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : order.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {order.status === "pending"
                    ? "Pendiente"
                    : order.status === "completed"
                      ? "Completado"
                      : order.status}
                </span>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-zinc-900">
                ${order.total.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

