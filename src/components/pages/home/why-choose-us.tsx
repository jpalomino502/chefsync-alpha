"use client";

import type React from "react";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Shield, Clock, Zap } from "lucide-react";
import Image from "next/image";

export default function WhyChooseUsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isClient ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-gray-900 dark:text-white">
            ¿Por qué elegir ChefSync?
          </h2>
          <p className="text-xl text-gray-600">
            Descubre por qué miles de comercios confían en ChefSync para optimizar sus operaciones y aumentar su rentabilidad.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isClient ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full h-[600px]"
          >
            <Image
              src="/placeholder.svg?height=600&width=600"
              alt="Operaciones del comercio"
              fill
              className="object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent rounded-2xl"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isClient ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <FeatureItem
              icon={<Zap className="h-5 w-5" />}
              title="Interfaz intuitiva"
              description="Diseñada específicamente para comercio, fácil de usar en cualquier dispositivo."
            />

            <FeatureItem
              icon={<Clock className="h-5 w-5" />}
              title="Integración completa"
              description="Todas las operaciones de tu comercio en una sola plataforma unificada."
            />

            <FeatureItem
              icon={<Shield className="h-5 w-5" />}
              title="Análisis en tiempo real"
              description="Datos y métricas actualizados para tomar decisiones informadas al instante."
            />

            <FeatureItem
              icon={<Check className="h-5 w-5" />}
              title="Soporte 24/7"
              description="Asistencia técnica y capacitación personalizada disponible en todo momento."
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FeatureItem({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex gap-4">
      <div className="h-10 w-10 rounded-full bg-black flex items-center justify-center text-white shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="text-xl mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-4xl text-gray-900 dark:text-white">{value}</p>
      <p className="text-gray-600 mt-2">{label}</p>
    </div>
  );
}
