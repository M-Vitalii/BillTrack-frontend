import { z } from "zod";

export const invoiceSchema = z.object({
    id: z.string().uuid().optional(),
    month: z.number().int().min(1).max(12),
    year: z.number().int().min(2000).max(2100),
    employeeId: z.string().uuid()
});

export type InvoiceSchema = z.infer<typeof invoiceSchema>;