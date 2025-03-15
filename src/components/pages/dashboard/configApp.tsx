"use client"
import React from "react"

interface ConfigAppProps {
  commerceId?: string
}

const ConfigApp: React.FC<ConfigAppProps> = ({ commerceId }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Configuración</h1>
      <p>Contenido de la configuración para el comercio {commerceId}.</p>
    </div>
  )
}

export default ConfigApp
