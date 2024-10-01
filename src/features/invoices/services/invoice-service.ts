import {BaseService} from "@/shared/api/base-service.ts";
import {Invoice} from "@/features/invoices/models/invoice.ts";

class InvoiceService extends BaseService<Invoice> {
    constructor() {
        super("invoices");
    }
}

export default new InvoiceService();