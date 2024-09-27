import {AxiosResponse} from "axios";
import {api} from "@/shared/api/api-client.ts";
import {Project, ProjectPage} from "@/features/projects/models";

class ProjectService {
    public async getProjects(pageNumber?: number, pageSize?: number): Promise<ProjectPage> {
        try {
            const response: AxiosResponse<ProjectPage> = await api.get("projects", {
                params: {
                    page: pageNumber || 1,
                    pageSize: pageSize || 10,
                }
            });
            console.log('Fetched projects:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching projects', error);
            throw error;
        }
    }

    public async getProjectById(id: string): Promise<Project> {
        try {
            const response: AxiosResponse<Project> = await api.get(`projects/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching project with ID: ${id}`, error);
            throw error;
        }
    }

    public async createProject(project: Project): Promise<Project> {
        try {
            const response: AxiosResponse<Project> = await api.post(`projects`, project);
            return response.data;
        } catch (error) {
            console.error('Error creating project', error);
            throw error;
        }
    }

    public async updateProject(id: string, project: Project): Promise<Project> {
        try {
            const response: AxiosResponse<Project> = await api.put(`projects/${id}`, project);
            return response.data;
        } catch (error) {
            console.error(`Error updating project with ID: ${id}`, error);
            throw error;
        }
    }

    public async deleteProject(id: string): Promise<void> {
        try {
            await api.delete(`projects/${id}`);
        } catch (error) {
            console.error(`Error deleting project with ID: ${id}`, error);
            throw error;
        }
    }
}

export default new ProjectService();
