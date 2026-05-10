import { z } from 'zod'

const plainTextField = (maxLength: number) => z.string().trim().min(2).max(maxLength)

export const waitlistBodySchema = z
  .object({
    fullName: plainTextField(120),
    contactNumber: z.string().trim().min(7).max(20).regex(/^[+()\-\s0-9]+$/),
    email: z.string().trim().toLowerCase().email().max(255),
    collegeName: plainTextField(160),
    city: plainTextField(80),
    courseBackground: plainTextField(120)
  })
  .strict()

export type WaitlistBody = z.infer<typeof waitlistBodySchema>
