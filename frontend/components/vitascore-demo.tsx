"use client"

import { useState, useCallback } from "react"

interface AnalysisResult {
  species: string
  confidence: number
  injury: string
  score: number
  severity: "stable" | "urgent" | "critical"
}

export function VitaScoreDemo() {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisStep, setAnalysisStep] = useState(0)
  const [result, setResult] = useState<AnalysisResult | null>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      processImage(file)
    }
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      processImage(file)
    }
  }, [])

  const processImage = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string)
      startAnalysis()
    }
    reader.readAsDataURL(file)
  }

  const startAnalysis = () => {
    setIsAnalyzing(true)
    setResult(null)
    setAnalysisStep(0)

    // Simulate analysis steps
    setTimeout(() => setAnalysisStep(1), 600)
    setTimeout(() => setAnalysisStep(2), 1200)
    setTimeout(() => setAnalysisStep(3), 1800)
    setTimeout(() => {
      setAnalysisStep(4)
      setIsAnalyzing(false)
      setResult({
        species: "Dog",
        confidence: 94,
        injury: "Laceration — hind right leg",
        score: 67,
        severity: "urgent"
      })
    }, 2400)
  }

  const reset = () => {
    setUploadedImage(null)
    setResult(null)
    setAnalysisStep(0)
    setIsAnalyzing(false)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "#E8281E"
      case "urgent": return "#F59E0B"
      default: return "#1FCC71"
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 70) return "#E8281E"
    if (score >= 40) return "#F59E0B"
    return "#1FCC71"
  }

  return (
    <section id="vitascore" className="bg-bg-2 py-s9 lg:py-s10">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-label mb-4">AI-POWERED TRIAGE</p>
          <h2 className="text-display-md text-text-1 mb-4">
            {"VitaScore™ — AI That Reads Injuries"}
          </h2>
          <p className="text-body-xl text-text-2 max-w-[560px] mx-auto">
            Upload a photo and watch our AI analyze injury severity in real-time.
          </p>
        </div>

        {/* Demo Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-[960px] mx-auto">
          {/* Upload Zone */}
          <div
            className={`relative min-h-[320px] rounded-xl border-[2.5px] border-dashed transition-all duration-200 flex items-center justify-center ${
              isDragging
                ? "border-red bg-red-dim"
                : uploadedImage
                ? "border-[rgba(255,255,255,0.10)] bg-bg-3"
                : "border-red-border hover:border-red hover:bg-red-dim/30"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {uploadedImage ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={uploadedImage}
                  alt="Uploaded animal"
                  className="max-w-full max-h-[300px] rounded-lg object-contain"
                />
                {/* Scan line overlay during analysis */}
                {isAnalyzing && (
                  <div className="absolute inset-0 overflow-hidden rounded-xl">
                    <div 
                      className="absolute left-0 right-0 h-0.5 bg-red opacity-60 animate-scanline"
                      style={{ boxShadow: '0 0 20px rgba(232, 40, 30, 0.8)' }}
                    />
                    <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-red/10" />
                  </div>
                )}
                {/* Reset button */}
                <button
                  onClick={reset}
                  className="absolute top-3 right-3 w-8 h-8 bg-bg-4 hover:bg-bg-5 rounded-full flex items-center justify-center text-text-2 hover:text-text-1 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </>
            ) : (
              <label className="flex flex-col items-center gap-4 cursor-pointer p-8">
                <svg className="w-12 h-12 text-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                </svg>
                <span className="font-display text-lg font-semibold text-text-1">
                  Drop an animal photo here
                </span>
                <span className="font-mono text-xs text-text-3">
                  Accepts JPG, PNG up to 10MB
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Analysis Panel */}
          <div className="bg-bg-3 rounded-xl border border-[rgba(255,255,255,0.06)] p-6 min-h-[320px]">
            {!uploadedImage ? (
              <div className="h-full flex items-center justify-center">
                <p className="text-text-3 font-mono text-sm">
                  Upload an image to begin analysis
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Analysis Steps */}
                <div className={`flex items-center gap-3 transition-opacity duration-300 ${analysisStep >= 1 ? 'opacity-100' : 'opacity-30'}`}>
                  {analysisStep >= 2 ? (
                    <svg className="w-5 h-5 text-status-green" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  ) : analysisStep === 1 ? (
                    <div className="w-5 h-5 border-2 border-red border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-text-3" />
                  )}
                  <span className="text-body-md text-text-2">Detecting species...</span>
                </div>

                <div className={`flex items-center gap-3 transition-opacity duration-300 ${analysisStep >= 2 ? 'opacity-100' : 'opacity-30'}`}>
                  {analysisStep >= 3 ? (
                    <svg className="w-5 h-5 text-status-green" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  ) : analysisStep === 2 ? (
                    <div className="w-5 h-5 border-2 border-red border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-text-3" />
                  )}
                  <span className="text-body-md text-text-2">Analyzing injuries...</span>
                </div>

                <div className={`flex items-center gap-3 transition-opacity duration-300 ${analysisStep >= 3 ? 'opacity-100' : 'opacity-30'}`}>
                  {analysisStep >= 4 ? (
                    <svg className="w-5 h-5 text-status-green" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  ) : analysisStep === 3 ? (
                    <div className="w-5 h-5 border-2 border-red border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-text-3" />
                  )}
                  <span className="text-body-md text-text-2">Calculating VitaScore...</span>
                </div>

                {/* Results */}
                {result && (
                  <div className="pt-4 space-y-4 border-t border-[rgba(255,255,255,0.06)] mt-4 animate-fade-in-up">
                    {/* Species Detection */}
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🐕</span>
                      <span className="text-body-md text-text-1">
                        {result.species} detected — {result.confidence}% confidence
                      </span>
                    </div>

                    {/* Injury Type */}
                    <p className="font-mono text-sm text-text-2">
                      {result.injury}
                    </p>

                    {/* VitaScore Ring */}
                    <div className="flex items-center gap-6 pt-2">
                      <div className="relative w-24 h-24">
                        <svg className="w-24 h-24 -rotate-90">
                          <circle
                            cx="48"
                            cy="48"
                            r="42"
                            fill="none"
                            stroke="#1A2230"
                            strokeWidth="8"
                          />
                          <circle
                            cx="48"
                            cy="48"
                            r="42"
                            fill="none"
                            stroke={getScoreColor(result.score)}
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray={`${(result.score / 100) * 264} 264`}
                            className="transition-all duration-1500 ease-out"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="font-display text-3xl font-extrabold" style={{ color: getScoreColor(result.score) }}>
                            {result.score}
                          </span>
                        </div>
                      </div>
                      <div>
                        <span 
                          className="inline-block font-mono text-xs font-medium tracking-wider uppercase px-3 py-1 rounded-md"
                          style={{ 
                            backgroundColor: `${getSeverityColor(result.severity)}15`,
                            color: getSeverityColor(result.severity),
                            boxShadow: `0 0 12px ${getSeverityColor(result.severity)}40`
                          }}
                        >
                          {result.severity}
                        </span>
                        <p className="text-body-sm text-text-2 mt-2">
                          SmartDispatch would activate in 8 seconds
                        </p>
                      </div>
                    </div>

                    {/* CTA */}
                    <button className="w-full btn-hover mt-4 px-6 py-3 bg-red text-white font-display text-sm font-bold rounded-pill hover:brightness-110">
                      {"Submit a Real Report →"}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
