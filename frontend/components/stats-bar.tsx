"use client"

import { useEffect, useState, useRef } from "react"

interface StatProps {
  icon: React.ReactNode
  value: number
  suffix?: string
  label: string
}

function AnimatedStat({ icon, value, suffix = "", label }: StatProps) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          // Animate count
          const duration = 1800
          const steps = 60
          const increment = value / steps
          let current = 0
          const interval = setInterval(() => {
            current += increment
            if (current >= value) {
              setCount(value)
              clearInterval(interval)
            } else {
              setCount(Math.floor(current))
            }
          }, duration / steps)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [value, hasAnimated])

  const formatNumber = (num: number) => {
    return num.toLocaleString()
  }

  return (
    <div ref={ref} className="flex items-center gap-4 py-4 px-6 lg:px-8">
      <div className="text-text-2">{icon}</div>
      <div>
        <div className="flex items-baseline gap-1">
          <span className="font-display text-3xl lg:text-4xl font-extrabold text-text-1">
            {formatNumber(count)}
          </span>
          {suffix && (
            <span className="font-display text-xl lg:text-2xl font-bold text-text-2">
              {suffix}
            </span>
          )}
        </div>
        <span className="font-mono text-[11px] font-medium tracking-[1.5px] uppercase text-text-3">
          {label}
        </span>
      </div>
    </div>
  )
}

export function StatsBar() {
  const stats = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
        </svg>
      ),
      value: 12394,
      label: "Animals Rescued",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
        </svg>
      ),
      value: 847,
      label: "NGOs Connected",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
      ),
      value: 156,
      label: "Cities Active",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      ),
      value: 3.2,
      suffix: "Min",
      label: "Avg Response",
    },
  ]

  return (
    <section className="bg-bg-2 border-t border-b border-[rgba(255,255,255,0.06)]">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[rgba(255,255,255,0.07)]">
          {stats.map((stat, index) => (
            <AnimatedStat
              key={index}
              icon={stat.icon}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
