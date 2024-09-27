import { Project } from "@/features/projects/models";

export interface ProjectPage {
    items: Project[];
    page: number;
    pageSize: number;
}