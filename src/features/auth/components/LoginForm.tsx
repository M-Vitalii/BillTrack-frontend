import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/features/auth/validations/login-form-schema";
import { LoginCredentials } from "@/shared/interfaces";
import {ButtonLoading} from "@/components/ButtonLoading.tsx";

interface LoginFormProps {
    onSubmit: (credentials: LoginCredentials) => void;
    isLoading: boolean; // Add isLoading prop
}

export function LoginForm({ onSubmit, isLoading }: LoginFormProps) {
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit((values) => onSubmit({
                username: values.email,
                password: values.password,
            }))} className="space-y-8 text-left">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type="password" placeholder="Password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {isLoading ? (
                    <ButtonLoading />
                ) : (
                    <Button className="w-full" type="submit">Sign in</Button>
                )}
            </form>
        </Form>
    );
}