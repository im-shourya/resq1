"use client"

import { useState, useEffect, useRef } from "react"

const mockLogs = [
  { time: "14:24:45", text: "Connection established with field unit" },
  { time: "14:24:52", text: "Video feed stabilized at 720p" },
  { time: "14:25:03", text: "VitaScore AI analysis: Possible spinal trauma" },
  { time: "14:25:18", text: "Dr. Mehta joined remote consultation" },
  { time: "14:25:34", text: "Recommendation: Immobilize before transport" },
  { time: "14:26:01", text: "Field team acknowledged immobilization protocol" },
  { time: "14:26:15", text: "Preparing emergency transport to clinic" },
]

const checklist = [
  { id: 1, label: "Wound stabilized", checked: false },
  { id: 2, label: "Fluids administered", checked: false },
  { id: 3, label: "Transport ready", checked: false },
]

export function VetConsole() {
  const [checklistState, setChecklistState] = useState(checklist)
  const [caseStatus, setCaseStatus] = useState("remote")
  const [vetNotes, setVetNotes] = useState("")
  const [logs, setLogs] = useState(mockLogs.slice(0, 3))
  const logsRef = useRef<HTMLDivElement>(null)

  // Simulate incoming logs
  useEffect(() => {
    const interval = setInterval(() => {
      setLogs(prev => {
        if (prev.length < mockLogs.length) {
          return [...prev, mockLogs[prev.length]]
        }
        return prev
      })
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // Auto-scroll logs
  useEffect(() => {
    if (logsRef.current) {
      logsRef.current.scrollTop = logsRef.current.scrollHeight
    }
  }, [logs])

  const toggleChecklist = (id: number) => {
    setChecklistState(prev => 
      prev.map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    )
  }

  return (
    <div className="min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-73px)] flex flex-col md:flex-row">
      {/* Left Half - Video Feed */}
      <div className="w-full md:w-1/2 h-[40vh] md:h-auto relative bg-[#0A0F0A] border-b md:border-b-0 md:border-r border-[#2A2A3A]">
        {/* Simulated video with blur and green tint */}
        <div 
          className="absolute inset-0 flex items-center justify-center animate-camera-shake"
          style={{
            background: 'linear-gradient(135deg, #0A0F0A 0%, #0F1A0F 100%)',
          }}
        >
          {/* Blurred animal silhouette */}
          <div 
            className="w-48 h-32 rounded-lg opacity-40"
            style={{
              background: 'radial-gradient(ellipse at center, #3A4A3A 0%, transparent 70%)',
              filter: 'blur(20px)',
            }}
          />
          <div 
            className="absolute w-32 h-24"
            style={{
              background: 'radial-gradient(ellipse at center, #4A5A4A 0%, transparent 70%)',
              filter: 'blur(15px)',
            }}
          />
        </div>

        {/* Video overlay elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Scanlines */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
            }}
          />

          {/* Vignette */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)',
            }}
          />
        </div>

        {/* Live indicator */}
        <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-black/60 rounded-lg backdrop-blur-sm">
          <span className="w-2 h-2 bg-[#D72638] rounded-full animate-pulse-glow" />
          <span className="text-xs font-mono text-[#D72638] font-bold tracking-wider">LIVE</span>
          <span className="text-xs text-[#6B7280] ml-2">Rescuer: Ravi Kumar</span>
        </div>

        {/* Time elapsed */}
        <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/60 rounded-lg backdrop-blur-sm">
          <span className="text-xs font-mono text-[#F0F4F8]">00:04:32</span>
        </div>

        {/* Call controls */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-2 bg-black/60 rounded-full backdrop-blur-sm">
          <button className="w-10 h-10 rounded-full bg-[#2A2A3A] hover:bg-[#3A3A4A] flex items-center justify-center transition-colors">
            <svg className="w-5 h-5 text-[#F0F4F8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </button>
          <button className="w-10 h-10 rounded-full bg-[#2A2A3A] hover:bg-[#3A3A4A] flex items-center justify-center transition-colors">
            <svg className="w-5 h-5 text-[#F0F4F8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
          <button className="w-12 h-12 rounded-full bg-[#D72638] hover:bg-[#e53e4f] flex items-center justify-center transition-colors">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <button className="w-10 h-10 rounded-full bg-[#2A2A3A] hover:bg-[#3A3A4A] flex items-center justify-center transition-colors">
            <svg className="w-5 h-5 text-[#F0F4F8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>

      {/* Right Half - Triage Console */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-6 space-y-4">
          {/* Case Summary */}
          <div className="p-4 bg-[#12121A] rounded-lg border border-[#2A2A3A]">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🐕</span>
                <div>
                  <h3 className="text-lg font-medium text-[#F0F4F8]">Dog - Suspected Spinal Injury</h3>
                  <p className="text-sm text-[#6B7280]">Andheri East, Near Metro Station</p>
                </div>
              </div>
              <div className="text-right">
                <div 
                  className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-sm font-bold font-mono"
                  style={{ backgroundColor: '#D7263820', color: '#D72638' }}
                >
                  87 CRITICAL
                </div>
                <p className="text-xs text-[#6B7280] mt-1">4 min elapsed</p>
              </div>
            </div>
          </div>

          {/* Vet Notes */}
          <div className="p-4 bg-[#12121A] rounded-lg border border-[#2A2A3A]">
            <h4 
              className="text-xs font-bold text-[#6B7280] uppercase tracking-widest mb-3"
              style={{ fontFamily: 'var(--font-barlow), Barlow Condensed, sans-serif' }}
            >
              Vet Notes
            </h4>
            <textarea
              value={vetNotes}
              onChange={(e) => setVetNotes(e.target.value)}
              placeholder="Enter assessment notes..."
              className="w-full h-24 px-3 py-2 bg-[#0A0A0F] border border-[#2A2A3A] rounded-lg text-[#F0F4F8] placeholder-[#6B7280] font-mono text-sm resize-none focus:outline-none focus:border-[#D72638] transition-colors"
            />
          </div>

          {/* Pre-treatment Checklist */}
          <div className="p-4 bg-[#12121A] rounded-lg border border-[#2A2A3A]">
            <h4 
              className="text-xs font-bold text-[#6B7280] uppercase tracking-widest mb-3"
              style={{ fontFamily: 'var(--font-barlow), Barlow Condensed, sans-serif' }}
            >
              Pre-treatment Checklist
            </h4>
            <div className="space-y-2">
              {checklistState.map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggleChecklist(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg border transition-all ${
                    item.checked 
                      ? "bg-[#22C55E]/10 border-[#22C55E]/30" 
                      : "bg-[#0A0A0F] border-[#2A2A3A] hover:border-[#6B7280]"
                  }`}
                >
                  <div className={`w-5 h-5 rounded flex items-center justify-center ${
                    item.checked ? "bg-[#22C55E]" : "border border-[#6B7280]"
                  }`}>
                    {item.checked && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className={`text-sm ${item.checked ? "text-[#22C55E]" : "text-[#F0F4F8]"}`}>
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Case Status */}
          <div className="p-4 bg-[#12121A] rounded-lg border border-[#2A2A3A]">
            <h4 
              className="text-xs font-bold text-[#6B7280] uppercase tracking-widest mb-3"
              style={{ fontFamily: 'var(--font-barlow), Barlow Condensed, sans-serif' }}
            >
              Case Status
            </h4>
            <select
              value={caseStatus}
              onChange={(e) => setCaseStatus(e.target.value)}
              className="w-full px-3 py-2 bg-[#0A0A0F] border border-[#2A2A3A] rounded-lg text-[#F0F4F8] focus:outline-none focus:border-[#D72638] transition-colors"
            >
              <option value="remote">Remote Guidance</option>
              <option value="clinic">Needs Clinic Admission</option>
              <option value="shelter">Stable for Shelter</option>
            </select>
          </div>

          {/* Submit Button */}
          <button 
            className="w-full py-3 bg-[#D72638] hover:bg-[#e53e4f] text-white font-bold rounded-lg transition-all hover:scale-[1.02] active:scale-[0.97]"
            style={{ fontFamily: 'var(--font-barlow), Barlow Condensed, sans-serif' }}
          >
            LOG ASSESSMENT
          </button>

          {/* Case History Log */}
          <div className="p-4 bg-[#12121A] rounded-lg border border-[#2A2A3A]">
            <h4 
              className="text-xs font-bold text-[#6B7280] uppercase tracking-widest mb-3"
              style={{ fontFamily: 'var(--font-barlow), Barlow Condensed, sans-serif' }}
            >
              Case History
            </h4>
            <div 
              ref={logsRef}
              className="h-40 overflow-auto space-y-1.5 font-mono text-xs"
            >
              {logs.map((log, i) => (
                <div 
                  key={i} 
                  className="flex gap-2 animate-fade-up"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <span className="text-[#6B7280] shrink-0">[{log.time}]</span>
                  <span className="text-[#22C55E]">{log.text}</span>
                </div>
              ))}
              <div className="flex items-center gap-1 text-[#6B7280]">
                <span className="animate-pulse">▋</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
