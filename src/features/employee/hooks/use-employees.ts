import {useEntityData} from "@/hooks/use-entity-data.ts";
import EmployeeService from "@/features/employee/services/employee-service.ts";
import {employeeSchema} from "@/features/employee/schemas/employee-schema.ts";
import {Employee} from "@/features/employee/models/employee.ts";

export const useEmployees = (initialPageNumber: number = 1, initialPageSize: number = 10) =>
    useEntityData<Employee, typeof employeeSchema>(EmployeeService, 'Employee', initialPageNumber, initialPageSize);