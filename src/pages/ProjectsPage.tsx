import {AddEditNamedItemDialog} from "@/components/AddEditNamedItemDialog.tsx";
import {DynamicTable} from "@/components/DynamicTable.tsx";
import {TableCell} from "@/components/ui/table.tsx";
import {PaginationComponent} from "@/components/PaginationComponent.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useProjects} from "@/features/projects/hooks/use-projects.ts";
import {Project} from "@/features/projects/models";

export function ProjectsPage() {
    const {
        projects,
        page,
        pageSize,
        handlePageChange,
        handlePageSizeChange,
        handleAddProject,
        handleEditProject,
        handleDeleteProject,
    } = useProjects();

    return (
        <div>
            <div className='grid justify-items-center mt-5'>
                <AddEditNamedItemDialog
                    itemName="Project"
                    onSubmit={handleAddProject}
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
                    data={projects.items}
                    renderRow={(project: Project) => (
                        <>
                            <TableCell className="font-medium text-left">{project.id}</TableCell>
                            <TableCell className="text-left">{project.name}</TableCell>
                            <TableCell className="text-left">
                                <AddEditNamedItemDialog
                                    itemName="Project"
                                    onSubmit={(values) => handleEditProject(project.id!, values)}
                                    initialValues={{ name: project.name }}
                                    isEditing={true}
                                />
                                <Button
                                    variant="destructive"
                                    onClick={() => handleDeleteProject(project.id!)}
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