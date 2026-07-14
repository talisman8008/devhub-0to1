'use client'

import { useEffect, useRef } from 'react'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

function RazorpayButton({ buttonId, label, sublabel }: { buttonId: string; label: string; sublabel: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    if (containerRef.current.querySelector('script')) return

    const form = document.createElement('form')
    form.setAttribute('action', '/payment/success')
    containerRef.current.appendChild(form)

    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/payment-button.js'
    script.async = true
    script.setAttribute('data-payment_button_id', buttonId)
    form.appendChild(script)
  }, [buttonId])

  function handleClick() {
    // .razorpay-payment-button is just a span. We need to click the <a> or <button> inside it!
    const btn = containerRef.current?.querySelector('.razorpay-payment-button a, .razorpay-payment-button button') as HTMLElement
    if (btn) btn.click()
  }

  return (
    <div className="relative w-full mt-auto">
      {/* Razorpay form — completely hidden */}
      <div
        ref={containerRef}
        aria-hidden="true"
        style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden', opacity: 0, pointerEvents: 'none' }}
      />

      {/* Our visible button */}
      <button
        type="button"
        onClick={handleClick}
        className="w-full h-14 rounded-2xl bg-white flex items-center justify-center gap-2 cursor-pointer hover:bg-white/90 active:scale-[0.98] transition-all duration-150"
      >
        <span className="text-black font-black text-sm uppercase tracking-widest">{label}</span>
        {sublabel && <span className="text-black/40 font-semibold text-xs hidden sm:inline">{sublabel}</span>}
      </button>
    </div>
  )
}

export default function PaymentPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col font-sans selection:bg-white/20 overflow-x-hidden">

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-4 sm:px-8 md:px-12 backdrop-blur-md bg-[#050505]/80 border-b border-white/5">
        <Link href="/" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4 shrink-0" />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#050505] shrink-0">
          <span className="font-bold text-xs">01</span>
        </div>
      </nav>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 pt-28 pb-12">

        {/* Header */}
        <div className="text-center w-full max-w-2xl mb-10 px-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3 leading-tight">
            Join the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">
              0to1 Program
            </span>
          </h1>
          <p className="text-base sm:text-lg text-white/60">
            Select your preferred payment plan below to secure your spot.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-4xl">

          {/* Monthly */}
          <div className="rounded-2xl bg-[#0A0A0A] border border-white/10 p-6 sm:p-8 flex flex-col transition-all hover:border-white/20">
            <div className="mb-6">
              <h3 className="text-xl sm:text-2xl font-semibold mb-2">Monthly</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-bold">₹999</span>
                <span className="text-white/50 text-sm">/month</span>
              </div>
              <p className="text-sm text-white/40 mt-1">For 6 months · ₹5,994 total</p>
            </div>

            <ul className="flex-1 space-y-3 mb-8">
              {['Full access to the 0to1 curriculum', 'Weekly mentorship sessions', 'Private community access'].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/70">
                  <CheckCircle2 className="w-4 h-4 text-white/60 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <RazorpayButton buttonId="pl_TCsqDhkenJNg3j" label="Get Started" sublabel="₹999/mo" />
          </div>

          {/* One-Time */}
          <div className="relative rounded-2xl bg-gradient-to-b from-[#111111] to-[#0A0A0A] border border-white/20 p-6 sm:p-8 flex flex-col transition-all hover:border-white/30 shadow-xl shadow-black/50">
            <div className="absolute top-4 right-4">
              <span className="inline-block px-3 py-1 bg-white text-black text-[10px] font-black uppercase tracking-wider rounded-full">
                Most Popular
              </span>
            </div>

            <div className="mb-6 pr-28">
              <h3 className="text-xl sm:text-2xl font-semibold mb-2">One-Time</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-bold">₹5,499</span>
              </div>
              <p className="text-sm text-white/40 mt-1">Pay once, yours forever</p>
            </div>

            <ul className="flex-1 space-y-3 mb-8">
              {['Everything in Monthly plan', 'Lifetime access to curriculum updates', 'Save ₹495 over 6 months'].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/70">
                  <CheckCircle2 className="w-4 h-4 text-white/60 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <RazorpayButton buttonId="pl_TCsxiVg4VVMGi3" label="Join Now" sublabel="₹5,499 one-time" />
          </div>

        </div>

        <p className="mt-8 text-xs text-white/25 text-center px-4">
          Secured by Razorpay · 0to1 by DevHub · Cohort 01 · June 2026
        </p>
      </div>
    </main>
  )
}
