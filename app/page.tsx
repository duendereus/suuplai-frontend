import { Nav } from '@/components/landing/Nav'
import { Hero } from '@/components/landing/Hero'
import { MarqueeBanner } from '@/components/landing/MarqueeBanner'
import { PainPoints } from '@/components/landing/PainPoints'
import { AudienceSplit } from '@/components/landing/AudienceSplit'
import { SlotVisual } from '@/components/landing/SlotVisual'
import { ComandoCase } from '@/components/landing/ComandoCase'
import { Calculator } from '@/components/landing/Calculator'
import { Pricing } from '@/components/landing/Pricing'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { MapaCDMX } from '@/components/landing/MapaCDMX'
import { FAQ } from '@/components/landing/FAQ'
import { ManifestoCTA } from '@/components/landing/ManifestoCTA'
import { Footer } from '@/components/landing/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <MarqueeBanner />
        <PainPoints />
        <AudienceSplit />
        <SlotVisual />
        <ComandoCase />
        <Calculator id="calculadora" />
        <Pricing />
        <HowItWorks id="como-funciona" />
        <MapaCDMX />
        <FAQ />
        <ManifestoCTA />
      </main>
      <Footer />
    </>
  )
}
