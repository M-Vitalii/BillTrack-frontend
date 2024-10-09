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
        updateQueryParams,
        isDeletingEntity,
        handleDelete,
    } = useEntityData<Invoice, typeof invoiceSchema>(InvoiceService, 'Invoice');

    const downloadInvoice = async (id: string) => {
        const url = await InvoiceService.getPreSignedUrl(id);
        const link = document.createElement('a');

        link.href = url;
        link.download = '';
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
        updateQueryParams,
        isDeletingEntity,
        downloadInvoice,
    };
};
