import {useDepartments} from "@/features/department/hooks/use-departments.ts";
import {useState} from "react";
import {BaseCombobox} from "@/components/combobox/BaseCombobox.tsx";
import {Label} from "@/components/ui/label.tsx";

interface DepartmentComboboxProps {
    onSelect: (value: string | undefined) => void;
    labelText?: string;
}

export const DepartmentCombobox = ({onSelect, labelText}: DepartmentComboboxProps) => {
    const { entities: department } = useDepartments(1, 1000);
    const [selectedDepartment, setSelectedDepartment] = useState<string | undefined>("");

    const items = department.items.map(dept => ({
        value: dept.id!,
        label: dept.name
    }));

    const handleSelect = (value: string | undefined) => {
        console.log(value);
        setSelectedDepartment(value);
        onSelect(value);
    };

    return (
        <div className="flex flex-col justify-between">
            {labelText ?? (<Label>{labelText}</Label>)}
            <BaseCombobox
                items={items}
                useLabelAsValue={false}
                placeholder="Select department"
                value={selectedDepartment}
                onSelect={handleSelect}
            />
        </div>
    );
};
