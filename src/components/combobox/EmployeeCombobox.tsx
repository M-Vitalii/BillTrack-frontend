import {useState} from "react";
import {BaseCombobox} from "@/components/combobox/BaseCombobox.tsx";
import {useEmployees} from "@/features/employee/hooks/use-employees.ts";
import {Label} from "@/components/ui/label.tsx";

interface EmployeeComboboxProps {
    onSelect: (value: string | null) => void;
    labelText?: string;
}

export const EmployeeCombobox = ({onSelect, labelText}: EmployeeComboboxProps) => {
    const { entities: employees } = useEmployees();
    const [selectedEmployee, setSelectedEmployee] = useState<string | null>("");

    const items = employees.items.map(emp => ({
        value: emp.id!,
        label: `${emp.id!.substring(0, 4)}-${emp.firstname} ${emp.lastname}`
    }));

    const handleSelect = (value: string | null) => {
        setSelectedEmployee(value);
        onSelect(value);
    };

    return (
        <>
            <div className="flex flex-col justify-between">
                {labelText ?? (<Label>{labelText}</Label>)}
                <BaseCombobox
                    items={items}
                    placeholder="Select Employee"
                    value={selectedEmployee}
                    onSelect={handleSelect}
                />
            </div>
        </>

    );
};
