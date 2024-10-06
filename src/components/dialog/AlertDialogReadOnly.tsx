import React from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Label } from "@/components/ui/label.tsx";

interface FieldData {
    label: string;
    value: string | number | boolean;
}

interface AlertDialogReadOnlyProps {
    triggerText: string;
    title: string;
    cancelText?: string;
    fields: FieldData[];
    actionText?: string;
    actionIcon?: React.ElementType;
    onAction?: () => void;
    isActionVisible?: boolean;
}

export function AlertDialogReadOnly({
    triggerText,
    title,
    cancelText = "Close",
    fields,
    actionText,
    actionIcon: ActionIcon,
    onAction,
    isActionVisible = true,
}: AlertDialogReadOnlyProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="secondary">{triggerText}</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                </AlertDialogHeader>
                <div className="space-y-4">
                    {fields.map((field, index) => (
                        <div key={index} className="space-y-1">
                            <Label>{field.label}</Label>
                            <div className="text-sm text-gray-700">{field.value.toString()}</div>
                        </div>
                    ))}
                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel className="w-full">{cancelText}</AlertDialogCancel>
                    {isActionVisible && actionText && onAction && (
                        <AlertDialogAction className="w-full" onClick={onAction}>
                            {ActionIcon && <ActionIcon className="mr-2 h-4 w-4" />}
                            {actionText}
                        </AlertDialogAction>
                    )}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}