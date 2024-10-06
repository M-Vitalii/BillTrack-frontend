import {Employee} from "@/features/employee/models/employee.ts";

export interface Invoice {
    id?: string;
    month: number;
    year: number;
    employee: Employee;
    invoiceUrl?: string;
}