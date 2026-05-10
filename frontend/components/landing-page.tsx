'use client'

import {
  ArrowDown,
  BadgeCheck,
  BriefcaseBusiness,
  Check,
  Code2,
  Compass,
  Megaphone,
  Rocket,
  Sparkles,
  Star,
  Trophy,
  Users
} from 'lucide-react'
import { AnimationBoot } from '@/components/animation-boot'
import { ParticleField } from '@/components/particle-field'
import { SmoothScrollProvider } from '@/components/smooth-scroll-provider'
import { WaitlistForm } from '@/components/waitlist-form'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const stats = [
  ['6', 'month program', ''],
  ['100', 'students', ''],
  ['5', 'startups launched', '+'],
  ['100', 'success rate', '%']
] as const

const programPillars = [
  'Come up with business ideas',
  'Build products from scratch',
  'Take them to market',
  'Run them like real startups'
] as const

const phases = [
  {
    icon: Compass,
    title: 'Ideate',
    text: 'Come up with real business ideas and validate them'
  },
  {
    icon: Code2,
    title: 'Build',
    text: 'Build products from scratch with clear ownership'
  },
  {
    icon: Megaphone,
    title: 'Market',
    text: 'Take products to market and find real users'
  },
  {
    icon: BriefcaseBusiness,
    title: 'Run',
    text: 'Run your startup like a real business'
  }
] as const

const audience = [
  ['Developers & Engineers', 'Who want to build products, not just features.'],
  ['Designers', 'Who want to shape real user experiences.'],
  ['Marketers & Growth', 'Who want to take products to market.'],
  ['Business Students', 'Who want hands-on startup exposure.'],
  ['Aspiring Founders', 'Anyone who wants to explore entrepreneurship seriously.'],
  ['Cross-Functional Collaboration', 'Work together as a startup team, just like in the real world.']
] as const

const outcomes = [
  {
    icon: Rocket,
    title: 'End-to-End Startup Product',
    text: 'A real product or startup you worked on end-to-end. From scratch to market launch.'
  },
  {
    icon: Users,
    title: 'Founding Team Experience',
    text: 'Experience working in a cross-functional founding team with real accountability.'
  },
  {
    icon: Star,
    title: 'Impactful Portfolio',
    text: 'Strong execution and a portfolio that reflects real-world impact and traction.'
  },
  {
    icon: Trophy,
    title: 'DevHub Ecosystem Path',
    text: 'Certification, recommendations, and long-term opportunities within the DevHub ecosystem.'
  }
] as const

const journey = [
  ['01', Rocket, 'Ideation & Problem Discovery', 'Identify real problems worth solving and validate ideas early.'],
  ['02', Code2, 'Product & MVP Building', 'Design and build a functional product with clear ownership across roles.'],
  ['03', Users, 'Market Validation', 'Test assumptions with real users, feedback, and iterations.'],
  ['04', Megaphone, 'Launch', 'Ship the product publicly. Not a demo, a real launch.'],
  ['05', Sparkles, 'Growth & Execution', 'Work on traction, growth experiments, and early revenue signals.'],
  ['06', BadgeCheck, 'Incubation Path', 'High-performing teams move forward into founder tracks and incubation within DevHub.']
] as const

export function LandingPage() {
  return (
    <>
      <SmoothScrollProvider />
      <AnimationBoot />
      <main id="top" className="min-h-screen overflow-hidden bg-void text-primary">
        <Nav />
        <Hero />
        <StatsMarquee />
        <About />
        <Audience />
        <Paradigm />
        <Outcomes />
        <Journey />
        <Waitlist />
        <Footer />
      </main>
    </>
  )
}

function Nav() {
  return (
    <nav className="nav-shell fixed inset-x-0 top-0 z-50 bg-transparent" aria-label="Main navigation">
      <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between px-5 sm:px-7">
        <a href="#top" className="logo-mark text-2xl font-black tracking-[-0.06em]" aria-label="0to1 home">
          0to1
        </a>
        <div className="hidden items-center gap-10 text-sm font-semibold md:flex">
          <a className="nav-link transition-colors" href="#about">
            About
          </a>
          <a className="nav-link transition-colors" href="#journey">
            Journey
          </a>
          <a className="nav-link transition-colors" href="#outcomes">
            Outcomes
          </a>
        </div>
        <Button asChild size="sm" className="nav-cta rounded-full px-5">
          <a href="#waitlist">Join Waitlist</a>
        </Button>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="hero-light relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 pb-16 pt-24 text-black" aria-label="Hero">
      <ParticleField />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_52%_30%,rgba(255,255,255,0.1),rgba(255,255,255,0)_42%)]" aria-hidden="true" />
      <div className="relative z-10 mx-auto flex w-full max-w-[1180px] flex-col items-center text-center">
        <p className="hero-badge pill-light mb-10">
          <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
          0to1 by DevHub | Cohort 2025
        </p>
        <h1 className="hero-heading font-syne font-black uppercase leading-[0.86] tracking-normal">
          <span className="hero-word block whitespace-nowrap">Build a real</span>
          <span className="hero-word block whitespace-nowrap">startup</span>
        </h1>
        <div className="hero-copy mt-16 max-w-[830px]">
          <p className="text-[1.35rem] font-bold leading-tight text-black md:text-[1.48rem]">Build a real startup. Not just an internship.</p>
          <p className="mx-auto mt-6 max-w-[780px] text-lg font-semibold leading-8 text-zinc-600 md:text-[1.32rem] md:leading-9">
            0to1 is a 6-month, execution-first startup program by DevHub, built for students who don&apos;t just want experience. They want ownership.
          </p>
          <p className="mx-auto mt-5 max-w-[780px] text-base font-semibold leading-7 text-zinc-500 md:text-lg md:leading-8">
            This is where engineers, designers, marketers, and business students come together to turn ideas into real products and real businesses.
          </p>
        </div>
        <div className="hero-tags mt-8 flex flex-wrap items-center justify-center gap-3 text-sm font-bold text-zinc-700">
          <span>No classrooms</span>
          <span>No simulations</span>
          <span>Just building</span>
        </div>
        <div className="hero-actions mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="rounded-full bg-black px-7 text-white hover:bg-zinc-800">
            <a href="#waitlist">Secure Your Spot</a>
          </Button>
          <Button asChild variant="secondary" size="lg" className="rounded-full border-zinc-300 bg-white/40 px-7 text-black hover:bg-white">
            <a href="#about">
              Learn more <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}

function StatsMarquee() {
  const row = [...stats, ...stats]

  return (
    <section className="relative overflow-hidden border-y border-white/[0.08] bg-black py-5" aria-label="Program statistics">
      <div className="flex min-w-max animate-marquee gap-4">
        {row.map(([target, label, suffix], index) => (
          <div key={`${label}-${index}`} className="stat-card">
            <div className="font-mono text-[3.8rem] font-bold leading-none text-white">
              <span className="counter" data-target={target}>
                0
              </span>
              {suffix}
            </div>
            <p className="mt-2 text-xs font-black uppercase tracking-[0.18em] text-zinc-500">{label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="section-dark py-24 md:py-36" aria-label="What is 0to1">
      <div className="container-page">
        <div className="reveal mx-auto max-w-[920px] text-center">
          <p className="section-pill mx-auto mb-10">The Program</p>
          <h2 className="mega-title normal-case">
            What is <span className="italic text-accent">0to1?</span>
          </h2>
          <p className="mx-auto mt-10 max-w-[890px] text-xl font-semibold leading-9 text-zinc-500 md:text-2xl md:leading-[1.65]">
            0to1 is a real-world startup internship + accelerator hybrid. Instead of working on hypothetical assignments or isolated tasks, participants:
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-4">
          {programPillars.map((pillar) => (
            <div key={pillar} className="reveal glass-pill text-center">
              {pillar}
            </div>
          ))}
        </div>
        <p className="reveal mx-auto mt-20 max-w-4xl text-center text-2xl font-bold leading-10 text-zinc-400 md:text-3xl">
          You don&apos;t just &quot;learn&quot; how startups work. <span className="italic text-white">You build one from zero.</span>
        </p>
        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-4">
          {phases.map(({ icon: Icon, title, text }, index) => (
            <article key={title} className="reveal phase-card">
              <div className="mb-8 flex items-center justify-between">
                <Icon className="h-7 w-7 text-accent" aria-hidden="true" />
                <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">Phase {String(index + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="font-syne text-3xl font-black text-white">{title}</h3>
              <p className="mt-4 text-base font-semibold leading-7 text-zinc-500">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Audience() {
  return (
    <section className="section-dark py-24 md:py-36" aria-label="Who is 0to1 for">
      <div className="container-page">
        <div className="reveal grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="section-pill mb-8">Target Audience</p>
            <h2 className="mega-title">
              Who is <span className="block text-accent">0to1 for?</span>
            </h2>
          </div>
          <p className="max-w-2xl text-xl font-semibold leading-9 text-zinc-500">
            0to1 is built for students who want more than a resume line.
          </p>
        </div>
        <div className="audience-grid reveal mt-16">
          {audience.map(([title, text]) => (
            <article key={title} className="audience-card">
              <Check className="mb-8 h-5 w-5 text-accent" aria-hidden="true" />
              <h3 className="font-syne text-2xl font-black text-white">{title}</h3>
              <p className="mt-4 text-base font-semibold leading-7 text-zinc-500">{text}</p>
            </article>
          ))}
        </div>
        <div className="reveal mt-14 flex justify-center">
          <Button asChild size="lg" className="rounded-full bg-accent px-8 text-black hover:bg-[#32ffd0]">
            <a href="#waitlist">Apply for Cohort 2025</a>
          </Button>
        </div>
      </div>
    </section>
  )
}

function Paradigm() {
  return (
    <section className="section-dark py-24 md:py-36" aria-label="0to1 distinct">
      <div className="container-page">
        <div className="reveal mx-auto max-w-4xl text-center">
          <p className="section-pill mx-auto mb-8">The Paradigm Shift</p>
          <h2 className="mega-title">
            0to1 <span className="text-accent">Distinct</span>
          </h2>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <article className="reveal compare-card opacity-80">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-zinc-500">The Traditional Way</p>
            <h3 className="mt-5 font-syne text-5xl font-black text-white/[0.18] md:text-7xl">Watching</h3>
            <ul className="mt-10 space-y-5 text-xl font-bold text-zinc-500">
              <li>Classroom-based learning</li>
              <li>Task-based intern work</li>
              <li>Simulated projects</li>
            </ul>
            <p className="mt-10 text-lg font-semibold leading-8 text-zinc-600">
              Most programs keep you on the sidelines. You observe, but you don&apos;t own.
            </p>
          </article>
          <article className="reveal compare-card compare-card-hot">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-accent">The 0to1 Paradigm</p>
            <h3 className="mt-5 font-syne text-5xl font-black text-accent md:text-7xl">Inside 1</h3>
            <ul className="mt-10 space-y-5 text-xl font-bold text-white">
              <li>Real Accountability</li>
              <li>Actual Market Launch</li>
              <li>Direct Core Access</li>
            </ul>
            <p className="mt-10 text-lg font-semibold leading-8 text-zinc-400">Direct bridge to the Founding Team.</p>
          </article>
        </div>
      </div>
    </section>
  )
}

function Outcomes() {
  return (
    <section id="outcomes" className="section-dark py-24 md:py-36" aria-label="Outcomes">
      <div className="container-page">
        <div className="reveal text-center">
          <p className="section-pill mx-auto mb-12">The Result</p>
          <h2 className="mega-title">
            What you&apos;ll <span className="text-accent">achieve</span>
          </h2>
        </div>
        <div className="mt-20 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {outcomes.map(({ icon: Icon, title, text }, index) => (
            <article key={title} className="reveal outcome-card">
              <span className="absolute inset-x-0 top-14 select-none text-center font-syne text-[8rem] font-black italic leading-none text-white/[0.035] md:text-[10rem]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="relative z-10 inline-flex border-l-2 border-accent bg-white/[0.04] px-4 py-2 font-mono text-xs font-bold tracking-[0.35em] text-zinc-300">
                {String(index + 1).padStart(2, '0')}
              </span>
              <Icon className="relative z-10 mx-auto my-16 h-16 w-16 text-white" aria-hidden="true" />
              <h3 className="relative z-10 font-syne text-2xl font-black text-white">{title}</h3>
              <p className="relative z-10 mt-4 text-base font-semibold leading-7 text-zinc-500">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Journey() {
  return (
    <section id="journey" className="journey-section section-dark py-24 md:py-40" aria-label="6-month journey">
      <div className="container-page">
        <div className="reveal mx-auto max-w-5xl text-center">
          <p className="section-pill mx-auto mb-12">The Roadmap</p>
          <h2 className="journey-title">
            The 6-month <span>journey</span>
          </h2>
        </div>
        <div className="journey-track relative mx-auto mt-28 max-w-6xl">
          <div className="journey-line" aria-hidden="true">
            <span className="journey-line-base" />
            <span className="journey-line-active" />
            <span className="journey-line-dot" />
          </div>
          <div className="space-y-10 md:space-y-0">
            {journey.map(([number, Icon, title, text], index) => {
              const isLeft = index % 2 === 0

              return (
                <article key={title} className="journey-item reveal relative grid min-h-[270px] grid-cols-1 md:grid-cols-[1fr_120px_1fr]">
                  <div className={cn('journey-card', isLeft ? 'md:col-start-1' : 'md:col-start-3')}>
                    <span className="mb-9 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.1] bg-white/[0.04] text-accent">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="font-syne text-3xl font-black text-white">{title}</h3>
                    <p className="mt-5 text-lg font-semibold leading-8 text-zinc-500">{text}</p>
                  </div>
                  <div className="journey-marker" aria-hidden="true">
                    <span className="journey-marker-badge">{number}</span>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function Waitlist() {
  return (
    <section id="waitlist" className="waitlist-galaxy section-dark relative py-24 md:py-36" aria-label="Join waitlist">
      <div className="container-page">
        <div className="reveal cta-panel secure-panel">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="secure-copy">
              <p className="secure-kicker">
                <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                Secure Your Future
              </p>
              <h2 className="secure-title" aria-label="From zero to something real">
                <span className="secure-title-line">From zero to</span>
                <span className="secure-title-line">something</span>
                <span className="secure-title-line text-white/60">real.</span>
              </h2>
              <p className="devhub-mark mt-8 inline-flex text-2xl font-black text-white">0to1 by DevHub</p>
              <p className="mt-4 max-w-xl text-xl font-bold leading-9 text-zinc-400">
                A 6-month journey from <span className="italic text-white">idea</span> &rarr; <span className="italic text-white">product</span> &rarr;{' '}
                <span className="italic text-white">business.</span>
              </p>
              <div className="mt-10 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="mini-proof">
                  <p>Founding Track</p>
                  <span>Direct leadership on products.</span>
                </div>
                <div className="mini-proof">
                  <p>Limited Intake</p>
                  <span>100 slots for Cohort 2025.</span>
                </div>
              </div>
            </div>
            <div className="secure-form-shell">
              <WaitlistForm />
              <p className="mt-5 text-center text-xs font-bold uppercase tracking-[0.18em] text-zinc-600">
                Early Access Membership &bull; Cohort 2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="section-dark border-t border-white/[0.08] py-14">
      <div className="container-page grid grid-cols-1 gap-10 text-sm font-semibold text-zinc-500 md:grid-cols-[1fr_auto_auto]">
        <div>
          <a href="#top" className="logo-mark text-3xl font-black tracking-[-0.06em] text-white">
            0to1
          </a>
          <p className="mt-5 max-w-md text-base leading-7">A DevHub Accelerator Program helping the next generation of builders become founders.</p>
          <p className="mt-8 text-zinc-600">(c) 2025 0to1 by DevHub. Built for builders.</p>
        </div>
        <div className="grid gap-4">
          <h3 className="font-syne text-base font-black text-white">Quick Links</h3>
          <a className="transition-colors hover:text-white" href="#about">About</a>
          <a className="transition-colors hover:text-white" href="#journey">Journey</a>
          <a className="transition-colors hover:text-white" href="#outcomes">Outcomes</a>
          <a className="transition-colors hover:text-white" href="#waitlist">Waitlist</a>
        </div>
        <div className="grid content-start gap-4">
          <h3 className="font-syne text-base font-black text-white">Contact</h3>
          <a className="transition-colors hover:text-white" href="mailto:0to1.wtf@gmail.com">0to1.wtf@gmail.com</a>
          <a className="transition-colors hover:text-white" href="https://www.instagram.com/0to1.wtf/" rel="noreferrer" target="_blank">
            @0to1.wtf
          </a>
          <div className="flex gap-4 text-xs uppercase tracking-[0.18em] text-zinc-700">
            <a className="transition-colors hover:text-white" href="#top">Privacy Policy</a>
            <a className="transition-colors hover:text-white" href="#top">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
