import {
    Table,
    TableBody,
    TableCaption,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface DynamicTableProps<T> {
    caption?: string;
    headers: string[];
    data: T[];
    renderRow: (row: T) => React.ReactNode;
    footer?: React.ReactNode;
}

export function DynamicTable<T>({
    caption,
    headers,
    data,
    renderRow,
    footer,
}: DynamicTableProps<T>) {
    return (
        <Table>
            {caption && <TableCaption>{caption}</TableCaption>}
            <TableHeader>
                <TableRow>
                    {headers.map((header, index) => (
                        <TableHead key={index}>{header}</TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((item, index) => (
                    <TableRow key={index}>{renderRow(item)}</TableRow>
                ))}
            </TableBody>
            {footer && <TableFooter className="p-5">{footer}</TableFooter>}
        </Table>
    );
}
