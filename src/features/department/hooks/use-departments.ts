import { useState, useCallback, useEffect } from 'react';
import DepartmentService from "@/features/department/services/department-service.ts";
import { usePagination } from "@/hooks/use-pagination.ts";
import { useToast } from "@/hooks/use-toast.ts";
import { z } from 'zod';
import { NamedItemSchema } from "@/shared/schemas/named-item-schema.ts";
import {Department, DepartmentPage} from "@/features/department/models";

export function useDepartments() {
    const { page, pageSize, handlePageChange, handlePageSizeChange } = usePagination({
        initialPage: 1,
        initialPageSize: 10
    });

    const [departments, setDepartments] = useState<DepartmentPage>({ items: [], page: 1, pageSize: 10 });
    const { toast } = useToast();

    const fetchDepartments = useCallback(async () => {
        try {
            const response = await DepartmentService.getDepartments(page, pageSize);
            setDepartments(response);
        } catch (error) {
            console.error('Failed to fetch departments', error);
            toast({
                title: "Error",
                description: "Failed to fetch departments. Please try again.",
                variant: "destructive",
            });
        }
    }, [page, pageSize, toast]);

    useEffect(() => {
        fetchDepartments();
    }, [fetchDepartments]);

    const handleAddDepartment = async (values: z.infer<NamedItemSchema>) => {
        const newDepartment: Department = {
            name: values.name,
        };

        try {
            await DepartmentService.createDepartment(newDepartment);
            toast({
                title: "Success",
                description: "Department added successfully."
            });
            await fetchDepartments();
        } catch (error) {
            console.error('Failed to add department', error);
            toast({
                title: "Error",
                description: "Failed to add department. Please try again.",
                variant: "destructive",
            });
        }
    };

    const handleEditDepartment = async (id: string, values: z.infer<NamedItemSchema>) => {
        const updatedDepartment: Department = {
            id,
            name: values.name,
        };

        try {
            await DepartmentService.updateDepartment(id, updatedDepartment);
            toast({
                title: "Success",
                description: "Department updated successfully."
            });
            await fetchDepartments();
        } catch (error) {
            console.error('Failed to update department', error);
            toast({
                title: "Error",
                description: "Failed to update department. Please try again.",
                variant: "destructive",
            });
        }
    };

    const handleDeleteDepartment = async (id: string) => {
        try {
            await DepartmentService.deleteDepartment(id);
            toast({
                title: "Success",
                description: "Department deleted successfully."
            });
            await fetchDepartments();
        } catch (error) {
            console.error('Failed to delete department', error);
            toast({
                title: "Error",
                description: "Failed to delete department. Please try again.",
                variant: "destructive",
            });
        }
    };

    return {
        departments,
        page,
        pageSize,
        handlePageChange,
        handlePageSizeChange,
        handleAddDepartment,
        handleEditDepartment,
        handleDeleteDepartment,
    };
}