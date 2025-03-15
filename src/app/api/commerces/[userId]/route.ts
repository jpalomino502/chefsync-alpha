import { NextResponse } from "next/server";
import { db } from "@/services/firebase";
import { collection, getDocs, addDoc, Timestamp } from "firebase/firestore";

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  try {
    const commercesRef = collection(db, "users", params.userId, "commerces");
    const snapshot = await getDocs(commercesRef);

    const commerces = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ commerces });
  } catch (error) {
    console.error("Error al obtener comercios:", error);
    return NextResponse.json({ error: "Error al obtener datos" }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: { params: { userId: string } }) {
  try {
    const { name } = await request.json();
    if (!name) return NextResponse.json({ error: "Nombre es requerido" }, { status: 400 });

    const commercesRef = collection(db, "users", params.userId, "commerces");
    const docRef = await addDoc(commercesRef, {
      name,
      createdAt: Timestamp.now(),
    });

    return NextResponse.json({ id: docRef.id });
  } catch (error) {
    console.error("Error al agregar comercio:", error);
    return NextResponse.json({ error: "Error al agregar comercio" }, { status: 500 });
  }
}
