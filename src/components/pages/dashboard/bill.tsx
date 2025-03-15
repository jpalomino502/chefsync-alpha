"use client"
import React from "react"

interface BillProps {
  commerceId?: string
}

const Bill: React.FC<BillProps> = ({ commerceId }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Cuenta</h1>
      <p>Contenido de la cuenta para el comercio {commerceId}.</p>
    </div>
  )
}

export default Bill
