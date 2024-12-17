import { z } from "zod";

export const restaurantFormSchema = z.object({
  restaurantName: z
    .string()
    .nonempty({ message: "Restaurant name is required" })
    .min(3, { message: "Restaurant name must be at least 3 characters long" })
    .max(100, { message: "Restaurant name must be at most 100 characters long" }),

  city: z
    .string()
    .nonempty({ message: "City is required" })
    .min(2, { message: "City name must be at least 2 characters long" })
    .max(50, { message: "City name must be at most 50 characters long" }),

  country: z
    .string()
    .nonempty({ message: "Country is required" })
    .min(2, { message: "Country name must be at least 2 characters long" })
    .max(50, { message: "Country name must be at most 50 characters long" }),

  deliveryTime: z
    .number({ invalid_type_error: "Delivery time must be a number" })
    .min(5, { message: "Delivery time must be at least 5 minutes" })
    .max(300, { message: "Delivery time must not exceed 300 minutes" }),

  cuisines: z
    .array(
      z.string().nonempty({ message: "Cuisine type cannot be empty" })
    )
    .min(1, { message: "At least one cuisine type is required" })
    .max(10, { message: "You can add at most 10 cuisines" }),

  imageFile: z
    .instanceof(File)
    .refine((file) => file.size > 0, { message: "Image file is required" })
    .refine(
      (file) =>
        ["image/jpeg", "image/png", "image/webp", "image/jpg"].includes(
          file.type
        ),
      { message: "Image must be of type JPEG, PNG, WEBP, or JPG" }
    )
    .optional(),
});

export type RestaurantFormSchema = z.infer<typeof restaurantFormSchema>;
