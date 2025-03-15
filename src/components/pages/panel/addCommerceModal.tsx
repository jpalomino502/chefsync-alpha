"use client"
import React from "react"
import { motion } from "framer-motion"

interface AddCommerceModalProps {
  isOpen: boolean
  onClose: () => void
  onAddCommerce: (e: React.FormEvent<HTMLFormElement>) => void
  newCommerce: string
  setNewCommerce: React.Dispatch<React.SetStateAction<string>>
  texts: {
    newCommerce: string
    commerceName: string
    commerceNamePlaceholder: string
    cancel: string
    add: string
  }
}

const AddCommerceModal: React.FC<AddCommerceModalProps> = ({
  isOpen,
  onClose,
  onAddCommerce,
  newCommerce,
  setNewCommerce,
  texts,
}) => {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="fixed inset-0 bg-black opacity-50 transition-opacity" aria-hidden="true"></div>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative bg-white rounded-xl shadow-lg max-w-md w-full p-8 z-10"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl md:text-3xl text-black">{texts.newCommerce}</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none" aria-label="Cerrar modal">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <form onSubmit={onAddCommerce}>
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
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition"
              >
                {texts.cancel}
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                {texts.add}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default AddCommerceModal
