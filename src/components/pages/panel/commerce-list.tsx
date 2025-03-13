"use client"

import { useState } from "react"
import CommerceCard from "./commerce-card"
import AddCommerceCard from "./add-commerce-card"
import AddCommerceModal from "./add-commerce-modal"

// Cambiar los textos para que solo estén en español
const texts = {
  addCommerce: "Agregar Comercio",
  addCommerceDescription: "Crea un nuevo comercio para gestionar",
  created: "Creado",
  deleteConfirmation: "¿Estás seguro?",
  deleteWarning: "¡No podrás revertir esto!",
  deleteConfirmText: "Sí, eliminar!",
  deleteCancelText: "Cancelar",
  deleteSuccess: "Eliminado!",
  deleteError: "Error",
}

// Eliminar la referencia a language en la interfaz y en el componente
interface CommerceListProps {
  commerces: any[]
  userId: string
  language: string
}

export default function CommerceList({ commerces, userId, language }: CommerceListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Eliminar la referencia a t y usar texts directamente
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AddCommerceCard texts={texts} onClick={() => setIsModalOpen(true)} />

        {commerces.map((commerce, index) => (
          <CommerceCard
            key={commerce.id}
            commerce={commerce}
            index={index}
            userId={userId}
            texts={texts}
            language={language}
          />
        ))}
      </div>

      {isModalOpen && (
        <AddCommerceModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} userId={userId} language={language} />
      )}
    </>
  )
}

