import { z } from 'zod'

const plainTextField = (maxLength: number) => z.string().trim().min(2).max(maxLength)

export const waitlistBodySchema = z
  .object({
    fullName: plainTextField(120),
    contactNumber: z.string().trim().regex(/^(?:\+?91[\s-]?)?[6789]\d{2}[\s-]?\d{3}[\s-]?\d{4}$/, 'Invalid Indian mobile number'),
    email: z.string().trim().toLowerCase().email().max(255),
    collegeName: plainTextField(160),
    city: plainTextField(80),
    courseBackground: plainTextField(120)
  })
  .strict()

export type WaitlistBody = z.infer<typeof waitlistBodySchema>
