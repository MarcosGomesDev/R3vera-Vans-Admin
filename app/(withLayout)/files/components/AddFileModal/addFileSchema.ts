import { z } from "zod";

const TypeEnum = z.enum(["default", "funny"]);

export interface AddFileForm {
  type: (typeof TypeEnum._def.values)[number];
  file: File | null;
}

export const addFileSchema = z.object({
  type: z.enum(["default", "funny"], {
    invalid_type_error: "Você precisa selecionar o tipo de buzina",
    message: "Você precisa selecionar o tipo de buzina",
  }),
  file: z
    .instanceof(File, {
      message: "O arquivo é obrigatório",
    })
    .refine((file) => !!file, {
      message: "Arquivo é obrigatório",
    }),
});

export type AddFileSchema = z.infer<typeof addFileSchema>;
