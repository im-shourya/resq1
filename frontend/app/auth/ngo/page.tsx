"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Logo } from "@/components/resq/logo"

type Mode = "login" | "signup"

export default function NGOAuthPage() {
  const router = useRouter()
  const [mode, setMode] = useState<Mode>("login")
  const [isLoaded, setIsLoaded] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [success, setSuccess] = useState(false)

  // Form fields
  const [form, setForm] = useState({
    orgName: "",
    email: "",
    phone: "",
    city: "",
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
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address"
    if (!form.password) e.password = "Password is required"
    else if (form.password.length < 8) e.password = "At least 8 characters required"
    if (mode === "signup") {
      if (!form.orgName) e.orgName = "Organisation name is required"
      if (!form.phone) e.phone = "Phone number is required"
      if (!form.city) e.city = "City is required"
      if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match"
      if (!form.agreeTerms) e.agreeTerms = "You must agree to the terms"
    }
    return e
  }

  const handleSubmit = async () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setIsSubmitting(true)
    await new Promise(r => setTimeout(r, 1400))
    setIsSubmitting(false)
    setSuccess(true)
    await new Promise(r => setTimeout(r, 900))
    router.push("/ngo")
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F0F4F8] flex flex-col scanline-effect">
      <div className="grain-overlay" />

      {/* Ambient glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#22C55E]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[400px] h-[400px] bg-[#D72638]/5 rounded-full blur-3xl pointer-events-none" />

      <div className={`relative z-10 flex flex-col flex-1 transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        {/* Header */}
        <header className="flex items-center justify-between px-6 md:px-10 py-5 border-b border-[#2A2A3A]">
          <Link href="/landing"><Logo compact /></Link>
          <Link href="/landing" className="text-xs font-mono text-[#6B7280] hover:text-[#F0F4F8] transition-colors border border-[#2A2A3A] hover:border-[#4A4A5A] px-3 py-1.5 rounded">
            ← HOME
          </Link>
        </header>

        {/* Main */}
        <main className="flex-1 flex items-center justify-center px-4 py-10">
          <div className="w-full max-w-md">

            {/* Badge */}
            <div className="flex items-center justify-center mb-6 animate-fade-up" style={{ animationDelay: "50ms" }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#22C55E]/10 border border-[#22C55E]/30 rounded-full">
                <span className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse" />
                <span className="text-xs font-mono text-[#22C55E] tracking-widest">NGO PORTAL</span>
              </div>
            </div>

            {/* Card */}
            <div
              className="bg-[#0E0E18] border border-[#2A2A3A] rounded-2xl overflow-hidden animate-fade-up shadow-2xl shadow-black/60"
              style={{ animationDelay: "100ms" }}
            >
              {/* Mode toggle */}
              <div className="flex border-b border-[#2A2A3A]">
                {(["login", "signup"] as Mode[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => { setMode(m); setErrors({}) }}
                    className={`flex-1 py-4 text-sm font-bold tracking-widest transition-all duration-200 ${
                      mode === m
                        ? "text-[#22C55E] bg-[#22C55E]/5 border-b-2 border-[#22C55E]"
                        : "text-[#4B5563] hover:text-[#9CA3AF]"
                    }`}
                    style={{ fontFamily: "var(--font-barlow), Barlow Condensed, sans-serif" }}
                  >
                    {m === "login" ? "SIGN IN" : "CREATE ACCOUNT"}
                  </button>
                ))}
              </div>

              <div className="p-6 md:p-8">
                {success ? (
                  <SuccessState mode={mode} />
                ) : (
                  <div className="space-y-4">
                    <p className="text-xs font-mono text-[#6B7280] tracking-wide mb-6">
                      {mode === "login"
                        ? "Sign in to your NGO operations account."
                        : "Register your organisation to start dispatching rescues."}
                    </p>

                    {/* Signup-only fields */}
                    {mode === "signup" && (
                      <>
                        <Field
                          label="ORGANISATION NAME"
                          required
                          placeholder="e.g. PFA Mumbai, Blue Cross India"
                          value={form.orgName}
                          onChange={v => update("orgName", v)}
                          error={errors.orgName}
                        />
                        <div className="grid grid-cols-2 gap-3">
                          <Field
                            label="PHONE"
                            required
                            placeholder="+91 98765 43210"
                            value={form.phone}
                            onChange={v => update("phone", v)}
                            error={errors.phone}
                            type="tel"
                          />
                          <Field
                            label="CITY"
                            required
                            placeholder="Mumbai"
                            value={form.city}
                            onChange={v => update("city", v)}
                            error={errors.city}
                          />
                        </div>
                      </>
                    )}

                    {/* Email — always required */}
                    <Field
                      label="EMAIL ADDRESS"
                      required
                      placeholder="ngo@example.org"
                      value={form.email}
                      onChange={v => update("email", v)}
                      error={errors.email}
                      type="email"
                      accent="#22C55E"
                    />

                    {/* Password */}
                    <Field
                      label="PASSWORD"
                      required
                      placeholder={mode === "signup" ? "Min. 8 characters" : "Enter your password"}
                      value={form.password}
                      onChange={v => update("password", v)}
                      error={errors.password}
                      type={showPassword ? "text" : "password"}
                      showToggle
                      toggleVisible={showPassword}
                      onToggle={() => setShowPassword(s => !s)}
                    />

                    {mode === "signup" && (
                      <Field
                        label="CONFIRM PASSWORD"
                        required
                        placeholder="Re-enter your password"
                        value={form.confirmPassword}
                        onChange={v => update("confirmPassword", v)}
                        error={errors.confirmPassword}
                        type={showConfirm ? "text" : "password"}
                        showToggle
                        toggleVisible={showConfirm}
                        onToggle={() => setShowConfirm(s => !s)}
                      />
                    )}

                    {/* Terms */}
                    {mode === "signup" && (
                      <div>
                        <label className="flex items-start gap-3 cursor-pointer group">
                          <div
                            onClick={() => update("agreeTerms", !form.agreeTerms)}
                            className={`mt-0.5 w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-all ${
                              form.agreeTerms
                                ? "bg-[#22C55E] border-[#22C55E]"
                                : "border-[#3A3A4A] group-hover:border-[#22C55E]/50"
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
                            <span className="text-[#22C55E] cursor-pointer hover:underline">Terms of Service</span>{" "}
                            and{" "}
                            <span className="text-[#22C55E] cursor-pointer hover:underline">Privacy Policy</span>
                          </span>
                        </label>
                        {errors.agreeTerms && (
                          <p className="text-[#D72638] text-xs mt-1 font-mono">{errors.agreeTerms}</p>
                        )}
                      </div>
                    )}

                    {/* Forgot password */}
                    {mode === "login" && (
                      <div className="text-right -mt-1">
                        <button className="text-xs font-mono text-[#22C55E]/70 hover:text-[#22C55E] transition-colors">
                          Forgot password?
                        </button>
                      </div>
                    )}

                    {/* Submit */}
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="w-full mt-2 py-3.5 bg-[#22C55E] hover:bg-[#16a34a] disabled:opacity-70 text-[#0A0A0F] font-bold text-sm tracking-widest rounded-lg transition-all duration-200 hover:scale-[1.01] active:scale-[0.98] shadow-lg shadow-[#22C55E]/20 flex items-center justify-center gap-2"
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
                        mode === "login" ? "SIGN IN TO DASHBOARD →" : "CREATE NGO ACCOUNT →"
                      )}
                    </button>

                    {/* Switch mode */}
                    <p className="text-center text-xs text-[#4B5563] pt-1">
                      {mode === "login" ? "New to RESQ NGO? " : "Already have an account? "}
                      <button
                        onClick={() => { setMode(mode === "login" ? "signup" : "login"); setErrors({}) }}
                        className="text-[#22C55E] hover:underline font-medium"
                      >
                        {mode === "login" ? "Create account" : "Sign in"}
                      </button>
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Info note */}
            <p className="text-center text-xs font-mono text-[#3A3A4A] mt-5 animate-fade-up" style={{ animationDelay: "200ms" }}>
              🔒 Email verification required for NGO access
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
      <div className="w-16 h-16 bg-[#22C55E]/15 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#22C55E]/30">
        <svg className="w-8 h-8 text-[#22C55E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-[#22C55E] mb-2" style={{ fontFamily: "var(--font-barlow), Barlow Condensed, sans-serif" }}>
        {mode === "login" ? "WELCOME BACK" : "ACCOUNT CREATED"}
      </h3>
      <p className="text-sm text-[#6B7280]">Redirecting to dashboard...</p>
    </div>
  )
}

interface FieldProps {
  label: string
  required?: boolean
  placeholder: string
  value: string
  onChange: (v: string) => void
  error?: string
  type?: string
  accent?: string
  showToggle?: boolean
  toggleVisible?: boolean
  onToggle?: () => void
}

function Field({ label, required, placeholder, value, onChange, error, type = "text", accent = "#22C55E", showToggle, toggleVisible, onToggle }: FieldProps) {
  return (
    <div>
      <label className="block text-[10px] font-mono tracking-widest text-[#6B7280] mb-1.5">
        {label}
        {required && <span style={{ color: accent }} className="ml-1">*</span>}
      </label>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          className={`w-full bg-[#12121A] border rounded-lg px-3.5 py-2.5 text-sm text-[#F0F4F8] placeholder-[#3A3A4A] outline-none transition-all duration-200 focus:ring-1 ${
            error
              ? "border-[#D72638] focus:border-[#D72638] focus:ring-[#D72638]/30"
              : `border-[#2A2A3A] hover:border-[#3A3A4A] focus:ring-[${accent}]/30`
          } ${showToggle ? "pr-10" : ""}`}
          style={!error ? { ["--tw-ring-color" as string]: `${accent}40` } : {}}
          onFocus={e => { if (!error) e.target.style.borderColor = accent }}
          onBlur={e => { if (!error) e.target.style.borderColor = "#2A2A3A" }}
        />
        {showToggle && (
          <button
            type="button"
            onClick={onToggle}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4B5563] hover:text-[#9CA3AF] transition-colors"
          >
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
