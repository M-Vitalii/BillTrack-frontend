export interface DepartmentPage {
    items: Department[];
    page: number;
    pageSize: number;
}

export interface Department {
    id?: string;
    name: string;
}