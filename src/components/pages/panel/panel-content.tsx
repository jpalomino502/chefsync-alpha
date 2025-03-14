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

const texts = {
  title: "Mis Comercios",
  logout: "Cerrar sesión",
}

export default function PanelContent({ userId }: { userId: string }) {
  const router = useRouter()
  const [commerces, setCommerces] = useState([])
  const [loading, setLoading] = useState(true)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [language] = useState("es")

  useEffect(() => {
    const currentUser = auth.currentUser
    if (!currentUser || currentUser.uid !== userId) {
      router.push("/")
      return
    }

    const fetchCommerces = async () => {
      try {
        if (!auth.currentUser) {
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
        }
        setLoading(false)

        const intervalId = setInterval(async () => {
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
        }, 30000)

        return () => clearInterval(intervalId)
      } catch (error) {
        setLoading(false)
      }
    }

    const unsubscribe = fetchCommerces()

    if (typeof unsubscribe === "function") {
      return unsubscribe
    }
  }, [userId, router])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      localStorage.removeItem("user")
      router.push("/")
    } catch (error) {}
  }

  if (loading) {
    return <LoadingPanel />
  }
  return (
    <>
      <UserHeader
      />

      <main className="container mx-auto px-6 lg:px-40 py-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl mb-8 text-black text-center"
        >
          {texts.title}
        </motion.h2>

        <CommerceList commerces={commerces} userId={userId} language={language} />
      </main>
    </>
  )
}