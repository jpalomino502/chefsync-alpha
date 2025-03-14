import { redirect } from "next/navigation"

// Esta página redirige automáticamente al dashboard cuando se accede a la ruta /user/[userId]/commerce/[commerceId]
export default function CommercePage({ params }: { params: { userId: string; commerceId: string } }) {
  // Redirigir al dashboard
  redirect(`/user/${params.userId}/commerce/${params.commerceId}/dashboard`)

  // Este return nunca se ejecutará debido a la redirección, pero es necesario para TypeScript
  return null
}

