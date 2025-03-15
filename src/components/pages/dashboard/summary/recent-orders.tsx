"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { textos } from "@/constants/texts"

interface Order {
  id: string
  type: string
  number: string
  status: string
  total: number
}

interface RecentOrdersProps {
  orders: Order[]
  loading?: boolean
}

export function RecentOrders({ orders, loading = false }: RecentOrdersProps) {
  const t = textos.ordersTable

  if (loading) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t.number}</TableHead>
            <TableHead>{t.tableDelivery}</TableHead>
            <TableHead>{t.status}</TableHead>
            <TableHead>{t.total}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[1, 2, 3, 4, 5].map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="w-8 h-4" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-24 h-4" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-20 h-6 rounded-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-16 h-4" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t.number}</TableHead>
          <TableHead>{t.tableDelivery}</TableHead>
          <TableHead>{t.status}</TableHead>
          <TableHead>{t.total}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id} className="hover:bg-muted/50">
            <TableCell className="font-medium">#{order.id}</TableCell>
            <TableCell>{`${order.type === "mesa" ? t.table : t.delivery}: ${order.number}`}</TableCell>
            <TableCell>
              <Badge
                variant="outline"
                className={`${
                  order.status === "pending"
                    ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                    : order.status === "completed"
                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                      : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                }`}
              >
                {order.status === "pending"
                  ? t.statusTypes.pending
                  : order.status === "completed"
                    ? t.statusTypes.completed
                    : order.status === "inProgress"
                      ? t.statusTypes.inProgress
                      : t.statusTypes.cancelled}
              </Badge>
            </TableCell>
            <TableCell className="font-medium">${order.total.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}