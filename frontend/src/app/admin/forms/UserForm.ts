import * as z from "zod";

export const UserFormSchema = z.object({
  name: z
    .string()
    .min(5, { message: "O campo nome deve ter no mínimo 5 caracteres" }),
});

export type UserFormType = z.infer<typeof UserFormSchema>;

