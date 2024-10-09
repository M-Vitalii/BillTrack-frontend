import {Department} from "@/features/department/models";
import {Project} from "@/features/projects/models";

export interface Employee {
    id?: string;
    email: string;
    firstname: string;
    lastname: string;
    salary: number;
    department: Department;
    project: Project;
}