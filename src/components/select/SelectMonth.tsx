import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select.tsx";

interface SelectMonthProps {
    value?: string;
    onValueChange?: (value: string) => void;
}

export function SelectMonth({ value, onValueChange }: SelectMonthProps) {
    return (
        <Select value={value} onValueChange={onValueChange}>
            <SelectTrigger>
                <SelectValue placeholder="Select a month" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Months</SelectLabel>
                    <SelectItem value="1">January</SelectItem>
                    <SelectItem value="2">February</SelectItem>
                    <SelectItem value="3">March</SelectItem>
                    <SelectItem value="4">April</SelectItem>
                    <SelectItem value="5">May</SelectItem>
                    <SelectItem value="6">June</SelectItem>
                    <SelectItem value="7">July</SelectItem>
                    <SelectItem value="8">August</SelectItem>
                    <SelectItem value="9">September</SelectItem>
                    <SelectItem value="10">October</SelectItem>
                    <SelectItem value="11">November</SelectItem>
                    <SelectItem value="12">December</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}