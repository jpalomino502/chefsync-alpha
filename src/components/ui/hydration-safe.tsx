"use client"

import type React from "react"

interface HydrationSafeProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  [key: string]: any
}

export function HydrationSafe({ children, className, style, ...props }: HydrationSafeProps) {
  return (
    <div className={className} style={style} suppressHydrationWarning={true} {...props}>
      {children}
    </div>
  )
}

