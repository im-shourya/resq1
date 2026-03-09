import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-bg border-t border-[rgba(255,255,255,0.06)]">
      <div className="max-w-[1280px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-[10px] mb-4">
              <div className="w-9 h-9 rounded-full bg-bg-2 border border-red-border flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-red">
                  <path d="M12 2v8m0 4v8m-6-10h12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="font-display text-xl font-extrabold tracking-[-0.5px] text-text-1">
                RESQ
              </span>
            </Link>
            <p className="text-body-sm text-text-2 max-w-[280px]">
              {"India's first real-time AI animal emergency coordination grid. When seconds decide fate — RESQ acts."}
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-display text-sm font-bold text-text-1 mb-4">Platform</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#how-it-works" className="text-body-sm text-text-2 hover:text-text-1 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#features" className="text-body-sm text-text-2 hover:text-text-1 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#map" className="text-body-sm text-text-2 hover:text-text-1 transition-colors">
                  Live Map
                </Link>
              </li>
            </ul>
          </div>

          {/* For Users */}
          <div>
            <h4 className="font-display text-sm font-bold text-text-1 mb-4">For Users</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/auth/citizen" className="text-body-sm text-text-2 hover:text-text-1 transition-colors">
                  Report an Animal
                </Link>
              </li>
              <li>
                <Link href="/auth/ngo" className="text-body-sm text-text-2 hover:text-text-1 transition-colors">
                  NGO Registration
                </Link>
              </li>
              <li>
                <Link href="/auth/ngo" className="text-body-sm text-text-2 hover:text-text-1 transition-colors">
                  Vet Portal
                </Link>
              </li>
              <li>
                <Link href="/main" className="text-body-sm text-text-2 hover:text-text-1 transition-colors">
                  Track a Case
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm font-bold text-text-1 mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:hello@resq.in" className="text-body-sm text-text-2 hover:text-text-1 transition-colors">
                  hello@resq.in
                </a>
              </li>
              <li>
                <a href="tel:+911800RESQ" className="text-body-sm text-text-2 hover:text-text-1 transition-colors">
                  1800-RESQ-NOW
                </a>
              </li>
              <li className="pt-2">
                <div className="flex items-center gap-4">
                  <a href="#" className="text-text-2 hover:text-red transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-text-2 hover:text-red transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-text-2 hover:text-red transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-[rgba(255,255,255,0.06)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-caption text-text-3">
            © 2026 RESQ. All rights reserved. Built for a better tomorrow.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-caption text-text-3 hover:text-text-2 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-caption text-text-3 hover:text-text-2 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
