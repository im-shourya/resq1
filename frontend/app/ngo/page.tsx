"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Logo } from "@/components/resq/logo"
import { DispatcherDashboard } from "@/components/resq/dispatcher-dashboard"
import { VetConsole } from "@/components/resq/vet-console"
import { CityDashboard } from "@/components/resq/city-dashboard"

type NGOScreen = "dispatcher" | "vet" | "city"

const tabs: { id: NGOScreen; label: string; icon: string; desc: string }[] = [
  { id: "dispatcher", label: "NGO DISPATCH", icon: "🚨", desc: "Live case management" },
  { id: "vet",        label: "VET TRIAGE",   icon: "🩺", desc: "Medical assessment" },
  { id: "city",       label: "CITY OVERVIEW", icon: "📊", desc: "Analytics & stats" },
]

export default function NGODashboardPage() {
  const [activeScreen, setActiveScreen] = useState<NGOScreen>("dispatcher")
  const [isLoaded, setIsLoaded] = useState(false)
  const [cursorVisible, setCursorVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 80)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => setCursorVisible(v => !v), 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F0F4F8] overflow-hidden scanline-effect">
      <div className="grain-overlay" />
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className={`relative z-10 transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        {/* Desktop Header */}
        <header
          className={`hidden md:flex items-center justify-between px-6 py-4 border-b border-[#2A2A3A] bg-[#0A0A0F]/90 backdrop-blur-sm sticky top-0 z-50 transition-transform duration-500 ${isLoaded ? "translate-y-0" : "-translate-y-full"}`}
        >
          <div className="flex items-center gap-6">
            <Logo />
            {/* NGO badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1A1A2E] border border-[#D72638]/30 rounded-md">
              <span className="w-2 h-2 bg-[#D72638] rounded-full animate-pulse" />
              <span
                className="text-xs font-semibold tracking-widest text-[#D72638]"
                style={{ fontFamily: "var(--font-barlow), Barlow Condensed, sans-serif" }}
              >
                NGO PORTAL
              </span>
            </div>
          </div>

          {/* Tabs */}
          <nav className="flex items-center gap-1">
            {tabs.map((tab, i) => (
              <button
                key={tab.id}
                onClick={() => setActiveScreen(tab.id)}
                className={`relative px-4 py-2 text-sm font-semibold tracking-wider transition-all duration-200 ${
                  activeScreen === tab.id ? "text-[#D72638]" : "text-[#6B7280] hover:text-[#F0F4F8]"
                } ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
                style={{
                  fontFamily: "var(--font-barlow), Barlow Condensed, sans-serif",
                  transitionDelay: `${i * 50}ms`,
                }}
              >
                <span className="mr-1.5">{tab.icon}</span>
                {tab.label}
                {activeScreen === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D72638] animate-scale-pop origin-left" />
                )}
              </button>
            ))}
          </nav>

          {/* Right status + back link */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4 text-xs font-mono text-[#6B7280]">
              <span>4 Active Rescues</span>
              <span className="text-[#2A2A3A]">·</span>
              <span className="text-[#22C55E]">
                VitaScore AI: Ready
                <span className={`ml-1 ${cursorVisible ? "opacity-100" : "opacity-0"}`}>▋</span>
              </span>
            </div>
            <Link
              href="/portal"
              className="text-xs font-mono text-[#6B7280] hover:text-[#F0F4F8] transition-colors border border-[#2A2A3A] hover:border-[#4A4A5A] px-3 py-1.5 rounded"
            >
              ← HOME
            </Link>
          </div>
        </header>

        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between px-4 py-3 border-b border-[#2A2A3A] bg-[#0A0A0F]/90 backdrop-blur-sm sticky top-0 z-50">
          <Logo compact />
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#D72638] border border-[#D72638]/30 px-2 py-1 rounded">NGO</span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse" />
              <span className="text-xs font-mono text-[#22C55E]">LIVE</span>
            </span>
          </div>
        </header>

        {/* Main Content */}
        <main className="relative pb-20 md:pb-0">
          <div
            className={`transition-all duration-200 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
            style={{ transitionDelay: "300ms" }}
          >
            {activeScreen === "dispatcher" && <DispatcherDashboard />}
            {activeScreen === "vet"        && <VetConsole />}
            {activeScreen === "city"       && <CityDashboard />}
          </div>
        </main>

        {/* Mobile Bottom Nav */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#12121A] border-t border-[#2A2A3A] z-50">
          <div className="flex justify-around py-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveScreen(tab.id)}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
                  activeScreen === tab.id
                    ? "text-[#D72638] bg-[#D72638]/10"
                    : "text-[#6B7280] hover:text-[#F0F4F8]"
                }`}
              >
                <span className="text-xl">{tab.icon}</span>
                <span className="text-xs font-medium">{tab.label.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>
    </div>
  )
}
