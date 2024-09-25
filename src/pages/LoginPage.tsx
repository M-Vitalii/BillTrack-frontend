import {LoginForm} from "@/features/auth/components/LoginForm.tsx";

export function LoginPage() {
    return (
        <div>
            <div className='grid justify-items-center mt-5'>
                <LoginForm/>
            </div>
        </div>
    )
}