"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { collection, addDoc, onSnapshot, doc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { db, auth } from "@/services/firebase";
import PanelHeader from "@/components/pages/panel/panelHeader";
import CommerceGrid from "@/components/pages/panel/commerceGrid";
import AddCommerceModal from "@/components/pages/panel/addCommerceModal";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const texts = {
  title: "Mis Comercios",
  addCommerce: "Agregar Comercio",
  addCommerceDescription: "Crea un nuevo comercio para gestionar",
  newCommerce: "Nuevo Comercio",
  commerceName: "Nombre del comercio",
  commerceNamePlaceholder: "Escribe el nombre del comercio...",
  cancel: "Cancelar",
  add: "Agregar",
  created: "Creado",
  logout: "Cerrar sesión",
  deleteConfirmation: "¿Estás seguro?",
  deleteWarning: "¡No podrás revertir esto!",
  deleteConfirmText: "Sí, eliminar!",
  deleteCancelText: "Cancelar",
  deleteSuccess: "Eliminado!",
  deleteError: "Error"
};

interface Commerce {
  id: string;
  name: string;
  createdAt: Date;
}

export default function UserPanel() {
  const { userId } = useParams<{ userId: string }>();
  const router = useRouter();
  const [commerces, setCommerces] = useState<Commerce[]>([]);
  const [newCommerce, setNewCommerce] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!userId) return;
    const commercesRef = collection(db, "users", userId, "commerces");

    const unsubscribe = onSnapshot(commercesRef, (snapshot) => {
      const commercesList = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date()
        };
      }) as Commerce[];

      setCommerces(commercesList);
      setLoading(false);
    });

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.uid !== userId) {
        router.push("/");
      }
    } else {
      router.push("/");
    }

    return () => unsubscribe();
  }, [userId, router]);

  const handleAddCommerce = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommerce.trim()) return;

    const creationMessage = `¿Deseas crear el comercio "${newCommerce}"?`;
    const result = await Swal.fire({
      title: texts.deleteConfirmation,
      text: creationMessage,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: texts.deleteConfirmText,
      cancelButtonText: texts.deleteCancelText
    });

    if (result.isConfirmed) {
      try {
        const commercesRef = collection(db, "users", userId, "commerces");
        await addDoc(commercesRef, {
          name: newCommerce,
          createdAt: serverTimestamp() // Se almacena como timestamp de Firestore
        });

        setNewCommerce("");
        setIsModalOpen(false);
        Swal.fire("Creado!", "El comercio ha sido creado.", "success");
      } catch (error) {
        Swal.fire(texts.deleteError, "Hubo un error al crear el comercio.", "error");
      }
    }
  };

  const handleDeleteCommerce = async (commerceId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const result = await Swal.fire({
      title: texts.deleteConfirmation,
      text: texts.deleteWarning,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: texts.deleteConfirmText,
      cancelButtonText: texts.deleteCancelText
    });

    if (result.isConfirmed) {
      try {
        await deleteDoc(doc(db, "users", userId, "commerces", commerceId));
        Swal.fire(texts.deleteSuccess, "El comercio ha sido eliminado.", "success");
      } catch (error) {
        Swal.fire(texts.deleteError, "Hubo un error al eliminar el comercio.", "error");
      }
    }
  };

  const handleSelectCommerce = (commerceId: string) => {
    router.push(`/panel/dashboard/${userId}/${commerceId}`);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      router.push("/");
    } catch (error) {}
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <PanelHeader handleLogout={handleLogout} texts={texts} />
      <main className="container mx-auto px-6 lg:px-40 py-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl mb-8 text-black text-center"
        >
          {texts.title}
        </motion.h2>
        <CommerceGrid
          commerces={commerces}
          onSelect={handleSelectCommerce}
          onDelete={handleDeleteCommerce}
          openModal={() => setIsModalOpen(true)}
          texts={texts}
        />
      </main>
      <AddCommerceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddCommerce={handleAddCommerce}
        newCommerce={newCommerce}
        setNewCommerce={setNewCommerce}
        texts={texts}
      />
    </div>
  );
}
