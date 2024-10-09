import { z } from "zod";

export const workdaySchema = z.object({
    date: z.string().refine((val) => {
        // Regex pattern for YYYY-MM-DD format
        return /^\d{4}-\d{2}-\d{2}$/.test(val);
    }, {
        message: "Invalid date format. Use YYYY-MM-DD"
    }),
    hours: z.coerce.number().multipleOf(0.1, { message: "Invalid hours format" }),
    employeeId: z.string().uuid({ message: "Invalid employee ID format" }),
});
