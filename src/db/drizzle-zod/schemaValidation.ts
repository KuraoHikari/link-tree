import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { buttons, linkTrees } from "../schema";

export const linkTreeSchema = createInsertSchema(
 linkTrees,
 {
  title: z
   .string()
   .min(3)
   .max(80)
   .refine(
    (value) => /^[a-zA-Z]+[-'s]?[a-zA-Z ]+$/.test(value),
    "title should contain only alphabets"
   ),
  description: z.string().min(3).max(255),
 }
);

export const buttonSchema = createInsertSchema(buttons, {
 text: z.string().min(1).max(40),
 link: z.string().min(3).url(),
});
