import { useState } from 'react';

interface UsePaginationProps {
    initialPage: number;
    initialPageSize: number;
    onPageChange?: (page: number) => void;
    onPageSizeChange?: (pageSize: number) => void;
}

export function usePagination({
    initialPage,
    initialPageSize,
    onPageChange,
    onPageSizeChange
}: UsePaginationProps) {
    const [page, setPage] = useState(initialPage);
    const [pageSize, setPageSize] = useState(initialPageSize);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1) {
            setPage(newPage);
            onPageChange?.(newPage);
        }
    };

    const handlePageSizeChange = (newPageSize: number) => {
        if (newPageSize > 0) {
            setPageSize(newPageSize);
            setPage(1); // Reset to page 1 when page size changes
            onPageSizeChange?.(newPageSize);
        }
    };

    return {
        page,
        pageSize,
        handlePageChange,
        handlePageSizeChange
    };
}