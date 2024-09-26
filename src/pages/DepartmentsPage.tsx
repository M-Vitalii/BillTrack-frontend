import { useEffect, useState } from 'react';
import {Department, DepartmentPage} from "@/features/department/models/department-model.ts";
import DepartmentService from "@/features/department/services/department-service.ts";
import { AddDepartmentDialog } from "@/features/department/components/AddDepartmentDialog.tsx";
import { DynamicTable } from "@/components/DynamicTable.tsx";
import {TableCell, TableFooter, TableRow} from "@/components/ui/table.tsx";
import {Button} from "@/components/ui/button.tsx";

export function DepartmentsPage() {
    const [departments, setDepartments] = useState<DepartmentPage>({items: [], page: 0, pageSize: 0});
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [pageSize] = useState<number>(10); // Adjust as needed

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await DepartmentService.getDepartments(pageNumber);
                setDepartments(response); // Assuming response structure matches your data
            } catch (error) {
                console.error('Failed to fetch departments', error);
            }
        };

        fetchDepartments();
    }, [pageNumber, pageSize]);

    const handlePageChange = (newPageNumber: number) => {
        if (newPageNumber > 0) {
            setPageNumber(newPageNumber);
        }
    };

    return (
        <div>
            <div className='grid justify-items-center mt-5'>
                <AddDepartmentDialog />
                <DynamicTable
                    caption="A list of departments"
                    headers={["ID", "Name"]}
                    data={departments.items} // Pass data as an object with `items`
                    renderRow={(department: Department) => (
                        <>
                            <TableCell className="font-medium text-left">{department.id}</TableCell>
                            <TableCell className="text-left">{department.name}</TableCell>
                        </>
                    )}
                    footer={
                        <TableRow>
                            <TableCell colSpan={2}>
                                <div className="flex justify-between items-center">
                                    <Button
                                        disabled={pageNumber === 1}
                                        onClick={() => handlePageChange(pageNumber - 1)}>
                                        Previous
                                    </Button>
                                    <span>Page {pageNumber}</span>
                                    <Button
                                        onClick={() => handlePageChange(pageNumber + 1)}>
                                        Next
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    }
                />
            </div>
        </div>
    );
}
