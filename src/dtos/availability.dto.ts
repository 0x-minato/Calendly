import z from 'zod'

const timeString = z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Time must be in HH:mm format')
const dateString = z.string().regex(
    /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
    'Date must be in YYYY-MM-DD format',
)

const createAvailabilityRuleBaseSchema = z.object({
    weekday: z.number().int().min(0).max(6),
    startTime: timeString,
    endTime: timeString,
    isActive: z.boolean().default(true),
    timezone: z.string().min(1).default('UTC'),
})

export const createAvailabilityRuleSchema = createAvailabilityRuleBaseSchema.refine(
    (rule) => rule.startTime < rule.endTime, 
    { message: 'Start Time must be greater than end time' }
)

export const updateAvailabilityRuleSchema = createAvailabilityRuleBaseSchema.partial()

export const createAvailabilityExceptionBaseSchema = z.object({
    date: dateString,
    type: z.enum(['BLOCK_FULL_DAY', 'BLOCK_PARTIAL_DAY', 'ADD_AVAILABLE_WINDOW']),
    startTime: timeString.optional(),
    endTime: timeString.optional(),
    timezone: z.string().min(1).default('UTC'),
    reason: z.string().min(1).max(500),
})

export const createAvailabilityExceptionSchema = createAvailabilityExceptionBaseSchema.superRefine((data, ctx) => {
    if(data.type != 'BLOCK_FULL_DAY') {
        if (!data.startTime) {
            ctx.addIssue( { path: ['startTime'], code: 'custom', message: "Start time is required for a non full day exception" } )
        }
        if (!data.endTime) {
            ctx.addIssue( { path: ['endTime'], code: 'custom', message: "End time is required for a non full day exception" } )
        }
        if (data.startTime && data.endTime && data.startTime >= data.endTime) {
            ctx.addIssue( { path: ['endTIme'], code: 'custom', message: ""})
        }
    }
})

export const updateAvailabilityExceptionSchema = createAvailabilityExceptionBaseSchema.partial()

export type CreateAvailabilityRuleDto = z.infer<typeof createAvailabilityRuleSchema>
export type UpdateAvailabilityRuleDto = z.infer<typeof updateAvailabilityRuleSchema>
export type CreateAvailabilityExceptionDto = z.infer<typeof createAvailabilityExceptionSchema>
export type UpdateAvailabilityExceptionDto = z.infer<typeof updateAvailabilityExceptionSchema>
