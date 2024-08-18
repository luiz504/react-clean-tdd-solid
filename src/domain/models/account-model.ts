import { z } from 'zod'

export const accountModelSchema = z.object({
  accessToken: z.string().uuid(),
  name: z.string().min(1),
})

export type AccountModel = z.infer<typeof accountModelSchema>
