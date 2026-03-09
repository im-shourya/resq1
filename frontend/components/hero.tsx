"use client"

import { useEffect, useState } from "react"

export function Hero({ loginMode = false }: { loginMode?: boolean }) {
  const [loaded, setLoaded] = useState(false)
  const [vitaFill, setVitaFill] = useState(0)
  const [dispatchStep, setDispatchStep] = useState(0)

  useEffect(() => {
    setLoaded(true)
    // Animate VitaScore after card appears
    const vitaTimer = setTimeout(() => {
      setVitaFill(87)
    }, 1200)
    
    // Animate dispatch steps
    const step1 = setTimeout(() => setDispatchStep(1), 1800)
    const step2 = setTimeout(() => setDispatchStep(2), 2600)
    const step3 = setTimeout(() => setDispatchStep(3), 3400)

    return () => {
      clearTimeout(vitaTimer)
      clearTimeout(step1)
      clearTimeout(step2)
      clearTimeout(step3)
    }
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden bg-bg pt-[72px]">
      {/* Background Layers */}
      <div className="absolute inset-0 dot-grid" />
      <div className="absolute inset-0 red-radial-gradient" />
      
      {/* Map background (right side) */}
      <div 
        className="absolute top-0 right-0 w-1/2 h-full opacity-[0.22] pointer-events-none hidden lg:block"
        style={{
          background: `
            linear-gradient(to right, var(--bg) 0%, transparent 40%),
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect fill='%230C1018' width='400' height='400'/%3E%3Cpath d='M50 50 L150 80 L200 150 L180 250 L100 280 L50 200 Z' fill='none' stroke='%23232B3A' stroke-width='1'/%3E%3Cpath d='M200 100 L350 120 L380 220 L300 300 L220 260 L200 150 Z' fill='none' stroke='%23232B3A' stroke-width='1'/%3E%3Ccircle cx='120' cy='180' r='4' fill='%23E8281E' opacity='0.6'/%3E%3Ccircle cx='280' cy='200' r='3' fill='%23F59E0B' opacity='0.5'/%3E%3Ccircle cx='320' cy='150' r='3' fill='%231FCC71' opacity='0.5'/%3E%3C/svg%3E")
          `,
          backgroundSize: 'cover',
        }}
      />
      <div className="absolute top-0 left-0 w-[65%] h-full bg-gradient-to-r from-bg via-bg to-transparent z-[1] hidden lg:block" />

      {/* Content */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 py-s9 lg:py-s10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[calc(100vh-72px)]">
          
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            {/* Live Badge */}
            <div 
              className={`inline-flex items-center gap-2 px-[14px] py-[6px] bg-red-dim border border-red-border rounded-pill w-fit transition-all duration-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`}
              style={{ transitionDelay: '300ms' }}
            >
              <span className="relative w-2 h-2">
                <span className="absolute inset-0 bg-red rounded-full animate-live-pulse" />
                <span className="absolute inset-0 bg-red rounded-full animate-pulse-ring opacity-60" />
              </span>
              <span className="font-mono text-[11px] font-medium tracking-[1.5px] uppercase text-text-2">
                LIVE · 14 ACTIVE RESCUES
              </span>
            </div>

            {/* Hero Headline */}
            <div 
              className={`transition-all duration-600 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '500ms' }}
            >
              <h1 className="text-display-xl text-text-1">
                <span className="block">When seconds</span>
                <span className="block">decide fate </span>
                <span className="block text-red" style={{ textShadow: '0 0 40px rgba(232, 40, 30, 0.40)' }}>
                  RESQ acts.
                </span>
              </h1>
            </div>

            {/* Subtext */}
            <p 
              className={`text-body-xl text-text-2 max-w-[440px] transition-all duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: '700ms' }}
            >
              {"India's first real-time AI animal emergency coordination grid."}
            </p>

            {/* CTA Buttons */}
            <div 
              className={`flex flex-wrap items-center gap-4 transition-all duration-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: '900ms' }}
            >
              {loginMode ? (
                <a
                  href="/main"
                  className="btn-hover inline-flex items-center gap-3 px-9 py-4 bg-red text-white font-display text-base font-bold rounded-pill hover:brightness-[1.12] hover:shadow-red"
                >
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  Login
                  <span className="opacity-70">→</span>
                </a>
              ) : (
                <>
                  <button className="btn-hover px-8 py-4 bg-red text-white font-display text-base font-bold rounded-pill hover:brightness-[1.12] hover:shadow-red">
                    Report an Animal
                  </button>
                  <button className="btn-hover px-8 py-4 border-[1.5px] border-[rgba(255,255,255,0.14)] text-text-2 font-sans text-base font-medium rounded-pill hover:border-[rgba(232,40,30,0.5)] hover:text-text-1 transition-colors duration-200">
                    {"See How It Works →"}
                  </button>
                </>
              )}
            </div>

            {/* Trust Bar */}
            <div 
              className={`flex flex-wrap items-center gap-4 text-text-3 text-body-sm transition-all duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: '1100ms' }}
            >
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-status-green" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                No app needed
              </span>
              <span className="text-text-3">·</span>
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-status-green" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                GPS auto-detected
              </span>
              <span className="text-text-3">·</span>
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-status-green" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                Avg 3.2 min response
              </span>
            </div>
          </div>

          {/* Right Column - Floating Case Card */}
          <div 
            className={`flex justify-center lg:justify-end transition-all duration-700 ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}
            style={{ transitionDelay: '800ms' }}
          >
            <div className="animate-float w-full max-w-[380px] bg-bg-2 rounded-xl border border-[rgba(255,255,255,0.08)] shadow-red overflow-hidden">
              {/* Card Header */}
              <div className="p-5 pb-4 flex items-center justify-between border-b border-[rgba(255,255,255,0.06)]">
                <span className="flex items-center gap-2 px-2.5 py-1 bg-red-dim rounded-md">
                  <span className="w-2 h-2 bg-red rounded-full animate-live-pulse" />
                  <span className="font-mono text-[11px] font-medium text-red tracking-wide">CRITICAL</span>
                </span>
                <div className="flex items-center gap-3 text-text-3 font-mono text-[13px]">
                  <span>RQ-4821</span>
                  <span>2m ago</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-4">
                {/* Animal Info */}
                <div className="space-y-2">
                  <p className="text-body-md text-text-1">
                    Injured dog — suspected fracture, bleeding
                  </p>
                  <p className="text-body-sm text-text-2 flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    Anna Nagar, Chennai, Tamil Nadu
                  </p>
                </div>

                {/* VitaScore Section */}
                <div className="pt-3 border-t border-[rgba(255,255,255,0.06)]">
                  <p className="text-label mb-3">{"VitaScore™ Analysis"}</p>
                  <div className="space-y-2">
                    <div className="h-[6px] bg-bg-4 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-1200 ease-out"
                        style={{ 
                          width: `${vitaFill}%`,
                          background: 'linear-gradient(to right, #1FCC71, #F59E0B, #E8281E)'
                        }}
                      />
                    </div>
                    <p className="font-mono text-xl font-medium text-red">
                      {vitaFill} / 100
                    </p>
                  </div>
                </div>

                {/* SmartDispatch Section */}
                <div className="pt-3 border-t border-[rgba(255,255,255,0.06)]">
                  <p className="text-label mb-3">{"SmartDispatch™"}</p>
                  <div className="space-y-2 font-mono text-[13px]">
                    <p className={`text-text-2 transition-opacity duration-300 ${dispatchStep >= 1 ? 'opacity-100' : 'opacity-0'}`}>
                      {"⚡ Analyzing nearby NGOs..."}
                    </p>
                    <p className={`text-status-green flex items-center gap-2 transition-opacity duration-300 ${dispatchStep >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                      <span className="w-1.5 h-1.5 bg-status-green rounded-full" />
                      {"→ NGO Prani matched — 1.2km"}
                    </p>
                    <p className={`text-text-1 transition-opacity duration-300 ${dispatchStep >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                      {"🚗 ETA: 4 minutes"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
