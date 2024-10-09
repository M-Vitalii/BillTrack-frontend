import {BaseService} from "@/shared/api/base-service.ts";
import {Invoice} from "@/features/invoices/models/invoice.ts";
import {AxiosResponse} from "axios";
import {api} from "@/shared/api/api-client.ts";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

class InvoiceService extends BaseService<Invoice> {
    constructor() {
        super("invoices");
    }

    public async getPreSignedUrl(id: string): Promise<string> {
        try {
            const response: AxiosResponse<string> = await api.get(`${baseUrl}/invoices/${id}/pre-signed-url`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching invoice pre signed url with ID: ${id}`, error);
            throw error;
        }
    }
}

export default new InvoiceService();