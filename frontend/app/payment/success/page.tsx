'use client'

import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function SuccessContent() {
  const params = useSearchParams()
  const paymentId = params.get('razorpay_payment_id')

  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center px-4 font-sans overflow-x-hidden">

      {/* Glow backdrop */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(600px,100vw)] h-[min(600px,100vw)] bg-[#00ffc4]/5 blur-[120px] rounded-full"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-md px-2">

        {/* Icon */}
        <div className="mb-8 flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#00ffc4]/10 border border-[#00ffc4]/30 shadow-[0_0_60px_rgba(0,255,196,0.15)]">
          <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-[#00ffc4]" strokeWidth={1.5} />
        </div>

        <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-[#00ffc4] mb-4">
          Payment Confirmed
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-5 leading-tight">
          You're in.{' '}
          <span className="text-white/40">Welcome to 0to1.</span>
        </h1>

        <p className="text-base sm:text-lg text-white/60 leading-relaxed mb-4 px-2">
          Your spot in <strong className="text-white">Cohort 01</strong> is secured.
          We'll reach out within 24 hours with onboarding details.
        </p>

        {paymentId && (
          <p className="text-[11px] text-white/25 font-mono mb-8 break-all px-4">
            Payment ID: {paymentId}
          </p>
        )}

        {!paymentId && <div className="mb-8" />}

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Link
            href="/"
            className="flex-1 h-12 rounded-full border border-white/20 flex items-center justify-center text-xs sm:text-sm font-bold uppercase tracking-widest text-white/70 hover:text-white hover:border-white/40 transition-all"
          >
            Back to Home
          </Link>
          <a
            href="https://www.instagram.com/0to1.wtf/"
            target="_blank"
            rel="noreferrer"
            className="flex-1 h-12 rounded-full bg-[#00ffc4] flex items-center justify-center text-xs sm:text-sm font-black uppercase tracking-widest text-black hover:opacity-90 active:scale-[0.98] transition-all"
          >
            Follow @0to1.wtf
          </a>
        </div>
      </div>
    </main>
  )
}

export default function SuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  )
}
