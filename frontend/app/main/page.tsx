"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function MainPortalPage() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="min-h-screen bg-bg text-text-1 overflow-hidden">
      {/* Background layers — identical to landing */}
      <div className="absolute inset-0 dot-grid" />
      <div className="absolute inset-0 red-radial-gradient" />

      <div className={`relative z-10 flex flex-col min-h-screen transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}>

        {/* Navbar */}
        <nav className="h-[72px] flex items-center border-b border-[rgba(255,255,255,0.06)] bg-[rgba(7,10,16,0.92)] backdrop-blur-[24px]">
          <div className="max-w-[1280px] w-full mx-auto px-6 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-[10px]">
              <div className="w-9 h-9 rounded-full bg-bg-2 border border-red-border flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-red" style={{ color: "var(--red)" }}>
                  <path d="M12 2v8m0 4v8m-6-10h12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="font-display text-[22px] font-extrabold tracking-[-0.5px]" style={{ color: "var(--text1)" }}>
                RESQ
              </span>
            </Link>

            {/* Live indicator */}
            <div className="flex items-center gap-2 font-mono text-[11px] tracking-[1.5px] uppercase" style={{ color: "var(--text2)" }}>
              <span className="relative w-2 h-2">
                <span className="absolute inset-0 rounded-full animate-live-pulse" style={{ background: "var(--green)" }} />
              </span>
              <span style={{ color: "var(--green)" }}>LIVE</span>
              <span style={{ color: "var(--text3)" }}>·</span>
              <span>4 Active Rescues</span>
            </div>
          </div>
        </nav>

        {/* Main */}
        <main className="flex-1 flex flex-col items-center justify-center px-6 py-16">
          <div className="max-w-[680px] w-full mx-auto text-center">

            {/* Badge */}
            <div
              className={`inline-flex items-center gap-2 px-[14px] py-[6px] border rounded-pill w-fit mb-8 mx-auto transition-all duration-500 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
              style={{
                background: "var(--red-dim)",
                borderColor: "var(--red-border)",
                transitionDelay: "100ms",
              }}
            >
              <span className="relative w-2 h-2">
                <span className="absolute inset-0 rounded-full animate-live-pulse" style={{ background: "var(--red)" }} />
                <span className="absolute inset-0 rounded-full animate-pulse-ring opacity-60" style={{ background: "var(--red)" }} />
              </span>
              <span className="font-mono text-[11px] font-medium tracking-[1.5px] uppercase" style={{ color: "var(--text2)" }}>
                MUMBAI ANIMAL RESCUE NETWORK
              </span>
            </div>

            {/* Heading */}
            <div
              className={`transition-all duration-600 mb-4 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: "200ms" }}
            >
              <h1 className="text-display-xl" style={{ color: "var(--text1)" }}>
                Choose your{" "}
                <span style={{ color: "var(--red)", textShadow: "0 0 40px rgba(232,40,30,0.40)" }}>
                  portal.
                </span>
              </h1>
            </div>

            <p
              className={`text-body-xl mb-12 transition-all duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
              style={{ color: "var(--text2)", transitionDelay: "350ms" }}
            >
              Select how you want to access the RESQ platform.
            </p>

            {/* Portal Cards */}
            <div
              className={`grid grid-cols-1 md:grid-cols-2 gap-5 transition-all duration-500 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: "450ms" }}
            >
              {/* Citizen Card */}
              <Link href="/auth/citizen" className="group block text-left">
                <div
                  className="relative rounded-xl p-7 border transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: "var(--bg2)",
                    borderColor: "var(--border)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget
                    el.style.borderColor = "var(--red-border)"
                    el.style.boxShadow = "var(--shadow-red)"
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget
                    el.style.borderColor = "var(--border)"
                    el.style.boxShadow = "none"
                  }}
                >
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5 border transition-transform duration-300 group-hover:scale-110"
                    style={{ background: "var(--red-dim)", borderColor: "var(--red-border)" }}
                  >
                    📸
                  </div>

                  <div className="flex items-start justify-between mb-2">
                    <h2 className="font-display text-2xl font-bold" style={{ color: "var(--text1)" }}>
                      CITIZEN PORTAL
                    </h2>
                    <span
                      className="text-xl transition-colors duration-200 group-hover:translate-x-1 transition-transform"
                      style={{ color: "var(--text3)" }}
                    >
                      →
                    </span>
                  </div>

                  <p className="text-body-sm mb-6 leading-relaxed" style={{ color: "var(--text2)" }}>
                    Spotted an animal in distress? Report it in 20 seconds.
                    See how the rescue works — step by step.
                  </p>

                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className="font-mono text-[11px] font-medium px-2.5 py-1 rounded border"
                      style={{
                        color: "var(--red)",
                        background: "var(--red-dim)",
                        borderColor: "var(--red-border)",
                      }}
                    >
                      REPORT NOW
                    </span>
                    <span
                      className="font-mono text-[11px] font-medium px-2.5 py-1 rounded border"
                      style={{
                        color: "var(--orange)",
                        background: "rgba(245,158,11,0.10)",
                        borderColor: "rgba(245,158,11,0.25)",
                      }}
                    >
                      HOW IT WORKS
                    </span>
                  </div>
                </div>
              </Link>

              {/* NGO Card */}
              <Link href="/auth/ngo" className="group block text-left">
                <div
                  className="relative rounded-xl p-7 border transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: "var(--bg2)",
                    borderColor: "var(--border)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget
                    el.style.borderColor = "rgba(31,204,113,0.35)"
                    el.style.boxShadow = "var(--shadow-green)"
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget
                    el.style.borderColor = "var(--border)"
                    el.style.boxShadow = "none"
                  }}
                >
                  {/* Icon + live badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl border transition-transform duration-300 group-hover:scale-110"
                      style={{ background: "rgba(31,204,113,0.10)", borderColor: "rgba(31,204,113,0.25)" }}
                    >
                      🚨
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full animate-live-pulse" style={{ background: "var(--green)" }} />
                      <span className="font-mono text-[11px] font-medium tracking-[1.5px]" style={{ color: "var(--green)" }}>
                        LIVE
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start justify-between mb-2">
                    <h2 className="font-display text-2xl font-bold" style={{ color: "var(--text1)" }}>
                      NGO PORTAL
                    </h2>
                    <span
                      className="text-xl transition-transform duration-200 group-hover:translate-x-1"
                      style={{ color: "var(--text3)" }}
                    >
                      →
                    </span>
                  </div>

                  <p className="text-body-sm mb-6 leading-relaxed" style={{ color: "var(--text2)" }}>
                    Dispatcher dashboard, vet triage console, and city-wide
                    analytics — all in one operations center.
                  </p>

                  <div className="flex items-center gap-2 flex-wrap">
                    {[
                      { label: "DISPATCH", color: "var(--green)", bg: "rgba(31,204,113,0.10)", border: "rgba(31,204,113,0.25)" },
                      { label: "VET TRIAGE", color: "var(--purple)", bg: "rgba(168,85,247,0.10)", border: "rgba(168,85,247,0.25)" },
                      { label: "ANALYTICS", color: "var(--blue)", bg: "rgba(59,130,246,0.10)", border: "rgba(59,130,246,0.25)" },
                    ].map((tag) => (
                      <span
                        key={tag.label}
                        className="font-mono text-[11px] font-medium px-2.5 py-1 rounded border"
                        style={{ color: tag.color, background: tag.bg, borderColor: tag.border }}
                      >
                        {tag.label}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </div>

            {/* Back link */}
            <div
              className={`mt-10 transition-all duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
              style={{ transitionDelay: "600ms" }}
            >
              <Link
                href="/"
                className="font-mono text-[13px] transition-colors duration-200"
                style={{ color: "var(--text3)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text1)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text3)")}
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer
          className="px-6 py-5 border-t flex items-center justify-between font-mono text-[12px] tracking-widest"
          style={{ borderColor: "var(--border)", color: "var(--text3)" }}
        >
          <span>RESQ © 2025</span>
          <div className="flex items-center gap-4">
            <span>Mumbai</span>
            <span style={{ color: "var(--border)" }}>·</span>
            <span>India</span>
          </div>
        </footer>
      </div>
    </div>
  )
}
