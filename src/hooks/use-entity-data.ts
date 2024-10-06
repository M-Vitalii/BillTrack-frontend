import { useState, useCallback, useEffect } from 'react';
import { usePagination } from "@/hooks/use-pagination";
import { useToast } from "@/hooks/use-toast";
import { toastFactory } from "@/shared/factories/toast-factory";
import { Page } from "@/shared/api/base-service";
import { z } from 'zod';

interface EntityService<T> {
    getAll: (page: number, pageSize: number, queryParams?: Record<string, any>) => Promise<Page<T>>;
    create: (entity: T) => Promise<T>;
    update: (id: string, entity: T) => Promise<T>;
    delete: (id: string) => Promise<void>;
}

export function useEntityData<T extends { id?: string }, S extends z.ZodType<any, any>>(
    entityService: EntityService<T>,
    entityName: string,
    initialQueryParams: Record<string, any> = {}
) {
    const { page, pageSize, handlePageChange, handlePageSizeChange } = usePagination({
        initialPage: 1,
        initialPageSize: 10,
    });

    const { toast } = useToast();
    const [entities, setEntities] = useState<Page<T>>({ items: [], pageNumber: 1, pageSize: 10 });
    const [deletingId, setDeletingId] = useState<string | null>(null);

    // Stable query params state
    const [queryParams, setQueryParams] = useState<Record<string, any>>(initialQueryParams);
    const [debouncedQueryParams, setDebouncedQueryParams] = useState<Record<string, any>>(initialQueryParams);

    // Debouncing mechanism for query parameters
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQueryParams(queryParams);
        }, 1000); // Adjust the debounce delay as needed

        return () => {
            clearTimeout(handler);
        };
    }, [queryParams]);

    // Memoize fetchEntities to prevent it from being re-created unnecessarily
    const fetchEntities = useCallback(
        async (additionalQueryParams: Record<string, any> = {}) => {
            try {
                const response = await entityService.getAll(page, pageSize, { ...debouncedQueryParams, ...additionalQueryParams });
                setEntities(response);
            } catch (error) {
                console.error(`Failed to fetch ${entityName}s`, error);
                toast(toastFactory.getError(`Failed to fetch ${entityName}s. Please try again.`));
            }
        },
        [page, pageSize, entityService, entityName, toast, debouncedQueryParams]
    );

    // Set query params when filters or other params change
    const updateQueryParams = useCallback((newQueryParams: Record<string, any>) => {
        setQueryParams((prevParams) => ({
            ...prevParams,
            ...newQueryParams,
        }));
    }, []);

    useEffect(() => {
        fetchEntities(); // Fetch with debounced query params
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
        setDeletingId(id);
        try {
            await entityService.delete(id);
            toast(toastFactory.getSuccess(`${entityName} deleted successfully.`));
            await fetchEntities();
        } catch (error) {
            console.error(`Failed to delete ${entityName}`, error);
            toast(toastFactory.getError(`Failed to delete ${entityName}. Please try again.`));
        } finally {
            setDeletingId(null);
        }
    };

    return {
        entities,
        page,
        pageSize,
        handlePageChange,
        handlePageSizeChange,
        fetchEntities,
        updateQueryParams, // You can pass query params without worrying about debouncing in the component
        handleAdd,
        handleEdit,
        handleDelete,
        isDeletingEntity: (id: string) => deletingId === id,
    };
}
