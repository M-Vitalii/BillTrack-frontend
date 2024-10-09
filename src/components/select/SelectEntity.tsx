import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select.tsx";

interface SelectEntityProps<T> {
    items: T[]; // The array of entities to select from
    value?: string; // The selected value
    onValueChange?: (value: string) => void; // Callback for when the selection changes
    placeholder?: string; // Placeholder text for the select dropdown
    renderItem: (item: T) => string; // A function to determine how the text for each item is displayed
    getItemValue: (item: T) => string; // A function to get the value of the item (used in the select)
    label?: string; // Optional label for the SelectGroup
}

export function SelectEntity<T>({
    items,
    value,
    onValueChange,
    placeholder = "Select an option",
    renderItem,
    getItemValue,
    label = "Options"
}: SelectEntityProps<T>) {
    return (
        <Select value={value} onValueChange={onValueChange}>
            <SelectTrigger>
                <SelectValue placeholder={placeholder}/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{label}</SelectLabel>
                    {items.map((item) => (
                        <SelectItem key={getItemValue(item)} value={getItemValue(item)}>
                            {renderItem(item)}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
