import { format, parse } from "date-fns";
import { z } from "zod";
import { CalendarIcon } from "lucide-react";
import { AlertDialogForm } from "@/components/dialog/AlertDialogWithForm.tsx";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button";
import { workdaySchema } from "@/features/workdays/schemas/workday-schema.ts";
import { Workday } from "@/features/workdays/models/workday.ts";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.tsx";
import { Calendar } from "@/components/ui/calendar.tsx";
import {Employee} from "@/features/employee/models/employee.ts";
import {SelectEmployee} from "@/components/select/SelectEmployee.tsx";

interface AddEditWorkdayDialogProps {
    itemName?: string;
    onSubmit: (values: z.infer<typeof workdaySchema>) => void;
    initialValues?: Workday;
    isEditing: boolean;
    employees: Employee[];
}

export function AddEditWorkdayDialog({
    itemName = 'Workday',
    onSubmit,
    initialValues,
    isEditing,
    employees
}: AddEditWorkdayDialogProps) {
    return (
        <AlertDialogForm
            triggerText={isEditing ? `Edit ${itemName}` : `Add ${itemName}`}
            title={isEditing ? `Edit ${itemName}` : `Add New ${itemName}`}
            description={`Please enter the ${itemName.toLowerCase()} details.`}
            schema={workdaySchema}
            defaultValues={initialValues || {
                date: format(new Date(), 'yyyy-MM-dd'),
                hours: 0,
                employeeId: ""
            }}
            fields={(control) => (
                <>
                    <FormField
                        control={control}
                        name="date"
                        render={({ field }) => (
                            <FormItem>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className="w-full pl-3 text-left font-normal"
                                            >
                                                {field.value ? format(parse(field.value, 'yyyy-MM-dd', new Date()), "PPP") : "Pick a date"}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value ? parse(field.value, 'yyyy-MM-dd', new Date()) : undefined}
                                            onSelect={(date) => field.onChange(date ? format(date, 'yyyy-MM-dd') : '')}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={control}
                        name="hours"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type="number" step="0.1" placeholder="Hours worked" {...field} onChange={(e) => field.onChange(parseFloat(e.target.value))} />
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
                                <FormControl>
                                    <SelectEmployee
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        employees={employees}
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