"use client"

import { motion } from "framer-motion"
import { PlusCircle } from "lucide-react"

interface AddCommerceCardProps {
  texts: {
    addCommerce: string
    addCommerceDescription: string
  }
  onClick: () => void
}

export default function AddCommerceCard({ texts, onClick }: AddCommerceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="group relative overflow-hidden rounded-3xl p-8 bg-white border border-gray-200 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 cursor-pointer"
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-transparent opacity-60"></div>
      <div className="relative z-10">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
          style={{ backgroundColor: "#e4dcee" }}
        >
          <PlusCircle size={32} className="text-gray-800" />
        </div>
        <h3 className="text-2xl mb-3 text-gray-800">{texts.addCommerce}</h3>
        <p className="text-gray-600 leading-relaxed">{texts.addCommerceDescription}</p>
      </div>
      <div
        className="absolute bottom-0 right-0 w-24 h-24 rounded-tl-full opacity-20 transition-opacity duration-300 group-hover:opacity-100"
        style={{ backgroundColor: "#e4dcee" }}
      ></div>
    </motion.div>
  )
}

