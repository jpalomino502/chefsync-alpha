import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Panel de Control | ChefSync",
  description: "Gestiona tus comercios con ChefSync",
}

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen bg-white">{children}</div>
}

