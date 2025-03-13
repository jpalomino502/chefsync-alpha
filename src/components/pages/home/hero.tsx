"use client"

import { useRef } from "react"
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"
export function Hero() {
  const containerRef = useRef(null)

  return (
    <section ref={containerRef} className="w-full h-screen flex items-center justify-center bg-white overflow-hidden">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-violet-500 to-pink-500">
              ChefSync
            </span>{" "}
            La mejor solución para tu negocio
          </h1>
          <p className="mx-auto max-w-lg text-zinc-800 md:text-xl">
            Optimiza la administración de tu comercio con nuestra plataforma intuitiva y poderosa.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <InteractiveHoverButton >
            Descubrir más
          </InteractiveHoverButton>
        </div>
      </div>
    </section>
  )
}