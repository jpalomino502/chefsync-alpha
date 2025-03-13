"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { ChevronDown } from "lucide-react"

type FAQItem = {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: "¿Cómo ayuda ChefSync con la programación del personal?",
    answer:
      "ChefSync utiliza algoritmos impulsados por IA para crear horarios óptimos para el personal basados en datos históricos de ventas, disponibilidad de empleados y habilidades. El sistema identifica automáticamente las horas pico y garantiza que tengas el personal adecuado en el momento adecuado, reduciendo costos laborales mientras mantienes la calidad del servicio.",
  },
  {
    question: "¿Puede ChefSync integrarse con mi sistema POS existente?",
    answer:
      "Sí, ChefSync se integra perfectamente con la mayoría de los principales sistemas POS, incluyendo Toast, Square, Clover, Lightspeed y muchos más. Nuestro equipo de integración te ayudará a establecer una conexión directa para garantizar un flujo de datos en tiempo real entre los sistemas.",
  },
  {
    question: "¿Cómo funciona la función de gestión de inventario?",
    answer:
      "La gestión de inventario de ChefSync rastrea todos tus ingredientes en tiempo real, actualizando automáticamente los niveles de stock a medida que llegan los pedidos. El sistema puede generar órdenes de compra, rastrear precios de proveedores, monitorear desperdicios y proporcionar alertas cuando sea necesario reabastecerse, ayudándote a minimizar el desperdicio y controlar los costos.",
  },
  {
    question: "¿Es ChefSync adecuado para múltiples ubicaciones de restaurantes?",
    answer:
      "ChefSync está diseñado para escalar con tu negocio. El plan Enterprise incluye soporte para múltiples ubicaciones, lo que te permite gestionar todos tus restaurantes desde un solo panel de control mientras mantienes configuraciones y datos específicos para cada ubicación.",
  },
  {
    question: "¿Cuánto tiempo lleva implementar ChefSync?",
    answer:
      "La mayoría de los restaurantes están operativos con ChefSync en un plazo de 1 a 2 semanas. Nuestro equipo de incorporación proporciona capacitación y soporte integral para garantizar una transición sin problemas. El tiempo exacto depende de la complejidad de tus operaciones y del nivel de personalización requerido.",
  },
  {
    question: "¿Qué tipo de soporte ofrece ChefSync?",
    answer:
      "Todos los planes de ChefSync incluyen soporte por correo electrónico. El plan Professional incluye soporte prioritario con tiempos de respuesta más rápidos, mientras que el plan Enterprise incluye un gerente de cuenta dedicado. También ofrecemos soporte de emergencia 24/7 para problemas críticos y mantenemos una base de conocimiento extensa con tutoriales en video.",
  },
]

export default function FAQSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <section className="py-32 bg-black" ref={ref}>
      <div className="container mx-auto px-8 md:px-12 max-w-7xl">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl  tracking-tight text-white">
            Preguntas <span className="apple-gradient">Frecuentes</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mt-6 font-light">
            Todo lo que necesitas saber sobre ChefSync y cómo puede transformar la operación de tu restaurante.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`mb-6 border-b border-gray-800 pb-6 ${
                index === faqs.length - 1 ? "border-b-0" : ""
              }`}
            >
              <button
                className="flex justify-between items-center w-full text-left py-4 focus:outline-none"
                onClick={() => toggleExpand(index)}
                aria-expanded={expandedIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <h3 className="text-xl text-white">{faq.question}</h3>
                <motion.div
                  animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 ml-4"
                >
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </motion.div>
              </button>

              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-gray-400 pb-4 font-light leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
