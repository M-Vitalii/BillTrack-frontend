import {useEntityData} from "@/hooks/use-entity-data.ts";
import {invoiceSchema} from "@/features/invoices/schemas/invoice-schema.ts";
import {Invoice} from "@/features/invoices/models/invoice.ts";
import InvoiceService from "@/features/invoices/services/invoice-service.ts";

export const useInvoices = () => {
    const {
        entities,
        page,
        pageSize,
        handlePageChange,
        handlePageSizeChange,
        handleAdd,
        handleEdit,
        handleDelete,
    } = useEntityData<Invoice, typeof invoiceSchema>(InvoiceService, 'Invoice');

    // Function to handle invoice download by URL
    const downloadInvoice = (url: string) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = ''; // Let the browser decide the filename, or you can set a custom name here
        document.body.appendChild(link);
        link.click();
        link.remove();
    };

    return {
        entities,
        page,
        pageSize,
        handlePageChange,
        handlePageSizeChange,
        handleAdd,
        handleEdit,
        handleDelete,
        downloadInvoice,
    };
};
