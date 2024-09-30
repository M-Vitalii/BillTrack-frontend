import { AlertCircle } from "lucide-react"

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"

type AlertErrorProps = {
    errorMessage: string
}

export function AlertError({ errorMessage }: AlertErrorProps) {
    return (
        <Alert variant="destructive" className="w-full">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
                {errorMessage}
            </AlertDescription>
        </Alert>
    )
}
