import {AxiosResponse} from "axios";
import {Department, DepartmentPage} from "@/features/department/models/department-model.ts";
import apiClient from "@/shared/api/api-client.ts";


class DepartmentService {
    // Get all departments
    public async getDepartments(pageNumber?: number,): Promise<DepartmentPage> {
        try {
            const response: AxiosResponse<DepartmentPage> = await apiClient.get("departments", {
                params: {
                    pageNumber: pageNumber || 1 // Default to page 1 if not provided
                }});
            return response.data;
        } catch (error) {
            console.error('Error fetching departments', error);
            throw error;
        }
    }

    // Get a single department by ID
    public async getDepartmentById(id: number): Promise<Department> {
        try {
            const response: AxiosResponse<Department> = await apiClient.get(`departments/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching department with ID: ${id}`, error);
            throw error;
        }
    }

    // Create a new department
    public async createDepartment(department: Department): Promise<Department> {
        try {
            const response: AxiosResponse<Department> = await apiClient.post(`departments/${department.id}`, department);
            return response.data;
        } catch (error) {
            console.error('Error creating department', error);
            throw error;
        }
    }

    // Update an existing department
    public async updateDepartment(id: number, department: Department): Promise<Department> {
        try {
            const response: AxiosResponse<Department> = await apiClient.put(`departments/${id}`, department);
            return response.data;
        } catch (error) {
            console.error(`Error updating department with ID: ${id}`, error);
            throw error;
        }
    }

    // Delete a department by ID
    public async deleteDepartment(id: number): Promise<void> {
        try {
            await apiClient.delete(`departments/${id}`);
        } catch (error) {
            console.error(`Error deleting department with ID: ${id}`, error);
            throw error;
        }
    }
}

export default new DepartmentService();