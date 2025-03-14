"use client"
import { motion } from "framer-motion"
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button-black"

export default function FreeTrial() {
  return (
    <section className="py-16 sm:py-20 bg-black relative overflow-hidden">
      <div className="container mx-auto px-8 sm:px-12 md:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-3xl sm:text-4xl lg:text-5xl pb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-blue-500 to-purple-500"
          >
            Prueba ChefSync gratis por 14 días
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-2xl text-base sm:text-lg text-white mb-8"
          >
            Sin compromiso, sin tarjeta de crédito. Descubre cómo ChefSync puede transformar tu comercio.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.4 }}
            className="flex justify-center"
          >
            <InteractiveHoverButton>
              Comenzar prueba gratuita
            </InteractiveHoverButton>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6 text-xs sm:text-sm text-gray-400"
          >
            ¿Tienes preguntas? Contáctanos en <a href="mailto:info@chefsync.com" className="text-pink-500 hover:underline">info@chefsync.com</a>
          </motion.p>
        </div>
      </div>
    </section>
  )
}
