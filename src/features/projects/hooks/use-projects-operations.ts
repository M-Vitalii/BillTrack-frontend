import { z } from 'zod';
import { NamedItemSchema } from "@/shared/schemas/named-item-schema.ts";
import { Project } from "@/features/projects/models";
import ProjectService from "@/features/projects/services/project-service.ts";
import { useToast } from "@/hooks/use-toast.ts";
import {toastFactory} from "@/shared/factories/toast-factory.ts";

export function useProjectOperations(fetchProjects: () => Promise<void>) {
    const { toast } = useToast();

    const handleAddProject = async (values: z.infer<NamedItemSchema>) => {
        const newProject: Project = {
            name: values.name,
        };

        try {
            await ProjectService.create(newProject);
            toast(toastFactory.getSuccess("Project added successfully."));
            await fetchProjects();
        } catch (error) {
            console.error('Failed to add project', error);
            toast(toastFactory.getError("Failed to add project. Please try again."));
        }
    };

    const handleEditProject = async (id: string, values: z.infer<NamedItemSchema>) => {
        const project: Project = {
            id,
            name: values.name,
        };

        try {
            await ProjectService.update(id, project);
            toast(toastFactory.getSuccess("Project updated successfully."));
            await fetchProjects();
        } catch (error) {
            console.error('Failed to update project', error);
            toast(toastFactory.getError("Failed to update project. Please try again."));
        }
    };

    const handleDeleteProject = async (id: string) => {
        try {
            await ProjectService.delete(id);
            toast(toastFactory.getSuccess("Project deleted successfully."));
            await fetchProjects();
        } catch (error) {
            console.error('Failed to delete project', error);
            toast(toastFactory.getError("Failed to delete project. Please try again."));
        }
    };

    return {
        handleAddProject,
        handleEditProject,
        handleDeleteProject,
    };
}
