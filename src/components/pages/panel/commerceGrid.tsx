"use client"
import React from "react"
import { PlusCircle } from "lucide-react"
import { motion } from "framer-motion"
import CommerceCard from "./commerceCard"

interface Commerce {
  id: string
  name: string
  createdAt: any
}

interface CommerceGridProps {
  commerces: Commerce[]
  onDelete: (id: string, e: React.MouseEvent<HTMLButtonElement>) => void
  onSelect: (id: string) => void
  openModal: () => void
  texts: {
    addCommerce: string
    addCommerceDescription: string
    created: string
  }
}

const CommerceGrid: React.FC<CommerceGridProps> = ({ commerces, onDelete, onSelect, openModal, texts }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="group relative overflow-hidden rounded-3xl p-8 bg-white border border-gray-200 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 cursor-pointer"
        onClick={openModal}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-transparent opacity-60"></div>
        <div className="relative z-10">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: "#e4dcee" }}>
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
      {commerces.map((commerce, index) => (
        <motion.div
          key={commerce.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: (index + 1) * 0.1 }}
        >
          <CommerceCard commerce={commerce} onDelete={onDelete} onSelect={onSelect} texts={texts} />
        </motion.div>
      ))}
    </div>
  )
}

export default CommerceGrid
