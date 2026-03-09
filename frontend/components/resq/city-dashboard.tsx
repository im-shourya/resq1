"use client"

import { useState, useEffect, useRef } from "react"
import dynamic from "next/dynamic"

const MapComponent = dynamic(() => import("./map-component").then(mod => mod.MapComponent), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-[#12121A] animate-pulse flex items-center justify-center">
      <span className="text-[#6B7280] font-mono text-sm">Loading map...</span>
    </div>
  )
})

const stats = [
  { label: "Total Rescues This Month", value: 1247, trend: [40, 55, 45, 60, 50, 75, 80, 95, 90, 100] },
  { label: "Average Dispatch Time", value: 3.8, unit: "min", trend: [60, 55, 50, 45, 40, 38, 35, 38, 40, 38] },
  { label: "Animals Rehabilitated", value: 891, trend: [30, 40, 45, 50, 60, 65, 70, 80, 85, 90] },
  { label: "Active NGO Partners", value: 23, trend: [15, 16, 17, 18, 19, 20, 21, 22, 22, 23] },
]

const ngos = [
  { name: "PFA Mumbai", rescues: 342, avgResponse: "3.2 min", successRate: 94, rating: 4.9, topPerformer: true },
  { name: "Jeev Daya Trust", rescues: 287, avgResponse: "4.1 min", successRate: 89, rating: 4.7, topPerformer: false },
  { name: "SPCA Maharashtra", rescues: 256, avgResponse: "3.8 min", successRate: 91, rating: 4.8, topPerformer: false },
  { name: "Animal Aid Unlimited", rescues: 198, avgResponse: "4.5 min", successRate: 87, rating: 4.5, topPerformer: false },
  { name: "Blue Cross India", rescues: 164, avgResponse: "5.2 min", successRate: 85, rating: 4.3, topPerformer: false },
]

const recentRescues = [
  { species: "Dog", speciesIcon: "🐕", location: "Andheri East", vitaScore: 72, dispatchTime: "3.1 min", status: "At Shelter", timeAgo: "2 min ago" },
  { species: "Cat", speciesIcon: "🐈", location: "Bandra West", vitaScore: 45, dispatchTime: "2.8 min", status: "En Route", timeAgo: "5 min ago" },
  { species: "Bird", speciesIcon: "🐦", location: "Powai Lake", vitaScore: 38, dispatchTime: "4.2 min", status: "Rehabilitated", timeAgo: "12 min ago" },
  { species: "Dog", speciesIcon: "🐕", location: "Juhu Beach", vitaScore: 65, dispatchTime: "3.5 min", status: "On Scene", timeAgo: "18 min ago" },
  { species: "Cattle", speciesIcon: "🐄", location: "Goregaon Highway", vitaScore: 82, dispatchTime: "5.1 min", status: "At Clinic", timeAgo: "25 min ago" },
]

const heatmapZones = [
  { coords: [[19.12, 72.84], [19.12, 72.88], [19.08, 72.88], [19.08, 72.84]], risk: "high" as const },
  { coords: [[19.08, 72.82], [19.08, 72.86], [19.04, 72.86], [19.04, 72.82]], risk: "moderate" as const },
  { coords: [[19.04, 72.86], [19.04, 72.90], [19.00, 72.90], [19.00, 72.86]], risk: "high" as const },
  { coords: [[19.06, 72.90], [19.06, 72.94], [19.02, 72.94], [19.02, 72.90]], risk: "low" as const },
  { coords: [[19.10, 72.88], [19.10, 72.92], [19.06, 72.92], [19.06, 72.88]], risk: "moderate" as const },
]

const markers = [
  { id: 1, lat: 19.0760, lng: 72.8777, status: "critical" as const, species: "Dog", location: "Andheri East" },
  { id: 2, lat: 19.0176, lng: 72.8562, status: "urgent" as const, species: "Cat", location: "Bandra West" },
]

export function CityDashboard() {
  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0))
  const [sortBy, setSortBy] = useState<"rescues" | "response" | "rating">("rescues")
  const [feedItems, setFeedItems] = useState(recentRescues.slice(0, 3))
  const feedRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)

  // Animate stat counters on mount
  useEffect(() => {
    const duration = 1500
    const steps = 50
    const interval = duration / steps

    let step = 0
    const timer = setInterval(() => {
      step++
      setAnimatedStats(
        stats.map((stat, i) => {
          const progress = Math.min(step / steps, 1)
          const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
          return parseFloat((stat.value * eased).toFixed(1))
        })
      )
      if (step >= steps) clearInterval(timer)
    }, interval)

    return () => clearInterval(timer)
  }, [])

  // Auto-add feed items
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setFeedItems(prev => {
          const nextIndex = prev.length % recentRescues.length
          const newItem = { ...recentRescues[nextIndex], timeAgo: "Just now" }
          return [newItem, ...prev.slice(0, 4)]
        })
      }
    }, 6000)
    return () => clearInterval(interval)
  }, [isPaused])

  // Sort NGOs
  const sortedNgos = [...ngos].sort((a, b) => {
    if (sortBy === "rescues") return b.rescues - a.rescues
    if (sortBy === "response") return parseFloat(a.avgResponse) - parseFloat(b.avgResponse)
    return b.rating - a.rating
  })

  return (
    <div className="min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-73px)] p-4 md:p-6 space-y-6">
      {/* Hero Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div 
            key={stat.label}
            className="p-4 md:p-6 bg-[#12121A] rounded-xl border border-[#2A2A3A] animate-fade-up"
            style={{ animationDelay: `${600 + i * 100}ms` }}
          >
            <p className="text-xs md:text-sm text-[#6B7280] mb-2 line-clamp-1">{stat.label}</p>
            <div className="flex items-end justify-between">
              <div>
                <span 
                  className="text-2xl md:text-4xl font-bold text-[#F0F4F8]"
                  style={{ fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace' }}
                >
                  {stat.unit ? animatedStats[i].toFixed(1) : Math.round(animatedStats[i]).toLocaleString()}
                </span>
                {stat.unit && (
                  <span className="text-sm text-[#6B7280] ml-1">{stat.unit}</span>
                )}
              </div>
              {/* Sparkline */}
              <svg className="w-16 h-5 md:w-20" viewBox="0 0 80 20">
                <polyline
                  points={stat.trend.map((v, j) => `${j * 8},${20 - (v / 100) * 18}`).join(' ')}
                  fill="none"
                  stroke={i === 1 ? "#22C55E" : "#D72638"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Middle Section - Heatmap & NGO Ledger */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Incident Heatmap */}
        <div className="bg-[#12121A] rounded-xl border border-[#2A2A3A] overflow-hidden">
          <div className="p-4 border-b border-[#2A2A3A] flex items-center justify-between">
            <h3 
              className="text-sm font-bold text-[#6B7280] uppercase tracking-widest"
              style={{ fontFamily: 'var(--font-barlow), Barlow Condensed, sans-serif' }}
            >
              Incident Heatmap
            </h3>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-[#D72638]/60" />
                High Risk
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-[#F5A623]/60" />
                Moderate
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-[#22C55E]/60" />
                Low
              </span>
            </div>
          </div>
          <div className="h-64 md:h-80">
            <MapComponent 
              markers={markers}
              fullHeight
              showHeatmap
              heatmapZones={heatmapZones}
            />
          </div>
          <div className="p-4 border-t border-[#2A2A3A]">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#6B7280]">Incident Pattern by Hour</span>
              <input
                type="range"
                min="0"
                max="23"
                defaultValue="14"
                className="w-32 accent-[#D72638]"
              />
            </div>
          </div>
        </div>

        {/* NGO Impact Ledger */}
        <div className="bg-[#12121A] rounded-xl border border-[#2A2A3A] overflow-hidden">
          <div className="p-4 border-b border-[#2A2A3A] flex items-center justify-between">
            <h3 
              className="text-sm font-bold text-[#6B7280] uppercase tracking-widest"
              style={{ fontFamily: 'var(--font-barlow), Barlow Condensed, sans-serif' }}
            >
              NGO Impact Ledger
            </h3>
            <div className="flex text-xs">
              {["rescues", "response", "rating"].map((sort) => (
                <button
                  key={sort}
                  onClick={() => setSortBy(sort as any)}
                  className={`px-3 py-1 rounded transition-colors capitalize ${
                    sortBy === sort 
                      ? "bg-[#D72638] text-white" 
                      : "text-[#6B7280] hover:text-[#F0F4F8]"
                  }`}
                >
                  {sort === "response" ? "Response Time" : sort}
                </button>
              ))}
            </div>
          </div>
          <div className="divide-y divide-[#2A2A3A]">
            {sortedNgos.map((ngo, i) => (
              <div 
                key={ngo.name}
                className={`p-4 flex items-center gap-4 transition-all duration-300 ${
                  ngo.topPerformer ? "bg-[#F5A623]/5" : ""
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-[#2A2A3A] flex items-center justify-center text-sm font-bold text-[#F0F4F8]">
                  {ngo.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-[#F0F4F8] truncate">{ngo.name}</span>
                    {ngo.topPerformer && (
                      <span className="px-2 py-0.5 bg-[#F5A623]/20 text-[#F5A623] text-xs rounded">
                        Top Performer
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-[#6B7280]">
                    <span>{ngo.rescues} rescues</span>
                    <span>{ngo.avgResponse}</span>
                    <span>{ngo.rating} ★</span>
                  </div>
                </div>
                <div className="w-24 h-2 bg-[#2A2A3A] rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${ngo.successRate}%`,
                      backgroundColor: ngo.successRate >= 90 ? '#22C55E' : ngo.successRate >= 85 ? '#F5A623' : '#D72638'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="bg-[#12121A] rounded-xl border border-[#2A2A3A] overflow-hidden">
        <div className="p-4 border-b border-[#2A2A3A] flex items-center justify-between">
          <h3 
            className="text-sm font-bold text-[#6B7280] uppercase tracking-widest"
            style={{ fontFamily: 'var(--font-barlow), Barlow Condensed, sans-serif' }}
          >
            Rescue Chain Activity Feed
          </h3>
          <span className="flex items-center gap-1.5 text-xs text-[#22C55E]">
            <span className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse-glow" />
            Live
          </span>
        </div>
        <div 
          ref={feedRef}
          className="max-h-64 overflow-auto p-4 space-y-2"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {feedItems.map((item, i) => (
            <div 
              key={`${item.location}-${i}`}
              className="flex items-center gap-3 p-3 bg-[#0A0A0F] rounded-lg animate-fade-up"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <span className="text-xl">{item.speciesIcon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium text-[#F0F4F8]">{item.species}</span>
                  <span className="text-xs text-[#6B7280]">·</span>
                  <span className="text-xs text-[#6B7280]">{item.location}</span>
                  <span className="text-xs text-[#6B7280]">·</span>
                  <span 
                    className="text-xs font-mono"
                    style={{ color: item.vitaScore > 70 ? '#D72638' : item.vitaScore > 40 ? '#F5A623' : '#22C55E' }}
                  >
                    VitaScore {item.vitaScore}
                  </span>
                  <span className="text-xs text-[#6B7280]">·</span>
                  <span className="text-xs text-[#3B82F6]">Dispatched in {item.dispatchTime}</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className={`text-xs px-2 py-1 rounded ${
                  item.status === "Rehabilitated" 
                    ? "bg-[#22C55E]/20 text-[#22C55E]"
                    : item.status === "At Shelter" || item.status === "At Clinic"
                      ? "bg-[#3B82F6]/20 text-[#3B82F6]"
                      : "bg-[#F5A623]/20 text-[#F5A623]"
                }`}>
                  {item.status}
                </span>
                <p className="text-xs text-[#6B7280] mt-1">{item.timeAgo}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
