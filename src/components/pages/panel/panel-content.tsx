"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { doc, getDoc } from "firebase/firestore"
import { db, auth } from "@/services/firebase"
import { signOut } from "firebase/auth"
import { motion } from "framer-motion"
import CommerceList from "./commerce-list"
import UserHeader from "./user-header"
import LoadingPanel from "./loading-panel"

// Cambiar los textos para que solo estén en español y establecer español como idioma predeterminado
const texts = {
  title: "Mis Comercios",
  logout: "Cerrar sesión",
}

export default function PanelContent({ userId }: { userId: string }) {
  const router = useRouter()
  const [commerces, setCommerces] = useState([])
  const [loading, setLoading] = useState(true)
  const [userName, setUserName] = useState("")
  const [showUserMenu, setShowUserMenu] = useState(false)
  // Cambiar la inicialización del estado de language y eliminar la variable t
  const [language, setLanguage] = useState("es") // Default language

  useEffect(() => {
    // Verificar si el usuario actual coincide con el userId
    const currentUser = auth.currentUser
    if (!currentUser || currentUser.uid !== userId) {
      router.push("/")
      return
    }

    const fetchUserData = async () => {
      try {
        const userDoc = await getDoc(doc(db, "users", userId))
        if (userDoc.exists()) {
          setUserName(userDoc.data().name)
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
      }
    }

    const fetchCommerces = async () => {
      try {
        // Comentar o eliminar la Opción 1 que usa Firestore directamente
        /*
        const commercesRef = collection(db, "users", userId, "commerces")
        return onSnapshot(commercesRef, (snapshot) => {
          const commercesList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          setCommerces(commercesList)
          setLoading(false)
        })
        */

        // Usar la Opción 2 con la API
        // Verificar que currentUser no sea null antes de obtener el token
        if (!auth.currentUser) {
          console.error("No hay usuario autenticado")
          router.push("/")
          return
        }
        const token = await auth.currentUser.getIdToken()
        const response = await fetch(`/api/user/${userId}/commerces`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.ok) {
          const data = await response.json()
          setCommerces(data.commerces)
        } else {
          console.error("Error fetching commerces from API")
        }
        setLoading(false)

        // Configurar un intervalo para actualizar los datos periódicamente
        const intervalId = setInterval(async () => {
          // Verificar que currentUser no sea null antes de obtener el token
          if (!auth.currentUser) {
            clearInterval(intervalId)
            return
          }
          const token = await auth.currentUser.getIdToken()
          const response = await fetch(`/api/user/${userId}/commerces`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

          if (response.ok) {
            const data = await response.json()
            setCommerces(data.commerces)
          }
        }, 30000) // Actualizar cada 30 segundos

        // Retornar una función de limpieza para el intervalo
        return () => clearInterval(intervalId)
      } catch (error) {
        console.error("Error fetching commerces:", error)
        setLoading(false)
      }
    }

    fetchUserData()
    const unsubscribe = fetchCommerces()

    // Si usamos la opción 1 con onSnapshot, necesitamos limpiar el listener
    if (typeof unsubscribe === "function") {
      return unsubscribe
    }
  }, [userId, router])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      localStorage.removeItem("user")
      router.push("/")
    } catch (error) {
      console.error("Error cerrando sesión:", error)
    }
  }

  if (loading) {
    return <LoadingPanel />
  }

  // Reemplazar todas las referencias a t.title y t.logout por texts.title y texts.logout
  return (
    <>
      <UserHeader
        userName={userName}
        showUserMenu={showUserMenu}
        setShowUserMenu={setShowUserMenu}
        handleLogout={handleLogout}
        texts={texts}
      />

      <main className="container mx-auto px-6 lg:px-40 py-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl mb-8 text-black text-center"
        >
          {texts.title}
        </motion.h2>

        <CommerceList commerces={commerces} userId={userId} language={language} />
      </main>
    </>
  )
}

