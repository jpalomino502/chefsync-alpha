import { type NextRequest, NextResponse } from "next/server"
import { adminAuth, db } from "@/services/firebase-admin"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string; commerceId: string }> }
) {
  const { userId, commerceId } = await params
  const authHeader = request.headers.get("Authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }
  const token = authHeader.split("Bearer ")[1]
  const decodedToken = await adminAuth.verifyIdToken(token)
  if (decodedToken.uid !== userId) {
    return NextResponse.json({ error: "No autorizado para acceder a estos datos" }, { status: 403 })
  }
  const commerceRef = db.collection("users").doc(userId).collection("commerces").doc(commerceId)
  const commerceSnapshot = await commerceRef.get()
  if (!commerceSnapshot.exists) {
    return NextResponse.json({ error: "Comercio no encontrado" }, { status: 404 })
  }
  const data = commerceSnapshot.data()
  if (data?.createdAt && typeof data.createdAt.toDate === "function") {
    data.createdAt = data.createdAt.toDate().toISOString()
  }
  return NextResponse.json({ id: commerceSnapshot.id, ...data })
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string; commerceId: string }> }
) {
  const { userId, commerceId } = await params
  const authHeader = request.headers.get("Authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }
  const token = authHeader.split("Bearer ")[1]
  const decodedToken = await adminAuth.verifyIdToken(token)
  if (decodedToken.uid !== userId) {
    return NextResponse.json({ error: "No autorizado para realizar esta acción" }, { status: 403 })
  }
  const updates = await request.json()
  if (!updates || Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "No hay datos para actualizar" }, { status: 400 })
  }
  const commerceRef = db.collection("users").doc(userId).collection("commerces").doc(commerceId)
  const commerceSnapshot = await commerceRef.get()
  if (!commerceSnapshot.exists) {
    return NextResponse.json({ error: "Comercio no encontrado" }, { status: 404 })
  }
  await commerceRef.update(updates)
  return NextResponse.json({ id: commerceId, ...updates })
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string; commerceId: string }> }
) {
  const { userId, commerceId } = await params
  const authHeader = request.headers.get("Authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }
  const token = authHeader.split("Bearer ")[1]
  const decodedToken = await adminAuth.verifyIdToken(token)
  if (decodedToken.uid !== userId) {
    return NextResponse.json({ error: "No autorizado para realizar esta acción" }, { status: 403 })
  }
  const commerceRef = db.collection("users").doc(userId).collection("commerces").doc(commerceId)
  const commerceSnapshot = await commerceRef.get()
  if (!commerceSnapshot.exists) {
    return NextResponse.json({ error: "Comercio no encontrado" }, { status: 404 })
  }
  await commerceRef.delete()
  return NextResponse.json({ success: true, message: "Comercio eliminado correctamente" })
}
