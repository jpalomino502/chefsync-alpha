import { Header } from "@/components/common/header"
import { Hero } from "@/components/pages/home/hero"
import { Features } from "@/components/pages/home/features"
import WhyChooseUs from "@/components/pages/home/why-choose-us"
import FreeTrial from "@/components/pages/home/freeTrial"
import Pricing from "@/components/pages/home/pricing"
import Faq from "@/components/pages/home/faq"
import { HydrationSafe } from "@/components/ui/hydration-safe"

export default function Home() {
  return (
    <HydrationSafe className="relative">
      <Header />
      <HydrationSafe className="-mt-16">
        <Hero />
        <Features />
        <WhyChooseUs />
        <FreeTrial />
        <Pricing />
        <Faq />
      </HydrationSafe>
    </HydrationSafe>
  )
}

