import {z} from 'zod';

export const settingsAccountSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    phoneNumber: z.string(),
    identificationNumber: z.string(),
    address: z.object({
        id: z.string(),
        addressLine1: z.string(),
        addressLine2: z.string().nullable(),
        city: z.string(),
        country: z.string(),
        postcode: z.string(),
    }).nullable(),
    currentPassword: z.string().nullable(),
    newPassword: z.string().nullable(),
    confirmNewPassword: z.string().nullable(),
});

export const settingsEstablishmentSchema = z.object({
    id: z.string().nullable(),
    name: z.string().min(1, {message: 'Required!'}),
    logoUrl: z.string().min(1, {message: 'Required!'}),
    description: z.string().min(1, {message: 'Required!'}),
    typeId: z.string().min(1, {message: 'Required!'}),
    addressId: z.string().nullable(),
    addressLine1: z.string().min(1, {message: 'Required!'}),
    addressLine2: z.string().nullable(),
    city: z.string().min(1, {message: 'Required!'}),
    postcode: z.string().min(1, {message: 'Required!'}),
    country: z.string().min(1, {message: 'Required!'}),
})