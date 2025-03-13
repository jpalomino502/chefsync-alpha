// use-auth-actions.ts
import { useState } from "react"
import { useRouter } from "next/navigation"

type AuthStatus = "idle" | "loading" | "success" | "error"

export function useAuthActions() {
  const [status, setStatus] = useState<AuthStatus>("idle")
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const login = async (email: string, password: string) => {
    try {
      setStatus("loading")
      setError(null)
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || "Error al iniciar sesión")
      }
      localStorage.setItem("user", JSON.stringify(data.user))
      setStatus("success")
      router.refresh()
      return data
    } catch (err: any) {
      setStatus("error")
      setError(err.message)
      throw err
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      setStatus("loading")
      setError(null)
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || "Error al registrarse")
      }
      localStorage.setItem("user", JSON.stringify(data.user))
      setStatus("success")
      router.refresh()
      return data
    } catch (err: any) {
      setStatus("error")
      setError(err.message)
      throw err
    }
  }

  const resetPassword = async (email: string) => {
    try {
      setStatus("loading")
      setError(null)
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || "Error al enviar el correo de restablecimiento")
      }
      setStatus("success")
      return data
    } catch (err: any) {
      setStatus("error")
      setError(err.message)
      throw err
    }
  }

  const logout = async () => {
    try {
      setStatus("loading")
      setError(null)
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || "Error al cerrar sesión")
      }
      localStorage.removeItem("user")
      setStatus("success")
      router.refresh()
      return data
    } catch (err: any) {
      setStatus("error")
      setError(err.message)
      throw err
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
