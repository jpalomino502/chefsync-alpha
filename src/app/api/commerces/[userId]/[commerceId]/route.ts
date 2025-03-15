import { NextResponse } from "next/server"
import admin from "@/services/firebase-admin"

export async function DELETE(request: Request, { params }: { params: { userId: string, commerceId: string } }) {
  try {
    await admin.firestore().collection("users").doc(params.userId).collection("commerces").doc(params.commerceId).delete()
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Error al eliminar comercio" }, { status: 500 })
  }
}
