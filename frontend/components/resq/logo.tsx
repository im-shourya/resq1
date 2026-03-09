"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export function Logo({ compact = false }: { compact?: boolean }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div 
      className={`flex items-center gap-2 transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
    >

      {/* Wordmark */}
      {!compact && (
        <div className="flex items-center gap-2">
          {/* Logo */}
        <Link href="/" className="flex items-center gap-[10px]">
          <div className="w-9 h-9 rounded-full bg-bg-2 border border-red-border flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-red">
              <path d="M12 2v8m0 4v8m-6-10h12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="font-display text-[22px] font-extrabold tracking-[-0.5px] text-text-1">
            RESQ
          </span>
        </Link>
        </div>
      )}
    </div>
  )
}
