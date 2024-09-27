import { Department } from "@/features/department/models/department.ts";
import { AddEditNamedItemDialog } from "@/components/AddEditNamedItemDialog.tsx";
import { DynamicTable } from "@/components/DynamicTable.tsx";
import { TableCell } from "@/components/ui/table.tsx";
import { PaginationComponent } from "@/components/PaginationComponent.tsx";
import { useDepartments } from "@/features/department/hooks/use-departments.ts";
import { Button } from "@/components/ui/button.tsx";

export function DepartmentsPage() {
    const {
        departments,
        page,
        pageSize,
        handlePageChange,
        handlePageSizeChange,
        handleAddDepartment,
        handleEditDepartment,
        handleDeleteDepartment,
    } = useDepartments();

    return (
        <div>
            <div className='grid justify-items-center mt-5'>
                <AddEditNamedItemDialog
                    itemName="Department"
                    onSubmit={handleAddDepartment}
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
                    headers={["ID", "Name", "Actions"]}
                    data={departments.items}
                    renderRow={(department: Department) => (
                        <>
                            <TableCell className="font-medium text-left">{department.id}</TableCell>
                            <TableCell className="text-left">{department.name}</TableCell>
                            <TableCell className="text-left">
                                <AddEditNamedItemDialog
                                    itemName="Department"
                                    onSubmit={(values) => handleEditDepartment(department.id!, values)}
                                    initialValues={{ name: department.name }}
                                    isEditing={true}
                                />
                                <Button
                                    variant="destructive"
                                    onClick={() => handleDeleteDepartment(department.id!)}
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