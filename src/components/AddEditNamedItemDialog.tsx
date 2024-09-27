import { z } from "zod";
import { AlertDialogForm } from "@/components/AlertDialogWithForm.tsx";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { createNamedItemSchema, NamedItemSchema } from "@/shared/schemas/named-item-schema.ts";

interface AddEditNamedItemDialogProps {
    itemName: string;
    onSubmit: (values: z.infer<NamedItemSchema>) => void;
    initialValues?: { name: string };
    isEditing: boolean;
}

export function AddEditNamedItemDialog({ itemName, onSubmit, initialValues, isEditing }: AddEditNamedItemDialogProps) {
    const schema = createNamedItemSchema(itemName);

    return (
        <AlertDialogForm
            triggerText={isEditing ? `Edit ${itemName}` : `Add ${itemName}`}
            title={isEditing ? `Edit ${itemName}` : `Add New ${itemName}`}
            description={`Please enter the ${itemName.toLowerCase()} details.`}
            schema={schema}
            defaultValues={initialValues || { name: "" }}
            fields={(control) => (
                <FormField
                    control={control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder={`${itemName} Name`} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            )}
            onSubmit={onSubmit}
        />
    );
}