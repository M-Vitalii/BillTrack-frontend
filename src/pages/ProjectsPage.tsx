import {AddEditNamedItemDialog} from "@/components/dialog/AddEditNamedItemDialog.tsx";
import {DynamicTable} from "@/components/table/DynamicTable.tsx";
import {TableCell} from "@/components/ui/table.tsx";
import {PaginationComponent} from "@/components/PaginationComponent.tsx";
import {Project} from "@/features/projects/models";
import {useProjects} from "@/features/projects/hooks/use-projects.ts";
import {InputWithLabel} from "@/components/input/InputWithLabel.tsx";
import {SelectSortOrder} from "@/components/select/SelectSortOrder.tsx";
import {DeleteButton} from "@/components/button/DeleteButton.tsx";

export function ProjectsPage() {
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
    } = useProjects();

    return (
        <div>
            <div className='grid justify-items-center mt-5'>
                <AddEditNamedItemDialog
                    itemName="Project"
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
                        labelText="Filter by Project Name"
                        id="projectFilter"
                        placeholder="Enter Project name"
                        onChange={(e) => updateQueryParams({filterByName: e.target.value})}
                    />
                    <div className="max-w-xl">
                        <SelectSortOrder labelText="Sort by name"
                                         onValueChange={(e) => updateQueryParams({sortByName: e})}/>
                    </div>
                </div>
                <DynamicTable
                    headers={["Name", "Actions"]}
                    data={entities.items}
                    renderRow={(project: Project) => (
                        <>
                            <TableCell className="text-left">{project.name}</TableCell>
                            <TableCell className="text-right">
                                <AddEditNamedItemDialog
                                    itemName="Project"
                                    onSubmit={(values) => handleEdit(project.id!, values)}
                                    initialValues={{name: project.name}}
                                    isEditing={true}
                                />
                                <DeleteButton
                                    onDelete={() => handleDelete(project.id!)}
                                />
                            </TableCell>
                        </>
                    )}
                />
            </div>
        </div>
    );
}