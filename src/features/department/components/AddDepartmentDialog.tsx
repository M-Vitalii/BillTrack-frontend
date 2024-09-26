import {departmentSchema} from "@/features/department/validations/department-schema.ts";
import {z} from "zod";
import {AlertDialogForm} from "@/components/AlertDialogWithForm.tsx";
import {FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";

export function AddDepartmentDialog() {
    const handleSubmit = (values: z.infer<typeof departmentSchema>) => {
        console.log("Submitted:", values);
    };

    return (
        <AlertDialogForm
            triggerText="Add Department"
            title="Add New Department"
            description="Please enter the department details."
            schema={departmentSchema}
            defaultValues={{ name: "" }}
            fields={(control) => (
                <>
                    <FormField
                        control={control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Department Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </>
            )}
            onSubmit={handleSubmit}
        />
    );
}