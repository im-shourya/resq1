"use client"

import { useState } from "react"

type TabId = "citizens" | "ngos" | "vets"

interface TabContent {
  id: TabId
  label: string
  title: string
  description: string
  features: string[]
  preview: React.ReactNode
}

const tabs: TabContent[] = [
  {
    id: "citizens",
    label: "Citizens",
    title: "Report in seconds, track in real-time.",
    description: "No app downloads, no phone calls. Just snap a photo, confirm your location, and watch as help is dispatched to the animal.",
    features: [
      "One-tap photo upload with GPS auto-detection",
      "Real-time tracking of your reported case",
      "Notifications when rescue is complete",
      "Anonymous reporting option",
    ],
    preview: (
      <div className="bg-bg-3 rounded-xl border border-[rgba(255,255,255,0.08)] p-4 w-full max-w-[300px]">
        <div className="flex items-center justify-between mb-4">
          <span className="font-display text-sm font-bold text-text-1">Report Animal</span>
          <span className="text-xs text-text-3">Step 1/3</span>
        </div>
        <div className="aspect-[4/3] rounded-lg bg-bg-4 border-2 border-dashed border-red-border flex items-center justify-center mb-4">
          <div className="text-center">
            <svg className="w-8 h-8 text-red mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <span className="text-xs text-text-3">Tap to capture</span>
          </div>
        </div>
        <button className="w-full py-2.5 bg-red text-white font-display text-sm font-bold rounded-pill">
          Continue
        </button>
      </div>
    ),
  },
  {
    id: "ngos",
    label: "NGOs",
    title: "Command center for every rescue.",
    description: "See every active case on a live map, dispatch your team with one click, and track performance metrics that matter.",
    features: [
      "Live case queue sorted by AI priority",
      "One-click case acceptance and dispatch",
      "Real-time fleet tracking on map",
      "Performance analytics dashboard",
    ],
    preview: (
      <div className="bg-bg-3 rounded-xl border border-[rgba(255,255,255,0.08)] overflow-hidden w-full max-w-[340px]">
        {/* Header */}
        <div className="bg-bg-4 px-4 py-3 flex items-center justify-between border-b border-[rgba(255,255,255,0.06)]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-red flex items-center justify-center text-white text-xs font-bold">P</div>
            <span className="font-display text-sm font-semibold text-text-1">Prani Animal Rescue</span>
          </div>
          <span className="px-2 py-0.5 bg-status-green/20 text-status-green text-[10px] font-mono rounded">ONLINE</span>
        </div>
        {/* Case Card */}
        <div className="p-4">
          <div className="bg-bg-2 rounded-lg border-l-4 border-red p-3 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
            <div className="flex items-center gap-2 mb-2">
              <span className="px-1.5 py-0.5 bg-red-dim text-red text-[10px] font-mono rounded">CRITICAL</span>
              <span className="text-text-3 text-[10px] font-mono">RQ-4821</span>
            </div>
            <p className="text-text-1 text-sm mb-1">Injured dog — Anna Nagar</p>
            <p className="text-text-2 text-xs mb-3">VitaScore: 87 · 1.2km away</p>
            <div className="flex gap-2">
              <button className="flex-1 py-1.5 bg-red text-white text-xs font-bold rounded-pill">Accept</button>
              <button className="flex-1 py-1.5 bg-bg-4 text-text-2 text-xs font-medium rounded-pill">Details</button>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "vets",
    label: "Veterinarians",
    title: "Consult from anywhere, save lives everywhere.",
    description: "Get notified of critical cases, join live video calls with rescuers, and log assessments directly into the case file.",
    features: [
      "Set availability with one toggle",
      "Receive critical case alerts instantly",
      "HD video consultation with rescuers",
      "Digital assessment logging",
    ],
    preview: (
      <div className="bg-bg-3 rounded-xl border border-[rgba(255,255,255,0.08)] overflow-hidden w-full max-w-[300px]">
        {/* Incoming Call Alert */}
        <div className="bg-gradient-to-b from-status-purple/10 to-transparent p-6 border-b border-[rgba(168,85,247,0.2)]">
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-[10px] text-status-purple uppercase tracking-wider">Incoming Consult</span>
            <div className="w-10 h-10 rounded-full border-2 border-status-purple flex items-center justify-center">
              <span className="font-mono text-xs text-status-purple">15s</span>
            </div>
          </div>
          <div className="space-y-2 mb-4">
            <p className="text-text-1 text-sm font-medium">Critical: Suspected fracture</p>
            <p className="text-text-2 text-xs">Dog · VitaScore 87 · NGO Prani requesting</p>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 py-2 bg-status-purple text-white text-xs font-bold rounded-pill">Accept Call</button>
            <button className="flex-1 py-2 bg-bg-4 text-text-2 text-xs font-medium rounded-pill">Decline</button>
          </div>
        </div>
        {/* Availability Toggle */}
        <div className="p-4 flex items-center justify-between">
          <span className="text-text-2 text-sm">Availability</span>
          <div className="w-12 h-6 bg-status-purple rounded-full relative">
            <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
          </div>
        </div>
      </div>
    ),
  },
]

export function StakeholderTabs() {
  const [activeTab, setActiveTab] = useState<TabId>("citizens")
  const activeContent = tabs.find(t => t.id === activeTab)!

  return (
    <section id="stakeholders" className="bg-bg-2 py-s9 lg:py-s10">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-label mb-4">FOR EVERYONE</p>
          <h2 className="text-display-lg text-text-1 mb-6">
            Purpose-built for every role.
          </h2>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-bg-3 rounded-pill p-1.5 gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-6 py-2.5 font-display text-sm font-semibold rounded-pill transition-all duration-300 ${
                  activeTab === tab.id
                    ? "text-white"
                    : "text-text-2 hover:text-text-1"
                }`}
              >
                {activeTab === tab.id && (
                  <span 
                    className="absolute inset-0 bg-red rounded-pill"
                    style={{ zIndex: 0 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div 
            key={activeTab}
            className="animate-fade-in-up"
          >
            <h3 className="text-h1 text-text-1 mb-4">
              {activeContent.title}
            </h3>
            <p className="text-body-xl text-text-2 mb-8">
              {activeContent.description}
            </p>
            <ul className="space-y-4">
              {activeContent.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-status-green flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-body-lg text-text-1">{feature}</span>
                </li>
              ))}
            </ul>
            <button className="btn-hover mt-8 px-8 py-4 bg-red text-white font-display text-base font-bold rounded-pill hover:brightness-110">
              {activeTab === "citizens" ? "Report an Animal" : activeTab === "ngos" ? "Register Your NGO" : "Join as Vet"}
            </button>
          </div>

          {/* Preview */}
          <div 
            key={`${activeTab}-preview`}
            className="flex justify-center lg:justify-end animate-fade-in-up"
            style={{ animationDelay: '100ms' }}
          >
            {activeContent.preview}
          </div>
        </div>
      </div>
    </section>
  )
}
