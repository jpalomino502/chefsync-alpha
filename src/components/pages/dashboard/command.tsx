"use client"
import React from "react"

interface CommandProps {
  commerceId?: string
}

const Command: React.FC<CommandProps> = ({ commerceId }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Comanda</h1>
      <p>Contenido de la comanda para el comercio {commerceId}.</p>
    </div>
  )
}

export default Command
