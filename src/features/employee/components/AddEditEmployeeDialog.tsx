import {z} from "zod";
import {AlertDialogForm} from "@/components/dialog/AlertDialogWithForm.tsx";
import {FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {employeeSchema} from "@/features/employee/schemas/employee-schema.ts";
import {Employee} from "@/features/employee/models/employee.ts";
import {SelectDepartment} from "@/components/select/SelectDepartment.tsx";
import {SelectProject} from "@/components/select/SelectProject.tsx";

interface AddEditEmployeeItemDialogProps {
    itemName?: string;
    onSubmit: (values: z.infer<typeof employeeSchema>) => void;
    initialValues?: Employee;
    isEditing: boolean;
}

export function AddEditEmployeeDialog({
    itemName = 'Employee',
    onSubmit,
    initialValues,
    isEditing,
}: AddEditEmployeeItemDialogProps) {
    return (
        <AlertDialogForm
            triggerText={isEditing ? `Edit ${itemName}` : `Add ${itemName}`}
            title={isEditing ? `Edit ${itemName}` : `Add New ${itemName}`}
            description={`Please enter the ${itemName.toLowerCase()} details.`}
            schema={employeeSchema}
            defaultValues={initialValues || {
                email: "",
                firstname: "",
                lastname: "",
                salary: 0,
                departmentId: "",
                projectId: ""
            }}
            fields={(control) => (
                <>
                    {/* Email */}
                    <FormField
                        control={control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Email" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {/* First Name */}
                    <FormField
                        control={control}
                        name="firstname"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="First Name" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {/* Last Name */}
                    <FormField
                        control={control}
                        name="lastname"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Last Name" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {/* Salary */}
                    <FormField
                        control={control}
                        name="salary"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input type="number" placeholder="Salary" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {/* Department ID */}
                    <FormField
                        control={control}
                        name="departmentId"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <SelectDepartment
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {/* Project ID */}
                    <FormField
                        control={control}
                        name="projectId"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <SelectProject
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </>
            )}
            onSubmit={onSubmit}
        />
    );
}
