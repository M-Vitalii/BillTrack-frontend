import { z } from "zod";

export const createNamedItemSchema = (itemName: string) => z.object({
    name: z.string().min(1, `${itemName} name is required`),
});

export type NamedItemSchema = ReturnType<typeof createNamedItemSchema>;