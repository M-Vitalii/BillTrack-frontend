import { useState, useCallback, useEffect } from 'react';
import { usePagination } from "@/hooks/use-pagination";
import { useToast } from "@/hooks/use-toast";
import { toastFactory } from "@/shared/factories/toast-factory";
import { Page } from "@/shared/api/base-service";
import { z } from 'zod';

interface EntityService<T> {
    getAll: (page: number, pageSize: number) => Promise<Page<T>>;
    create: (entity: T) => Promise<T>;
    update: (id: string, entity: T) => Promise<T>;
    delete: (id: string) => Promise<void>;
}

export function useEntityData<T extends { id?: string }, S extends z.ZodType<any, any>>(
    entityService: EntityService<T>,
    entityName: string,
) {
    const { page, pageSize, handlePageChange, handlePageSizeChange } = usePagination({
        initialPage: 1,
        initialPageSize: 10
    });

    const { toast } = useToast();

    const [entities, setEntities] = useState<Page<T>>({ items: [], pageNumber: 1, pageSize: 10 });

    const fetchEntities = useCallback(async () => {
        try {
            const response = await entityService.getAll(page, pageSize);
            setEntities(response);
        } catch (error) {
            console.error(`Failed to fetch ${entityName}s`, error);
            toast(toastFactory.getError(`Failed to fetch ${entityName}s. Please try again.`));
        }
    }, [page, pageSize, entityService, entityName, toast]);

    useEffect(() => {
        fetchEntities();
    }, [fetchEntities]);

    const handleAdd = async (values: z.infer<S>) => {
        const newEntity = values as T;

        try {
            await entityService.create(newEntity);
            toast(toastFactory.getSuccess(`${entityName} added successfully.`));
            await fetchEntities();
        } catch (error) {
            console.error(`Failed to add ${entityName}`, error);
            toast(toastFactory.getError(`Failed to add ${entityName}. Please try again.`));
        }
    };

    const handleEdit = async (id: string, values: z.infer<S>) => {
        const updatedEntity = { id, ...values } as T;

        try {
            await entityService.update(id, updatedEntity);
            toast(toastFactory.getSuccess(`${entityName} updated successfully.`));
            await fetchEntities();
        } catch (error) {
            console.error(`Failed to update ${entityName}`, error);
            toast(toastFactory.getError(`Failed to update ${entityName}. Please try again.`));
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await entityService.delete(id);
            toast(toastFactory.getSuccess(`${entityName} deleted successfully.`));
            await fetchEntities();
        } catch (error) {
            console.error(`Failed to delete ${entityName}`, error);
            toast(toastFactory.getError(`Failed to delete ${entityName}. Please try again.`));
        }
    };

    return {
        entities,
        page,
        pageSize,
        handlePageChange,
        handlePageSizeChange,
        fetchEntities,
        handleAdd,
        handleEdit,
        handleDelete,
    };
}