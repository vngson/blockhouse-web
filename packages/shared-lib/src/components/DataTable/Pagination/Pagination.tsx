import { Box, Pagination as MuiPagination } from '@mui/material';

  interface PaginationProps {
    page: number;
    totalItems: number;
    pageSize: number;
    onPageChange: (page: number) => void;
  }

  export default function Pagination({
    page,
    totalItems,
    pageSize,
    onPageChange,
  }: PaginationProps) {
    const totalPages = Math.ceil(totalItems / pageSize);
    if (totalPages <= 1) return null;

    return (
      <Box display="flex" justifyContent="center" py={2}>
        <MuiPagination
          count={totalPages}
          page={page}
          onChange={(_, newPage) => onPageChange(newPage)}
          color="primary"
        />
      </Box>
    );
  }