import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {usePagination} from "@/hooks/use-pagination.ts";

interface PaginationComponentProps {
    currentPage: number;
    pageSize: number;
    onPageChange: (newPage: number) => void;
    onPageSizeChange: (newPageSize: number) => void;
}

export function PaginationComponent({ currentPage, pageSize, onPageChange, onPageSizeChange }: PaginationComponentProps) {
    const { page, pageSize: localPageSize, handlePageChange, handlePageSizeChange } = usePagination({
        initialPage: currentPage,
        initialPageSize: pageSize,
        onPageChange,
        onPageSizeChange
    });

    return (
        <Pagination>
            <PaginationContent className="items-end">
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => handlePageChange(page - 1)}
                    />
                </PaginationItem>
                <PaginationItem className="flex flex-col items-center">
                    <Label htmlFor="pageSize" className="mb-2">Page Size</Label>
                    <Input
                        id="pageSize"
                        className="text-center w-36"
                        type="number"
                        value={localPageSize}
                        onChange={(e) => handlePageSizeChange(parseInt(e.target.value, 10))}
                        aria-label="Page size"
                    />
                </PaginationItem>
                <PaginationItem className="flex flex-col items-center">
                    <Label htmlFor="pageNumber" className="mb-2">Page Number</Label>
                    <Input
                        id="pageNumber"
                        className="text-center w-36"
                        type="number"
                        value={page}
                        onChange={(e) => handlePageChange(parseInt(e.target.value, 10))}
                        aria-label="Page number"
                    />
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext
                        onClick={() => handlePageChange(page + 1)}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}