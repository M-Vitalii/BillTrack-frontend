// src/shared/api/api-client.ts
import axios, { AxiosRequestConfig } from 'axios';
import {StorageService} from "@/shared/services/storage-service.ts";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

const enrichRequestWithAuthHeader = (config: AxiosRequestConfig) => {
    const token = StorageService.getToken();
    if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
};

const get = (url: string, config: AxiosRequestConfig = {}) => {
    return apiClient.get(url, enrichRequestWithAuthHeader(config));
};

const post = <T>(url: string, data?: any, config: AxiosRequestConfig = {}) => {
    return apiClient.post<T>(url, data, enrichRequestWithAuthHeader(config));
};

const put = (url: string, data?: any, config: AxiosRequestConfig = {}) => {
    return apiClient.put(url, data, enrichRequestWithAuthHeader(config));
};

const remove = (url: string, config: AxiosRequestConfig = {}) => {
    return apiClient.delete(url, enrichRequestWithAuthHeader(config));
};

export const api = {
    get,
    post,
    put,
    delete: remove,
};
