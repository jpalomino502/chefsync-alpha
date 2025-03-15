"use client"
import React from "react"

interface SummaryProps {
  commerceId?: string
}

const Summary: React.FC<SummaryProps> = ({ commerceId }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Resumen</h1>
      <p>Contenido del resumen para el comercio {commerceId}.</p>
    </div>
  )
}

export default Summary
