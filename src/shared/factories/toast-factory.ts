type ToastOptions = {
    title: string;
    description: string;
    variant?: "default" | "destructive";
};

export const toastFactory = {
    getError: (message: string): ToastOptions => ({
        title: "Error",
        description: message,
        variant: "destructive",
    }),
    getSuccess: (message: string): ToastOptions => ({
        title: "Success",
        description: message,
    }),
};
