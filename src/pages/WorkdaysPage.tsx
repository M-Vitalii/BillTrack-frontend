import {AlertDialogReadOnly} from "@/components/AlertDialogReadOnly";
import {DynamicTable} from "@/components/DynamicTable";
import {TableCell} from "@/components/ui/table";
import {PaginationComponent} from "@/components/PaginationComponent";
import {Button} from "@/components/ui/button";
import {useWorkdays} from "@/features/workdays/hooks/use-workdays.ts";
import {Workday} from "@/features/workdays/models/workday.ts";
import {AddEditWorkdayDialog} from "@/features/workdays/components/AddEditWorkdayDialog.tsx";

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
    } = useWorkdays();

    return (
        <div>
            <div className='grid justify-items-center mt-5'>
                <AddEditWorkdayDialog
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
                    headers={["Workday ID", "Date", "Hours", "Actions"]}
                    data={entities.items}
                    renderRow={(workday: Workday) => (
                        <>
                            <TableCell
                                className="text-left flex-1">{`${workday.id! || 'N/A'}`}</TableCell>
                            <TableCell className="text-left">{workday.date.toString() || 'N/A'}</TableCell>
                            <TableCell className="text-left">${workday.hours || 'N/A'}</TableCell>
                            <TableCell className="text-left space-x-5">
                                <AlertDialogReadOnly
                                    triggerText="View Details"
                                    title="Workday Information"
                                    fields={[
                                        {label: "Workday ID", value: workday.id! || "N/A"},
                                        {label: "Date", value: workday.date.toString() || "N/A"},
                                        {label: "Hours", value: workday.hours || "N/A"},
                                        {label: "Employee ID", value: workday.employeeId || "N/A"},
                                    ]}
                                />
                                <AddEditWorkdayDialog
                                    key={workday.id}
                                    onSubmit={(values) => handleEdit(workday.id!, values)}
                                    initialValues={workday}
                                    isEditing={true}
                                />
                                <Button
                                    variant="destructive"
                                    onClick={() => workday.id && handleDelete(workday.id!)}
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