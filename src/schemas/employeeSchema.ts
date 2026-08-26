import { z } from 'zod'

export const employeeSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters')
    .trim(),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(100, 'Email must not exceed 100 characters'),
  mobile: z
    .string()
    .min(1, 'Mobile is required')
    .min(7, 'Mobile must be at least 7 characters')
    .max(15, 'Mobile must not exceed 15 characters')
    .regex(/^[0-9\-+ ()]+$/, 'Mobile must contain only digits, spaces, and common phone characters'),
  country: z.string().min(1, 'Country is required').max(100, 'Country must not exceed 100 characters'),
  state: z.string().min(1, 'State is required').max(100, 'State must not exceed 100 characters'),
  district: z.string().min(1, 'District is required').max(100, 'District must not exceed 100 characters'),
})

export type EmployeeFormData = z.infer<typeof employeeSchema>
