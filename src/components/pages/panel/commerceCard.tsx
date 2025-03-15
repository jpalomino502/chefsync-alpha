"use client"
import React from "react"
import { MoreVertical, ChefHat } from "lucide-react"

interface Commerce {
  id: string
  name: string
  createdAt: any
}

interface CommerceCardProps {
  commerce: Commerce
  onDelete: (id: string, e: React.MouseEvent<HTMLButtonElement>) => void
  onSelect: (id: string) => void
  texts: {
    created: string
  }
}

const CommerceCard: React.FC<CommerceCardProps> = ({ commerce, onDelete, onSelect, texts }) => {
  // Convertir createdAt en una fecha válida
  const createdAtDate = commerce.createdAt?.toDate
    ? commerce.createdAt.toDate()
    : new Date(commerce.createdAt);

  return (
    <div
      onClick={() => onSelect(commerce.id)}
      className="group relative overflow-hidden rounded-3xl p-8 bg-white border border-gray-200 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 cursor-pointer"
    >
      <button onClick={(e) => onDelete(commerce.id, e)} className="absolute top-4 right-2 text-gray-500 hover:text-gray-700 z-20">
        <MoreVertical size={24} />
      </button>
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-transparent opacity-60"></div>
      <div className="relative z-10">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: "#d5edd9" }}>
          <ChefHat size={32} className="text-gray-800" />
        </div>
        <h3 className="text-2xl mb-3 text-gray-800">{commerce.name}</h3>
        <p className="text-gray-600 leading-relaxed">
          {texts.created}: {createdAtDate.toLocaleDateString()}
        </p>
      </div>
      <div
        className="absolute bottom-0 right-0 w-24 h-24 rounded-tl-full opacity-20 transition-opacity duration-300 group-hover:opacity-100"
        style={{ backgroundColor: "#d5edd9" }}
      ></div>
    </div>
  )
}

export default CommerceCard
