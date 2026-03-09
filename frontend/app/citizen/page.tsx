"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Logo } from "@/components/resq/logo"
import { CitizenView } from "@/components/resq/citizen-view"

const steps = [
  {
    number: "01",
    icon: "📍",
    title: "SPOT & LOCATE",
    color: "#F5A623",
    desc: "Notice an animal in distress? Note your precise location — street name, landmark, or drop a pin on the map.",
    tip: "Even a rough location helps. Rescuers triangulate fast.",
  },
  {
    number: "02",
    icon: "📸",
    title: "TAP REPORT NOW",
    color: "#D72638",
    desc: "Hit the big red button. Select the animal type, take or upload a photo, and briefly describe the condition.",
    tip: "Takes under 20 seconds. No account needed.",
  },
  {
    number: "03",
    icon: "🤖",
    title: "VITASCORE AI ASSESSES",
    color: "#7C3AED",
    desc: "Our AI model instantly scores injury severity (0–100) from your photo and description to prioritize dispatch.",
    tip: "Higher score = more critical. Dispatchers see this immediately.",
  },
  {
    number: "04",
    icon: "🚨",
    title: "RESCUER DISPATCHED",
    color: "#22C55E",
    desc: "The nearest trained NGO volunteer is alerted within 10 seconds. You'll see their live location on the map.",
    tip: "Average dispatch time: 3.8 minutes across Mumbai.",
  },
  {
    number: "05",
    icon: "💚",
    title: "TRACK & CLOSE",
    color: "#06B6D4",
    desc: "Follow the rescue chain — from En Route → On Scene → At Shelter → Rehabilitated. You saved a life.",
    tip: "Every report gets a unique rescue ID you can bookmark.",
  },
]

const faqs = [
  {
    q: "Do I need to create an account?",
    a: "No. Anyone can report instantly, no sign-up required. Your location and photo are all that's needed.",
  },
  {
    q: "What if I can't upload a photo?",
    a: "Photos are optional but help the VitaScore AI. A clear description of the animal's condition is enough to dispatch.",
  },
  {
    q: "What animals can I report?",
    a: "Dogs, cats, birds, cattle, and any other animal in distress. Our rescuers handle all species.",
  },
  {
    q: "What happens after I report?",
    a: "You receive a live rescue chain showing each step from dispatch to rehabilitation. You can share the link with others.",
  },
  {
    q: "Is RESQ available 24/7?",
    a: "Yes. Our dispatch system is always on. NGO partner availability varies by city — Mumbai has 24/7 coverage.",
  },
]

export default function CitizenPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeSection, setActiveSection] = useState<"guide" | "report">("guide")
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F0F4F8] overflow-x-hidden">
      {/* Grain + bg pattern */}
      <div className="grain-overlay" />
      <div
        className="fixed inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className={`relative z-10 transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        {/* Header */}
        <header className="flex items-center justify-between px-4 md:px-8 py-4 border-b border-[#2A2A3A] bg-[#0A0A0F]/90 backdrop-blur-sm sticky top-0 z-50">
          <Logo compact />

          {/* Section toggle */}
          <div className="flex items-center gap-1 bg-[#12121A] border border-[#2A2A3A] rounded-lg p-1">
            <button
              onClick={() => setActiveSection("guide")}
              className={`px-4 py-1.5 text-xs font-semibold tracking-wider rounded-md transition-all ${
                activeSection === "guide"
                  ? "bg-[#D72638] text-white shadow-lg shadow-[#D72638]/20"
                  : "text-[#6B7280] hover:text-[#F0F4F8]"
              }`}
              style={{ fontFamily: "var(--font-barlow), Barlow Condensed, sans-serif" }}
            >
              HOW TO REPORT
            </button>
            <button
              onClick={() => setActiveSection("report")}
              className={`px-4 py-1.5 text-xs font-semibold tracking-wider rounded-md transition-all ${
                activeSection === "report"
                  ? "bg-[#D72638] text-white shadow-lg shadow-[#D72638]/20"
                  : "text-[#6B7280] hover:text-[#F0F4F8]"
              }`}
              style={{ fontFamily: "var(--font-barlow), Barlow Condensed, sans-serif" }}
            >
              REPORT NOW
            </button>
          </div>

          <Link
            href="/portal"
            className="text-xs font-mono text-[#6B7280] hover:text-[#F0F4F8] transition-colors border border-[#2A2A3A] hover:border-[#4A4A5A] px-3 py-1.5 rounded hidden md:block"
          >
            ← HOME
          </Link>
        </header>

        {/* ── GUIDE SECTION ── */}
        {activeSection === "guide" && (
          <div>
            {/* Hero */}
            <section className="px-4 md:px-12 lg:px-20 py-14 md:py-20 border-b border-[#2A2A3A]">
              <div className="max-w-4xl">
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#D72638]/10 border border-[#D72638]/30 rounded-full mb-6 animate-fade-up"
                  style={{ animationDelay: "100ms" }}
                >
                  <span className="w-2 h-2 bg-[#D72638] rounded-full animate-pulse" />
                  <span className="text-xs font-mono text-[#D72638] tracking-widest">CITIZEN GUIDE</span>
                </div>

                <h1
                  className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#F0F4F8] mb-6 animate-fade-up leading-[0.95]"
                  style={{
                    fontFamily: "var(--font-bebas), Bebas Neue, sans-serif",
                    animationDelay: "150ms",
                  }}
                >
                  HOW TO SAVE
                  <br />
                  <span className="text-[#D72638]">AN ANIMAL'S LIFE</span>
                  <br />
                  IN 5 STEPS
                </h1>

                <p
                  className="text-lg md:text-xl text-[#9CA3AF] max-w-2xl animate-fade-up"
                  style={{ animationDelay: "200ms" }}
                >
                  You don't need training. You just need 20 seconds and a phone. 
                  Here's exactly what happens when you hit the Report button.
                </p>

                <div
                  className="flex items-center gap-6 mt-8 animate-fade-up"
                  style={{ animationDelay: "250ms" }}
                >
                  <div className="text-center">
                    <div
                      className="text-3xl font-bold text-[#F5A623]"
                      style={{ fontFamily: "var(--font-bebas), Bebas Neue, sans-serif" }}
                    >
                      20s
                    </div>
                    <div className="text-xs font-mono text-[#6B7280] tracking-wide">TO REPORT</div>
                  </div>
                  <div className="w-px h-10 bg-[#2A2A3A]" />
                  <div className="text-center">
                    <div
                      className="text-3xl font-bold text-[#22C55E]"
                      style={{ fontFamily: "var(--font-bebas), Bebas Neue, sans-serif" }}
                    >
                      10s
                    </div>
                    <div className="text-xs font-mono text-[#6B7280] tracking-wide">TO DISPATCH</div>
                  </div>
                  <div className="w-px h-10 bg-[#2A2A3A]" />
                  <div className="text-center">
                    <div
                      className="text-3xl font-bold text-[#D72638]"
                      style={{ fontFamily: "var(--font-bebas), Bebas Neue, sans-serif" }}
                    >
                      24/7
                    </div>
                    <div className="text-xs font-mono text-[#6B7280] tracking-wide">ALWAYS ON</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Steps */}
            <section className="px-4 md:px-12 lg:px-20 py-16 border-b border-[#2A2A3A]">
              <h2
                className="text-2xl md:text-3xl font-bold tracking-widest text-[#6B7280] mb-12"
                style={{ fontFamily: "var(--font-barlow), Barlow Condensed, sans-serif" }}
              >
                THE RESCUE CHAIN
              </h2>

              <div className="relative">
                {/* Vertical connector line */}
                <div className="hidden md:block absolute left-[2.75rem] top-8 bottom-8 w-px bg-gradient-to-b from-[#F5A623] via-[#D72638] to-[#06B6D4] opacity-30" />

                <div className="space-y-6">
                  {steps.map((step, i) => (
                    <div
                      key={step.number}
                      className="relative flex gap-6 md:gap-8 group animate-fade-up"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      {/* Step number circle */}
                      <div
                        className="relative flex-shrink-0 w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                        style={{
                          borderColor: step.color,
                          backgroundColor: `${step.color}15`,
                          boxShadow: `0 0 20px ${step.color}20`,
                        }}
                      >
                        <span className="text-2xl">{step.icon}</span>
                      </div>

                      {/* Content */}
                      <div
                        className="flex-1 bg-[#12121A] border border-[#2A2A3A] rounded-xl p-5 md:p-6 transition-all duration-300 group-hover:border-opacity-60"
                        style={{ borderColor: `${step.color}30` } as React.CSSProperties}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <span
                              className="text-xs font-mono"
                              style={{ color: step.color }}
                            >
                              STEP {step.number}
                            </span>
                            <h3
                              className="text-lg md:text-xl font-bold tracking-wide"
                              style={{
                                fontFamily: "var(--font-barlow), Barlow Condensed, sans-serif",
                                color: step.color,
                              }}
                            >
                              {step.title}
                            </h3>
                          </div>
                        </div>
                        <p className="text-[#9CA3AF] text-sm md:text-base leading-relaxed mb-3">{step.desc}</p>
                        <div className="flex items-start gap-2">
                          <span className="text-xs mt-0.5">💡</span>
                          <p className="text-xs font-mono text-[#6B7280]">{step.tip}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="px-4 md:px-12 lg:px-20 py-16 border-b border-[#2A2A3A]">
              <div className="max-w-2xl mx-auto text-center">
                <p className="text-sm font-mono text-[#6B7280] tracking-widest mb-4">READY TO HELP?</p>
                <h2
                  className="text-4xl md:text-6xl font-bold mb-6"
                  style={{ fontFamily: "var(--font-bebas), Bebas Neue, sans-serif" }}
                >
                  EVERY SECOND IS A <span className="text-[#D72638]">LIFE</span>
                </h2>
                <button
                  onClick={() => setActiveSection("report")}
                  className="group relative inline-flex items-center gap-3 px-10 py-4 bg-[#D72638] hover:bg-[#e53e4f] text-white font-bold text-xl tracking-wide rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.97] shadow-xl shadow-[#D72638]/25"
                  style={{ fontFamily: "var(--font-barlow), Barlow Condensed, sans-serif" }}
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  OPEN REPORT FORM
                  <div className="absolute inset-0 rounded-lg bg-[#D72638] opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
                </button>
              </div>
            </section>

            {/* FAQ */}
            <section className="px-4 md:px-12 lg:px-20 py-16">
              <h2
                className="text-2xl md:text-3xl font-bold tracking-widest text-[#6B7280] mb-10"
                style={{ fontFamily: "var(--font-barlow), Barlow Condensed, sans-serif" }}
              >
                COMMON QUESTIONS
              </h2>

              <div className="max-w-3xl space-y-3">
                {faqs.map((faq, i) => (
                  <div
                    key={i}
                    className="border border-[#2A2A3A] rounded-xl overflow-hidden transition-all duration-200 hover:border-[#3A3A4A]"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between px-6 py-4 text-left"
                    >
                      <span
                        className="font-semibold text-[#F0F4F8] text-sm md:text-base"
                        style={{ fontFamily: "var(--font-barlow), Barlow Condensed, sans-serif" }}
                      >
                        {faq.q}
                      </span>
                      <span
                        className={`text-[#D72638] text-xl font-light ml-4 flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}
                      >
                        +
                      </span>
                    </button>
                    {openFaq === i && (
                      <div className="px-6 pb-5">
                        <p className="text-[#9CA3AF] text-sm leading-relaxed">{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ── REPORT SECTION (embedded CitizenView) ── */}
        {activeSection === "report" && (
          <div>
            {/* Small breadcrumb hint */}
            <div className="px-4 md:px-8 py-3 border-b border-[#2A2A3A] bg-[#0A0A0F]">
              <button
                onClick={() => setActiveSection("guide")}
                className="flex items-center gap-2 text-xs font-mono text-[#6B7280] hover:text-[#F0F4F8] transition-colors"
              >
                ← BACK TO HOW-TO GUIDE
              </button>
            </div>
            <CitizenView />
          </div>
        )}
      </div>
    </div>
  )
}
