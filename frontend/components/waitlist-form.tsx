'use client'

import { FormEvent, useState } from 'react'
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type FormState = 'idle' | 'loading' | 'success' | 'error'
type FormValues = {
  fullName: string
  contactNumber: string
  email: string
  collegeName: string
  city: string
  courseBackground: string
}

type ApiResponse = {
  success: boolean
  code?: string
  message: string
}

const initialValues: FormValues = {
  fullName: '',
  contactNumber: '',
  email: '',
  collegeName: '',
  city: '',
  courseBackground: ''
}

const fields = [
  { name: 'fullName', label: 'Full Name', type: 'text', autoComplete: 'name', maxLength: 120 },
  { name: 'contactNumber', label: 'Contact Number', type: 'tel', autoComplete: 'tel', maxLength: 20 },
  { name: 'email', label: 'Mail', type: 'email', autoComplete: 'email', maxLength: 255 },
  { name: 'collegeName', label: 'College Name', type: 'text', autoComplete: 'organization', maxLength: 160 },
  { name: 'city', label: 'City', type: 'text', autoComplete: 'address-level2', maxLength: 80 },
  { name: 'courseBackground', label: 'Course Background (Example: BTech, BBA, BSc, etc.)', type: 'text', autoComplete: 'off', maxLength: 120 }
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

    setState('loading')

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'
      const response = await fetch(`${apiUrl}/api/waitlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      const data = (await response.json()) as ApiResponse

      if (response.ok && data.success) {
        setState('success')
        setMessage(data.message)
        setValues(initialValues)
        return
      }

      setState('error')
      setMessage(data.message || 'Something went wrong. Please try again.')
    } catch {
      setState('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  if (state === 'success') {
    return (
      <div className="waitlist-success">
        <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
        <span>{message || "You're on the waitlist! We'll be in touch."}</span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="waitlist-form">
      {fields.map((field) => (
        <div key={field.name} className="waitlist-field">
          <label className="sr-only" htmlFor={`waitlist-${field.name}`}>
            {field.label}
          </label>
          <Input
            id={`waitlist-${field.name}`}
            name={field.name}
            type={field.type}
            inputMode={field.name === 'contactNumber' ? 'tel' : field.name === 'email' ? 'email' : 'text'}
            autoComplete={field.autoComplete}
            maxLength={field.maxLength}
            required
            value={values[field.name]}
            onChange={(event) => updateField(field.name, event.target.value)}
            placeholder={field.label}
            disabled={state === 'loading'}
            aria-describedby={message ? 'waitlist-message' : undefined}
            className="waitlist-input !h-[3.2rem] !rounded-[14px] !border-white/[0.15] !bg-white/[0.075]"
          />
        </div>
      ))}
      <Button type="submit" disabled={state === 'loading'} className="waitlist-submit group !h-[3.2rem] !rounded-[14px]">
        <span>{state === 'loading' ? 'Saving...' : 'Notify me'}</span>
        {state === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <ArrowRight className="submit-arrow h-5 w-5" aria-hidden="true" />}
      </Button>
      {message ? (
        <p id="waitlist-message" className="text-sm font-medium text-error" role="alert">
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
    contactNumber: values.contactNumber.trim(),
    email: values.email.trim().toLowerCase(),
    collegeName: values.collegeName.trim(),
    city: values.city.trim(),
    courseBackground: values.courseBackground.trim()
  }
}

function validateValues(values: FormValues) {
  if (Object.values(values).some((value) => value.length < 2)) {
    return 'Please fill every field before joining the waitlist.'
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    return 'Please enter a valid email address.'
  }

  if (!/^[+()\-\s0-9]{7,20}$/.test(values.contactNumber)) {
    return 'Please enter a valid contact number.'
  }

  return ''
}
