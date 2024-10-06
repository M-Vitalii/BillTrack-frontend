import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command.tsx";
import { cn } from "@/lib/utils.ts";

interface BaseComboboxProps {
    items?: { value: string; label: string }[];
    placeholder: string;
    value: string | undefined;
    onSelect: (value: string | undefined) => void;
    useLabelAsValue?: boolean;
}

export const BaseCombobox = ({
    items = [],
    placeholder,
    value,
    onSelect,
    useLabelAsValue = false
}: BaseComboboxProps) => {
    const [open, setOpen] = useState(false);

    const valueField = useLabelAsValue ? "label" : "value";
    const itemsWithNone = [{ value: "", label: "None" }, ...items];

    const selectedLabel = () => {
        if (!value) return placeholder;
        const selectedItem = itemsWithNone.find((item) => item[valueField] === value);
        return selectedItem ? selectedItem.label : placeholder;
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {selectedLabel()}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput
                        placeholder={`Search ${placeholder.toLowerCase()}...`}
                    />
                    <CommandList>
                        <CommandEmpty>No {placeholder.toLowerCase()} found.</CommandEmpty>
                        <CommandGroup>
                            {itemsWithNone.map((item) => (
                                <CommandItem
                                    key={item.value}
                                    value={item[valueField]}
                                    onSelect={() => {
                                        onSelect(item.value ? item[valueField] : undefined);
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === item[valueField] ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {item.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};
