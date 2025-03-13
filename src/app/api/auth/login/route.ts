import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Correo electrónico y contraseña son requeridos" }, { status: 400 })
    }

    // Autenticar con Firebase
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Generar token de sesión
    const idToken = await user.getIdToken()

    // Configurar una cookie con una vida útil más larga
    const cookieMaxAge = 60 * 60 * 24 * 7 // 7 días en segundos

    // Devolver respuesta exitosa con token y userId para redirección
    return NextResponse.json(
      {
        success: true,
        user: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        },
      },
      {
        status: 200,
        headers: {
          "Set-Cookie": `auth-token=${idToken}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${cookieMaxAge}`,
        },
      },
    )
  } catch (error: any) {
    console.error("Error de inicio de sesión:", error)

    let errorMessage = "Error al iniciar sesión"
    if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
      errorMessage = "Correo electrónico o contraseña incorrectos"
    } else if (error.code === "auth/too-many-requests") {
      errorMessage = "Demasiados intentos fallidos. Intenta más tarde"
    }

    return NextResponse.json({ error: errorMessage }, { status: 400 })
  }
}

