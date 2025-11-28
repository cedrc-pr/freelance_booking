import z from "zod";

export const ZUser = z.object({
	user_id: z.coerce.number().int().positive(),
	first_name: z.string(),
	last_name: z.string(),
	image: z.url().nullable(),
	login: z.string(),
	password: z.string(),
	location: z.string(),
});
export const ZUserWithoutId = ZUser.omit({ user_id: true });

export type User = z.infer<typeof ZUser>;
export type UserWithoutId = z.infer<typeof ZUserWithoutId>;

export const ZId = z.object({
	id: z.coerce.number().int().positive(),
});

export type Id = z.infer<typeof ZId>;

export const ZLogin = z.object({
	login: z.string(),
	password: z.string(),
});

export type Login = z.infer<typeof ZLogin>;

export const ZBooking = z.object({
	date: z.coerce.date(),
	user_id: z.coerce.number().int().positive(),
});

export type Booking = z.infer<typeof ZBooking>;
