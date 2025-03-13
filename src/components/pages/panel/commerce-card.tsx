"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ChefHat, MoreVertical } from "lucide-react"
import Swal from "sweetalert2"
import { getAuth } from "firebase/auth"

const authInstance = getAuth()

interface CommerceCardProps {
  commerce: any
  index: number
  userId: string
  texts: {
    created: string
    deleteConfirmation: string
    deleteWarning: string
    deleteConfirmText: string
    deleteCancelText: string
    deleteSuccess: string
    deleteError: string
  }
  language: string
}

export default function CommerceCard({ commerce, index, userId, texts, language }: CommerceCardProps) {
  const router = useRouter()

  // Modificar la función handleDeleteCommerce para usar la API
  const handleDeleteCommerce = async (commerceId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const result = await Swal.fire({
      title: texts.deleteConfirmation,
      text: texts.deleteWarning,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: texts.deleteConfirmText,
      cancelButtonText: texts.deleteCancelText,
    })

    if (result.isConfirmed) {
      try {
        // Comentar o eliminar la Opción 1 que usa Firestore directamente
        /*
        await deleteDoc(doc(db, "users", userId, "commerces", commerceId))
        */

        // Usar la API para eliminar el comercio
        // Verificar que currentUser no sea null antes de obtener el token
        if (!authInstance.currentUser) {
          Swal.fire(texts.deleteError, "No hay usuario autenticado", "error")
          return
        }
        const token = await authInstance.currentUser.getIdToken()
        const response = await fetch(`/api/user/${userId}/commerces/${commerceId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.ok) {
          Swal.fire(texts.deleteSuccess, "El comercio ha sido eliminado.", "success")
        } else {
          const errorData = await response.json()
          throw new Error(errorData.error || "Error al eliminar el comercio")
        }
      } catch (error) {
        console.error("Error deleting commerce:", error)
        Swal.fire(texts.deleteError, "Hubo un error al eliminar el comercio.", "error")
      }
    }
  }

  const handleSelectCommerce = (commerceId: string) => {
    router.push(`/user/${userId}/commerce/${commerceId}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: (index + 1) * 0.1 }}
      className="group relative overflow-hidden rounded-3xl p-8 bg-white border border-gray-200 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 cursor-pointer"
      onClick={() => handleSelectCommerce(commerce.id)}
    >
      <button
        onClick={(e) => handleDeleteCommerce(commerce.id, e)}
        className="absolute top-4 right-2 text-gray-500 hover:text-gray-700 z-20"
      >
        <MoreVertical size={24} />
      </button>
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-transparent opacity-60"></div>
      <div className="relative z-10">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
          style={{ backgroundColor: "#d5edd9" }}
        >
          <ChefHat size={32} className="text-gray-800" />
        </div>
        <h3 className="text-2xl mb-3 text-gray-800">{commerce.name}</h3>
        <p className="text-gray-600 leading-relaxed">
          {texts.created}: {new Date(commerce.createdAt.toDate()).toLocaleDateString()}
        </p>
      </div>
      <div
        className="absolute bottom-0 right-0 w-24 h-24 rounded-tl-full opacity-20 transition-opacity duration-300 group-hover:opacity-100"
        style={{ backgroundColor: "#d5edd9" }}
      ></div>
    </motion.div>
  )
}

