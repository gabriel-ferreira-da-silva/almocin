import * as z from "zod";
import { OrderStatus } from "../../../shared/types/order";

export const OrderFormSchema = z.object({
  status: z.nativeEnum(OrderStatus),
});

export type OrderFormType = z.infer<typeof OrderFormSchema>;
