"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import dynamic from "next/dynamic"
import { ReportModal } from "./report-modal"
import { RescueChain } from "./rescue-chain"

const MapComponent = dynamic(() => import("./map-component").then(mod => mod.MapComponent), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-[#12121A] animate-pulse flex items-center justify-center">
      <span className="text-[#6B7280] font-mono text-sm">Loading map...</span>
    </div>
  )
})

// Mock rescue data
const rescueMarkers = [
  { id: 1, lat: 19.0760, lng: 72.8777, status: "critical", species: "Dog", location: "Andheri East" },
  { id: 2, lat: 19.0176, lng: 72.8562, status: "urgent", species: "Cat", location: "Bandra West" },
  { id: 3, lat: 19.1136, lng: 72.8697, status: "urgent", species: "Bird", location: "Goregaon" },
  { id: 4, lat: 19.0596, lng: 72.8295, status: "stable", species: "Dog", location: "Juhu" },
]

const rescuerPath = [
  { lat: 19.0500, lng: 72.8600 },
  { lat: 19.0550, lng: 72.8650 },
  { lat: 19.0600, lng: 72.8700 },
  { lat: 19.0650, lng: 72.8750 },
  { lat: 19.0700, lng: 72.8770 },
]

export function CitizenView() {
  const [showReportModal, setShowReportModal] = useState(false)
  const [showRescueChain, setShowRescueChain] = useState(false)
  const [rescueChainStep, setRescueChainStep] = useState(0)
  const [newRescuerPosition, setNewRescuerPosition] = useState<{ lat: number; lng: number } | null>(null)

  // Auto-advance rescue chain
  useEffect(() => {
    if (showRescueChain && rescueChainStep < 5) {
      const timer = setInterval(() => {
        setRescueChainStep(prev => Math.min(prev + 1, 5))
      }, 8000)
      return () => clearInterval(timer)
    }
  }, [showRescueChain, rescueChainStep])

  const handleReportSubmit = useCallback(() => {
    // After VitaScore animation completes, show the rescue chain
    setNewRescuerPosition({ lat: 19.0400, lng: 72.8500 })
    setShowRescueChain(true)
    setRescueChainStep(2) // Start at "En Route"
  }, [])

  return (
    <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-73px)] flex flex-col relative">
      {/* Top Section - 45% height on desktop */}
      <div className="flex-shrink-0 h-[40%] md:h-[45%] px-4 md:px-8 py-6 md:py-8 flex flex-col justify-center relative z-10">
        <div className="max-w-2xl">
          <h1 
            className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#F0F4F8] mb-4 animate-fade-up"
            style={{ fontFamily: 'var(--font-barlow), Barlow Condensed, sans-serif' }}
          >
            SPOT AN ANIMAL IN DISTRESS?
          </h1>
          <p 
            className="text-lg md:text-xl text-[#6B7280] mb-6 md:mb-8 animate-fade-up"
            style={{ animationDelay: '100ms' }}
          >
            Report in <span className="text-[#F5A623] font-semibold">20 seconds</span>. We dispatch in <span className="text-[#22C55E] font-semibold">10</span>.
          </p>
          
          <button
            onClick={() => setShowReportModal(true)}
            className="group relative w-full md:w-auto px-8 py-4 bg-[#D72638] hover:bg-[#e53e4f] text-white font-bold text-lg tracking-wide rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.97] animate-fade-up shadow-lg shadow-[#D72638]/20"
            style={{ 
              fontFamily: 'var(--font-barlow), Barlow Condensed, sans-serif',
              animationDelay: '200ms'
            }}
          >
            <span className="flex items-center justify-center gap-3">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              REPORT NOW — TAP TO BEGIN
            </span>
            {/* Button glow effect */}
            <div className="absolute inset-0 rounded-lg bg-[#D72638] opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
          </button>
        </div>

        {/* Tagline */}
        <p 
          className="absolute bottom-4 right-4 md:right-8 text-sm font-mono text-[#6B7280] tracking-widest animate-fade-up"
          style={{ animationDelay: '300ms' }}
        >
          EVERY SECOND IS A LIFE
        </p>
      </div>

      {/* Map Section - 55% height */}
      <div className="flex-1 relative">
        <MapComponent 
          markers={rescueMarkers} 
          rescuerPath={rescuerPath}
          newRescuerPosition={newRescuerPosition}
        />
        
        {/* Vignette overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0A0A0F] via-transparent to-transparent" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#0A0A0F]/50 via-transparent to-transparent" />
      </div>

      {/* Rescue Chain */}
      {showRescueChain && (
        <RescueChain currentStep={rescueChainStep} />
      )}

      {/* Report Modal */}
      <ReportModal 
        isOpen={showReportModal} 
        onClose={() => setShowReportModal(false)}
        onSubmitComplete={handleReportSubmit}
      />
    </div>
  )
}
