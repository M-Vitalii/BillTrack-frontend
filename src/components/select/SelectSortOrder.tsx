import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select.tsx";
import {Label} from "@/components/ui/label.tsx";

interface SelectSortOrderProps {
    value?: string;
    labelText?: string;
    onValueChange?: (value: string) => void;
}

export function SelectSortOrder({ value, onValueChange, labelText }: SelectSortOrderProps) {
    return (
        <>
            <div className="mb-3">
                <Label>{labelText}</Label>
            </div>
            <Select value={value} onValueChange={onValueChange}>
                <SelectTrigger>
                    <SelectValue placeholder="Select sort order" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Sort Order</SelectLabel>
                        <SelectItem value="asc">Ascending</SelectItem>
                        <SelectItem value="desc">Descending</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </>
    );
}
