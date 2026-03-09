"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Logo } from "@/components/resq/logo"

type Mode = "choose" | "login" | "signup"

export default function CitizenAuthPage() {
  const router = useRouter()
  const [mode, setMode] = useState<Mode>("choose")
  const [isLoaded, setIsLoaded] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [success, setSuccess] = useState(false)

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  })

  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 80)
    return () => clearTimeout(t)
  }, [])

  const update = (field: string, value: string | boolean) => {
    setForm(f => ({ ...f, [field]: value }))
    setErrors(e => ({ ...e, [field]: "" }))
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.email) e.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email"
    if (!form.password) e.password = "Password is required"
    else if (form.password.length < 6) e.password = "At least 6 characters required"
    if (mode === "signup") {
      if (!form.name) e.name = "Your name is required"
      if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match"
      if (!form.agreeTerms) e.agreeTerms = "Please agree to continue"
    }
    return e
  }

  const handleGuestContinue = () => {
    router.push("/citizen")
  }

  const handleSubmit = async () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setIsSubmitting(true)
    await new Promise(r => setTimeout(r, 1200))
    setIsSubmitting(false)
    setSuccess(true)
    await new Promise(r => setTimeout(r, 800))
    router.push("/citizen")
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F0F4F8] flex flex-col scanline-effect">
      <div className="grain-overlay" />

      {/* Ambient glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#D72638]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-[#F5A623]/4 rounded-full blur-3xl pointer-events-none" />

      <div className={`relative z-10 flex flex-col flex-1 transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        {/* Header */}
        <header className="flex items-center justify-between px-6 md:px-10 py-5 border-b border-[#2A2A3A]">
          <Link href="/landing"><Logo compact /></Link>
          <Link href="/landing" className="text-xs font-mono text-[#6B7280] hover:text-[#F0F4F8] transition-colors border border-[#2A2A3A] hover:border-[#4A4A5A] px-3 py-1.5 rounded">
            ← HOME
          </Link>
        </header>

        <main className="flex-1 flex items-center justify-center px-4 py-10">
          <div className="w-full max-w-md">

            {/* Badge */}
            <div className="flex justify-center mb-6 animate-fade-up" style={{ animationDelay: "50ms" }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#D72638]/10 border border-[#D72638]/30 rounded-full">
                <span className="text-sm">📸</span>
                <span className="text-xs font-mono text-[#D72638] tracking-widest">CITIZEN PORTAL</span>
              </div>
            </div>

            {/* ── CHOOSE MODE ── */}
            {mode === "choose" && (
              <div className="animate-fade-up" style={{ animationDelay: "100ms" }}>
                <div className="text-center mb-8">
                  <h1
                    className="text-4xl md:text-5xl font-bold mb-3"
                    style={{ fontFamily: "var(--font-bebas), Bebas Neue, sans-serif" }}
                  >
                    HOW WOULD YOU<br />
                    <span className="text-[#D72638]">LIKE TO CONTINUE?</span>
                  </h1>
                  <p className="text-sm text-[#6B7280]">
                    You can report anonymously as a guest, or sign in for rescue tracking & history.
                  </p>
                </div>

                <div className="space-y-3">
                  {/* Guest */}
                  <button
                    onClick={handleGuestContinue}
                    className="group w-full bg-[#0E0E18] border border-[#2A2A3A] hover:border-[#D72638]/50 rounded-2xl p-5 text-left transition-all duration-300 hover:bg-[#D72638]/5 hover:-translate-y-0.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#D72638]/10 rounded-xl flex items-center justify-center text-2xl border border-[#D72638]/20 group-hover:scale-110 transition-transform">
                          👤
                        </div>
                        <div>
                          <div
                            className="font-bold text-lg text-[#F0F4F8] group-hover:text-[#D72638] transition-colors"
                            style={{ fontFamily: "var(--font-barlow), Barlow Condensed, sans-serif" }}
                          >
                            CONTINUE AS GUEST
                          </div>
                          <div className="text-xs text-[#6B7280] mt-0.5">No account needed — report instantly</div>
                        </div>
                      </div>
                      <span className="text-[#6B7280] group-hover:text-[#D72638] transition-colors text-xl">→</span>
                    </div>

                    {/* Feature pills */}
                    <div className="flex gap-2 mt-4 ml-16">
                      {["Report animals", "View live map", "Track rescue"].map(f => (
                        <span key={f} className="text-[10px] font-mono text-[#6B7280] bg-[#1A1A2A] border border-[#2A2A3A] px-2 py-0.5 rounded">
                          {f}
                        </span>
                      ))}
                    </div>
                  </button>

                  {/* Divider */}
                  <div className="flex items-center gap-3 py-1">
                    <div className="flex-1 h-px bg-[#2A2A3A]" />
                    <span className="text-xs font-mono text-[#3A3A4A]">OR</span>
                    <div className="flex-1 h-px bg-[#2A2A3A]" />
                  </div>

                  {/* Sign In */}
                  <button
                    onClick={() => setMode("login")}
                    className="group w-full bg-[#0E0E18] border border-[#2A2A3A] hover:border-[#F5A623]/50 rounded-2xl p-5 text-left transition-all duration-300 hover:bg-[#F5A623]/5 hover:-translate-y-0.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#F5A623]/10 rounded-xl flex items-center justify-center text-2xl border border-[#F5A623]/20 group-hover:scale-110 transition-transform">
                          🔑
                        </div>
                        <div>
                          <div
                            className="font-bold text-lg text-[#F0F4F8] group-hover:text-[#F5A623] transition-colors"
                            style={{ fontFamily: "var(--font-barlow), Barlow Condensed, sans-serif" }}
                          >
                            SIGN IN / CREATE ACCOUNT
                          </div>
                          <div className="text-xs text-[#6B7280] mt-0.5">Save history, track past reports, get notifications</div>
                        </div>
                      </div>
                      <span className="text-[#6B7280] group-hover:text-[#F5A623] transition-colors text-xl">→</span>
                    </div>

                    <div className="flex gap-2 mt-4 ml-16">
                      {["Rescue history", "Notifications", "Profile"].map(f => (
                        <span key={f} className="text-[10px] font-mono text-[#6B7280] bg-[#1A1A2A] border border-[#2A2A3A] px-2 py-0.5 rounded">
                          {f}
                        </span>
                      ))}
                    </div>
                  </button>

                  {/* Create account shortcut */}
                  <p className="text-center text-xs text-[#4B5563] pt-1">
                    New here?{" "}
                    <button
                      onClick={() => setMode("signup")}
                      className="text-[#F5A623] hover:underline font-medium"
                    >
                      Create a free account
                    </button>
                  </p>
                </div>
              </div>
            )}

            {/* ── LOGIN / SIGNUP CARD ── */}
            {(mode === "login" || mode === "signup") && (
              <div
                className="bg-[#0E0E18] border border-[#2A2A3A] rounded-2xl overflow-hidden animate-fade-up shadow-2xl shadow-black/60"
                style={{ animationDelay: "100ms" }}
              >
                {/* Tabs */}
                <div className="flex border-b border-[#2A2A3A]">
                  {(["login", "signup"] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => { setMode(m); setErrors({}) }}
                      className={`flex-1 py-4 text-sm font-bold tracking-widest transition-all duration-200 ${
                        mode === m
                          ? "text-[#D72638] bg-[#D72638]/5 border-b-2 border-[#D72638]"
                          : "text-[#4B5563] hover:text-[#9CA3AF]"
                      }`}
                      style={{ fontFamily: "var(--font-barlow), Barlow Condensed, sans-serif" }}
                    >
                      {m === "login" ? "SIGN IN" : "SIGN UP"}
                    </button>
                  ))}
                </div>

                <div className="p-6 md:p-8">
                  {success ? (
                    <SuccessState mode={mode} />
                  ) : (
                    <div className="space-y-4">
                      <p className="text-xs font-mono text-[#6B7280] tracking-wide mb-5">
                        {mode === "login"
                          ? "Welcome back. Sign in to access your rescue history."
                          : "Create a free account to track your reports and receive updates."}
                      </p>

                      {mode === "signup" && (
                        <CField
                          label="YOUR NAME"
                          placeholder="e.g. Priya Sharma"
                          value={form.name}
                          onChange={v => update("name", v)}
                          error={errors.name}
                        />
                      )}

                      <CField
                        label="EMAIL ADDRESS"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={v => update("email", v)}
                        error={errors.email}
                        type="email"
                      />

                      <CField
                        label="PASSWORD"
                        placeholder={mode === "signup" ? "Min. 6 characters" : "Enter your password"}
                        value={form.password}
                        onChange={v => update("password", v)}
                        error={errors.password}
                        type={showPassword ? "text" : "password"}
                        showToggle
                        toggleVisible={showPassword}
                        onToggle={() => setShowPassword(s => !s)}
                      />

                      {mode === "signup" && (
                        <CField
                          label="CONFIRM PASSWORD"
                          placeholder="Re-enter password"
                          value={form.confirmPassword}
                          onChange={v => update("confirmPassword", v)}
                          error={errors.confirmPassword}
                          type={showConfirm ? "text" : "password"}
                          showToggle
                          toggleVisible={showConfirm}
                          onToggle={() => setShowConfirm(s => !s)}
                        />
                      )}

                      {mode === "signup" && (
                        <div>
                          <label className="flex items-start gap-3 cursor-pointer group">
                            <div
                              onClick={() => update("agreeTerms", !form.agreeTerms)}
                              className={`mt-0.5 w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-all ${
                                form.agreeTerms ? "bg-[#D72638] border-[#D72638]" : "border-[#3A3A4A] group-hover:border-[#D72638]/50"
                              }`}
                            >
                              {form.agreeTerms && (
                                <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            <span className="text-xs text-[#6B7280] leading-relaxed">
                              I agree to the{" "}
                              <span className="text-[#D72638] hover:underline cursor-pointer">Terms</span>{" "}
                              and{" "}
                              <span className="text-[#D72638] hover:underline cursor-pointer">Privacy Policy</span>
                            </span>
                          </label>
                          {errors.agreeTerms && (
                            <p className="text-[#D72638] text-[11px] mt-1 font-mono">{errors.agreeTerms}</p>
                          )}
                        </div>
                      )}

                      {mode === "login" && (
                        <div className="text-right -mt-1">
                          <button className="text-xs font-mono text-[#D72638]/70 hover:text-[#D72638] transition-colors">
                            Forgot password?
                          </button>
                        </div>
                      )}

                      <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="w-full mt-2 py-3.5 bg-[#D72638] hover:bg-[#e53e4f] disabled:opacity-70 text-white font-bold text-sm tracking-widest rounded-lg transition-all duration-200 hover:scale-[1.01] active:scale-[0.98] shadow-lg shadow-[#D72638]/20 flex items-center justify-center gap-2"
                        style={{ fontFamily: "var(--font-barlow), Barlow Condensed, sans-serif" }}
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            {mode === "login" ? "SIGNING IN..." : "CREATING ACCOUNT..."}
                          </>
                        ) : (
                          mode === "login" ? "SIGN IN →" : "CREATE ACCOUNT →"
                        )}
                      </button>

                      <div className="flex items-center gap-3 pt-1">
                        <div className="flex-1 h-px bg-[#2A2A3A]" />
                        <span className="text-xs font-mono text-[#3A3A4A]">OR</span>
                        <div className="flex-1 h-px bg-[#2A2A3A]" />
                      </div>

                      <button
                        onClick={handleGuestContinue}
                        className="w-full py-3 bg-transparent border border-[#2A2A3A] hover:border-[#4A4A5A] text-[#9CA3AF] hover:text-[#F0F4F8] font-semibold text-sm tracking-widest rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                        style={{ fontFamily: "var(--font-barlow), Barlow Condensed, sans-serif" }}
                      >
                        👤 CONTINUE AS GUEST
                      </button>

                      <p className="text-center text-xs text-[#4B5563]">
                        {mode === "login" ? "No account? " : "Already registered? "}
                        <button
                          onClick={() => { setMode(mode === "login" ? "signup" : "login"); setErrors({}) }}
                          className="text-[#D72638] hover:underline font-medium"
                        >
                          {mode === "login" ? "Sign up free" : "Sign in"}
                        </button>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Back to choose */}
            {mode !== "choose" && (
              <button
                onClick={() => { setMode("choose"); setErrors({}); setSuccess(false) }}
                className="block mx-auto mt-4 text-xs font-mono text-[#4B5563] hover:text-[#9CA3AF] transition-colors animate-fade-up"
                style={{ animationDelay: "200ms" }}
              >
                ← Back to options
              </button>
            )}

            <p className="text-center text-xs font-mono text-[#3A3A4A] mt-5 animate-fade-up" style={{ animationDelay: "250ms" }}>
              Guest reports are anonymous and not stored to your profile
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}

function SuccessState({ mode }: { mode: Mode }) {
  return (
    <div className="text-center py-6 animate-fade-up">
      <div className="w-16 h-16 bg-[#D72638]/15 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#D72638]/30">
        <svg className="w-8 h-8 text-[#D72638]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-[#D72638] mb-2" style={{ fontFamily: "var(--font-barlow), Barlow Condensed, sans-serif" }}>
        {mode === "login" ? "WELCOME BACK!" : "ACCOUNT CREATED!"}
      </h3>
      <p className="text-sm text-[#6B7280]">Taking you to the citizen portal...</p>
    </div>
  )
}

interface CFieldProps {
  label: string
  placeholder: string
  value: string
  onChange: (v: string) => void
  error?: string
  type?: string
  showToggle?: boolean
  toggleVisible?: boolean
  onToggle?: () => void
}

function CField({ label, placeholder, value, onChange, error, type = "text", showToggle, toggleVisible, onToggle }: CFieldProps) {
  return (
    <div>
      <label className="block text-[10px] font-mono tracking-widest text-[#6B7280] mb-1.5">{label}</label>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          className={`w-full bg-[#12121A] border rounded-lg px-3.5 py-2.5 text-sm text-[#F0F4F8] placeholder-[#3A3A4A] outline-none transition-all duration-200 ${
            error
              ? "border-[#D72638] focus:border-[#D72638]"
              : "border-[#2A2A3A] hover:border-[#3A3A4A] focus:border-[#D72638]"
          } ${showToggle ? "pr-10" : ""}`}
          onFocus={e => { if (!error) e.target.style.borderColor = "#D72638" }}
          onBlur={e => { if (!error) e.target.style.borderColor = "#2A2A3A" }}
        />
        {showToggle && (
          <button type="button" onClick={onToggle} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4B5563] hover:text-[#9CA3AF] transition-colors">
            {toggleVisible ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
            )}
          </button>
        )}
      </div>
      {error && <p className="text-[#D72638] text-[11px] mt-1 font-mono">{error}</p>}
    </div>
  )
}
