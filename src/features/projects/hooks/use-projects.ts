import ProjectService from "@/features/projects/services/project-service.ts";
import {Project} from "@/features/projects/models";
import {useEntityData} from "@/hooks/use-entity-data.ts";
import {NamedItemSchema} from "@/shared/schemas/named-item-schema.ts";

export const useProjects = () => useEntityData<Project, NamedItemSchema>(ProjectService, 'Project')