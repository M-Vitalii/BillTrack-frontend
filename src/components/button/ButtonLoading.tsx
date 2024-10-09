import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button.tsx"

interface ButtonLoadingProps {
    className?: string;
    text?: string;
}

export function ButtonLoading({ className = "w-full", text = "Please wait" }: ButtonLoadingProps) {
    return (
        <Button className={className} disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {text}
        </Button>
    )
}