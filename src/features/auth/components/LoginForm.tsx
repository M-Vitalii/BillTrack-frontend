import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"

import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormMessage,} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {loginSchema} from "@/features/auth/validations/login-form-schema.ts";
import {useDispatch} from "react-redux";
import {useState} from "react";
import {login} from "@/redux/auth/auth-thunks.ts";
import {AppDispatch} from "@/redux/store.ts";
import {AlertError} from "@/components/AlertError.tsx";
import {Card} from "@/components/ui/card.tsx";
import {useNavigate} from "react-router-dom";


export function LoginForm() {
    const dispatch = useDispatch<AppDispatch>();

    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof loginSchema>) {
        console.log(values);

        const credentials = {
            username: values.email,
            password: values.password,
        };

        try {
            await dispatch(login(credentials));
            setErrorMessage(null);
            navigate('/');
        } catch (error) {
            setErrorMessage('Login failed, wrong username or password');
        }
    }

    return (
        <>
            <div className="w-full max-w-xl mx-32">
                {errorMessage && <AlertError errorMessage={errorMessage}/>}
            </div>
            <Card className="w-full max-w-xl p-10 mt-10 mx-32">
                <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight lg:text-xl mb-5">
                    Login
                </h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 text-left">
                        <FormField
                            control={form.control}
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
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Password" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button className="w-full" type="submit">Sign in</Button>
                    </form>
                </Form>
            </Card>
        </>
    )
}

