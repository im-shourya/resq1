"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

const MapComponent = dynamic(() => import("./map-component").then(mod => mod.MapComponent), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-[#12121A] animate-pulse flex items-center justify-center">
      <span className="text-[#6B7280] font-mono text-sm">Loading map...</span>
    </div>
  )
})

// Mock case data
const cases = [
  {
    id: 1,
    species: "Dog",
    speciesIcon: "🐕",
    location: "Andheri East, Near Metro Station",
    time: "3 min ago",
    vitaScore: 87,
    status: "critical" as const,
    photo: null,
    rescuer: { name: "Ravi Kumar", initials: "RK", lat: 19.0720, lng: 72.8750 },
    timeline: [
      { step: "Reported", time: "14:23:45", done: true },
      { step: "Dispatched", time: "14:24:12", done: true },
      { step: "En Route", time: "14:24:30", done: true },
      { step: "On Scene", time: null, done: false },
    ]
  },
  {
    id: 2,
    species: "Cat",
    speciesIcon: "🐈",
    location: "Bandra West, Hill Road",
    time: "8 min ago",
    vitaScore: 54,
    status: "urgent" as const,
    photo: null,
    rescuer: { name: "Priya Sharma", initials: "PS", lat: 19.0500, lng: 72.8400 },
    timeline: [
      { step: "Reported", time: "14:18:22", done: true },
      { step: "Dispatched", time: "14:19:05", done: true },
      { step: "En Route", time: null, done: false },
    ]
  },
  {
    id: 3,
    species: "Bird",
    speciesIcon: "🐦",
    location: "Goregaon, Film City Road",
    time: "15 min ago",
    vitaScore: 42,
    status: "urgent" as const,
    photo: null,
    rescuer: null,
    timeline: [
      { step: "Reported", time: "14:11:33", done: true },
      { step: "Dispatched", time: null, done: false },
    ]
  },
  {
    id: 4,
    species: "Dog",
    speciesIcon: "🐕",
    location: "Juhu Beach, Entrance Gate 3",
    time: "22 min ago",
    vitaScore: 28,
    status: "stable" as const,
    photo: null,
    rescuer: { name: "Amit Patel", initials: "AP", lat: 19.0980, lng: 72.8300 },
    timeline: [
      { step: "Reported", time: "14:04:17", done: true },
      { step: "Dispatched", time: "14:05:02", done: true },
      { step: "En Route", time: "14:05:30", done: true },
      { step: "On Scene", time: "14:12:45", done: true },
      { step: "At Shelter", time: null, done: false },
    ]
  },
]

const rescueMarkers = [
  { id: 1, lat: 19.0760, lng: 72.8777, status: "critical" as const, species: "Dog", location: "Andheri East" },
  { id: 2, lat: 19.0176, lng: 72.8562, status: "urgent" as const, species: "Cat", location: "Bandra West" },
  { id: 3, lat: 19.1136, lng: 72.8697, status: "urgent" as const, species: "Bird", location: "Goregaon" },
  { id: 4, lat: 19.0596, lng: 72.8295, status: "stable" as const, species: "Dog", location: "Juhu" },
]

const statusColors = {
  critical: "#D72638",
  urgent: "#F5A623",
  stable: "#22C55E",
}

export function DispatcherDashboard() {
  const [selectedCase, setSelectedCase] = useState(cases[0])
  const [caseCount, setCaseCount] = useState(4)
  const [rescuerCoords, setRescuerCoords] = useState({ lat: 19.0720, lng: 72.8750 })

  // Simulate live coordinate updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRescuerCoords(prev => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001,
      }))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-73px)]">
      {/* Top Bar */}
      <div className="border-b border-[#2A2A3A] px-4 md:px-6 py-3 flex items-center justify-between bg-[#0A0A0F]/80">
        <div className="flex items-center gap-4">
          <h2 
            className="text-lg font-bold text-[#F0F4F8] tracking-wide"
            style={{ fontFamily: 'var(--font-barlow), Barlow Condensed, sans-serif' }}
          >
            NGO COMMAND · Mumbai Zone 3
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-3 text-xs font-mono text-[#6B7280]">
            <span className="px-2 py-1 bg-[#22C55E]/10 text-[#22C55E] rounded">Today: 12 Rescues</span>
            <span className="px-2 py-1 bg-[#3B82F6]/10 text-[#3B82F6] rounded">Avg Response: 4.2 min</span>
            <span className="px-2 py-1 bg-[#F5A623]/10 text-[#F5A623] rounded">3 Vets Online</span>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#D72638]/20 flex items-center justify-center text-[#D72638] font-bold text-sm">
            PFA
          </div>
        </div>
      </div>

      {/* Main Content - 3 Column Layout */}
      <div className="flex flex-col md:flex-row h-[calc(100vh-130px)] md:h-[calc(100vh-137px)]">
        {/* Left Column - Dispatch Queue */}
        <div className="w-full md:w-[35%] border-b md:border-b-0 md:border-r border-[#2A2A3A] overflow-auto">
          <div className="p-4 border-b border-[#2A2A3A] flex items-center justify-between sticky top-0 bg-[#0A0A0F] z-10">
            <h3 
              className="text-sm font-bold text-[#6B7280] uppercase tracking-widest"
              style={{ fontFamily: 'var(--font-barlow), Barlow Condensed, sans-serif' }}
            >
              Active Cases
            </h3>
            <span 
              className="px-2 py-1 bg-[#D72638] text-white text-xs font-bold rounded animate-pulse-glow"
              key={caseCount}
            >
              {caseCount}
            </span>
          </div>
          
          <div className="p-3 space-y-3">
            {cases.map((c, index) => (
              <button
                key={c.id}
                onClick={() => setSelectedCase(c)}
                className={`relative w-full text-left p-4 rounded-lg border transition-all duration-200 hover:-translate-y-0.5 ${
                  selectedCase.id === c.id 
                    ? "border-[#D72638] bg-[#D72638]/5" 
                    : "border-[#2A2A3A] bg-[#12121A] hover:border-[#6B7280]"
                } ${c.status === "critical" ? "animate-shimmer" : ""}`}
                style={{
                  borderLeftWidth: "4px",
                  borderLeftColor: statusColors[c.status],
                }}
              >
                {/* Critical glow */}
                {c.status === "critical" && (
                  <div 
                    className="absolute inset-0 rounded-lg pointer-events-none"
                    style={{
                      boxShadow: `inset 0 0 20px ${statusColors.critical}20`,
                    }}
                  />
                )}
                
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{c.speciesIcon}</span>
                    <span className="text-sm font-medium text-[#F0F4F8]">{c.species}</span>
                  </div>
                  <span 
                    className="px-2 py-0.5 rounded text-xs font-bold font-mono"
                    style={{ 
                      backgroundColor: `${statusColors[c.status]}20`,
                      color: statusColors[c.status],
                      boxShadow: c.status === "critical" ? `0 0 10px ${statusColors.critical}40` : undefined,
                    }}
                  >
                    {c.vitaScore} {c.status.toUpperCase()}
                  </span>
                </div>
                
                <p className="text-xs text-[#6B7280] mb-3 line-clamp-1">{c.location}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#6B7280] font-mono">{c.time}</span>
                  <div className="flex gap-2">
                    {!c.rescuer && (
                      <span className="px-2 py-1 bg-[#D72638] text-white text-xs font-bold rounded hover:bg-[#e53e4f] transition-colors">
                        DISPATCH
                      </span>
                    )}
                    <span className="px-2 py-1 bg-[#2A2A3A] text-[#F0F4F8] text-xs font-medium rounded hover:bg-[#3A3A4A] transition-colors">
                      VIEW
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Middle Column - Map */}
        <div className="hidden md:block w-[40%] relative">
          <MapComponent 
            markers={rescueMarkers}
            fullHeight
          />
        </div>

        {/* Right Column - Case Detail */}
        <div className="flex-1 md:w-[25%] overflow-auto p-4 border-l border-[#2A2A3A]">
          {selectedCase && (
            <div className="space-y-4">
              {/* Photo placeholder */}
              <div className="aspect-video rounded-lg bg-[#12121A] border border-[#2A2A3A] flex items-center justify-center overflow-hidden">
                <div className="text-center">
                  <span className="text-4xl mb-2 block">{selectedCase.speciesIcon}</span>
                  <span className="text-xs text-[#6B7280] font-mono">Photo Evidence</span>
                </div>
              </div>

              {/* VitaScore Ring */}
              <div className="flex items-center gap-4 p-4 bg-[#12121A] rounded-lg border border-[#2A2A3A]">
                <div className="relative w-16 h-16">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#2A2A3A" strokeWidth="8" />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke={statusColors[selectedCase.status]}
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${(selectedCase.vitaScore / 100) * 251} 251`}
                    />
                  </svg>
                  <span 
                    className="absolute inset-0 flex items-center justify-center text-lg font-bold font-mono"
                    style={{ color: statusColors[selectedCase.status] }}
                  >
                    {selectedCase.vitaScore}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-[#F0F4F8]">{selectedCase.species}</p>
                  <p className="text-xs text-[#6B7280]">{selectedCase.location}</p>
                </div>
              </div>

              {/* Timeline */}
              <div className="p-4 bg-[#12121A] rounded-lg border border-[#2A2A3A]">
                <h4 
                  className="text-xs font-bold text-[#6B7280] uppercase tracking-widest mb-3"
                  style={{ fontFamily: 'var(--font-barlow), Barlow Condensed, sans-serif' }}
                >
                  Rescue Timeline
                </h4>
                <div className="space-y-3">
                  {selectedCase.timeline.map((t, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        t.done ? "bg-[#22C55E]/20" : "bg-[#2A2A3A]"
                      }`}>
                        {t.done ? (
                          <svg className="w-3 h-3 text-[#22C55E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-[#6B7280]" />
                        )}
                      </div>
                      <div className="flex-1">
                        <span className="text-sm text-[#F0F4F8]">{t.step}</span>
                      </div>
                      {t.time && (
                        <span className="text-xs font-mono text-[#6B7280]">{t.time}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Rescuer Info */}
              {selectedCase.rescuer && (
                <div className="p-4 bg-[#12121A] rounded-lg border border-[#2A2A3A]">
                  <h4 
                    className="text-xs font-bold text-[#6B7280] uppercase tracking-widest mb-3"
                    style={{ fontFamily: 'var(--font-barlow), Barlow Condensed, sans-serif' }}
                  >
                    Assigned Rescuer
                  </h4>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#3B82F6]/20 flex items-center justify-center text-[#3B82F6] font-bold text-sm">
                      {selectedCase.rescuer.initials}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#F0F4F8]">{selectedCase.rescuer.name}</p>
                      <p className="text-xs font-mono text-[#6B7280]">
                        {rescuerCoords.lat.toFixed(4)}, {rescuerCoords.lng.toFixed(4)}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <button className="w-full py-3 bg-[#3B82F6] hover:bg-[#4B92FF] text-white font-bold rounded-lg transition-all hover:scale-[1.02] active:scale-[0.97]"
                style={{ fontFamily: 'var(--font-barlow), Barlow Condensed, sans-serif' }}
              >
                ASSIGN VET
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
