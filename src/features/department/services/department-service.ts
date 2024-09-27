import { AxiosResponse } from "axios";
import { api } from "@/shared/api/api-client.ts";
import {Department, DepartmentPage} from "@/features/department/models";

class DepartmentService {
    public async getDepartments(pageNumber?: number, pageSize?: number): Promise<DepartmentPage> {
        try {
            const response: AxiosResponse<DepartmentPage> = await api.get("departments", {
                params: {
                    page: pageNumber || 1,
                    pageSize: pageSize || 10,
                }
            });
            console.log('Fetched departments:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching departments', error);
            throw error;
        }
    }

    public async getDepartmentById(id: string): Promise<Department> {
        try {
            const response: AxiosResponse<Department> = await api.get(`departments/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching department with ID: ${id}`, error);
            throw error;
        }
    }

    public async createDepartment(department: Department): Promise<Department> {
        try {
            const response: AxiosResponse<Department> = await api.post(`departments`, department); // Note: No ID here
            return response.data;
        } catch (error) {
            console.error('Error creating department', error);
            throw error;
        }
    }

    public async updateDepartment(id: string, department: Department): Promise<Department> {
        try {
            const response: AxiosResponse<Department> = await api.put(`departments/${id}`, department);
            return response.data;
        } catch (error) {
            console.error(`Error updating department with ID: ${id}`, error);
            throw error;
        }
    }

    public async deleteDepartment(id: string): Promise<void> {
        try {
            await api.delete(`departments/${id}`);
        } catch (error) {
            console.error(`Error deleting department with ID: ${id}`, error);
            throw error;
        }
    }
}

export default new DepartmentService();
