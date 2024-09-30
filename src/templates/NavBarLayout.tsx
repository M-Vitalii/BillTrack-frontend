import {Outlet, useNavigate} from "react-router-dom";
import {NavBar} from "@/components/NavBar.tsx";
import {ModeToggle} from "@/components/ModeToggle.tsx";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/redux/store.ts";
import {logout} from "@/redux/auth/auth-thunks.ts";
import {useEffect} from "react";
import {Button} from "@/components/ui/button.tsx";
import { Toaster } from "@/components/ui/toaster";

export function NavBarLayout() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const isAuthorized = useSelector((state: RootState) => state.auth.isAuthorized);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    useEffect(() => {
        if (!isAuthorized) {
            navigate("/login");
        }
    }, [isAuthorized, navigate]);

    return (
        <div>
            <div className="flex flex-row justify-between">
                <NavBar/>
                <div className="flex justify-between space-x-5">
                    { isAuthorized && (
                        <Button onClick={handleLogout}>
                            Logout
                        </Button>
                    )}
                    <ModeToggle/>
                </div>
            </div>
            <div>
                <Outlet/>
            </div>
            <Toaster />
        </div>
    );
}

