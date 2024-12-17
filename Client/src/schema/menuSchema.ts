/*import {z} from "zod";

export const menuSchema = z.object({
    name:z.string().nonempty({message:"Name is required"}),
    description:z.string().nonempty({message:"description is required"}),
    price:z.number().min(0,{message:"Price can not be negative"}),
    image:z.instanceof(File).optional().refine((file) => file?.size !== 0, {message:"Image file is required"}),
});
export type MenuFormSchema = z.infer<typeof menuSchema>;*/

import { z } from "zod";

export const menuSchema = z.object({
  name: z
    .string()
    .nonempty({ message: "Name is required" })
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(50, { message: "Name must be at most 50 characters long" }),

  description: z
    .string()
    .nonempty({ message: "Description is required" })
    .min(10, { message: "Description must be at least 10 characters long" })
    .max(500, { message: "Description must be at most 500 characters long" }),

  price: z
    .number({ invalid_type_error: "Price must be a valid number" })
    .min(0.01, { message: "Price must be at least 0.01" })
    .max(10000, { message: "Price must not exceed 10,000" }),

  image: z
    .instanceof(File)
    .refine((file) => file.size > 0, {
      message: "Image file is required",
    })
    .refine(
      (file) =>
        ["image/jpeg", "image/png", "image/webp", "image/jpg"].includes(
          file.type
        ),
      {
        message: "Image must be of type JPEG, PNG, WEBP, or JPG",
      }
    )
    .optional(),
});

export type MenuFormSchema = z.infer<typeof menuSchema>;
