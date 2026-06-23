import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import type { ReactNode } from 'react'

type LegalShellProps = {
  title: string
  lastUpdated?: string
  children: ReactNode
}

export function LegalShell({ title, lastUpdated, children }: LegalShellProps) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-void text-primary">
      {/* Top bar */}
      <header className="border-b border-white/[0.08]">
        <div className="container-page flex h-16 items-center justify-between">
          <Link href="/" className="logo-mark flex items-center" aria-label="0to1 home">
            <img src="/darkmode.png" alt="0to1 Logo" className="h-8 md:h-10 w-auto object-contain block" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to home
          </Link>
        </div>
      </header>

      {/* Content */}
      <section className="container-page py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-syne text-4xl font-black tracking-tight text-white md:text-6xl">{title}</h1>
          {lastUpdated ? (
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
              Last Updated: {lastUpdated}
            </p>
          ) : null}
          <div className="legal-body mt-12 space-y-10 text-base leading-8 text-zinc-300">{children}</div>
        </div>
      </section>

      {/* Footer */}
      <footer className="section-dark border-t border-white/[0.08] py-10">
        <div className="container-page flex flex-col items-center justify-between gap-4 text-sm font-semibold text-zinc-500 sm:flex-row">
          <p className="text-zinc-600">© 2026 DevHub India LLP</p>
          <div className="flex flex-wrap items-center gap-6">
            <Link className="transition-colors hover:text-white" href="/privacy">Privacy Policy</Link>
            <Link className="transition-colors hover:text-white" href="/terms">Terms of Service</Link>
            <Link className="transition-colors hover:text-white" href="/contact">Contact &amp; Support</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}

type SectionProps = {
  heading: string
  children: ReactNode
}

export function LegalSection({ heading, children }: SectionProps) {
  return (
    <div>
      <h2 className="font-syne text-xl font-black text-white md:text-2xl">{heading}</h2>
      <div className="mt-4 space-y-3 text-zinc-400">{children}</div>
    </div>
  )
}
