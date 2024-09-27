import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "@/redux/auth/auth-thunks";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { AppDispatch } from "@/redux/store";
import { AlertError } from "@/components";
import { Card } from "@/components/ui/card.tsx";

export function LoginPage() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleLogin = async (credentials: { username: string; password: string }) => {
        setIsLoading(true);
        try {
            await dispatch(login(credentials));
            setErrorMessage(null);
            navigate('/');
        } catch (error) {
            setErrorMessage('Wrong username and/or password');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <div className="grid justify-items-center mt-5">
                {errorMessage && <AlertError errorMessage={errorMessage} />}
                <Card className="w-full max-w-xl p-10 mt-10 mx-32">
                    <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight lg:text-xl mb-5">
                        Login
                    </h1>
                    <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
                </Card>
            </div>
        </div>
    );
}