import { z } from 'zod';

const userFullNameSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

const addressSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});

export const userJoiValidationSchema = z.object({
  userId: z.number(),
  username: z.string(),
  fullName: userFullNameSchema,
  password: z.string(),
  address: addressSchema,
  email: z.string().email(),
  age: z.number(),
  orders: z.any(),
  hobbies: z.any(),
  isActive: z.boolean(),
});

export default userJoiValidationSchema;
