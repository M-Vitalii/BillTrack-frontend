import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {AlertDialogForm} from "@/components/dialog/AlertDialogWithForm.tsx";
import {InvoiceSchema, invoiceSchema} from "@/features/invoices/schemas/invoice-schema.ts";
import {Invoice} from "@/features/invoices/models/invoice.ts";
import {SelectMonth} from "@/components/select/SelectMonth.tsx";
import {SelectEmployee} from "@/components/select/SelectEmployee.tsx";

interface AddEditInvoiceDialogProps {
    itemName?: string;
    onSubmit: (values: InvoiceSchema) => void;
    initialValues?: Invoice;
    isEditing: boolean;
}

export function AddEditInvoiceDialog({
    itemName = 'Invoice',
    onSubmit,
    initialValues,
    isEditing,
}: AddEditInvoiceDialogProps) {
    return (
        <AlertDialogForm
            triggerText={isEditing ? `Edit ${itemName}` : `Add ${itemName}`}
            title={isEditing ? `Edit ${itemName}` : `Add New ${itemName}`}
            description={`Please enter the ${itemName.toLowerCase()} details.`}
            schema={invoiceSchema}
            defaultValues={initialValues || {
                month: 1,
                year: new Date().getFullYear(),
                employeeId: ""
            }}
            fields={(control) => (
                <>
                    <FormField
                        control={control}
                        name="month"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Month</FormLabel>
                                <FormControl>
                                    <SelectMonth
                                        value={field.value.toString()}
                                        onValueChange={(value) => field.onChange(parseInt(value, 10))}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={control}
                        name="year"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Year</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        {...field}
                                        onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={control}
                        name="employeeId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Employee</FormLabel>
                                <FormControl>
                                    <SelectEmployee
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </>
            )}
            onSubmit={onSubmit}
        />
    );
}