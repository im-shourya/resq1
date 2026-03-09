"use client"

import { useEffect, useState } from "react"
import type { Screen } from "@/app/page"

const tabs: { id: Screen; label: string }[] = [
  { id: "dispatcher", label: "NGO DISPATCH" },
  { id: "vet", label: "VET TRIAGE" },
  { id: "city", label: "CITY DASHBOARD" },
]

export function Navigation({ 
  activeScreen, 
  setActiveScreen 
}: { 
  activeScreen: Screen
  setActiveScreen: (screen: Screen) => void 
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <nav className="flex items-center gap-1">
      {tabs.map((tab, index) => (
        <button
          key={tab.id}
          onClick={() => setActiveScreen(tab.id)}
          className={`
            relative px-4 py-2 text-sm font-semibold tracking-wider transition-all duration-200
            ${activeScreen === tab.id 
              ? "text-[#D72638]" 
              : "text-[#6B7280] hover:text-[#F0F4F8]"
            }
            ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}
          `}
          style={{ 
            fontFamily: 'var(--font-barlow), Barlow Condensed, sans-serif',
            transitionDelay: `${index * 50}ms`
          }}
        >
          {tab.label}
          {/* Active indicator */}
          {activeScreen === tab.id && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D72638] animate-scale-pop origin-left" />
          )}
        </button>
      ))}
    </nav>
  )
}
