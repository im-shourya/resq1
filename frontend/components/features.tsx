"use client"

import { useEffect, useRef, useState } from "react"

const features = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
      </svg>
    ),
    title: "NGO Command Center",
    description: "Mission-control style dashboard for NGOs to manage incoming cases, dispatch rescuers, and track fleet in real-time.",
    highlight: "For NGOs",
    color: "#E8281E",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/>
      </svg>
    ),
    title: "AI Injury Detection",
    description: "Computer vision analyzes uploaded images to detect species, identify injury types, and calculate urgency scores automatically.",
    highlight: "VitaScore™",
    color: "#F59E0B",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
    ),
    title: "Smart Dispatching",
    description: "Algorithm matches cases to nearest available NGO based on real-time location, capacity, and specialization.",
    highlight: "SmartDispatch™",
    color: "#3B82F6",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
      </svg>
    ),
    title: "Vet Teleconsult",
    description: "Veterinarians can join live video calls to guide first responders through critical on-scene assessments.",
    highlight: "For Vets",
    color: "#A855F7",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
      </svg>
    ),
    title: "City-Wide Grid",
    description: "Live public map showing all active rescues, NGO positions, and historical hotspots for complete transparency.",
    highlight: "Open Data",
    color: "#1FCC71",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
      </svg>
    ),
    title: "No App Required",
    description: "Citizens report via mobile web — no downloads, no friction. GPS auto-detected for instant location sharing.",
    highlight: "Web-First",
    color: "#EAB308",
  },
]

export function Features() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          features.forEach((_, index) => {
            setTimeout(() => {
              setVisibleCards(prev => [...prev, index])
            }, index * 80)
          })
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="features" className="bg-bg py-s9 lg:py-s10">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-label mb-4">PLATFORM FEATURES</p>
          <h2 className="text-display-lg text-text-1 mb-6">
            Built for every stakeholder.
          </h2>
          <p className="text-body-xl text-text-2 max-w-[560px] mx-auto">
            Citizens, NGOs, and veterinarians — each with purpose-built tools that work together seamlessly.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group card-hover bg-bg-2 rounded-xl border border-[rgba(255,255,255,0.06)] p-6 transition-all duration-500 ${
                visibleCards.includes(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
            >
              {/* Icon */}
              <div 
                className="w-14 h-14 rounded-lg flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{ 
                  backgroundColor: `${feature.color}15`,
                  color: feature.color 
                }}
              >
                {feature.icon}
              </div>

              {/* Highlight Badge */}
              <span 
                className="inline-block font-mono text-[10px] font-medium tracking-wider uppercase px-2 py-0.5 rounded mb-3"
                style={{ 
                  backgroundColor: `${feature.color}20`,
                  color: feature.color 
                }}
              >
                {feature.highlight}
              </span>

              {/* Title */}
              <h3 className="font-display text-xl font-bold text-text-1 mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-body-md text-text-2">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
