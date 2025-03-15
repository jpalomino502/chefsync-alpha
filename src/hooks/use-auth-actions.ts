"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth"
import { auth } from "@/services/firebase"

type AuthStatus = "idle" | "loading" | "success" | "error"

export function useAuthActions() {
  const [status, setStatus] = useState<AuthStatus>("idle")
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const login = async (email: string, password: string) => {
    try {
      setStatus("loading")
      setError(null)

      // Use Firebase authentication directly
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      // Store user data in localStorage (this will be redundant with auth-context,
      // but ensures backward compatibility with existing code)
      const userData = {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL,
      }
      localStorage.setItem("user", JSON.stringify(userData))

      setStatus("success")
      // No need to call router.refresh() as the auth context will update automatically
      return { user: userData }
    } catch (err: any) {
      setStatus("error")
      const errorMessage = err.message || "Error al iniciar sesión"
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      setStatus("loading")
      setError(null)

      // Use Firebase authentication directly
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      // Update profile with name if provided
      // Note: You might need to import updateProfile from firebase/auth
      // and call it here to set the displayName

      // Store user data in localStorage
      const userData = {
        uid: user.uid,
        email: user.email,
        name: name, // Use the provided name
        photoURL: user.photoURL,
      }
      localStorage.setItem("user", JSON.stringify(userData))

      setStatus("success")
      // No need to call router.refresh() as the auth context will update automatically
      return { user: userData }
    } catch (err: any) {
      setStatus("error")
      const errorMessage = err.message || "Error al registrarse"
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  const resetPassword = async (email: string) => {
    try {
      setStatus("loading")
      setError(null)

      // Use Firebase password reset
      await sendPasswordResetEmail(auth, email)

      setStatus("success")
      return { success: true }
    } catch (err: any) {
      setStatus("error")
      const errorMessage = err.message || "Error al enviar el correo de restablecimiento"
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  const logout = async () => {
    try {
      setStatus("loading")
      setError(null)

      // Use Firebase signOut
      await signOut(auth)

      // Clear localStorage
      localStorage.removeItem("user")

      setStatus("success")
      // No need to call router.refresh() as the auth context will update automatically
      return { success: true }
    } catch (err: any) {
      setStatus("error")
      const errorMessage = err.message || "Error al cerrar sesión"
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  return {
    login,
    register,
    resetPassword,
    logout,
    status,
    error,
    isLoading: status === "loading",
  }
}

