import {useCallback, useEffect, useState} from 'react';
import {usePagination} from "@/hooks/use-pagination.ts";
import ProjectService from "@/features/projects/services/project-service.ts";
import {Project} from "@/features/projects/models";
import {Page} from "@/shared/api/base-service.ts";

export function useProjectsData() {
    const { page, pageSize, handlePageChange, handlePageSizeChange } = usePagination({
        initialPage: 1,
        initialPageSize: 10
    });

    const [projects, setProjects] = useState<Page<Project>>({ items: [], pageNumber: 1, pageSize: 10 });

    const fetchProjects = useCallback(async () => {
        try {
            const response = await ProjectService.getAll(page, pageSize);
            setProjects(response);
        } catch (error) {
            console.error('Failed to fetch projects', error);
        }
    }, [page, pageSize]);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    return {
        projects,
        page,
        pageSize,
        handlePageChange,
        handlePageSizeChange,
        fetchProjects,
    };
}
