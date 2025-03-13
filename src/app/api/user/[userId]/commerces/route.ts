import { type NextRequest, NextResponse } from "next/server"
import { adminAuth, db } from "@/services/firebase-admin"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params
  const authHeader = request.headers.get("Authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }
  const token = authHeader.split("Bearer ")[1]
  const decodedToken = await adminAuth.verifyIdToken(token)
  if (decodedToken.uid !== userId) {
    return NextResponse.json({ error: "No autorizado para acceder a estos datos" }, { status: 403 })
  }
  const commercesRef = db.collection("users").doc(userId).collection("commerces")
  const commercesSnapshot = await commercesRef.get()
  const commerces = commercesSnapshot.docs.map((doc) => {
    const data = doc.data()
    if (data?.createdAt && typeof data.createdAt.toDate === "function") {
      data.createdAt = data.createdAt.toDate().toISOString()
    }
    return {
      id: doc.id,
      ...data,
    }
  })
  return NextResponse.json({ commerces })
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params
  const authHeader = request.headers.get("Authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }
  const token = authHeader.split("Bearer ")[1]
  const decodedToken = await adminAuth.verifyIdToken(token)
  if (decodedToken.uid !== userId) {
    return NextResponse.json({ error: "No autorizado para realizar esta acción" }, { status: 403 })
  }
  const { name } = await request.json()
  if (!name || typeof name !== "string" || name.trim() === "") {
    return NextResponse.json({ error: "El nombre del comercio es requerido" }, { status: 400 })
  }
  const commercesRef = db.collection("users").doc(userId).collection("commerces")
  const newCommerceRef = await commercesRef.add({
    name,
    createdAt: new Date(),
  })
  return NextResponse.json({ id: newCommerceRef.id, name, createdAt: new Date().toISOString() }, { status: 201 })
}
