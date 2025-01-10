//@ts-nocheck


import { z } from "zod";

export const userSignupSchema = z.object({
  fullname: z.string().min(2, "Fullname is required"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 
      "Password must contain at least one lowercase letter, one uppercase letter, and one number"
    ),
  contact: z
    .string()
    .min(11, { message: "Contact number at least 11 digits" })
    .max(11, "Contact number at most 11 digits"),
});

export type SignupInputState = z.infer<typeof userSignupSchema>;

export const userLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

export type LoginInputState = z.infer<typeof userLoginSchema>;