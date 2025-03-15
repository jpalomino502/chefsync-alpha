"use client"
import React from "react"

interface MenuProps {
  commerceId?: string
}

const Menu: React.FC<MenuProps> = ({ commerceId }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Menú</h1>
      <p>Contenido del menú para el comercio {commerceId}.</p>
    </div>
  )
}

export default Menu
