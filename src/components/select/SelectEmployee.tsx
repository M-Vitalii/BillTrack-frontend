import {SelectEntity} from "@/components/select/SelectEntity.tsx";
import {Employee} from "@/features/employee/models/employee.ts";
import {useEmployees} from "@/features/employee/hooks/use-employees.ts"; // Import the reusable SelectEntity component

interface SelectEmployeeProps {
    value?: string;
    onValueChange?: (value: string) => void;
    placeholder?: string;
}

export function SelectEmployee({
   value,
   onValueChange,
   placeholder = "Select an employee"
}: SelectEmployeeProps) {
    const {entities} = useEmployees();

    return (
        <SelectEntity<Employee>
            items={entities.items}
            value={value}
            onValueChange={onValueChange}
            placeholder={placeholder}
            renderItem={(employee) => `${employee.firstname} ${employee.lastname}`}
            getItemValue={(employee) => employee.id!}
            label="Employees"
        />
    );
}
