"use client"
import { useRef } from "react"
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"

export function Hero() {
  const containerRef = useRef(null)

  return (
    <section ref={containerRef} className="w-full white h-screen flex items-center justify-center bg-white overflow-hidden">
      <div className="container mx-auto px-8 sm:px-12 md:px-16">
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tighter">
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-violet-500 to-pink-500">
                ChefSync
              </span>{" "}
              La mejor solución para tu negocio
            </h1>
            <p className="mx-auto max-w-lg text-xs sm:text-sm md:text-base lg:text-lg text-zinc-800">
              Optimiza la administración de tu comercio con nuestra plataforma intuitiva y poderosa.
            </p>
          </div>
          <div>
            <InteractiveHoverButton>
              Descubrir más
            </InteractiveHoverButton>
          </div>
        </div>
      </div>
    </section>
  )
}
