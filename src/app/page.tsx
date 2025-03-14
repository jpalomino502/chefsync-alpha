import { Header } from "@/components/common/header";
import { Hero } from "@/components/pages/home/hero";
import { Features } from "@/components/pages/home/features";
import WhyChooseUs from "@/components/pages/home/why-choose-us";
import FreeTrial from "@/components/pages/home/freeTrial";
import Pricing from "@/components/pages/home/pricing";
import Faq from "@/components/pages/home/faq";

export default function Home() {
  return (
    <div className="relative">
      <Header />
      {/* Se aplica margen negativo para que el contenido suba y quede detrás del header */}
      <div className="-mt-16">
        <Hero />
        <Features />
        <WhyChooseUs />
        <FreeTrial />
        <Pricing />
        <Faq />
      </div>
    </div>
  );
}
