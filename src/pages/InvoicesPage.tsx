import {AlertDialogReadOnly} from "@/components/dialog/AlertDialogReadOnly.tsx";
import {DynamicTable} from "@/components/table/DynamicTable.tsx";
import {TableCell} from "@/components/ui/table";
import {PaginationComponent} from "@/components/PaginationComponent";
import {useInvoices} from "@/features/invoices/hooks/use-invoices.ts";
import {AddEditInvoiceDialog} from "@/features/invoices/components/AddEditInvoiceDialog.tsx";
import {Invoice} from "@/features/invoices/models/invoice.ts";
import {Download} from "lucide-react";
import {EmployeeCombobox} from "@/components/combobox/EmployeeCombobox.tsx";
import {SelectSortOrder} from "@/components/select/SelectSortOrder.tsx";
import {DeleteButton} from "@/components/button/DeleteButton.tsx";

export function InvoicesPage() {
    const {
        entities: invoices,
        page,
        pageSize,
        handlePageChange,
        handlePageSizeChange,
        handleAdd,
        handleEdit,
        handleDelete,
        updateQueryParams,
        isDeletingEntity,
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
                <div className="py-10 w-full flex justify-between">
                    <EmployeeCombobox labelText="Filter by employee"
                                      onSelect={(e) => updateQueryParams({filterByEmployee: e})}/>
                    <div className="max-w-xl">
                        <SelectSortOrder labelText="Sort by date"
                                         onValueChange={(e) => updateQueryParams({sortByDate: e})}/>
                    </div>
                </div>
                <DynamicTable
                    headers={["Employee", "Month", "Year", "Actions"]}
                    data={invoices.items}
                    renderRow={(invoice: Invoice) => (
                        <>
                            <TableCell
                                className="text-left flex-1">{`${invoice.employee.id?.substring(0, 4)}-${invoice.employee.firstname} ${invoice.employee.lastname}`.toString() || 'N/A'}</TableCell>
                            <TableCell className="text-left">{invoice.month || 'N/A'}</TableCell>
                            <TableCell className="text-left">{invoice.year || 'N/A'}</TableCell>
                            <TableCell className="text-right space-x-5">
                                <AlertDialogReadOnly
                                    triggerText="View Details"
                                    title="Workday Information"
                                    fields={[
                                        {label: "Invoice ID", value: invoice.id! || "N/A"},
                                        {label: "Month", value: invoice.month || "N/A"},
                                        {label: "Year", value: invoice.year || "N/A"},
                                        {
                                            label: "Employee",
                                            value: `${invoice.employee.id?.substring(0, 4)}-${invoice.employee.firstname} ${invoice.employee.lastname}`.toString() || "N/A"
                                        },
                                    ]}
                                    isActionVisible={invoice.isUrlReady}
                                    actionText="Download"
                                    actionIcon={Download}
                                    onAction={() => downloadInvoice(invoice.id!)}
                                />
                                <AddEditInvoiceDialog
                                    key={invoice.id}
                                    onSubmit={(values) => handleEdit(invoice.id!, values)}
                                    initialValues={invoice}
                                    isEditing={true}
                                />
                                <DeleteButton
                                    onDelete={() => handleDelete(invoice.id!)}
                                    isDeleting={isDeletingEntity(invoice.id!)}
                                />
                            </TableCell>
                        </>
                    )}
                />
            </div>
        </div>
    );
}