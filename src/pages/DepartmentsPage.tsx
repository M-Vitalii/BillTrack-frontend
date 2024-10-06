import {Department} from "@/features/department/models/department.ts";
import {AddEditNamedItemDialog} from "@/components/dialog/AddEditNamedItemDialog.tsx";
import {DynamicTable} from "@/components/table/DynamicTable.tsx";
import {TableCell} from "@/components/ui/table.tsx";
import {PaginationComponent} from "@/components/PaginationComponent.tsx";
import {useDepartments} from "@/features/department/hooks/use-departments.ts";
import {DeleteButton} from "@/components/button/DeleteButton.tsx";
import {InputWithLabel} from "@/components/input/InputWithLabel.tsx";
import {SelectSortOrder} from "@/components/select/SelectSortOrder.tsx";

export function DepartmentsPage() {
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
        isDeletingEntity
    } = useDepartments();

    return (
        <div>
            <div className='grid justify-items-center mt-5'>
                <AddEditNamedItemDialog
                    itemName="Department"
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
                    <InputWithLabel
                        labelText="Filter by Department Name"
                        id="departmentFilter"
                        placeholder="Enter department name"
                        onChange={(e) => updateQueryParams({ filterByName: e.target.value })}
                    />
                    <div className="max-w-xl">
                        <SelectSortOrder labelText="Sort by name" onValueChange={(e) => updateQueryParams({sortByName: e})}/>
                    </div>
                </div>
                <DynamicTable
                    headers={["Name", "Actions"]}
                    data={entities.items}
                    renderRow={(department: Department) => (
                        <>
                            <TableCell className="text-left">{department.name}</TableCell>
                            <TableCell className="text-right">
                                <AddEditNamedItemDialog
                                    itemName="Department"
                                    onSubmit={(values) => handleEdit(department.id!, values)}
                                    initialValues={{ name: department.name }}
                                    isEditing={true}
                                />
                                <DeleteButton
                                    onDelete={() => handleDelete(department.id!)}
                                    isDeleting={isDeletingEntity(department.id!)}
                                />
                            </TableCell>
                        </>
                    )}
                />
            </div>
        </div>
    );
}
