"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Swal from "sweetalert2"
import { auth } from "@/services/firebase"

const texts = {
  newCommerce: "Nuevo Comercio",
  commerceName: "Nombre del comercio",
  commerceNamePlaceholder: "Escribe el nombre del comercio...",
  cancel: "Cancelar",
  add: "Agregar",
  deleteConfirmation: "¿Estás seguro?",
  deleteConfirmText: "Sí, eliminar!",
  deleteCancelText: "Cancelar",
}

interface AddCommerceModalProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  userId: string
  language?: string
}

export default function AddCommerceModal({ isOpen, setIsOpen, userId, language }: AddCommerceModalProps) {
  const [newCommerce, setNewCommerce] = useState("")

  const handleAddCommerce = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCommerce.trim()) return

    const creationMessage = `¿Deseas crear el comercio "${newCommerce}"?`

    const result = await Swal.fire({
      title: texts.deleteConfirmation,
      text: creationMessage,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: texts.deleteConfirmText,
      cancelButtonText: texts.deleteCancelText,
    })

    if (result.isConfirmed) {
      try {
        if (!auth.currentUser) {
          Swal.fire("Error", "No hay usuario autenticado", "error")
          return
        }
        const token = await auth.currentUser.getIdToken()
        const response = await fetch(`/api/user/${userId}/commerces`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: newCommerce,
          }),
        })

        if (response.ok) {
          setNewCommerce("")
          setIsOpen(false)
          Swal.fire("Creado!", "El comercio ha sido creado.", "success")
        } else {
          const errorData = await response.json()
          throw new Error(errorData.error || "Error al crear el comercio")
        }
      } catch (error) {
        console.error("Error adding commerce:", error)
        Swal.fire("Error", "Hubo un error al crear el comercio.", "error")
      }
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4">
        <div
          className="fixed inset-0 bg-black opacity-50 transition-opacity"
          aria-hidden="true"
          onClick={() => setIsOpen(false)}
        ></div>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative bg-white rounded-xl shadow-lg max-w-md w-full p-8 z-10"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl md:text-3xl text-black">{texts.newCommerce}</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Cerrar modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <form onSubmit={handleAddCommerce}>
            <div className="mb-4">
              <label htmlFor="commerceName" className="block text-sm font-medium text-black">
                {texts.commerceName}
              </label>
              <input
                id="commerceName"
                type="text"
                value={newCommerce}
                onChange={(e) => setNewCommerce(e.target.value)}
                placeholder={texts.commerceNamePlaceholder}
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition"
              >
                {texts.cancel}
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                {texts.add}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

