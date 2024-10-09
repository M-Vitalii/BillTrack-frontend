import {Employee} from "@/features/employee/models/employee.ts";

export interface Workday {
    id?: string;
    date: string;
    hours: number;
    employee: Employee;
}