"use client"

import { useEffect, useRef, useCallback } from "react"

const steps = [
  { label: "Reported", icon: "📝" },
  { label: "Dispatched", icon: "🚨" },
  { label: "En Route", icon: "🚗" },
  { label: "On Scene", icon: "📍" },
  { label: "At Shelter", icon: "🏥" },
  { label: "Rehabilitated", icon: "💚" },
]

interface RescueChainProps {
  currentStep: number
}

export function RescueChain({ currentStep }: RescueChainProps) {
  const prevStepRef = useRef(currentStep)
  const audioContextRef = useRef<AudioContext | null>(null)

  // Play notification chime
  const playChime = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    const ctx = audioContextRef.current
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)
    
    oscillator.frequency.value = 600
    oscillator.type = "sine"
    gainNode.gain.setValueAtTime(0.1, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2)
    
    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.2)
  }, [])

  useEffect(() => {
    if (currentStep > prevStepRef.current) {
      playChime()
    }
    prevStepRef.current = currentStep
  }, [currentStep, playChime])

  return (
    <div className="fixed bottom-0 left-0 right-0 md:bottom-4 md:left-4 md:right-4 bg-[#12121A] border-t md:border border-[#2A2A3A] md:rounded-xl p-4 z-40 animate-slide-up">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        <h3 
          className="hidden md:block text-sm font-bold text-[#6B7280] uppercase tracking-widest mr-6"
          style={{ fontFamily: 'var(--font-barlow), Barlow Condensed, sans-serif' }}
        >
          Rescue Chain
        </h3>
        
        <div className="flex items-center gap-1 md:gap-2 flex-1 overflow-x-auto">
          {steps.map((step, index) => {
            const isComplete = index < currentStep
            const isCurrent = index === currentStep
            const isPending = index > currentStep

            return (
              <div key={step.label} className="flex items-center">
                {/* Step */}
                <div 
                  className={`flex items-center gap-1.5 px-2 md:px-3 py-1.5 rounded-lg transition-all duration-300 ${
                    isComplete 
                      ? "bg-[#22C55E]/20 text-[#22C55E]" 
                      : isCurrent 
                        ? "bg-[#3B82F6]/20 text-[#3B82F6] animate-pulse-glow" 
                        : "bg-[#2A2A3A]/50 text-[#6B7280]"
                  } ${isCurrent ? "ring-2 ring-[#3B82F6]/50" : ""}`}
                >
                  <span className="text-sm md:text-base">{step.icon}</span>
                  <span 
                    className="text-xs font-semibold whitespace-nowrap hidden sm:block"
                    style={{ fontFamily: 'var(--font-barlow), Barlow Condensed, sans-serif' }}
                  >
                    {step.label}
                  </span>
                  {isComplete && (
                    <svg className="w-3 h-3 text-[#22C55E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>

                {/* Connector */}
                {index < steps.length - 1 && (
                  <div className={`w-4 md:w-8 h-0.5 mx-1 transition-colors duration-300 ${
                    index < currentStep ? "bg-[#22C55E]" : "bg-[#2A2A3A]"
                  }`} />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
