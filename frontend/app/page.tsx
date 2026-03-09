import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { StatsBar } from "@/components/stats-bar"
import { HowItWorks } from "@/components/how-it-works"
import { VitaScoreDemo } from "@/components/vitascore-demo"
import { Features } from "@/components/features"
import { MapShowcase } from "@/components/map-showcase"
import { StakeholderTabs } from "@/components/stakeholder-tabs"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-bg">
      <Navbar loginMode />
      <Hero loginMode />
      <StatsBar />
      <HowItWorks />
      <Features />
      <MapShowcase />
      <StakeholderTabs />
      <Footer />
    </main>
  )
}
