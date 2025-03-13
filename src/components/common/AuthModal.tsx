"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Eye, EyeOff, User } from "lucide-react"
import { useAuthActions } from "@/hooks/use-auth-actions"
import { useToast } from "@/hooks/use-toast"

interface AuthModalProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

type FormType = "login" | "register" | "forgot-password"

export function AuthModal({ isOpen, setIsOpen }: AuthModalProps) {
  const [formType, setFormType] = useState<FormType>("login")
  const [showPassword, setShowPassword] = useState(false)
  const { login, register, resetPassword, status, error } = useAuthActions()
  const { toast } = useToast()

  const nameRef = useRef<HTMLInputElement>(null)
  const emailLoginRef = useRef<HTMLInputElement>(null)
  const passwordLoginRef = useRef<HTMLInputElement>(null)
  const emailRegisterRef = useRef<HTMLInputElement>(null)
  const passwordRegisterRef = useRef<HTMLInputElement>(null)
  const confirmPasswordRef = useRef<HTMLInputElement>(null)
  const emailForgotRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (formType === "login") {
        const email = emailLoginRef.current?.value || ""
        const password = passwordLoginRef.current?.value || ""

        await login(email, password)
        // Remove the success toast
        setIsOpen(false)
      } else if (formType === "register") {
        const name = nameRef.current?.value || ""
        const email = emailRegisterRef.current?.value || ""
        const password = passwordRegisterRef.current?.value || ""
        const confirmPassword = confirmPasswordRef.current?.value || ""

        if (password !== confirmPassword) {
          toast({
            title: "Error",
            description: "Las contraseñas no coinciden",
            variant: "destructive",
          })
          return
        }

        await register(name, email, password)
        toast({
          title: "Registro exitoso",
          description: "Tu cuenta ha sido creada correctamente",
        })
        setIsOpen(false)
      } else if (formType === "forgot-password") {
        const email = emailForgotRef.current?.value || ""

        await resetPassword(email)
        toast({
          title: "Correo enviado",
          description: "Se ha enviado un correo para restablecer tu contraseña",
        })
        setFormType("login")
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setFormType("login")
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open)
        if (!open) resetForm()
      }}
    >
      <DialogContent className="bg-white border-gray-200 shadow-lg sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-black p-2 text-white flex items-center justify-center">
            <User className="h-6 w-6" />
          </div>
          <DialogTitle className="text-2xl text-center">
            {formType === "login" && "Iniciar sesión"}
            {formType === "register" && "Crear cuenta"}
            {formType === "forgot-password" && "Recuperar contraseña"}
          </DialogTitle>
        </DialogHeader>

        {formType !== "login" && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-4 left-4 p-0 w-8 h-8"
            onClick={() => setFormType("login")}
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Volver</span>
          </Button>
        )}
        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          {formType === "login" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="email-login">Correo electrónico</Label>
                <Input
                  id="email-login"
                  type="email"
                  placeholder="tu@email.com"
                  className="border-gray-300 focus:border-black focus:ring-black"
                  required
                  ref={emailLoginRef}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password-login">Contraseña</Label>
                </div>
                <div className="relative">
                  <Input
                    id="password-login"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="border-gray-300 focus:border-black focus:ring-black"
                    required
                    ref={passwordLoginRef}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">{showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}</span>
                  </Button>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-black hover:bg-zinc-900 text-white"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Iniciando sesión..." : "Iniciar sesión"}
              </Button>
              <div className="text-center text-sm space-y-2">
                <div>
                  ¿No tienes una cuenta?{" "}
                  <Button
                    type="button"
                    variant="link"
                    className="px-0 l text-black"
                    onClick={() => setFormType("register")}
                  >
                    Regístrate
                  </Button>
                </div>
                <div>
                  <Button
                    type="button"
                    variant="link"
                    className="px-0 l text-sm text-black"
                    onClick={() => setFormType("forgot-password")}
                  >
                    ¿Olvidaste tu contraseña?
                  </Button>
                </div>
              </div>
            </>
          )}

          {formType === "register" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="name-register">Nombre completo</Label>
                <Input
                  id="name-register"
                  type="text"
                  placeholder="Tu nombre"
                  className="border-gray-300 focus:border-black focus:ring-black"
                  required
                  ref={nameRef}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-register">Correo electrónico</Label>
                <Input
                  id="email-register"
                  type="email"
                  placeholder="tu@email.com"
                  className="border-gray-300 focus:border-black focus:ring-black"
                  required
                  ref={emailRegisterRef}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-register">Contraseña</Label>
                <div className="relative">
                  <Input
                    id="password-register"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="border-gray-300 focus:border-black focus:ring-black"
                    required
                    ref={passwordRegisterRef}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">{showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}</span>
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar contraseña</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  className="border-gray-300 focus:border-black focus:ring-black"
                  required
                  ref={confirmPasswordRef}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-black hover:bg-zinc-900 text-white"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Creando cuenta..." : "Crear cuenta"}
              </Button>
              <div className="text-center text-sm">
                ¿Ya tienes una cuenta?{" "}
                <Button type="button" variant="link" className="px-0 l text-black" onClick={() => setFormType("login")}>
                  Inicia sesión
                </Button>
              </div>
            </>
          )}

          {formType === "forgot-password" && (
            <>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
                </p>
                <Label htmlFor="email-forgot">Correo electrónico</Label>
                <Input
                  id="email-forgot"
                  type="email"
                  placeholder="tu@email.com"
                  className="border-gray-300 focus:border-black focus:ring-black"
                  required
                  ref={emailForgotRef}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-black hover:bg-gray-800 text-white"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Enviando enlace..." : "Enviar enlace"}
              </Button>
              <div className="text-center text-sm">
                ¿Recordaste tu contraseña?{" "}
                <Button type="button" variant="link" className="px-0 l text-black" onClick={() => setFormType("login")}>
                  Volver al inicio de sesión
                </Button>
              </div>
            </>
          )}
        </form>
      </DialogContent>
    </Dialog>
  )
}

