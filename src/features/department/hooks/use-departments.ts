import DepartmentService from "@/features/department/services/department-service.ts";
import {Department} from "@/features/department/models";
import {useEntityData} from "@/hooks/use-entity-data.ts";
import {NamedItemSchema} from "@/shared/schemas/named-item-schema.ts";

export const useDepartments = (initialPageNumber: number = 1, initialPageSize: number = 10) =>
    useEntityData<Department, NamedItemSchema>(DepartmentService, 'Department', initialPageNumber, initialPageSize);