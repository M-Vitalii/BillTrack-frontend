import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { ButtonLoading } from "@/components/button/ButtonLoading.tsx";

interface DeleteButtonProps {
    onDelete: () => Promise<void>;
    className?: string;
    deleteText?: string;
    loadingText?: string;
}

export function DeleteButton({
    onDelete,
    className = "ml-2 w-24",
    deleteText = "Delete",
    loadingText = "Wait"
}: DeleteButtonProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleClick = async () => {
        setIsDeleting(true);
        try {
            await onDelete();
        } catch (error) {
            setIsDeleting(false);
        }
    };

    if (isDeleting) {
        return <ButtonLoading className={className} text={loadingText} />;
    }

    return (
        <Button
            variant="destructive"
            onClick={handleClick}
            className={className}
        >
            {deleteText}
        </Button>
    );
}
