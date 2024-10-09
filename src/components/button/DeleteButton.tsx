import {Button} from "@/components/ui/button.tsx";
import {ButtonLoading} from "@/components/button/ButtonLoading.tsx";

interface DeleteButtonProps {
    onDelete: () => Promise<void>;
    isDeleting: boolean;
    className?: string;
    deleteText?: string;
    loadingText?: string;
}

export function DeleteButton({
    onDelete,
    isDeleting,
    className = "ml-2 w-24",
    deleteText = "Delete",
    loadingText = "Wait"
}: DeleteButtonProps) {
    const handleClick = async () => {
        await onDelete();
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