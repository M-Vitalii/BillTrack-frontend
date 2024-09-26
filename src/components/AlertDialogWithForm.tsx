import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {Button} from "@/components/ui/button";
import {zodResolver} from "@hookform/resolvers/zod";
import {Control, useForm} from "react-hook-form";
import {z} from "zod";
import {Form} from "@/components/ui/form";

interface AlertDialogFormProps<T extends z.ZodType<any, any>> {
    triggerText: string;
    title: string;
    description: string;
    cancelText?: string;
    actionText?: string;
    schema: T;
    defaultValues: z.infer<T>;
    fields: (control: Control<z.infer<T>>) => React.ReactNode;
    onSubmit: (values: z.infer<T>) => void;
}

export function AlertDialogForm<T extends z.ZodType<any, any>>({
   triggerText,
   title,
   cancelText = "Cancel",
   actionText = "Submit",
   schema,
   defaultValues,
   fields,
   onSubmit,
}: AlertDialogFormProps<T>) {
    const form = useForm<z.infer<T>>({
        resolver: zodResolver(schema),
        defaultValues,
        mode: 'onChange',
    });

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline">{triggerText}</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                </AlertDialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {fields(form.control)}
                        <AlertDialogFooter>
                            <AlertDialogCancel className="w-full">{cancelText}</AlertDialogCancel>
                            <AlertDialogAction className="w-full" disabled={!form.formState.isValid || form.formState.isSubmitting}
                                               type="submit">{actionText}</AlertDialogAction>
                        </AlertDialogFooter>
                    </form>
                </Form>
            </AlertDialogContent>
        </AlertDialog>
    );
}
