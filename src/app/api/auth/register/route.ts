import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@/services/firebase"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Nombre, correo electrónico y contraseña son requeridos" }, { status: 400 })
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    await updateProfile(user, { displayName: name })

    const idToken = await user.getIdToken()

    return NextResponse.json(
      {
        success: true,
        user: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        },
        redirectUrl: `/panel/${user.uid}`,
      },
      {
        status: 200,
        headers: {
          "Set-Cookie": `auth-token=${idToken}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${60 * 60 * 24 * 7}`,
        },
      },
    )
  } catch (error: any) {
    console.error("Error de registro:", error)

    let errorMessage = "Error al crear la cuenta"
    if (error.code === "auth/email-already-in-use") {
      errorMessage = "Este correo electrónico ya está en uso"
    } else if (error.code === "auth/weak-password") {
      errorMessage = "La contraseña debe tener al menos 6 caracteres"
    }

    return NextResponse.json({ error: errorMessage }, { status: 400 })
  }
}

