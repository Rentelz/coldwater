// import * as z from 'zod'

// export const formSchema = z.object({
//   name: z.string(),
//   email: z.string().email(),
//   number: z
//     .string()
//     .min(10, 'Phone number must be 10 digits')
//     .max(10, 'Phone number must be 10 digits'),
//   state: z
//     .object({
//       id: z.string(),
//       name: z.string(),
//       iso2: z.string(),
//     })
//     .optional(),
//   city: z
//     .object({
//       id: z.string(),
//       name: z.string(),
//     })
//     .optional(),
//   address: z.string().min(1, 'Address is required'),
//   pincode: z.string().min(1, 'Pincode is required'),
//   addressType: z.string().min(1, 'Please select an address type'),
// })

import * as z from 'zod'
export const formSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  number: z.string().min(10, 'Phone number must be 10 digits'),
  state: z.object({
    id: z.string(),
    name: z.string(),
    iso2: z.string().optional(),
  }),
  city: z.object({
    id: z.string(),
    name: z.string(),
  }),
  address: z.string(),
  pincode: z.string(),
  addressType: z.enum(['home', 'office', 'other']),
})
