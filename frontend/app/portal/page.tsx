"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Logo } from "@/components/resq/logo"

export default function PortalSelectPage() {
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
    <div className="min-h-screen bg-[#0A0A0F] text-[#F0F4F8] overflow-hidden scanline-effect flex flex-col">
      <div className="grain-overlay" />
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className={`relative z-10 flex flex-col flex-1 transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        <header className={`flex items-center justify-between px-6 md:px-10 py-5 border-b border-[#2A2A3A] transition-transform duration-500 ${isLoaded ? "translate-y-0" : "-translate-y-full"}`}>
          <Logo />
          <div className="flex items-center gap-2 text-xs font-mono text-[#6B7280]">
            <span className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse" />
            <span className="text-[#22C55E]">LIVE</span>
            <span className="text-[#2A2A3A] mx-1">·</span>
            <span>4 Active Rescues</span>
            <span className={`ml-1 text-[#22C55E] ${cursorVisible ? "opacity-100" : "opacity-0"}`}>▋</span>
          </div>
          <Link href="/" className="text-xs font-mono text-[#6B7280] hover:text-[#F0F4F8] transition-colors border border-[#2A2A3A] hover:border-[#4A4A5A] px-3 py-1.5 rounded hidden md:block">
            ← BACK TO HOME
          </Link>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 md:py-20">
          <div className="text-center max-w-3xl mx-auto">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#D72638]/10 border border-[#D72638]/30 rounded-full mb-8 animate-fade-up"
              style={{ animationDelay: "100ms" }}
            >
              <span className="w-2 h-2 bg-[#D72638] rounded-full animate-pulse" />
              <span className="text-xs font-mono text-[#D72638] tracking-widest">MUMBAI ANIMAL RESCUE NETWORK</span>
            </div>

            <h1
              className="text-5xl md:text-8xl font-bold tracking-tight text-[#F0F4F8] mb-6 animate-fade-up leading-[0.9]"
              style={{ fontFamily: "var(--font-bebas), Bebas Neue, sans-serif", animationDelay: "150ms" }}
            >
              EVERY SECOND
              <br />
              IS A <span className="text-[#D72638]">LIFE</span>
            </h1>

            <p
              className="text-lg md:text-xl text-[#6B7280] mb-14 animate-fade-up max-w-xl mx-auto"
              style={{ animationDelay: "200ms" }}
            >
              Real-time animal emergency dispatch. Report in 20 seconds,
              rescue dispatched in 10.
            </p>

            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-2xl mx-auto animate-fade-up"
              style={{ animationDelay: "300ms" }}
            >
              {/* Citizen Card */}
              <Link href="/auth/citizen" className="group block">
                <div className="relative bg-[#12121A] border border-[#2A2A3A] hover:border-[#D72638]/50 rounded-2xl p-7 text-left transition-all duration-300 hover:bg-[#D72638]/5 hover:shadow-xl hover:shadow-[#D72638]/10 hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 bg-[#D72638]/15 rounded-xl flex items-center justify-center text-2xl border border-[#D72638]/20 group-hover:scale-110 transition-transform duration-300">
                      📸
                    </div>
                    <span className="text-[#6B7280] group-hover:text-[#D72638] transition-colors text-xl">→</span>
                  </div>
                  <h2
                    className="text-2xl md:text-3xl font-bold mb-2 text-[#F0F4F8] group-hover:text-[#D72638] transition-colors"
                    style={{ fontFamily: "var(--font-barlow), Barlow Condensed, sans-serif" }}
                  >
                    CITIZEN PORTAL
                  </h2>
                  <p className="text-sm text-[#6B7280] leading-relaxed mb-5">
                    Spotted an animal in distress? Report it in 20 seconds.
                    See how the rescue works — step by step.
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-[#D72638] bg-[#D72638]/10 border border-[#D72638]/20 px-2.5 py-1 rounded">REPORT NOW</span>
                    <span className="text-xs font-mono text-[#F5A623] bg-[#F5A623]/10 border border-[#F5A623]/20 px-2.5 py-1 rounded">HOW IT WORKS</span>
                  </div>
                </div>
              </Link>

              {/* NGO Card */}
              <Link href="/auth/ngo" className="group block">
                <div className="relative bg-[#12121A] border border-[#2A2A3A] hover:border-[#22C55E]/50 rounded-2xl p-7 text-left transition-all duration-300 hover:bg-[#22C55E]/5 hover:shadow-xl hover:shadow-[#22C55E]/10 hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 bg-[#22C55E]/15 rounded-xl flex items-center justify-center text-2xl border border-[#22C55E]/20 group-hover:scale-110 transition-transform duration-300">
                      🚨
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse" />
                      <span className="text-xs font-mono text-[#22C55E]">LIVE</span>
                      <span className="text-[#6B7280] group-hover:text-[#22C55E] transition-colors text-xl">→</span>
                    </div>
                  </div>
                  <h2
                    className="text-2xl md:text-3xl font-bold mb-2 text-[#F0F4F8] group-hover:text-[#22C55E] transition-colors"
                    style={{ fontFamily: "var(--font-barlow), Barlow Condensed, sans-serif" }}
                  >
                    NGO PORTAL
                  </h2>
                  <p className="text-sm text-[#6B7280] leading-relaxed mb-5">
                    Dispatcher dashboard, vet triage console, and city-wide
                    analytics — all in one operations center.
                  </p>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-xs font-mono text-[#22C55E] bg-[#22C55E]/10 border border-[#22C55E]/20 px-2.5 py-1 rounded">DISPATCH</span>
                    <span className="text-xs font-mono text-[#7C3AED] bg-[#7C3AED]/10 border border-[#7C3AED]/20 px-2.5 py-1 rounded">VET TRIAGE</span>
                    <span className="text-xs font-mono text-[#06B6D4] bg-[#06B6D4]/10 border border-[#06B6D4]/20 px-2.5 py-1 rounded">ANALYTICS</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </main>

        <footer className="px-6 py-5 border-t border-[#2A2A3A] flex items-center justify-between">
          <span className="text-xs font-mono text-[#3A3A4A] tracking-widest">RESQ © 2025</span>
          <div className="flex items-center gap-4 text-xs font-mono text-[#3A3A4A]">
            <span>Mumbai</span>
            <span className="text-[#2A2A3A]">·</span>
            <span>India</span>
          </div>
        </footer>
      </div>
    </div>
  )
}
