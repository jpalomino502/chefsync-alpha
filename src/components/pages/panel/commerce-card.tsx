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

function parseSpanishDate(dateInput: any): Date {
  const dateStr = String(dateInput)
  const monthMap: { [key: string]: string } = {
    "enero": "January",
    "febrero": "February",
    "marzo": "March",
    "abril": "April",
    "mayo": "May",
    "junio": "June",
    "julio": "July",
    "agosto": "August",
    "septiembre": "September",
    "octubre": "October",
    "noviembre": "November",
    "diciembre": "December",
  }
  let replacedStr = dateStr
  for (const [es, en] of Object.entries(monthMap)) {
    const regex = new RegExp(es, "i")
    if (regex.test(replacedStr)) {
      replacedStr = replacedStr.replace(regex, en)
      break
    }
  }
  replacedStr = replacedStr.replace(/\sde\s/g, " ")
  replacedStr = replacedStr.replace("a.m.", "AM").replace("p.m.", "PM")
  console.log("Fecha convertida:", replacedStr)
  return new Date(replacedStr)
}

export default function CommerceCard({ commerce, index, userId, texts, language }: CommerceCardProps) {
  const router = useRouter()

  console.log("Datos de commerce:", commerce)

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

  let createdAtDate: Date

  if (commerce.createdAt) {
    if (typeof commerce.createdAt === "object" && "seconds" in commerce.createdAt) {
      createdAtDate = new Date(commerce.createdAt.seconds * 1000)
    } else {
      createdAtDate = new Date(commerce.createdAt)
      if (isNaN(createdAtDate.getTime())) {
        createdAtDate = parseSpanishDate(commerce.createdAt)
      }
    }
  } else {
    createdAtDate = new Date()
  }

  const isValidDate = !isNaN(createdAtDate.getTime())

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
          <ChefHat size={32} className="text-black" />
        </div>
        <h3 className="text-2xl mb-3 text-black">{commerce.name}</h3>
        <p className="text-gray-600 leading-relaxed">
          {texts.created}: {isValidDate ? createdAtDate.toLocaleDateString() : "Fecha no disponible"}
        </p>
      </div>
      <div
        className="absolute bottom-0 right-0 w-24 h-24 rounded-tl-full opacity-20 transition-opacity duration-300 group-hover:opacity-100"
        style={{ backgroundColor: "#d5edd9" }}
      ></div>
    </motion.div>
  )
}
