import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {ChangeEvent, FC} from "react";

interface InputWithLabelProps {
    labelText: string;
    id: string;
    placeholder?: string;
    value?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

export const InputWithLabel: FC<InputWithLabelProps> = ({
    labelText,
    id,
    placeholder = "",
    value,
    onChange,
    className = "",
}) => {
    return (
        <div className={className}>
            <Label htmlFor={id}>{labelText}</Label>
            <Input
                className="mt-3"
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};
