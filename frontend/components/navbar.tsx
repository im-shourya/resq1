"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export function Navbar({ loginMode = false }: { loginMode?: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "#how-it-works", label: "How It Works" },
    { href: "#features", label: "For NGOs" },
    { href: "#vets", label: "For Vets" },
    { href: "#map", label: "City Map" },
    { href: "#about", label: "About" },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] h-[72px] flex items-center transition-all duration-350 ease-out ${
        scrolled
          ? "bg-[rgba(7,10,16,0.92)] backdrop-blur-[24px] border-b border-[rgba(255,255,255,0.06)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-[1280px] w-full mx-auto px-6 flex items-center justify-between">
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

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-sans text-[15px] font-medium text-text-2 hover:text-text-1 hover:translate-x-[2px] transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {loginMode ? (
            <Link
              href="/main"
              className="btn-hover inline-flex items-center gap-2 px-6 py-[10px] bg-red text-white font-display text-sm font-bold rounded-pill hover:brightness-110"
            >
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              Login
            </Link>
          ) : (
            <>
              <Link
                href="#report"
                className="btn-hover px-5 py-[10px] bg-red text-white font-display text-sm font-bold rounded-pill hover:brightness-110"
              >
                Report Animal
              </Link>
              <Link
                href="#login"
                className="btn-hover px-5 py-[10px] border border-[rgba(255,255,255,0.10)] text-text-2 font-sans text-sm font-medium rounded-pill hover:border-red hover:text-text-1 transition-colors duration-200"
              >
                NGO Login
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden w-10 h-10 flex items-center justify-center text-text-1"
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            {mobileMenuOpen ? (
              <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-[72px] left-0 right-0 bg-[rgba(7,10,16,0.98)] backdrop-blur-[24px] border-b border-[rgba(255,255,255,0.06)] md:hidden">
          <div className="px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-sans text-[15px] font-medium text-text-2 hover:text-text-1 py-2"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-3 pt-4 border-t border-[rgba(255,255,255,0.06)]">
              {
                <Link
                  href="/main"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-5 py-3 bg-red text-white font-display text-sm font-bold rounded-pill text-center inline-flex items-center justify-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  Login
                </Link>
              }
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
