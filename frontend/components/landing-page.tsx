'use client'

import { useEffect, useRef, useState } from 'react'
import {
  ArrowDown,
  Code,
  Globe,
  Layers,
  Megaphone,
  Palette,
  Rocket,
  Star,
  TrendingUp,
  Trophy,
  Users,
  Menu,
  X,
  Briefcase
} from 'lucide-react'
import Link from 'next/link'
import { AnimationBoot } from '@/components/animation-boot'
import { HeroLiquidBackground, WaitlistGalaxyBackground } from '@/components/react-bits-backgrounds'
import { SmoothScrollProvider } from '@/components/smooth-scroll-provider'
import dynamic from 'next/dynamic'

const WaitlistForm = dynamic(() => import('@/components/waitlist-form').then(mod => mod.WaitlistForm), { ssr: false })
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const stats = [
  ['6', 'month program', ''],
  ['100', 'students', ''],
  ['5', 'startups launched', '+'],
  ['100', 'success rate', '%']
] as const

const programPillars = [
  <>Come up with business<br /> ideas</>,
  <>Build products from<br /> scratch</>,
  <>Take them to<br /> market</>,
  <>Run them like real<br /> startups</>
]

const phases = [
  {
    icon: Rocket,
    tone: 'accent',
    title: 'Ideate',
    text: 'Come up with real business ideas and validate them'
  },
  {
    icon: Code,
    tone: 'violet',
    title: 'Build',
    text: 'Build products from scratch with clear ownership'
  },
  {
    icon: Megaphone,
    tone: 'accent',
    title: 'Market',
    text: 'Take products to market and find real users'
  },
  {
    icon: TrendingUp,
    tone: 'violet',
    title: 'Run',
    text: 'Run your startup like a real business'
  }
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
    title: <>Impactful<br />Portfolio</>,
    text: 'Strong execution and a portfolio that reflects real-world impact and traction.'
  },
  {
    icon: Trophy,
    title: 'DevHub Ecosystem Path',
    text: 'Certification, recommendations, and long-term opportunities within the DevHub ecosystem.'
  }
]

const journey = [
  ['01', Rocket, 'Ideation & Problem Discovery', 'Identify real problems worth solving and validate ideas early.'],
  ['02', Palette, 'Product & MVP Building', 'Design and build a functional product with clear ownership across roles.'],
  ['03', Globe, 'Market Validation', 'Test assumptions with real users, feedback, and iterations.'],
  ['04', TrendingUp, 'Launch', 'Ship the product publicly. Not a demo, a real launch.'],
  ['05', Layers, 'Growth & Execution', 'Work on traction, growth experiments, and early revenue signals.'],
  ['06', Trophy, 'Incubation Path', 'High-performing teams move forward into founder tracks and incubation within DevHub.']
] as const

export function LandingPage() {
  return (
    <>
      <SmoothScrollProvider />
      <AnimationBoot />
      <main id="top" className="min-h-screen overflow-x-hidden bg-void text-primary">
        <Nav />
        <Hero />
        <StatsMarquee />
        <About />
        <Audience />
        <Paradigm />
        <Journey />
        <Outcomes />
        <DemoDay />
        <Pricing />
        <Waitlist />
        <Footer />
      </main>
    </>
  )
}

function Nav() {
  const navRef = useRef<HTMLElement>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    let frameId: number

    const handleScroll = () => {
      frameId = requestAnimationFrame(handleScroll)

      if (!navRef.current) return

      const currentScroll = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop
      const isDark = navRef.current.classList.contains('nav-on-dark')

      if (currentScroll > 5 && !isDark) {
        navRef.current.classList.add('nav-on-dark')
        navRef.current.classList.remove('bg-transparent')
      } else if (currentScroll <= 5 && isDark) {
        navRef.current.classList.remove('nav-on-dark')
        navRef.current.classList.add('bg-transparent')
      }
    }

    frameId = requestAnimationFrame(handleScroll)

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId)
      }
    }
  }, [])

  return (
    <nav ref={navRef} className="nav-shell group fixed inset-x-0 top-0 z-50 bg-transparent transition-all duration-300 ease-in-out" aria-label="Main navigation">
      <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between px-5 sm:px-7">
        <a href="#top" className="logo-mark flex items-center" aria-label="0to1 home">
          <img src="/lightmode.png" alt="0to1 Logo" width="120" height="40" className="h-8 md:h-10 w-auto object-contain block group-[.nav-on-dark]:hidden" />
          <img src="/darkmode.png" alt="0to1 Logo" width="120" height="40" className="h-8 md:h-10 w-auto object-contain hidden group-[.nav-on-dark]:block" />
        </a>

        {/* Desktop Links */}
        <div className="hidden items-center gap-10 text-sm font-medium md:flex text-zinc-900 group-[.nav-on-dark]:text-zinc-200">
          <a className="nav-link transition-colors hover:opacity-70" href="#about">About</a>
          <a className="nav-link transition-colors hover:opacity-70" href="#audience">Audience</a>
          <a className="nav-link transition-colors hover:opacity-70" href="#journey">Journey</a>
          <a className="nav-link transition-colors hover:opacity-70" href="#outcomes">Outcomes</a>
          <a className="nav-link transition-colors hover:opacity-70" href="#pricing">Pricing</a>
          <a className="nav-link transition-colors hover:opacity-70" href="#waitlist">Apply</a>
        </div>

        <div className="flex items-center gap-4">
          <Button asChild size="sm" className="nav-cta rounded-full px-5">
            <a href="#waitlist">Apply Now</a>
          </Button>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-current"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 px-5 py-6 flex flex-col gap-6 shadow-2xl">
          <a className="nav-link transition-colors text-lg font-medium text-zinc-300 hover:text-white" href="#about" onClick={() => setIsMobileMenuOpen(false)}>About</a>
          <a className="nav-link transition-colors text-lg font-medium text-zinc-300 hover:text-white" href="#audience" onClick={() => setIsMobileMenuOpen(false)}>Audience</a>
          <a className="nav-link transition-colors text-lg font-medium text-zinc-300 hover:text-white" href="#journey" onClick={() => setIsMobileMenuOpen(false)}>Journey</a>
          <a className="nav-link transition-colors text-lg font-medium text-zinc-300 hover:text-white" href="#outcomes" onClick={() => setIsMobileMenuOpen(false)}>Outcomes</a>
          <a className="nav-link transition-colors text-lg font-medium text-zinc-300 hover:text-white" href="#pricing" onClick={() => setIsMobileMenuOpen(false)}>Pricing</a>
          <a className="nav-link transition-colors text-lg font-medium text-zinc-300 hover:text-white" href="#waitlist" onClick={() => setIsMobileMenuOpen(false)}>Apply</a>

          <Button asChild size="lg" className="nav-cta rounded-full w-full mt-4">
            <a href="#waitlist" onClick={() => setIsMobileMenuOpen(false)}>Apply Now</a>
          </Button>
        </div>
      )}
    </nav>
  )
}

function Hero() {
  return (
    <section className="hero-light relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 pb-16 pt-32 text-black" aria-label="Hero">
      <HeroLiquidBackground />
      <div className="absolute top-[64px] left-0 w-full bg-black text-white pt-[5px] pb-[6px] overflow-hidden z-40 border-b border-white/10">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="mx-6 text-xs md:text-sm font-bold tracking-wider">
              🚨 The cohort date is changed and postponed to June 28 • Applicants now get a free 10-day induction 🚨
            </span>
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_52%_30%,rgba(255,255,255,0.1),rgba(255,255,255,0)_42%)]" aria-hidden="true" />
      <div className="relative z-10 mx-auto flex w-full max-w-[1180px] flex-col items-center text-center">
        <p className="hero-badge pill-light mb-10">
          <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
          0to1 by DevHub | Cohort 01 — Starts June 28, 2026
        </p>
        <h1 className="hero-heading font-syne font-black uppercase text-center mx-auto text-[clamp(4.15rem,18vw,8rem)] leading-[0.9]">
          <span className="hero-word block">Build a real</span>
          <span className="hero-word block">startup</span>
        </h1>
        <div className="hero-copy mt-16 max-w-[830px]">
          <p className="text-lg font-medium leading-tight text-zinc-800 md:text-2xl lg:text-3xl">Build a real startup. Not just an internship.</p>
          <p className="mx-auto mt-6 max-w-[780px] text-base font-semibold leading-8 text-zinc-800 md:text-lg lg:text-xl md:leading-9">
            0to1 is a 6-month, execution-first startup program by DevHub, built for students who don't just want experience. They want ownership.
          </p>
          <p className="mx-auto mt-5 max-w-[780px] text-sm font-semibold leading-7 text-zinc-800 md:text-base lg:text-lg md:leading-8">
            This is where engineers, designers, marketers, and business students come together to turn ideas into real products and real businesses.
          </p>
        </div>
        <div className="hero-tags m-8 flex flex-wrap items-center justify-center gap-x-8 text-sm font-bold text-zinc-900">
          <span>No classrooms</span>
          <span>No simulations</span>
          <span>Just building</span>
        </div>
        <div className="hero-actions mt-8 flex flex-col items-center justify-center gap-7 sm:flex-row">
          <Button asChild size="lg" className="rounded-full bg-black px-7 text-white hover:bg-zinc-800">
            <a href="#waitlist">Apply for Cohort 01</a>
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
            <div className="font-mono text-5xl md:text-6xl lg:text-7xl font-bold leading-none text-white">
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

// function About() {
//   return (
//     <section id="about" className="section-dark pb-14 pt-24 md:pb-20 md:pt-36" aria-label="What is 0to1">
//       <div className="container-page">
//         <div className="reveal mx-auto  max-w-[920px] text-center">
//           <p className="section-pill mx-auto mb-10">The Program</p>
//           <h2 className="mega-title normal-case">
//             What is <span className="italic text-beige">0to1?</span>
//           </h2>
//           <p className="mx-auto mt-10 max-w-[890px] text-xl font-semibold leading-9 text-zinc-500 md:text-2xl md:leading-[1.65]">
//             0to1 is a real-world startup internship + accelerator hybrid. Instead of working on hypothetical assignments or isolated tasks, participants:

//           </p>
//         </div>
//         <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-4">
//           {programPillars.map((pillar) => (
//             <div key={pillar} className="reveal glass-pill text-center">
//               {pillar}
//             </div>
//           ))}
//         </div>



//         <p className="reveal mx-auto mt-20 max-w-4xl text-center text-2xl font-bold leading-10 text-zinc-400 md:text-3xl">
//           You don&apos;t just &quot;learn&quot; how startups work. <span className="italic text-white">You build one from zero.</span>
//         </p>
//         <div className="phase-grid">
//           {phases.map(({ icon: Icon, tone, title, text }, index) => (
//             <article key={title} className="phase-card reveal">
//               <span className={cn('phase-icon-wrap', tone === 'violet' && 'phase-icon-wrap-violet', tone === 'orange' && 'phase-icon-wrap-orange')}>
//                 <Icon className="phase-icon" aria-hidden="true" />
//               </span>
//               <span className="phase-label">Phase {String(index + 1).padStart(2, '0')}</span>
//               <h3 className="phase-title">{title}</h3>
//               <p className="phase-copy">{text}</p>
//             </article>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

function About() {
  return (
    <section id="about" className="section-dark py-24 md:py-32" aria-label="What is 0to1">
      <div className="container-page relative z-10 flex flex-col items-center text-center">
        <p className="section-pill mb-6">THE PROGRAM</p>

        <h2 className="font-syne text-5xl font-black tracking-tight text-white md:text-7xl lg:text-8xl md:leading-none">
          What is <span className="text-accent italic">0to1?</span>
        </h2>

        <p className="mt-8 max-w-3xl text-lg font-medium leading-relaxed text-[#a1a1a1] md:text-xl">
          0to1 is a real-world startup internship + accelerator hybrid. Instead of working on
          hypothetical assignments or isolated tasks, participants:
        </p>

        <div className="mt-16 grid w-full max-w-5xl grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {programPillars.map((pillar, index) => (
            <div key={index} className="reveal glass-pill flex items-center justify-center text-center">
              {pillar}
            </div>
          ))}
        </div>

        <p className="mt-20 max-w-4xl text-center text-2xl font-bold leading-10 text-zinc-400 md:text-3xl">
          You don't just "learn" how startups work. <strong className="font-bold italic text-white">You build one from zero.</strong>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 pt-10 mt-16 gap-4 md:gap-6">
          {phases.map(({ icon: Icon, tone, title, text }, index) => {
            const toneColor = tone === 'violet' ? 'text-[#7c3aed]' : 'text-[#00ffc4]';
            return (
              <div key={title} className="group reveal">
                <article className="flex flex-col gap-6 rounded-[24px] md:rounded-[32px] border shadow-sm relative h-full bg-zinc-900/40 border-white/5 p-8 md:p-12 text-center backdrop-blur-xl overflow-hidden transition-all duration-500 hover:bg-zinc-900/60 hover:border-white/20 hover:-translate-y-2">
                  <div className="relative z-10">
                    <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 md:mb-10 relative">
                      <div className="relative w-full h-full bg-zinc-950 rounded-[20px] md:rounded-[24px] flex items-center justify-center border border-white/10 group-hover:border-white/30 transition-colors duration-500">
                        <Icon className={cn("w-6 h-6 md:w-8 md:h-8", toneColor)} aria-hidden="true" />
                      </div>
                    </div>
                    <div className="text-[10px] font-black text-zinc-600 mb-3 md:mb-4 uppercase tracking-[0.3em]">
                      Phase {String(index + 1).padStart(2, '0')}
                    </div>
                    <h3 className="text-xl md:text-2xl font-black mb-3 md:mb-4 tracking-tight text-white">{title}</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed font-medium">{text}</p>
                  </div>
                </article>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

const targetAudiences = [
  {
    icon: Code,
    title: 'Developers & Engineers',
    description: <>Who want to build products, not just features.</>
  },
  {
    icon: Palette,
    title: 'Designers',
    description: <>Who want to shape real user experiences.</>
  },
  {
    icon: Megaphone,
    title: 'Marketers & Growth',
    description: <>Who want to take products <br className="hidden lg:block" /> to market.</>
  },
  {
    icon: Briefcase,
    title: 'Business Students',
    description: <>Who want hands-on startup exposure.</>
  },
  {
    icon: Rocket,
    title: 'Aspiring Founders',
    description: <>Anyone who wants to explore entrepreneurship seriously.</>
  },
  {
    icon: Users,
    title: 'Cross-Functional Collaboration',
    description: <>Work together as a startup team, just like in the real world.</>
  }
]

function Audience() {
  return (
    <section id="audience" className="py-20 md:py-40 px-4 md:px-6 relative overflow-hidden bg-black text-white">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 md:mb-32 reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 md:mb-10 bg-white/[0.03] border border-white/10 rounded-full">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Target Audience</span>
          </div>
          <h2 className="text-5xl md:text-[110px] font-black mb-6 md:mb-10 tracking-tighter leading-[0.85] uppercase">
            WHO IS <br /><span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">0TO1 FOR?</span>
          </h2>
          <p className="text-lg md:text-2xl text-zinc-500 max-w-2xl mx-auto font-medium leading-relaxed">
            0to1 is built for students who want more than a resume line.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {targetAudiences.map(({ icon: Icon, title, description }) => (
            <div key={title} className="group relative reveal">
              <div className="flex flex-col gap-6 border shadow-sm h-full bg-zinc-900/20 border-white/5 p-8 md:p-12 backdrop-blur-xl rounded-[32px] md:rounded-[40px] overflow-hidden transition-all duration-500 hover:bg-zinc-900/40 hover:border-white/20">
                <div className="relative z-10 space-y-6 md:space-y-8">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center relative group-hover:border-white/30 transition-colors overflow-hidden">
                    <div className="relative opacity-50">
                      <Icon className="w-7 h-7 md:w-8 md:h-8 text-white stroke-[1.5] relative z-10" aria-hidden="true" />
                      <div className="absolute inset-0 bg-white/20 blur-md rounded-full pointer-events-none"></div>
                    </div>
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="space-y-3 md:space-y-4">
                    <h3 className="text-xl md:text-3xl font-bold tracking-tighter uppercase leading-none text-white">{title}</h3>
                    <p className="text-zinc-500 text-base md:text-lg font-medium leading-relaxed">{description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Paradigm() {
  return (
    <section className="py-12 md:py-24 px-4 md:px-6 relative overflow-hidden bg-black text-white" aria-label="0to1 distinct">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,196,0.05),transparent_70%)]"></div>
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-10 md:mb-16 reveal">
          <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-[#00ffc4] bg-[#00ffc4]/10 border border-[#00ffc4]/20 rounded-full">
            The Paradigm Shift
          </span>
          <h2 className="text-3xl md:text-6xl font-black mb-4 md:mb-6 tracking-tighter uppercase">
            0to1 <span className="text-[#00ffc4]">DISTINCT</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {/* Traditional Way Card */}
          <div className="group reveal">
            <div className="flex flex-col gap-6 border shadow-sm h-full bg-zinc-900/40 border-white/5 p-8 md:p-12 backdrop-blur-xl rounded-[24px] md:rounded-[32px]">
              <div className="space-y-6 md:space-y-8">
                <div className="space-y-2 md:space-y-3">
                  <h3 className="text-zinc-600 font-bold text-[10px] md:text-xs uppercase tracking-[0.4em]">The Traditional Way</h3>
                  <p className="text-2xl md:text-3xl font-black uppercase text-white/20 tracking-tighter">WATCHING</p>
                </div>
                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-center gap-3 text-zinc-600 font-medium text-sm md:text-base line-through decoration-zinc-800">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-800"></div>Classroom-based learning
                  </div>
                  <div className="flex items-center gap-3 text-zinc-600 font-medium text-sm md:text-base line-through decoration-zinc-800">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-800"></div>Task-based intern work
                  </div>
                  <div className="flex items-center gap-3 text-zinc-600 font-medium text-sm md:text-base line-through decoration-zinc-800">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-800"></div>Simulated projects
                  </div>
                </div>
                <p className="text-zinc-500 font-medium text-sm leading-relaxed">
                  Most programs keep you on the sidelines. You observe, but you don&apos;t own.
                </p>
              </div>
            </div>
          </div>

          {/* 0to1 Paradigm Card */}
          <div className="group reveal">
            <div className="flex flex-col gap-6 border shadow-sm h-full bg-zinc-900/60 border-white/10 p-8 md:p-12 backdrop-blur-3xl rounded-[24px] md:rounded-[32px] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#00ffc4]/5 blur-[80px] -mr-24 -mt-24"></div>
              <div className="relative z-10 space-y-6 md:space-y-8">
                <div className="space-y-2 md:space-y-3">
                  <h3 className="text-[#00ffc4] font-bold text-[10px] md:text-xs uppercase tracking-[0.4em]">The 0to1 Paradigm</h3>
                  <p className="text-2xl md:text-3xl font-black uppercase text-white tracking-tighter">INSIDE 1</p>
                </div>
                <div className="space-y-4 md:space-y-6">
                  <div className="flex items-center gap-3 md:gap-4 group/item">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00ffc4]"></div>
                    <span className="text-lg md:text-xl font-black text-white tracking-tighter">Real Accountability</span>
                  </div>
                  <div className="flex items-center gap-3 md:gap-4 group/item">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00ffc4]"></div>
                    <span className="text-lg md:text-xl font-black text-white tracking-tighter">Actual Market Launch</span>
                  </div>
                  <div className="flex items-center gap-3 md:gap-4 group/item">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00ffc4]"></div>
                    <span className="text-lg md:text-xl font-black text-white tracking-tighter">Direct Core Access</span>
                  </div>
                </div>
                <div className="pt-6 md:pt-8 border-t border-white/5">
                  <p className="text-zinc-400 font-bold text-sm md:text-base leading-tight">
                    Direct bridge to the <span className="text-white underline decoration-[#00ffc4]">Founding Team</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

function Outcomes() {
  return (
    <section id="outcomes" className="section-dark pb-16 pt-20 md:pb-20 md:pt-28" aria-label="Outcomes">
      <div className="container-page">
        <div className="reveal text-center mb-16 md:mb-32">
          <span className="inline-block px-4 py-1.5 mb-6 md:mb-8 text-[10px] font-bold uppercase tracking-[0.3em] text-[#00ffc4] bg-[#00ffc4]/10 border border-[#00ffc4]/20 rounded-full">
            The Result
          </span>
          <h2 className="text-4xl md:text-8xl font-black tracking-tighter uppercase">
            WHAT YOU&apos;LL <span className="text-[#00ffc4]">ACHIEVE</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4 relative z-10">
          {outcomes.map(({ icon: Icon, title, text }, index) => (
            <article
              key={index}
              className="group relative flex flex-col justify-between overflow-hidden rounded-[32px] border border-white/10 bg-[#060010] p-8 min-h-[480px] xl:min-h-[520px] transition-all duration-500 hover:border-[#00ffc4]/40 hover:shadow-[0_0_40px_-10px_rgba(0,255,196,0.15)]"
            >
              {/* Background Glow Effect */}
              <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#00ffc4]/15 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"></div>

              {/* Header: Label & Background Number */}
              <div className="relative z-10 flex items-start justify-between">
                <span className="font-mono text-xs font-bold tracking-[0.2em] text-zinc-500">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="absolute -right-4 -top-8 select-none text-[100px] font-black italic leading-none text-white/[0.02] transition-colors duration-500 group-hover:text-white/[0.04]">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Center Icon with Glowing Backdrop */}
              <div className="relative z-10 my-16 flex flex-1 items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 scale-150 rounded-full bg-[#00ffc4] opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-40"></div>
                  <Icon className="relative z-10 h-16 w-16 text-white transition-transform duration-500 group-hover:scale-110" aria-hidden="true" />
                </div>
              </div>

              {/* Content Footer */}
              <div className="relative z-10 mt-auto pt-6 border-t border-white/5 h-[180px] flex flex-col justify-start">
                <h3 className="mb-3 font-syne text-xl font-bold text-white md:text-2xl">{title}</h3>
                <p className="text-sm font-medium leading-relaxed text-zinc-400 md:text-base">{text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Journey() {
  return (
    <section id="journey" className="journey-section section-dark pb-24 pt-16 md:pb-32 md:pt-20" aria-label="6-month journey">
      <div className="container-page">
        <div className="reveal mx-auto max-w-5xl text-center">
          <p className="section-pill mx-auto mb-12">The Roadmap</p>
          <h2 className="journey-title">
            The 6-month <span>journey</span>
          </h2>
        </div>
        <div className="journey-track relative mx-auto mt-20 max-w-6xl md:mt-24">
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
                  <div className={cn('group relative w-full', isLeft ? 'md:col-start-1 md:pr-12 lg:pr-24' : 'md:col-start-3 md:pl-12 lg:pl-24')}>
                    <div className="text-card-foreground flex flex-col gap-6 border shadow-sm bg-zinc-900/10 border-white/5 p-6 md:p-10 backdrop-blur-md rounded-[24px] md:rounded-[32px] transition-all duration-500 hover:border-[#00ffc4]/20 hover:bg-zinc-900/20 overflow-hidden">
                      <div className="flex flex-col gap-4 md:gap-6 relative z-10">
                        <div className={cn(
                          "w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 transition-colors",
                          index % 2 === 0 ? "group-hover:border-[#00ffc4]/30" : "group-hover:border-[#7c3aed]/30"
                        )}>
                          <Icon className={cn("w-5 h-5 md:w-6 md:h-6", index % 2 === 0 ? "text-[#00ffc4]" : "text-[#7c3aed]")} aria-hidden="true" />
                        </div>
                        <div>
                          <h3 className="text-xl md:text-3xl font-bold tracking-tight mb-2 md:mb-4 transition-colors group-hover:text-white text-white/90">{title}</h3>
                          <p className="text-zinc-400 text-sm md:text-lg leading-relaxed font-medium group-hover:text-zinc-300 transition-colors">{text}</p>
                        </div>
                      </div>
                    </div>
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


function Pricing() {
  return (
    <section id="pricing" className="section-dark py-24 md:py-32 " aria-label="Pricing">
      <div className="container-page">
        <div className="reveal mx-auto max-w-4xl text-center">
          <p className="section-pill mx-auto mb-8">Simple Pricing</p>
          <h2 className="mega-title">
            6 months. <span className="text-beige">Real execution.</span>
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-xl font-semibold leading-9 text-zinc-500">
            This is not a course. You're paying to build, execute, collaborate, and work inside a structured startup environment.
          </p>
        </div>
        <div className="mt-20 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <article className="reveal compare-card">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-zinc-500">Monthly</p>
            <h3 className="mt-5 font-syne text-5xl font-black text-white">₹999<span className="text-2xl text-zinc-500"> /mo</span></h3>
            <p className="mt-3 text-zinc-500 font-semibold">Pay as you go</p>
            <ul className="mt-10 space-y-4 text-lg font-semibold text-zinc-400">
              <li>✓ Full program access</li>
              <li>✓ Weekly mentorship</li>
              <li>✓ Team collaboration</li>
              <li>✓ Cancel anytime</li>
            </ul>
            <a href="#waitlist" className="mt-10 block w-full rounded-full border border-white/20 py-3 text-center text-sm font-black uppercase tracking-widest text-white transition hover:border-accent hover:text-accent">
              Apply Now
            </a>
          </article>
          <article className="reveal compare-card lg:scale-105 relative z-10 shadow-2xl compare-card-hot">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-beige">Best Value</p>
            <h3 className="mt-5 font-syne text-5xl font-black text-white">₹5,499<span className="text-2xl text-zinc-500"> once</span></h3>
            <p className="mt-3 text-beige font-semibold">One-time payment</p>
            <ul className="mt-10 space-y-4 text-lg font-semibold text-zinc-400">
              <li>✓ Full program access</li>
              <li>✓ Weekly mentorship</li>
              <li>✓ Team collaboration</li>
              <li>✓ Demo Day</li>
              <li className="text-beige">✓ Save ₹495</li>
            </ul>
            <a href="#waitlist" className="mt-10 block w-full rounded-full bg-accent py-3 text-center text-sm font-black uppercase tracking-widest text-black transition hover:opacity-90">
              Apply Now
            </a>
          </article>
          <article className="reveal compare-card">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-zinc-500">Group Plan</p>
            <h3 className="mt-5 font-syne text-5xl font-black text-white">Discounts</h3>
            <p className="mt-3 text-zinc-500 font-semibold">For teams & friends</p>
            <ul className="mt-10 space-y-4 text-lg font-semibold text-zinc-400">
              <li>✓ Apply with your team</li>
              <li>✓ Group discount available</li>
              <li>✓ Built-in collaboration</li>
              <li>✓ All plan features</li>
            </ul>
            <a href="#waitlist" className="mt-10 block w-full rounded-full border border-white/20 py-3 text-center text-sm font-black uppercase tracking-widest text-white transition hover:border-accent hover:text-accent">
              Apply Now
            </a>
          </article>

        </div>
      </div>
    </section>
  )
}



function DemoDay() {
  return (
    <section id="demo-day" className="section-dark py-24 md:py-32" aria-label="Demo Day">
      <div className="container-page">
        <div className="reveal mx-auto max-w-4xl text-center">
          <p className="section-pill mx-auto mb-8">Demo Day</p>
          <h2 className="mega-title">
            Where builders become <span className="italic text-beige">founders.</span>
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-xl font-semibold leading-9 text-zinc-500">
            After 6 months of execution, your team takes the stage. Real products. Real traction. Real audience. Not a college presentation — a startup launch.
          </p>
        </div>

        {/* Date/Format badge row */}
        <div className="reveal mx-auto mt-14 flex w-fit flex-wrap items-center justify-center gap-0 divide-x divide-white/10 rounded-2xl border border-white/[0.07] bg-[#0D0D0D] px-2">
          {[
            ['Event', 'Demo Day'],
            ['Cohort 01', 'June 2026'],
            ['Format', 'Live + Online'],
          ].map(([label, value]) => (
            <div key={label} className="px-8 py-5 text-center">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">{label}</p>
              <p className="mt-1 font-syne text-lg font-black text-white">{value}</p>
            </div>
          ))}
        </div>

        {/* Cards grid */}
        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              icon: Rocket,
              title: 'Live Product Demo',
              text: 'Present the product you built in front of a real audience — investors, mentors, and industry builders.',
            },
            {
              icon: TrendingUp,
              title: 'Traction Showcase',
              text: 'Show real numbers — users, feedback, revenue signals. Not slides. Execution evidence.',
            },
            {
              icon: Trophy,
              title: 'Top Team Awards',
              text: 'Outstanding teams receive recognition, ecosystem opportunities, and a path to incubation within DevHub.',
            },
            {
              icon: Users,
              title: 'Founder Network Access',
              text: 'Direct access to the DevHub founder network, mentors, and future cohort opportunities.',
            },
          ].map(({ icon: Icon, title, text }) => (
            <article key={title} className="reveal compare-card">
              <span className="mb-8 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-beige/20 bg-beige/[0.06]">
                <Icon className="h-5 w-5 text-beige" aria-hidden="true" />
              </span>
              <h3 className="font-syne text-xl font-black text-white">{title}</h3>
              <p className="mt-4 text-base font-semibold leading-7 text-zinc-500">{text}</p>
            </article>
          ))}
        </div>

        {/* Bottom CTA panel */}
        <div className="reveal compare-card compare-card-hot mt-6 grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <h3 className="font-syne text-4xl font-black leading-tight text-white md:text-5xl">
            This isn&apos;t a demo.<br />
            It&apos;s your <span className="italic text-beige">launch.</span>
          </h3>
          <div className="flex flex-col gap-5 lg:items-end">
            <p className="text-lg font-semibold leading-8 text-zinc-400 lg:text-right">
              Only the best teams make it here. Start building now to earn your spot on stage.
            </p>

            <a href="#waitlist"
              className="w-fit rounded-full bg-accent px-8 py-3 text-sm font-black uppercase tracking-widest text-black transition hover:opacity-90 hover:-translate-y-0.5"
            >
              Apply for Cohort 01
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}






function Waitlist() {
  return (
    <section id="waitlist" className="waitlist-galaxy section-dark relative min-h-[100svh] flex flex-col justify-center py-24 md:py-24" aria-label="Join waitlist">
      <img src="/waitlistbg.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-50 mix-blend-screen pointer-events-none z-0" aria-hidden="true" />
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
                  <span>100 slots for Cohort 01.</span>
                </div>
              </div>
            </div>
            <div className="secure-form-shell">
              <WaitlistForm />
              <p className="mt-5 text-center text-xs font-bold uppercase tracking-[0.18em] text-zinc-600">
                10 Day Free Induction with Full Team Scholarship Chance <br /> &bull; Cohort 01 starts 28th June 2026
              </p>
            </div>
          </div>
        </div>
      </div>
    </section >
  )
}

function Footer() {
  return (
    <footer className="section-dark border-t border-white/[0.08] pt-16 pb-8">
      <div className="container-page grid grid-cols-1 gap-12 text-sm font-semibold text-zinc-500 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
        <div className="flex flex-col items-start">
          <a href="#top" className="logo-mark flex items-center mb-6">
            <img src="/darkmode.png" alt="0to1 Logo" className="h-8 md:h-10 w-auto object-contain block" />
          </a>
          <p className="max-w-xs text-base leading-7 text-zinc-400">
            A DevHub Accelerator Program helping the next generation of builders become founders.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-syne text-sm font-black text-white uppercase tracking-widest">Quick Links</h3>
          <a className="transition-colors hover:text-white" href="#about">About</a>
          <a className="transition-colors hover:text-white" href="#journey">Journey</a>
          <a className="transition-colors hover:text-white" href="#outcomes">Outcomes</a>
          <a className="transition-colors hover:text-white" href="#pricing">Pricing</a>
          <a className="transition-colors hover:text-white" href="#demo-day">Demo Day</a>
          <a className="transition-colors hover:text-white" href="#waitlist">Waitlist</a>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-syne text-sm font-black text-white uppercase tracking-widest">Legal</h3>
          <Link className="transition-colors hover:text-white" href="/privacy">Privacy Policy</Link>
          <Link className="transition-colors hover:text-white" href="/terms">Terms of Service</Link>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-syne text-sm font-black text-white uppercase tracking-widest">Contact</h3>
          <a className="transition-colors hover:text-white" href="mailto:0to1.wtf@gmail.com">0to1.wtf@gmail.com</a>
          <a className="transition-colors hover:text-white" href="https://www.instagram.com/0to1.wtf/" rel="noreferrer" target="_blank">
            Instagram
          </a>
          <Link className="transition-colors hover:text-white" href="/contact">Support</Link>
        </div>
      </div>

      <div className="container-page mt-16 pt-8 border-t border-white/[0.04] flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-semibold text-zinc-600">
        <p>© 2026 0to1 by DevHub. All rights reserved.</p>
        <p>Built for builders.</p>
      </div>
    </footer>
  )
}
