import React from 'react';
import {
  IconButton,
  Tooltip,
  Box,
  Avatar,
  Typography,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  LinearProgress,
  useTheme,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { DataTable, formatCurrency, formatDateTime } from '@blockhouse/shared-lib';
import { Order } from '../../types/revenue.types';

interface OrderTableProps {
  orders: Order[];
  page: number;
  totalOrders: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onViewDetail: (order: Order) => void;
  onEdit: (order: Order) => void;
  onDelete: (order: Order) => void;
  loading?: boolean;
  keyword?: string;
}

function SkeletonTable() {
  const cols = ['Thời gian', 'Nhân viên', 'Dịch vụ', 'Tổng tiền', 'Thao tác'];
  return (
    <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>
      <Table>
        <TableHead>
          <TableRow>
            {cols.map((col) => (
              <TableCell key={col} sx={{ fontWeight: 700, fontSize: 13 }}>
                {col}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={i}>
              {cols.map((col) => (
                <TableCell key={col}>
                  <Skeleton variant="text" height={24} width={col === 'Thao tác' ? 120 : undefined} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default function OrderTable({
  orders,
  page,
  totalOrders,
  pageSize,
  onPageChange,
  onViewDetail,
  onEdit,
  onDelete,
  loading,
  keyword,
}: OrderTableProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const columns = [
    {
      key: 'datetime',
      label: 'Thời gian',
      render: (row: Order) => (
        <Typography variant="body2" fontWeight={500}>
          {formatDateTime(row.datetime)}
        </Typography>
      ),
    },
    {
      key: 'employee_name',
      label: 'Nhân viên',
      render: (row: Order) => (
        <Box display="flex" alignItems="center" gap={1.5}>
          <Avatar
            sx={{
              width: 32,
              height: 32,
              fontSize: 13,
              fontWeight: 600,
              bgcolor: theme.palette.primary.main,
              color: '#fff',
            }}
          >
            {(row.employee_name || '?').charAt(0).toUpperCase()}
          </Avatar>
          <Typography variant="body2" fontWeight={500}>
            {row.employee_name || '—'}
          </Typography>
        </Box>
      ),
    },
    {
      key: 'services',
      label: 'Dịch vụ',
      render: (row: Order) => (
        <Typography variant="body2" color="text.secondary">
          {row.services?.length > 0 ? `${row.services.length} dịch vụ` : '—'}
        </Typography>
      ),
    },
    {
      key: 'total',
      label: 'Tổng tiền',
      render: (row: Order) => (
        <Typography fontWeight={600} color="primary" fontSize={14}>
          {formatCurrency(row.total)}
        </Typography>
      ),
    },
    {
      key: 'actions',
      label: 'Thao tác',
      width: 140,
      render: (row: Order) => (
        <Box
          display="flex"
          gap={0.5}
          sx={{
            '& .MuiIconButton-root': { borderRadius: 1.5, transition: 'all 0.2s' },
          }}
        >
          <Tooltip title="Xem chi tiết">
            <IconButton
              size="small"
              onClick={(e) => { e.stopPropagation(); onViewDetail(row); }}
              sx={{
                '&:hover': { bgcolor: isDark ? 'rgba(66,165,245,0.12)' : 'rgba(25,118,210,0.08)' },
              }}
            >
              <VisibilityIcon fontSize="small" sx={{ color: 'primary.main' }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Chỉnh sửa">
            <IconButton
              size="small"
              onClick={(e) => { e.stopPropagation(); onEdit(row); }}
              sx={{
                '&:hover': { bgcolor: isDark ? 'rgba(66,165,245,0.12)' : 'rgba(25,118,210,0.08)' },
              }}
            >
              <EditIcon fontSize="small" sx={{ color: 'text.secondary' }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xoá">
            <IconButton
              size="small"
              onClick={(e) => { e.stopPropagation(); onDelete(row); }}
              sx={{
                '&:hover': { bgcolor: isDark ? 'rgba(239,83,80,0.12)' : 'rgba(211,47,47,0.08)' },
              }}
            >
              <DeleteIcon fontSize="small" sx={{ color: 'error.main' }} />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  const tableSx = {
    borderRadius: 3,
    overflow: 'hidden',
    '& .MuiPaper-root': {
      borderRadius: 0,
      boxShadow: 'none',
      border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
    },
    '& .MuiTableHead-root': {
      '& .MuiTableRow-root': { bgcolor: isDark ? 'rgba(66,165,245,0.06)' : 'rgba(25,118,210,0.04)' },
      '& .MuiTableCell-root': {
        fontWeight: 700, fontSize: 13,
        borderBottom: `2px solid ${isDark ? 'rgba(66,165,245,0.12)' : 'rgba(25,118,210,0.12)'}`,
      },
    },
    '& .MuiTableBody-root .MuiTableRow-root': {
      transition: 'background-color 0.2s ease',
      '&:nth-of-type(even)': { bgcolor: isDark ? 'rgba(255,255,255,0.01)' : 'rgba(0,0,0,0.01)' },
      '&:hover': {
        bgcolor: `${isDark ? 'rgba(66,165,245,0.08)' : 'rgba(25,118,210,0.06)'} !important`,
      },
    },
    '& .MuiTableCell-root': {
      borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}`,
      py: 1.5,
    },
  };

  if (loading && orders.length === 0) return <SkeletonTable />;

  return (
    <Box sx={{ position: 'relative' }}>
      {loading && orders.length > 0 && (
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1, height: 3 }}>
          <LinearProgress sx={{ borderRadius: 0 }} />
        </Box>
      )}
      <Box sx={tableSx}>
        <DataTable
          columns={columns}
          data={orders}
          page={page}
          totalItems={totalOrders}
          pageSize={pageSize}
          onPageChange={onPageChange}
          onRowClick={onViewDetail}
          emptyMessage={keyword ? `Không tìm thấy đơn hàng nào cho "${keyword}"` : 'Không có đơn hàng nào'}
        />
      </Box>
    </Box>
  );
}
