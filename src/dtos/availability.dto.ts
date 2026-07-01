import z from 'zod'

const timeString = z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Time must be in HH:mm format')
const dateString = z.string().regex(
    /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
    'Date must be in YYYY-MM-DD format',
)

export const createAvailabilityRuleSchema = z.object({
    weekday: z.number().int().min(0).max(6),
    startTime: timeString,
    endTime: timeString,
    isActive: z.boolean().default(true),
    timezone: z.string().min(1).default('UTC'),
})

export const updateAvailabilityRuleSchema = createAvailabilityRuleSchema.partial()

export const createAvailabilityExceptionSchema = z.object({
    date: dateString,
    type: z.enum(['BLOCK_FULL_DAY', 'BLOCK_PARTIAL_DAY', 'ADD_AVAILABLE_WINDOW']),
    startTime: timeString.optional(),
    endTime: timeString.optional(),
    timezone: z.string().min(1).default('UTC'),
    reason: z.string().min(1).max(500),
})

export const updateAvailabilityExceptionSchema = createAvailabilityExceptionSchema.partial()

export const exceptionDateRangeSchema = z.object({
    startDate: dateString,
    endDate: dateString,
}).refine((data) => data.startDate <= data.endDate, {
    message: 'startDate must be before or equal to endDate',
})

export type CreateAvailabilityRuleDto = z.infer<typeof createAvailabilityRuleSchema>
export type UpdateAvailabilityRuleDto = z.infer<typeof updateAvailabilityRuleSchema>
export type CreateAvailabilityExceptionDto = z.infer<typeof createAvailabilityExceptionSchema>
export type UpdateAvailabilityExceptionDto = z.infer<typeof updateAvailabilityExceptionSchema>
export type ExceptionDateRangeDto = z.infer<typeof exceptionDateRangeSchema>
