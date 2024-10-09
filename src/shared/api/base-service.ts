import { AxiosResponse } from "axios";
import { api } from "@/shared/api/api-client";

export interface Page<T> {
    pageNumber: number;
    pageSize: number;
    items: T[];
}

export class BaseService<T> {
    constructor(private readonly endpoint: string) {}

    public async getAll(pageNumber: number = 1, pageSize: number = 10, queryParams?: Record<string, any>): Promise<Page<T>> {
        try {
            const response: AxiosResponse<Page<T>> = await api.get(this.endpoint, {
                params: {
                    page: pageNumber,
                    pageSize,
                    ...queryParams,
                },
            });
            console.log(`Fetched ${this.endpoint}:`, response.data);
            return response.data;
        } catch (error) {
            console.error(`Error fetching ${this.endpoint}`, error);
            throw error;
        }
    }


    public async getById(id: string): Promise<T> {
        try {
            const response: AxiosResponse<T> = await api.get(`${this.endpoint}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching ${this.endpoint} with ID: ${id}`, error);
            throw error;
        }
    }

    public async create(item: T): Promise<T> {
        try {
            const response: AxiosResponse<T> = await api.post(this.endpoint, item);
            return response.data;
        } catch (error) {
            console.error(`Error creating ${this.endpoint}`, error);
            throw error;
        }
    }

    public async update(id: string, item: T): Promise<T> {
        try {
            const response: AxiosResponse<T> = await api.put(`${this.endpoint}/${id}`, item);
            return response.data;
        } catch (error) {
            console.error(`Error updating ${this.endpoint} with ID: ${id}`, error);
            throw error;
        }
    }

    public async delete(id: string): Promise<void> {
        try {
            await api.delete(`${this.endpoint}/${id}`);
        } catch (error) {
            console.error(`Error deleting ${this.endpoint} with ID: ${id}`, error);
            throw error;
        }
    }
}