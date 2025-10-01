import z from 'zod';

export const validateIdeaIdSchema = z.object({
    ideaId: z
        .string()
        .min(24, 'ID must be at least 24 characters')
        .max(32, 'ID must be at most 32 characters')
        .startsWith('cmg', 'ID must start with "cmg"')
        .regex(/^[a-z0-9]+$/i, 'ID must contain only letters and numbers'),
});
