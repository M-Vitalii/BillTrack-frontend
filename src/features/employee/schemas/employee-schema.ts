import { z } from "zod";

export const employeeSchema = z.object({
    email: z.string().email({ message: "Invalid email format" }),
    firstname: z.string().min(1, { message: "First name is required" }),
    lastname: z.string().min(1, { message: "Last name is required" }),
    salary: z.coerce.number().multipleOf(0.01, { message: "Salary can only have 2 digits after period" }),
    departmentId: z.string().uuid({ message: "Invalid department ID format" }),
    projectId: z.string().uuid({ message: "Invalid project ID format" }),
});
