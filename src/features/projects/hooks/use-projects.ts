import {useCallback, useEffect, useState} from 'react';
import {usePagination} from "@/hooks/use-pagination.ts";
import {useToast} from "@/hooks/use-toast.ts";
import {z} from 'zod';
import {NamedItemSchema} from "@/shared/schemas/named-item-schema.ts";
import {Project, ProjectPage} from "@/features/projects/models";
import ProjectService from "@/features/projects/services/project-service.ts";

export function useProjects() {
    const { page, pageSize, handlePageChange, handlePageSizeChange } = usePagination({
        initialPage: 1,
        initialPageSize: 10
    });

    const [projects, setProjects] = useState<ProjectPage>({ items: [], page: 1, pageSize: 10 });
    const { toast } = useToast();

    const fetchProjects = useCallback(async () => {
        try {
            const response = await ProjectService.getProjects(page, pageSize);
            setProjects(response);
        } catch (error) {
            console.error('Failed to fetch projects', error);
            toast({
                title: "Error",
                description: "Failed to fetch projects. Please try again.",
                variant: "destructive",
            });
        }
    }, [page, pageSize, toast]);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    const handleAddProject = async (values: z.infer<NamedItemSchema>) => {
        const newProject: Project = {
            name: values.name,
        };

        try {
            await ProjectService.createProject(newProject);
            toast({
                title: "Success",
                description: "Project added successfully."
            });
            await fetchProjects();
        } catch (error) {
            console.error('Failed to add project', error);
            toast({
                title: "Error",
                description: "Failed to add project. Please try again.",
                variant: "destructive",
            });
        }
    };

    const handleEditProject = async (id: string, values: z.infer<NamedItemSchema>) => {
        const project: Project = {
            id,
            name: values.name,
        };

        try {
            await ProjectService.updateProject(id, project);
            toast({
                title: "Success",
                description: "Project updated successfully."
            });
            await fetchProjects();
        } catch (error) {
            console.error('Failed to update project', error);
            toast({
                title: "Error",
                description: "Failed to update project. Please try again.",
                variant: "destructive",
            });
        }
    };

    const handleDeleteProject = async (id: string) => {
        try {
            await ProjectService.deleteProject(id);
            toast({
                title: "Success",
                description: "Project deleted successfully."
            });
            await fetchProjects();
        } catch (error) {
            console.error('Failed to delete project', error);
            toast({
                title: "Error",
                description: "Failed to delete project. Please try again.",
                variant: "destructive",
            });
        }
    };

    return {
        projects,
        page,
        pageSize,
        handlePageChange,
        handlePageSizeChange,
        handleAddProject,
        handleEditProject,
        handleDeleteProject,
    };
}