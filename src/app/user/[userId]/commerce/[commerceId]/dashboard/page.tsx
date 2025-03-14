import { Suspense } from "react"
import SummaryContent from "@/components/pages/dashboard/summary/summary-content"
import SummaryLoading from "@/components/pages/dashboard/summary/summary-loading"

export default function DashboardPage({
  params,
}: {
  params: { userId: string; commerceId: string }
}) {
  return (
    <Suspense fallback={<SummaryLoading />}>
      <SummaryContent userId={params.userId} commerceId={params.commerceId} />
    </Suspense>
  )
}

