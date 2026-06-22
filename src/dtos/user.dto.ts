import z from "zod";

export const createUserSchema = z.object({
    email: z.email(),
    name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters')
})

export const updateUserSchema = z.object({
    email: z.email().optional(),
    name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters').optional(),
}).refine((data) => data.email !== undefined || data.name !== undefined, {
    message: 'At least one field is required',
})

export type createUserDto = z.infer<typeof createUserSchema>
export type updateUserDto = z.infer<typeof updateUserSchema>