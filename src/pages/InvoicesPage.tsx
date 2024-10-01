import {AlertDialogReadOnly} from "@/components/AlertDialogReadOnly";
import {DynamicTable} from "@/components/DynamicTable";
import {TableCell} from "@/components/ui/table";
import {PaginationComponent} from "@/components/PaginationComponent";
import {Button} from "@/components/ui/button";
import {useInvoices} from "@/features/invoices/hooks/use-invoices.ts";
import {AddEditInvoiceDialog} from "@/features/invoices/components/AddEditInvoiceDialog.tsx";
import {Invoice} from "@/features/invoices/models/invoice.ts";
import {Download} from "lucide-react";

export function InvoicesPage() {
    const {
        entities,
        page,
        pageSize,
        handlePageChange,
        handlePageSizeChange,
        handleAdd,
        handleEdit,
        handleDelete,
        downloadInvoice
    } = useInvoices();

    return (
        <div>
            <div className='grid justify-items-center mt-5'>
                <AddEditInvoiceDialog
                    onSubmit={handleAdd}
                    isEditing={false}
                />
                <div className="py-10">
                    <PaginationComponent
                        currentPage={page}
                        pageSize={pageSize}
                        onPageChange={handlePageChange}
                        onPageSizeChange={handlePageSizeChange}
                    />
                </div>
                <DynamicTable
                    headers={["Invoice ID", "Month", "Year", "Actions"]}
                    data={entities.items}
                    renderRow={(invoice: Invoice) => (
                        <>
                            <TableCell
                                className="text-left flex-1">{`${invoice.id! || 'N/A'}`}</TableCell>
                            <TableCell className="text-left">{invoice.month || 'N/A'}</TableCell>
                            <TableCell className="text-left">${invoice.year || 'N/A'}</TableCell>
                            <TableCell className="text-left space-x-5">
                                <AlertDialogReadOnly
                                    triggerText="View Details"
                                    title="Workday Information"
                                    fields={[
                                        {label: "Workday ID", value: invoice.id! || "N/A"},
                                        {label: "Month", value: invoice.month || "N/A"},
                                        {label: "Year", value: invoice.year || "N/A"},
                                        {label: "Employee ID", value: invoice.employeeId || "N/A"},
                                    ]}
                                    isActionVisible={!!invoice.invoiceUrl}
                                    actionText="Download"
                                    actionIcon={Download}
                                    onAction={() => downloadInvoice(invoice.invoiceUrl!)}
                                />
                                <AddEditInvoiceDialog
                                    key={invoice.id}
                                    onSubmit={(values) => handleEdit(invoice.id!, values)}
                                    initialValues={invoice}
                                    isEditing={true}
                                />
                                <Button
                                    variant="destructive"
                                    onClick={() => invoice.id && handleDelete(invoice.id!)}
                                    className="ml-2"
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </>
                    )}
                />
            </div>
        </div>
    );
}