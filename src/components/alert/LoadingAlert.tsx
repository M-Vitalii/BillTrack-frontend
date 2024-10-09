import {Loader} from "lucide-react";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";

export function LoadingAlert() {
    return (
        <div className="fixed top-5 left-0 right-0 mx-auto w-fit z-50">
            <Alert className="w-auto flex flex-col justify-center items-center">
                <Loader className="h-4 w-4 animate-spin"/>
                <AlertTitle className="mb-3">Loading...</AlertTitle>
                <AlertDescription>
                    Please wait while we log you in.
                </AlertDescription>
            </Alert>
        </div>
    );
}
