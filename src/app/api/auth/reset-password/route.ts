import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Correo electrónico es requerido" },
        { status: 400 }
      );
    }

    await sendPasswordResetEmail(auth, email);

    return NextResponse.json({
      success: true,
      message: "Se ha enviado un correo para restablecer tu contraseña",
    });
  } catch (error: any) {
    console.error("Error al enviar correo de restablecimiento:", error);

    const errorMessage = "Error al enviar el correo de restablecimiento";
    if (error.code === "auth/user-not-found") {
      return NextResponse.json({
        success: true,
        message:
          "Si el correo existe, recibirás un enlace para restablecer tu contraseña",
      });
    }

    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
