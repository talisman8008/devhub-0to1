import type { Metadata } from 'next'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import { LegalShell } from '@/components/legal-shell'

export const metadata: Metadata = {
  title: '0to1 — Contact & Support',
  description: 'Get help with applications, payments, cohort updates, and general support for 0to1 by DevHub.'
}

export default function ContactPage() {
  return (
    <LegalShell title="Contact & Support">
      <p className="text-lg text-zinc-300">Need help? We&rsquo;re happy to assist.</p>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
        <p className="font-syne text-lg font-black text-white">DevHub India LLP</p>
        <p className="mt-1 text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
          Support Contact: Jayesh Dhokle
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div className="flex items-start gap-3">
            <Mail className="mt-1 h-5 w-5 text-accent" aria-hidden="true" />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">Email</p>
              <a className="text-white hover:underline" href="mailto:jrdhokle@gmail.com">jrdhokle@gmail.com</a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="mt-1 h-5 w-5 text-accent" aria-hidden="true" />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">Phone</p>
              <a className="text-white hover:underline" href="tel:+919637621812">+91 96376 21812</a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="mt-1 h-5 w-5 text-accent" aria-hidden="true" />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">Office</p>
              <p className="text-white">DevHub Office</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="mt-1 h-5 w-5 text-accent" aria-hidden="true" />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">Response Time</p>
              <p className="text-white">Typically within 24&ndash;48 business hours</p>
            </div>
          </div>
        </div>
      </div>

      <p className="text-zinc-400">
        For application-related questions, payment queries, cohort updates, or general support, please reach out
        through the contact details above.
      </p>
    </LegalShell>
  )
}
