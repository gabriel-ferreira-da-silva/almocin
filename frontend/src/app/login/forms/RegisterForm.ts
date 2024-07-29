import * as z from "zod";

// Expressão regular para validar email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Expressão regular para validar CEP
const cepRegex = /^\d{5}-\d{3}$/;

// Expressão regular para validar CPF
const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\\-\d{2}$/;

export const RegisterFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'O campo nome não deve ser nulo' })
    .min(3, { message: 'O nome deve ter no mínimo 3 caracteres' }),
  email: z
    .string()
    .min(1, { message: 'O campo email não deve ser nulo' })
    .regex(emailRegex, { message: 'Formato de email inválido' }),
  password: z
    .string()
    .min(1, { message: 'O campo senha não deve ser nulo' })
    .min(6, { message: 'Senha inválida. A senha deve ter no mínimo 6 caracteres.' }),
  cep: z
    .string()
    .min(1, { message: 'O campo CEP não deve ser nulo' })
    .regex(cepRegex, { message: 'Formato de CEP inválido' }),
  petName: z
    .string()
    .min(1, { message: 'O campo nome do primeiro animal de estimação não deve ser nulo' }),
  paymentMethod: z
    .string()
    .min(1, { message: 'O campo forma de pagamento não deve ser nulo' }),
  cpf: z
    .string()
    .min(1, { message: 'O campo CPF não deve ser nulo' })
    .regex(cpfRegex, { message: 'Formato de CPF inválido' }),
});

export type RegisterFormType = z.infer<typeof RegisterFormSchema>;
