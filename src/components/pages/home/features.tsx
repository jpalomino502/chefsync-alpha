import { Check } from "lucide-react"

export function Features() {
  return (
    <section id="features" className="w-full py-12 sm:py-20 lg:py-32 bg-black text-white">
      <div className="container mx-auto px-8 sm:px-12 md:px-16 max-w-7xl">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-4">
              Optimiza tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-violet-400 to-pink-400">negocio</span>
            </h2>
            <p className="mx-auto max-w-xl text-base sm:text-lg md:text-xl">
              Descubre cómo ChefSync puede mejorar la gestión de tu restaurante, bar o comercio con estas funcionalidades clave.
            </p>
          </div>
        </div>
        <div className="mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-12">
          <FeatureCard title="Gestión de Pedidos" color="blue-400" description="Optimiza la toma de pedidos y reduce errores con un sistema eficiente y digitalizado." />
          <FeatureCard title="Control de Inventarios" color="violet-400" description="Monitorea en tiempo real tu stock y evita desperdicios innecesarios." />
          <FeatureCard title="Integración con Pagos" color="pink-400" description="Conéctate fácilmente con múltiples plataformas de pago para agilizar las transacciones." />
          <FeatureCard title="Reportes en Tiempo Real" color="blue-400" description="Accede a estadísticas clave para tomar mejores decisiones empresariales." />
          <FeatureCard title="Automatización de Reservas" color="violet-400" description="Facilita la gestión de reservas y reduce tiempos de espera para tus clientes." />
          <FeatureCard title="Soporte 24/7" color="pink-400" description="Nuestro equipo de expertos está disponible para ayudarte en cualquier momento." />
        </div>
      </div>
    </section>
  )
}

type FeatureCardProps = {
  title: string
  color: string
  description: string
}

function FeatureCard({ title, color, description }: FeatureCardProps) {
  return (
    <div className="flex flex-col items-start space-y-3 p-4">
      <div className="rounded-full bg-white/10 p-3">
        <Check className={`h-6 w-6 text-${color}`} />
      </div>
      <h3 className="text-lg sm:text-xl">{title}</h3>
      <p className="text-sm sm:text-base">{description}</p>
    </div>
  )
}
