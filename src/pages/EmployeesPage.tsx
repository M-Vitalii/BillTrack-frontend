import {AlertDialogReadOnly} from "@/components/dialog/AlertDialogReadOnly.tsx";
import {DynamicTable} from "@/components/table/DynamicTable.tsx";
import {TableCell} from "@/components/ui/table";
import {PaginationComponent} from "@/components/PaginationComponent";
import {useEmployees} from "@/features/employee/hooks/use-employees.ts";
import {Employee} from "@/features/employee/models/employee.ts";
import {AddEditEmployeeDialog} from "@/features/employee/components/AddEditEmployeeDialog.tsx";
import {SelectSortOrder} from "@/components/select/SelectSortOrder.tsx";
import {DeleteButton} from "@/components/button/DeleteButton.tsx";
import {DepartmentCombobox} from "@/components/combobox/DepartmentCombobox.tsx";
import {ProjectCombobox} from "@/components/combobox/ProjectCombobox.tsx";
import {InputWithLabel} from "@/components/input/InputWithLabel.tsx";

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
        updateQueryParams,
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
                <div className="py-10 w-full flex justify-between">
                    <div className="flex flex-row space-x-4">
                        <DepartmentCombobox labelText="Filter by departments"
                                          onSelect={(e) => updateQueryParams({filterByDepartment: e})}/>
                        <ProjectCombobox labelText="Filter by projects"
                                          onSelect={(e) => updateQueryParams({filterByProject: e})}/>
                        <InputWithLabel
                            labelText="Filter by Employee full name"
                            id="employeeFilter"
                            placeholder="Enter employee full name"
                            onChange={(e) => updateQueryParams({ filterByEmployeeName: e.target.value })}
                        />
                    </div>
                    <div className="max-w-xl">
                        <SelectSortOrder labelText="Sort by last name"
                                         onValueChange={(e) => updateQueryParams({sortByName: e})}/>
                    </div>
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
                            <TableCell className="text-right space-x-5">
                                <AlertDialogReadOnly
                                    triggerText="View Details"
                                    title="Employee Information"
                                    fields={[
                                        {label: "ID", value: employee.id! || "N/A"},
                                        {label: "First Name", value: employee.firstname || "N/A"},
                                        {label: "Last Name", value: employee.lastname || "N/A"},
                                        {label: "Email", value: employee.email || "N/A"},
                                        {label: "Salary", value: `${employee.salary.toFixed(2)}`},
                                        {label: "Department", value: employee.department.name || "N/A"},
                                        {label: "Project", value: employee.project.name || "N/A"},
                                    ]}
                                />
                                <AddEditEmployeeDialog
                                    key={employee.id}
                                    onSubmit={(values) => handleEdit(employee.id!, values)}
                                    initialValues={employee}
                                    isEditing={true}
                                />
                                <DeleteButton
                                    onDelete={() => handleDelete(employee.id!)}
                                />
                            </TableCell>
                        </>
                    )}
                />
            </div>
        </div>
    );
}