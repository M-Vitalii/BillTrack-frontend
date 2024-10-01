import {AddEditNamedItemDialog} from "@/components/AddEditNamedItemDialog.tsx";
import {DynamicTable} from "@/components/DynamicTable.tsx";
import {TableCell} from "@/components/ui/table.tsx";
import {PaginationComponent} from "@/components/PaginationComponent.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Project} from "@/features/projects/models";
import {useProjects} from "@/features/projects/hooks/use-projects.ts";

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
                <DynamicTable
                    headers={["ID", "Name", "Actions"]}
                    data={entities.items}
                    renderRow={(project: Project) => (
                        <>
                            <TableCell className="font-medium text-left">{project.id}</TableCell>
                            <TableCell className="text-left">{project.name}</TableCell>
                            <TableCell className="text-left">
                                <AddEditNamedItemDialog
                                    itemName="Project"
                                    onSubmit={(values) => handleEdit(project.id!, values)}
                                    initialValues={{name: project.name}}
                                    isEditing={true}
                                />
                                <Button
                                    variant="destructive"
                                    onClick={() => handleDelete(project.id!)}
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