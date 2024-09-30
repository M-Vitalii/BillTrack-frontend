import DepartmentService from "@/features/department/services/department-service.ts";
import {z} from 'zod';
import {NamedItemSchema} from "@/shared/schemas/named-item-schema.ts";
import {Department} from "@/features/department/models";
import {toastFactory} from "@/shared/factories/toast-factory.ts";
import {toast} from "@/hooks/use-toast.ts";

export function useDepartmentsOperations(fetchDepartments: () => Promise<void>) {
    const handleAddDepartment = async (values: z.infer<NamedItemSchema>) => {
        const newDepartment: Department = {
            name: values.name,
        };

        try {
            await DepartmentService.create(newDepartment);
            toast(toastFactory.getSuccess("Department added successfully."));
            await fetchDepartments();
        } catch (error) {
            console.error('Failed to add department', error);
            toast(toastFactory.getError("Failed to add department. Please try again."));
        }
    };

    const handleEditDepartment = async (id: string, values: z.infer<NamedItemSchema>) => {
        const updatedDepartment: Department = {
            id,
            name: values.name,
        };

        try {
            await DepartmentService.update(id, updatedDepartment);
            toast(toastFactory.getSuccess("Department updated successfully."));
            await fetchDepartments();
        } catch (error) {
            console.error('Failed to update department', error);
            toast(toastFactory.getError("Failed to update department. Please try again."));
        }
    };

    const handleDeleteDepartment = async (id: string) => {
        try {
            await DepartmentService.delete(id);
            toast(toastFactory.getSuccess("Department deleted successfully."));
            await fetchDepartments();
        } catch (error) {
            console.error('Failed to delete department', error);
            toast(toastFactory.getError("Failed to delete department. Please try again."));
        }
    };

    return {
        handleAddDepartment,
        handleEditDepartment,
        handleDeleteDepartment,
    };
}
