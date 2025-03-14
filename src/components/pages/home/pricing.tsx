"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  const starterFeatures = [
    { nombre: "Hasta 10 empleados", descripcion: "Administra horarios y perfiles de hasta 10 empleados." },
    { nombre: "Programación básica", descripcion: "Crea y gestiona horarios fácilmente." },
    { nombre: "Seguimiento de inventario", descripcion: "Monitorea niveles de stock y recibe alertas." },
    { nombre: "Soporte por correo", descripcion: "Ayuda disponible en 24 horas por correo." },
    { nombre: "Acceso móvil", descripcion: "Usa la aplicación en cualquier lugar." },
  ];

  const professionalFeatures = [
    { nombre: "Hasta 25 empleados", descripcion: "Administra equipos más grandes con permisos avanzados." },
    { nombre: "Programación avanzada", descripcion: "Sugerencias basadas en pronósticos de ventas." },
    { nombre: "Gestión de inventario completa", descripcion: "Pedidos automáticos y gestión de proveedores." },
    { nombre: "Panel de análisis", descripcion: "Informes detallados sobre ventas y costos." },
    { nombre: "Soporte prioritario", descripcion: "Asistencia en chat con respuesta en 4 horas." },
    { nombre: "Comunicación interna", descripcion: "Mensajería integrada para el equipo." },
    { nombre: "Cálculo de recetas", descripcion: "Rastrea costos y rentabilidad del menú." },
  ];

  const enterpriseFeatures = [
    { nombre: "Empleados ilimitados", descripcion: "Sin límites en el número de usuarios." },
    { nombre: "IA en programación", descripcion: "Optimización avanzada del personal con IA." },
    { nombre: "Análisis avanzado", descripcion: "Informes personalizados y pronósticos." },
    { nombre: "Soporte multiubicación", descripcion: "Administra varios locales desde un solo panel." },
    { nombre: "Gerente de cuenta", descripcion: "Soporte personalizado con un asesor dedicado." },
    { nombre: "Acceso API", descripcion: "Integraciones con sistemas existentes." },
    { nombre: "Marca blanca", descripcion: "Personalización completa con tu branding." },
    { nombre: "Integraciones personalizadas", descripcion: "Conexión con herramientas específicas." },
  ];

  return (
    <section id="pricing" ref={ref} className="py-20 sm:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-8 md:px-12 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4 max-w-3xl mx-auto mb-12 sm:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl tracking-tight">Planes de Precios</h2>
          <p className="text-base sm:text-xl text-gray-600 font-light">Escoge el plan que mejor se adapte a tu negocio.</p>
          <div className="flex items-center justify-center mt-6">
            <div className="flex items-center bg-gray-100 p-1 rounded-full">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-4 sm:px-8 py-2 sm:py-3 rounded-full text-sm transition-all ${billingCycle === "monthly" ? "bg-black text-white" : "text-gray-600"}`}
              >
                Mensual
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-4 sm:px-8 py-2 sm:py-3 rounded-full text-sm transition-all ${billingCycle === "yearly" ? "bg-black text-white" : "text-gray-600"}`}
              >
                Anual <span className="text-xs font-normal text-pink-500">Ahorra 20%</span>
              </button>
            </div>
          </div>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <TarjetaPrecio titulo="Plan Básico" precio={billingCycle === "monthly" ? "$39" : "$79"} caracteristicas={starterFeatures} delay={0.2} isInView={isInView} />
          <TarjetaPrecio titulo="Plan Profesional" precio={billingCycle === "monthly" ? "$79" : "$159"} caracteristicas={professionalFeatures} esPopular popularLabel="Más Popular" delay={0.4} isInView={isInView} />
          <TarjetaPrecio titulo="Plan Empresarial" precio={billingCycle === "monthly" ? "$159" : "$319"} caracteristicas={enterpriseFeatures} delay={0.6} isInView={isInView} />
        </div>
      </div>
    </section>
  )
}

interface TarjetaPrecioProps {
  titulo: string
  precio: string
  caracteristicas: { nombre: string; descripcion: string }[]
  esPopular?: boolean
  popularLabel?: string
  delay: number
  isInView: boolean
}

function TarjetaPrecio({ titulo, precio, caracteristicas, esPopular = false, popularLabel = "Más Popular", delay, isInView }: TarjetaPrecioProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay }}
      className={`bg-white white rounded-3xl overflow-hidden ${esPopular ? "ring-2 ring-black" : "border border-gray-200"}`}
    >
      {esPopular && <div className="bg-black text-white text-center py-2 text-xs sm:text-sm">{popularLabel}</div>}
      <div className="p-6 sm:p-10">
        <h3 className="text-lg sm:text-xl">{titulo}</h3>
        <div className="mt-6 mb-6">
          <span className="text-4xl sm:text-5xl">{precio}</span>
          <span className="text-gray-600 ml-2">/mes</span>
        </div>
        <Button className="w-full rounded-full h-10 sm:h-12 bg-black text-white text-sm">Obtener ahora</Button>
        <div className="mt-6">
          <ul className="space-y-3">
            {caracteristicas.map((feature, index) => (
              <li key={index} className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-3 shrink-0 mt-0.5" />
                <span className="flex-1 text-sm sm:text-base font-light">{feature.nombre}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}
