import { NextResponse } from "next/server";
import { db } from "@/services/firebase";
import { doc, getDoc, deleteDoc } from "firebase/firestore";

export async function GET(request: Request, { params }: { params: { userId: string, commerceId: string } }) {
  try {
    const commerceRef = doc(db, "users", params.userId, "commerces", params.commerceId);
    const commerceSnap = await getDoc(commerceRef);

    if (!commerceSnap.exists()) {
      return NextResponse.json({ error: "Comercio no encontrado" }, { status: 404 });
    }

    return NextResponse.json({ id: commerceSnap.id, ...commerceSnap.data() });
  } catch (error) {
    console.error("Error al obtener comercio:", error);
    return NextResponse.json({ error: "Error al obtener comercio" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { userId: string, commerceId: string } }) {
  try {
    const commerceRef = doc(db, "users", params.userId, "commerces", params.commerceId);
    await deleteDoc(commerceRef);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error al eliminar comercio:", error);
    return NextResponse.json({ error: "Error al eliminar comercio" }, { status: 500 });
  }
}
