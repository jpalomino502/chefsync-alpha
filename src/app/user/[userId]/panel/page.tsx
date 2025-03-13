import { Suspense } from "react"
import PanelContent from "@/components/pages/panel/panel-content"
import LoadingPanel from "@/components/pages/panel/loading-panel"

export default async function PanelPage({ params }: { params: { userId: string } }) {
    const { userId } = await params
  
    return (
      <div className="min-h-screen bg-white relative overflow-hidden">
        <Suspense fallback={<LoadingPanel />}>
          <PanelContent userId={userId} />
        </Suspense>
      </div>
    )
  }
  