import { z } from "zod";

export interface AddCustomerForm {
  name: string;
  authorized?: boolean;
  sounds: {
    name: string;
    link: string;
    type: string;
  }[];
}

export const addCustomerSchema = z.object({
  name: z.string().min(1, {
    message: "Nome é obrigatório",
  }),
  authorized: z.boolean().default(false),
  sounds: z.array(
    z
      .object({
        name: z.string().optional(),
        link: z.string().optional(),
        type: z.string().optional(),
      })
      .optional(),
  ),
});

export type AddCustomerSchema = z.infer<typeof addCustomerSchema>;
