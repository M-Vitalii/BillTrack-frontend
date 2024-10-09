import {AlertDialogReadOnly} from "@/components/dialog/AlertDialogReadOnly.tsx";
import {DynamicTable} from "@/components/table/DynamicTable.tsx";
import {TableCell} from "@/components/ui/table";
import {PaginationComponent} from "@/components/PaginationComponent";
import {useWorkdays} from "@/features/workdays/hooks/use-workdays.ts";
import {Workday} from "@/features/workdays/models/workday.ts";
import {AddEditWorkdayDialog} from "@/features/workdays/components/AddEditWorkdayDialog.tsx";
import {useEmployees} from "@/features/employee/hooks/use-employees.ts";
import {DeleteButton} from "@/components/button/DeleteButton.tsx";
import {SelectSortOrder} from "@/components/select/SelectSortOrder.tsx";
import {EmployeeCombobox} from "@/components/combobox/EmployeeCombobox.tsx";

export function WorkdaysPage() {
    const {
        entities,
        page,
        pageSize,
        handlePageChange,
        handlePageSizeChange,
        handleAdd,
        handleEdit,
        handleDelete,
        isDeletingEntity,
        updateQueryParams
    } = useWorkdays();

    const {entities: employees} = useEmployees();

    return (
        <div>
            <div className='grid justify-items-center mt-5'>
                <AddEditWorkdayDialog
                    onSubmit={handleAdd}
                    isEditing={false}
                    employees={employees.items}
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
                    <EmployeeCombobox labelText="Filter by employee" onSelect={(e) => updateQueryParams({filterByEmployee: e})} />
                    <div className="max-w-xl">
                        <SelectSortOrder labelText="Sort by date"
                                         onValueChange={(e) => updateQueryParams({sortByDate: e})}/>
                    </div>
                </div>
                <DynamicTable
                    headers={["Employee", "Date", "Hours", "Actions"]}
                    data={entities.items}
                    renderRow={(workday: Workday) => (
                        <>
                            <TableCell
                                className="text-left flex-1">{`${workday.employee.id?.substring(0, 4)}-${workday.employee.firstname} ${workday.employee.lastname}`.toString() || 'N/A'}</TableCell>
                            <TableCell className="text-left">{workday.date.toString() || 'N/A'}</TableCell>
                            <TableCell className="text-left">{workday.hours || 'N/A'}</TableCell>
                            <TableCell className="text-right space-x-5">
                                <AlertDialogReadOnly
                                    triggerText="View Details"
                                    title="Workday Information"
                                    fields={[
                                        {label: "Workday ID", value: workday.id! || "N/A"},
                                        {label: "Date", value: workday.date.toString() || "N/A"},
                                        {label: "Hours", value: workday.hours || "N/A"},
                                        {label: "Employee", value: `${workday.employee.id?.substring(0, 4)}-${workday.employee.firstname} ${workday.employee.lastname}`.toString() || "N/A"},
                                    ]}
                                />
                                <AddEditWorkdayDialog
                                    key={workday.id}
                                    onSubmit={(values) => handleEdit(workday.id!, values)}
                                    initialValues={workday}
                                    isEditing={true}
                                    employees={employees.items}
                                />
                                <DeleteButton
                                    onDelete={() => handleDelete(workday.id!)}
                                    isDeleting={isDeletingEntity(workday.id!)}
                                />
                            </TableCell>
                        </>
                    )}
                />
            </div>
        </div>
    );
}