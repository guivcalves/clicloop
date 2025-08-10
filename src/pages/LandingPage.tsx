import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { Benefits } from "@/components/benefits"
import { HowItWorks } from "@/components/how-it-works"
import { PricingPlans } from "@/components/pricing-plans"
import { FAQ } from "@/components/faq"
import { FinalCTA } from "@/components/final-cta"
import { Footer } from "@/components/footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <Benefits />
        <HowItWorks />
        <PricingPlans />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
