import * as z from "zod";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const LoginFormSchema = z.object({
  email: z
    .string()
    .regex(emailRegex, { message: "Formato de email inválido" }),
    password: z
    .string()
    .min(6, { message: "A senha deve ter no mínimo 6 caracteres" })
});

export type LoginFormType = z.infer<typeof LoginFormSchema>;
