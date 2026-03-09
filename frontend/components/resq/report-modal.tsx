"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { X } from "lucide-react"

interface ReportModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmitComplete: () => void
}

const speciesOptions = [
  { id: "dog", icon: "🐕", label: "Dog" },
  { id: "cat", icon: "🐈", label: "Cat" },
  { id: "bird", icon: "🐦", label: "Bird" },
  { id: "cattle", icon: "🐄", label: "Cattle" },
  { id: "other", icon: "🦔", label: "Other" },
]

export function ReportModal({ isOpen, onClose, onSubmitComplete }: ReportModalProps) {
  const [step, setStep] = useState<"form" | "vitascore" | "complete">("form")
  const [selectedSpecies, setSelectedSpecies] = useState<string | null>(null)
  const [description, setDescription] = useState("")
  const [vitaScore, setVitaScore] = useState(0)
  const [showTypewriter, setShowTypewriter] = useState(false)
  const [showCheckmark, setShowCheckmark] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep("form")
      setSelectedSpecies(null)
      setDescription("")
      setVitaScore(0)
      setShowTypewriter(false)
      setShowCheckmark(false)
    }
  }, [isOpen])

  // Play tick sound
  const playTick = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    const ctx = audioContextRef.current
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)
    
    oscillator.frequency.value = 400
    oscillator.type = "sine"
    gainNode.gain.setValueAtTime(0.1, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05)
    
    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.05)
  }, [])

  // Play chime sound
  const playChime = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    const ctx = audioContextRef.current
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)
    
    oscillator.frequency.value = 800
    oscillator.type = "sine"
    gainNode.gain.setValueAtTime(0.15, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3)
    
    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.3)
  }, [])

  // VitaScore animation
  useEffect(() => {
    if (step !== "vitascore") return

    const targetScore = 87
    const duration = 2500
    const steps = 50
    const increment = targetScore / steps
    const interval = duration / steps

    let currentScore = 0
    const timer = setInterval(() => {
      currentScore += increment
      if (currentScore >= targetScore) {
        currentScore = targetScore
        clearInterval(timer)
        
        // Show typewriter text
        setTimeout(() => setShowTypewriter(true), 300)
        
        // Show checkmark and complete
        setTimeout(() => {
          setShowCheckmark(true)
          playChime()
        }, 2000)

        // Close modal and trigger callback
        setTimeout(() => {
          setStep("complete")
          onClose()
          onSubmitComplete()
        }, 3500)
      }
      setVitaScore(Math.round(currentScore))
      playTick()
    }, interval)

    return () => clearInterval(timer)
  }, [step, playTick, playChime, onClose, onSubmitComplete])

  const handleSubmit = () => {
    if (!selectedSpecies) return
    setStep("vitascore")
  }

  const getScoreColor = (score: number) => {
    if (score <= 40) return "#22C55E"
    if (score <= 70) return "#F5A623"
    return "#D72638"
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={step === "form" ? onClose : undefined}
      />
      
      {/* Modal */}
      <div 
        className={`relative w-full md:max-w-lg bg-[#12121A] border border-[#2A2A3A] rounded-t-2xl md:rounded-2xl max-h-[90vh] overflow-auto animate-slide-up ${
          step === "vitascore" ? "h-[100vh] md:h-auto md:aspect-square flex items-center justify-center" : ""
        }`}
      >
        {step === "form" && (
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 
                className="text-2xl font-bold tracking-wide text-[#F0F4F8]"
                style={{ fontFamily: 'var(--font-barlow), Barlow Condensed, sans-serif' }}
              >
                REPORT RESCUE
              </h2>
              <button 
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-[#2A2A3A] transition-colors"
              >
                <X className="w-5 h-5 text-[#6B7280]" />
              </button>
            </div>

            {/* Image Upload Zone */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#6B7280] mb-2 uppercase tracking-wider">
                Photo Evidence
              </label>
              <div className="border-2 border-dashed border-[#2A2A3A] rounded-lg p-8 text-center hover:border-[#D72638]/50 transition-colors cursor-pointer group">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#2A2A3A] flex items-center justify-center group-hover:bg-[#D72638]/20 transition-colors">
                  <svg className="w-8 h-8 text-[#6B7280] group-hover:text-[#D72638] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="text-[#6B7280] text-sm">
                  Tap to capture or drag photo here
                </p>
              </div>
            </div>

            {/* Species Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#6B7280] mb-3 uppercase tracking-wider">
                Animal Type
              </label>
              <div className="grid grid-cols-5 gap-2">
                {speciesOptions.map((species) => (
                  <button
                    key={species.id}
                    onClick={() => setSelectedSpecies(species.id)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-all ${
                      selectedSpecies === species.id
                        ? "border-[#D72638] bg-[#D72638]/10"
                        : "border-[#2A2A3A] hover:border-[#6B7280]"
                    }`}
                  >
                    <span className="text-2xl">{species.icon}</span>
                    <span className="text-xs text-[#F0F4F8]">{species.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#6B7280] mb-2 uppercase tracking-wider">
                Brief Description
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g., Dog with injured leg near park entrance"
                className="w-full px-4 py-3 bg-[#1A1A24] border border-[#2A2A3A] rounded-lg text-[#F0F4F8] placeholder-[#6B7280] focus:outline-none focus:border-[#D72638] transition-colors"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={!selectedSpecies}
              className={`w-full py-4 rounded-lg font-bold text-lg tracking-wide transition-all ${
                selectedSpecies
                  ? "bg-[#D72638] hover:bg-[#e53e4f] text-white hover:scale-[1.02] active:scale-[0.97]"
                  : "bg-[#2A2A3A] text-[#6B7280] cursor-not-allowed"
              }`}
              style={{ fontFamily: 'var(--font-barlow), Barlow Condensed, sans-serif' }}
            >
              SUBMIT REPORT
            </button>
          </div>
        )}

        {step === "vitascore" && (
          <div className="p-8 flex flex-col items-center justify-center text-center">
            {/* Vignette */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/80 pointer-events-none" />
            
            {/* VitaScore Ring */}
            <div className="relative w-48 h-48 mb-8">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background ring */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#2A2A3A"
                  strokeWidth="8"
                />
                {/* Progress ring */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke={getScoreColor(vitaScore)}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${(vitaScore / 100) * 283} 283`}
                  style={{
                    filter: `drop-shadow(0 0 10px ${getScoreColor(vitaScore)}80)`,
                    transition: 'stroke-dasharray 50ms linear',
                  }}
                />
              </svg>
              {/* Score text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span 
                  className="text-5xl font-bold"
                  style={{ 
                    fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace',
                    color: getScoreColor(vitaScore),
                    textShadow: `0 0 20px ${getScoreColor(vitaScore)}60`,
                  }}
                >
                  {vitaScore}
                </span>
                <span className="text-xs text-[#6B7280] font-mono uppercase tracking-widest mt-1">
                  VitaScore
                </span>
              </div>
            </div>

            {/* Typewriter message */}
            {showTypewriter && (
              <div className="space-y-3 animate-fade-up">
                <p 
                  className="text-lg font-bold text-[#D72638] uppercase tracking-wider"
                  style={{ fontFamily: 'var(--font-barlow), Barlow Condensed, sans-serif' }}
                >
                  ⚠ CRITICAL — Possible spinal injury detected
                </p>
                <p className="text-[#6B7280] font-mono text-sm">
                  Initiating emergency dispatch...
                </p>
              </div>
            )}

            {/* Checkmark success */}
            {showCheckmark && (
              <div className="mt-6 flex items-center gap-2 text-[#22C55E] animate-scale-pop">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-mono text-sm">
                  Rescuer dispatched · ETA 6 min
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
