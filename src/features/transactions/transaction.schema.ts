import { z } from "zod";

export const transactionInputSchema = z.object({
  date: z.string().min(1, "Inserisci una data"),
  description: z.string().trim().min(2, "Descrizione troppo corta"),
  categoryId: z.string().min(1, "Scegli una categoria"),
  amount: z
    .string()
    .trim()
    .min(1, "Inserisci un importo")
    .regex(/^\d+([.,]\d{1,2})?$/, "Importo non valido (es: 12,34)"),
});

export type TransactionInputSchema = z.infer<typeof transactionInputSchema>;
