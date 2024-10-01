import {AlertDialogReadOnly} from "@/components/AlertDialogReadOnly";
import {DynamicTable} from "@/components/DynamicTable";
import {TableCell} from "@/components/ui/table";
import {PaginationComponent} from "@/components/PaginationComponent";
import {Button} from "@/components/ui/button";
import {useEmployees} from "@/features/employee/hooks/use-employees.ts";
import {Employee} from "@/features/employee/models/employee.ts";
import {AddEditEmployeeDialog} from "@/features/employee/components/AddEditEmployeeDialog.tsx";

export function EmployeesPage() {
    const {
        entities,
        page,
        pageSize,
        handlePageChange,
        handlePageSizeChange,
        handleAdd,
        handleEdit,
        handleDelete,
    } = useEmployees();

    return (
        <div>
            <div className='grid justify-items-center mt-5'>
                <AddEditEmployeeDialog
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
                    headers={["Name", "Email", "Salary", "Actions"]}
                    data={entities.items}
                    renderRow={(employee: Employee) => (
                        <>
                            <TableCell
                                className="text-left flex-1">{`${employee.firstname || ''} ${employee.lastname || ''}`}</TableCell>
                            <TableCell className="text-left">{employee.email || 'N/A'}</TableCell>
                            <TableCell className="text-left">${employee.salary || 'N/A'}</TableCell>
                            <TableCell className="text-left space-x-5">
                                <AlertDialogReadOnly
                                    triggerText="View Details"
                                    title="Employee Information"
                                    fields={[
                                        {label: "ID", value: employee.id! || "N/A"},
                                        {label: "First Name", value: employee.firstname || "N/A"},
                                        {label: "Last Name", value: employee.lastname || "N/A"},
                                        {label: "Email", value: employee.email || "N/A"},
                                        {label: "Salary", value: `${employee.salary.toFixed(2)}`},
                                        {label: "Department ID", value: employee.departmentId || "N/A"},
                                        {label: "Project ID", value: employee.projectId || "N/A"},
                                    ]}
                                />
                                <AddEditEmployeeDialog
                                    key={employee.id}
                                    onSubmit={(values) => handleEdit(employee.id!, values)}
                                    initialValues={employee}
                                    isEditing={true}
                                />
                                <Button
                                    variant="destructive"
                                    onClick={() => employee.id && handleDelete(employee.id!)}
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