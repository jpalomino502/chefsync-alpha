"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { onAuthStateChanged, type User } from "firebase/auth"
import { auth } from "@/services/firebase"

type AuthContextType = {
  user: User | null
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Use useEffect to ensure this only runs on the client
  useEffect(() => {
    // Initialize user from localStorage on mount
    try {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser as User)
      }
    } catch (error) {
      console.error("Error parsing stored user:", error)
      // In case of error, clear localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("user")
      }
    }

    // Set up Firebase auth listener
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log("Auth state changed:", firebaseUser ? "User logged in" : "No user")

      if (firebaseUser) {
        // Update localStorage when Firebase auth changes
        const userData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          // Add any other needed user properties
        }
        localStorage.setItem("user", JSON.stringify(userData))
        setUser(firebaseUser)
      } else {
        // If Firebase says no user, clear localStorage
        localStorage.removeItem("user")
        setUser(null)
      }

      setLoading(false)
    })

    // Listen for localStorage changes from other tabs/windows
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "user") {
        setUser(event.newValue ? (JSON.parse(event.newValue) as User) : null)
      }
    }

    window.addEventListener("storage", handleStorageChange)

    // Cleanup function
    return () => {
      unsubscribe()
      window.removeEventListener("storage", handleStorageChange)
    }
  }, []) // Empty dependency array means this runs once on mount

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

