import { NextResponse } from "next/server"
import admin from "@/services/firebase-admin"

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  try {
    const snapshot = await admin.firestore().collection("users").doc(params.userId).collection("commerces").get()
    const commerces = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    return NextResponse.json({ commerces })
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener datos" }, { status: 500 })
  }
}

export async function POST(request: Request, { params }: { params: { userId: string } }) {
  try {
    const { name } = await request.json()
    if (!name) return NextResponse.json({ error: "Nombre es requerido" }, { status: 400 })
    const docRef = await admin.firestore().collection("users").doc(params.userId).collection("commerces").add({
      name,
      createdAt: new Date()
    })
    return NextResponse.json({ id: docRef.id })
  } catch (error) {
    return NextResponse.json({ error: "Error al agregar comercio" }, { status: 500 })
  }
}
