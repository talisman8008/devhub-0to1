'use client'

import { FormEvent, useState } from 'react'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type FormState = 'idle' | 'loading' | 'success' | 'error'

type FormValues = {
  fullName: string
  email: string
  contactNumber: string
  collegeName: string
  courseBackground: string
  areaOfInterest: string
  whyJoin: string
  skillLevel: string
  soloOrTeam: string
}

type ApiResponse = {
  success: boolean
  code?: string
  message: string
}

const initialValues: FormValues = {
  fullName: '',
  email: '',
  contactNumber: '',
  collegeName: '',
  courseBackground: '',
  areaOfInterest: '',
  whyJoin: '',
  skillLevel: '',
  soloOrTeam: ''
}

// Fields rendered as <Input> (single-line)
const inputFields = [
  { name: 'fullName', label: 'Full Name', type: 'text', autoComplete: 'name', maxLength: 120 },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email', maxLength: 255 },
  { name: 'contactNumber', label: 'Phone Number', type: 'tel', autoComplete: 'tel', maxLength: 20 },
  { name: 'collegeName', label: 'College Name', type: 'text', autoComplete: 'organization', maxLength: 160 },
  { name: 'courseBackground', label: 'Course (e.g. BTech, BBA, BSc)', type: 'text', autoComplete: 'off', maxLength: 120 },
  { name: 'areaOfInterest', label: 'Area of Interest (e.g. Product, Tech, Marketing)', type: 'text', autoComplete: 'off', maxLength: 120 },
] as const

// Select fields
const selectFields = [
  {
    name: 'skillLevel',
    label: 'Skill Level',
    options: [
      { value: '', label: 'Skill Level' },
      { value: 'beginner', label: 'Beginner — just starting out' },
      { value: 'intermediate', label: 'Intermediate — built a few things' },
      { value: 'advanced', label: 'Advanced — shipped real projects' },
    ]
  },
  {
    name: 'soloOrTeam',
    label: 'Solo or Team?',
    options: [
      { value: '', label: 'Solo or Team?' },
      { value: 'solo', label: 'Solo — flying alone' },
      { value: 'team', label: 'Team — already have one' },
      { value: 'open', label: 'Open — find me a team' },
    ]
  },
] as const

export function WaitlistForm() {
  const [values, setValues] = useState<FormValues>(initialValues)
  const [state, setState] = useState<FormState>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage('')

    if (!navigator.onLine) {
      setState('error')
      setMessage('You appear to be offline. Please check your connection and try again.')
      return
    }

    const payload = normalizeValues(values)
    const clientError = validateValues(payload)

    if (clientError) {
      setState('error')
      setMessage(clientError)
      return
    }

    if (!isSupabaseConfigured) {
      setState('error')
      setMessage('Waitlist is not configured yet. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.')
      return
    }

    setState('loading')

    try {
      const { error } = await supabase.from('waitlist').insert([{
        full_name: payload.fullName,
        email: payload.email,
        contact_number: payload.contactNumber,
        college_name: payload.collegeName,
        course_background: payload.courseBackground,
        area_of_interest: payload.areaOfInterest,
        why_join: payload.whyJoin,
        skill_level: payload.skillLevel,
        solo_or_team: payload.soloOrTeam,
        city: 'N/A' // Default value for required column
      }])

      if (!error) {
        setState('success')
        setMessage('Application received! We will be in touch soon.')
        setValues(initialValues)
        return
      }

      setState('error')
      if (error.code === '23505') {
        setMessage('This email is already on the waitlist.')
      } else {
        setMessage(error.message || 'Something went wrong. Please try again.')
      }
    } catch (err: any) {
      setState('error')
      setMessage(err.message || 'Something went wrong. Please try again.')
    }
  }

  if (state === 'success') {
    return (
      <div className="waitlist-success">
        <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
        <span>{message || "Application received! We'll be in touch soon."}</span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="waitlist-form flex flex-col gap-4">

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* ── Single-line inputs ── */}
        {inputFields.map((field) => (
          <div key={field.name} className="waitlist-field">
            <label className="sr-only" htmlFor={`waitlist-${field.name}`}>
              {field.label}
            </label>
            <Input
              id={`waitlist-${field.name}`}
              name={field.name}
              type={field.type}
              inputMode={
                field.name === 'contactNumber' ? 'tel'
                  : field.name === 'email' ? 'email'
                    : 'text'
              }
              autoComplete={field.autoComplete}
              maxLength={field.maxLength}
              required
              value={values[field.name]}
              onChange={(e) => updateField(field.name, e.target.value)}
              placeholder={field.label}
              disabled={state === 'loading'}
              aria-describedby={message ? 'waitlist-message' : undefined}
              className="waitlist-input !h-[3.2rem] !rounded-[14px] !border-white/[0.15] !bg-white/[0.075]"
            />
          </div>
        ))}

        {/* ── Select fields ── */}
        {selectFields.map((field) => (
          <div key={field.name} className="waitlist-field">
            <label className="sr-only" htmlFor={`waitlist-${field.name}`}>
              {field.label}
            </label>
            <select
              id={`waitlist-${field.name}`}
              name={field.name}
              required
              value={values[field.name]}
              onChange={(e) => updateField(field.name, e.target.value)}
              disabled={state === 'loading'}
              aria-describedby={message ? 'waitlist-message' : undefined}
              className="waitlist-input w-full !h-[3.2rem] !rounded-[14px] border border-white/[0.15] bg-white/[0.075] px-4 text-sm text-white/80 outline-none focus:border-white/30 appearance-none cursor-pointer"
            >
              {field.options.map((opt) => (
                <option key={opt.value} value={opt.value} disabled={opt.value === ''} className="bg-[#0D0D0D] text-white">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* ── Why Join? textarea (Full Width) ── */}
      <div className="waitlist-field w-full">
        <label className="sr-only" htmlFor="waitlist-whyJoin">
          Why do you want to join?
        </label>
        <textarea
          id="waitlist-whyJoin"
          name="whyJoin"
          required
          maxLength={600}
          rows={3}
          value={values.whyJoin}
          onChange={(e) => updateField('whyJoin', e.target.value)}
          placeholder="Why do you want to join 0to1? (max 600 chars)"
          disabled={state === 'loading'}
          aria-describedby={message ? 'waitlist-message' : undefined}
          className="waitlist-input w-full resize-none !rounded-[14px] !border-white/[0.15] !bg-white/[0.075] px-4 py-3 text-sm outline-none placeholder:text-white/40 focus:border-white/30"
        />
      </div>

      {/* ── Submit ── */}
      <Button
        type="submit"
        disabled={state === 'loading'}
        className="waitlist-submit group !h-[3.2rem] !rounded-[14px] w-full"
      >
        <span>{state === 'loading' ? 'Submitting...' : 'Apply Now'}</span>
        {state === 'loading'
          ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          : <ArrowRight className="submit-arrow h-5 w-5" aria-hidden="true" />
        }
      </Button>

      {message ? (
        <p id="waitlist-message" className="text-sm font-medium text-error mt-2" role="alert">
          {message}
        </p>
      ) : null}

    </form>
  )

  function updateField(field: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }))
    if (state === 'error') {
      setState('idle')
      setMessage('')
    }
  }
}

function normalizeValues(values: FormValues): FormValues {
  return {
    fullName: values.fullName.trim(),
    email: values.email.trim().toLowerCase(),
    contactNumber: values.contactNumber.trim(),
    collegeName: values.collegeName.trim(),
    courseBackground: values.courseBackground.trim(),
    areaOfInterest: values.areaOfInterest.trim(),
    whyJoin: values.whyJoin.trim(),
    skillLevel: values.skillLevel.trim(),
    soloOrTeam: values.soloOrTeam.trim(),
  }
}

function validateValues(values: FormValues): string {
  const textFields: (keyof FormValues)[] = [
    'fullName', 'email', 'contactNumber',
    'collegeName', 'courseBackground', 'areaOfInterest', 'whyJoin'
  ]

  if (textFields.some((key) => values[key].length < 2)) {
    return 'Please fill every field before applying.'
  }

  if (!values.skillLevel) {
    return 'Please select your skill level.'
  }

  if (!values.soloOrTeam) {
    return 'Please let us know if you\'re applying solo or with a team.'
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    return 'Please enter a valid email address.'
  }

  if (!/^[+()\-\s0-9]{7,20}$/.test(values.contactNumber)) {
    return 'Please enter a valid phone number.'
  }

  if (values.whyJoin.length < 20) {
    return 'Please tell us a bit more about why you want to join (at least 20 characters).'
  }

  return ''
}