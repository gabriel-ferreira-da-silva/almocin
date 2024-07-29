import * as z from "zod";

// Regex para validar o formato de email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .regex(emailRegex, { message: "Formato de email inválido" })
    .nonempty({ message: "Email é obrigatório" }),
  petName: z
    .string()
    .nonempty({ message: "Nome do primeiro pet é obrigatório" }), // 
  newPassword: z
    .string()
    .min(6, { message: "A nova senha deve ter pelo menos 6 caracteres" }) 
    .nonempty({ message: "A nova senha é obrigatória" })
});

// Defina o tipo para os dados do formulário
export type ForgotPasswordType = z.infer<typeof ForgotPasswordSchema>;
