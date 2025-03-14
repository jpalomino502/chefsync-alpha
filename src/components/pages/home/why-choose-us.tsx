"use client"
import React from "react"
import Image from "next/image"
import { Check, Shield, Clock, Zap } from "lucide-react"

export default function WhyChooseUsSection() {
  return (
    <section className="py-16 white sm:py-24 bg-white">
      <div className="container mx-auto px-8 sm:px-12 md:px-16">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl bg-gradient-to-r from-pink-500 via-blue-500 to-purple-500 text-transparent bg-clip-text inline-block pb-2">
            ¿Por qué elegir ChefSync?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600">
            Descubre por qué miles de comercios confían en ChefSync para optimizar sus operaciones y aumentar su rentabilidad.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="relative aspect-square">
            <Image
              src="/placeholder.svg?height=600&width=600"
              alt="Operaciones del comercio"
              fill
              className="object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent rounded-2xl"></div>
          </div>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="h-10 w-10 rounded-full bg-black flex items-center justify-center text-white shrink-0">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl mb-1">Interfaz intuitiva</h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Diseñada específicamente para comercio, fácil de usar en cualquier dispositivo.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="h-10 w-10 rounded-full bg-black flex items-center justify-center text-white shrink-0">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl mb-1">Integración completa</h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Todas las operaciones de tu comercio en una sola plataforma unificada.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="h-10 w-10 rounded-full bg-black flex items-center justify-center text-white shrink-0">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl mb-1">Análisis en tiempo real</h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Datos y métricas actualizados para tomar decisiones informadas al instante.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="h-10 w-10 rounded-full bg-black flex items-center justify-center text-white shrink-0">
                <Check className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl mb-1">Soporte 24/7</h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Asistencia técnica y capacitación personalizada disponible en todo momento.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
