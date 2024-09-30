import {useCallback, useEffect, useState} from 'react';
import DepartmentService from "@/features/department/services/department-service.ts";
import {usePagination} from "@/hooks/use-pagination.ts";
import {Department} from "@/features/department/models";
import {Page} from "@/shared/api/base-service.ts";
import {toastFactory} from "@/shared/factories/toast-factory.ts";
import {useToast} from "@/hooks/use-toast.ts";

export function useDepartmentsData() {
    const { page, pageSize, handlePageChange, handlePageSizeChange } = usePagination({
        initialPage: 1,
        initialPageSize: 10
    });

    const { toast } = useToast();

    const [departments, setDepartments] = useState<Page<Department>>({ items: [], pageNumber: 1, pageSize: 10 });

    const fetchDepartments = useCallback(async () => {
        try {
            const response = await DepartmentService.getAll(page, pageSize);
            setDepartments(response);
        } catch (error) {
            console.error('Failed to fetch departments', error);
            toast(toastFactory.getError("Failed to fetch departments. Please try again."));
        }
    }, [page, pageSize, toast]);

    useEffect(() => {
        fetchDepartments();
    }, [fetchDepartments]);

    return {
        departments,
        page,
        pageSize,
        handlePageChange,
        handlePageSizeChange,
        fetchDepartments
    };
}
