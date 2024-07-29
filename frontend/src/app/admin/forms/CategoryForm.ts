import * as z from "zod";

export const CategoryFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "O campo nome deve ter no mínimo 3 caracteres" }),
});

export type CategoryFormType = z.infer<typeof CategoryFormSchema>;
