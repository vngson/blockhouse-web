import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
  import { EmptyState } from '../EmptyState';
  import { Pagination } from './Pagination';

  interface Column<T> {
    key: string;
    label: string;
    render?: (row: T) => React.ReactNode;
    width?: string | number;
  }

  interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    page: number;
    totalItems: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    onRowClick?: (row: T) => void;
    emptyMessage?: string;
  }

  export default function DataTable<T extends { id?: number | string }>({
    columns,
    data,
    page,
    totalItems,
    pageSize,
    onPageChange,
    onRowClick,
    emptyMessage = 'Không có dữ liệu',
  }: DataTableProps<T>) {
    if (!data || data.length === 0) {
      return <EmptyState message={emptyMessage} />;
    }

    return (
      <>
        <Pagination page={page} totalItems={totalItems} pageSize={pageSize} onPageChange={onPageChange} />
        <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
          <Table sx={{ minWidth: 600 }}>
            <TableHead>
              <TableRow>
                {columns.map((col) => (
                  <TableCell key={col.key} sx={{ fontWeight: 600, width: col.width }}>
                    {col.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, idx) => (
                <TableRow
                  key={row.id ?? idx}
                  hover={!!onRowClick}
                  onClick={() => onRowClick?.(row)}
                  sx={onRowClick ? { cursor: 'pointer' } : {}}
                >
                  {columns.map((col) => (
                    <TableCell key={col.key}>
                      {col.render
                        ? col.render(row)
                        : (row as Record<string, unknown>)[col.key] as React.ReactNode}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }
