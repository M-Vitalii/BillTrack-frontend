import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {RootState} from "@/redux/store.ts";

interface ProtectedRouteProps {
    children: JSX.Element;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const isAuthorized = useSelector((state: RootState) => state.auth.isAuthorized);

    if (!isAuthorized) {
        return <Navigate to="/login" />;
    }

    return children;
};
