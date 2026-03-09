"use client"

import { useEffect, useRef, useState } from "react"

const steps = [
  {
    number: "01",
    title: "Report",
    description: "Citizen spots an injured animal and submits a report via web — photo, location auto-detected.",
    color: "#E8281E",
  },
  {
    number: "02",
    title: "AI Triage",
    description: "VitaScore™ AI analyzes the photo to assess injury severity in under 2 seconds.",
    color: "#F59E0B",
  },
  {
    number: "03",
    title: "Locate",
    description: "GPS coordinates pinpoint the animal on our city-wide emergency grid.",
    color: "#3B82F6",
  },
  {
    number: "04",
    title: "Dispatch",
    description: "SmartDispatch™ auto-matches the nearest available NGO based on proximity and capacity.",
    color: "#1FCC71",
  },
  {
    number: "05",
    title: "Rescue",
    description: "NGO receives real-time navigation, ETA updates, and case details en route.",
    color: "#A855F7",
  },
  {
    number: "06",
    title: "Treat",
    description: "Vet portal enables remote consultation for critical cases before arrival.",
    color: "#EAB308",
  },
]

export function HowItWorks() {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger the appearance of each step
          steps.forEach((_, index) => {
            setTimeout(() => {
              setVisibleSteps(prev => [...prev, index])
            }, index * 100)
          })
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="how-it-works" className="bg-bg py-s9 lg:py-s10">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-label mb-4">HOW IT WORKS</p>
          <h2 className="text-display-lg text-text-1 mb-6">
            From street to shelter — in minutes.
          </h2>
          <p className="text-body-xl text-text-2 max-w-[560px] mx-auto">
            Six automated stages, one seamless system. No phone calls. No WhatsApp groups. No manual coordination.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="relative">
          {/* Connecting Line (desktop only) */}
          <div className="hidden lg:block absolute top-[60px] left-[8%] right-[8%] h-[2px]">
            <svg className="w-full h-full" preserveAspectRatio="none">
              <line 
                x1="0" y1="1" x2="100%" y2="1" 
                stroke="rgba(232, 40, 30, 0.28)" 
                strokeWidth="2" 
                strokeDasharray="5 4"
                className="animate-pulse"
              />
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`card-hover bg-bg-2 rounded-lg border border-[rgba(255,255,255,0.06)] p-6 lg:p-5 transition-all duration-550 ${
                  visibleSteps.includes(index) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
              >
                {/* Step Number */}
                <span 
                  className="font-display text-5xl lg:text-4xl font-extrabold opacity-80 block mb-4"
                  style={{ color: step.color }}
                >
                  {step.number}
                </span>

                {/* Title */}
                <h3 className="font-display text-lg lg:text-base font-bold text-text-1 mb-2">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-body-sm text-text-2">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
