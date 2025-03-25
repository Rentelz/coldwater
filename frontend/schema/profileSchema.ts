import z, { number } from 'zod'

export const formSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  number: z.string().regex(/^\d{10}$/, 'Must be exactly 10 digits'),
  address: z.string().min(2).max(100),
  pincode: z.string().regex(/^\d{6}$/, 'Must be exactly 6 digits'),
})
