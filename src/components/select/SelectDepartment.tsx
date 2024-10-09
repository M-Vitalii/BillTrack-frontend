import {SelectEntity} from "@/components/select/SelectEntity.tsx";
import {Department} from "@/features/department/models";
import {useDepartments} from "@/features/department/hooks/use-departments.ts"; // Import the reusable SelectEntity component

interface SelectDepartmentProps {
    value?: string;
    onValueChange?: (value: string) => void;
    placeholder?: string;
}

export function SelectDepartment({
   value,
   onValueChange,
   placeholder = "Select department",
}: SelectDepartmentProps) {
    const {entities} = useDepartments();

    return (
        <SelectEntity<Department>
            items={entities.items}
            value={value}
            onValueChange={onValueChange}
            placeholder={placeholder}
            renderItem={(department) => `${department.name}`}
            getItemValue={(department) => department.id!}
            label="Departments"
        />
    );
}
