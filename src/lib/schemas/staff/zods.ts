import {z} from 'zod';

export const staffSchema = z.object({
    photo: z.string().min(1, {message: 'Required!'}),
    firstName: z.string().min(1, {message: 'Required!'}),
    lastName: z.string().nullable(),
    establishment: z.string().min(1, {message: 'Required!'}),
    role: z.string().min(1, {message: 'Required!'}),
    tips: z.boolean(),
    payType: z.string().min(1, {message: 'Required!'}),
    hourlyRate: z.number().min(1, {message: 'Required!'}),
    tablesAssigned: z.string().nullable(),
    passCode: z.string().min(1, {message: 'Required!'}),
    showPassCode: z.boolean(),
    number: z.string().min(1, {message: 'Required!'}),
    email: z.string().email().min(1, {message: 'Required!'}),
    overtimeExempt: z.boolean(),
})