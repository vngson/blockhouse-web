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
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import { DataTable, StatusBadge, formatCurrency, formatDate } from '@blockhouse/shared-lib';
import { Employee, EmployeeStatus } from '../../types/employee.types';

interface EmployeeTableProps {
  employees: Employee[];
  page: number;
  totalEmployees: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onViewDetail: (employee: Employee) => void;
  onToggleStatus: (employee: Employee) => void;
  loading?: boolean;
  keyword?: string;
}

function SkeletonTable() {
  const cols = ['Tên nhân viên', 'SĐT', 'Trạng thái', 'Doanh thu', 'Ngày tạo', 'Thao tác'];
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
                  <Skeleton
                    variant="text"
                    height={24}
                    width={col === 'Thao tác' ? 80 : undefined}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default function EmployeeTable({
  employees,
  page,
  totalEmployees,
  pageSize,
  onPageChange,
  onViewDetail,
  onToggleStatus,
  loading,
  keyword,
}: EmployeeTableProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const columns = [
    {
      key: 'name',
      label: 'Nhân viên',
      render: (row: Employee) => (
        <Box display="flex" alignItems="center" gap={1.5}>
          <Avatar
            sx={{
              width: 36,
              height: 36,
              fontSize: 14,
              fontWeight: 600,
              bgcolor:
                row.status === EmployeeStatus.ACTIVE
                  ? theme.palette.primary.main
                  : isDark
                    ? 'rgba(255,255,255,0.12)'
                    : 'rgba(0,0,0,0.12)',
              color: row.status === EmployeeStatus.ACTIVE ? '#fff' : theme.palette.text.secondary,
            }}
          >
            {row.name.charAt(0).toUpperCase()}
          </Avatar>
          <Typography fontWeight={500}>{row.name}</Typography>
        </Box>
      ),
    },
    {
      key: 'phone',
      label: 'SĐT',
    },
    {
      key: 'status',
      label: 'Trạng thái',
      render: (row: Employee) => (
        <Box display="flex" alignItems="center" gap={1}>
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor:
                row.status === EmployeeStatus.ACTIVE
                  ? theme.palette.success.main
                  : isDark
                    ? 'rgba(255,255,255,0.25)'
                    : 'rgba(0,0,0,0.25)',
              boxShadow:
                row.status === EmployeeStatus.ACTIVE
                  ? `0 0 6px ${theme.palette.success.main}60`
                  : 'none',
              transition: 'all 0.3s',
            }}
          />
          <StatusBadge status={row.status} />
        </Box>
      ),
    },
    {
      key: 'income',
      label: 'Doanh thu',
      render: (row: Employee) => formatCurrency(row.income),
    },
    {
      key: 'created_at',
      label: 'Ngày tạo',
      render: (row: Employee) => formatDate(row.created_at),
    },
    {
      key: 'actions',
      label: 'Thao tác',
      width: 120,
      render: (row: Employee) => (
        <Box
          display="flex"
          gap={0.5}
          sx={{
            '& .MuiIconButton-root': {
              borderRadius: 1.5,
              transition: 'all 0.2s',
            },
          }}
        >
          <Tooltip title="Xem chi tiết">
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onViewDetail(row);
              }}
              sx={{
                '&:hover': {
                  bgcolor: isDark ? 'rgba(66,165,245,0.12)' : 'rgba(25,118,210,0.08)',
                },
              }}
            >
              <VisibilityIcon fontSize="small" sx={{ color: 'primary.main' }} />
            </IconButton>
          </Tooltip>
          <Tooltip
            title={row.status === EmployeeStatus.ACTIVE ? 'Ngưng hoạt động' : 'Kích hoạt'}
          >
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onToggleStatus(row);
              }}
              sx={
                row.status === EmployeeStatus.ACTIVE
                  ? {
                      '&:hover': {
                        bgcolor: isDark ? 'rgba(255,167,38,0.12)' : 'rgba(237,108,2,0.08)',
                      },
                    }
                  : {
                      '&:hover': {
                        bgcolor: isDark ? 'rgba(102,187,106,0.12)' : 'rgba(46,125,50,0.08)',
                      },
                    }
              }
            >
              {row.status === EmployeeStatus.ACTIVE ? (
                <ToggleOnIcon fontSize="small" sx={{ color: 'success.main' }} />
              ) : (
                <ToggleOffIcon fontSize="small" sx={{ color: 'warning.main' }} />
              )}
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
      '& .MuiTableRow-root': {
        bgcolor: isDark ? 'rgba(66,165,245,0.06)' : 'rgba(25,118,210,0.04)',
      },
      '& .MuiTableCell-root': {
        fontWeight: 700,
        fontSize: 13,
        borderBottom: `2px solid ${isDark ? 'rgba(66,165,245,0.12)' : 'rgba(25,118,210,0.12)'}`,
      },
    },
    '& .MuiTableBody-root .MuiTableRow-root': {
      transition: 'background-color 0.2s ease',
      '&:nth-of-type(even)': {
        bgcolor: isDark ? 'rgba(255,255,255,0.01)' : 'rgba(0,0,0,0.01)',
      },
      '&:hover': {
        bgcolor: `${isDark ? 'rgba(66,165,245,0.08)' : 'rgba(25,118,210,0.06)'} !important`,
      },
      '&:active': {
        bgcolor: `${isDark ? 'rgba(66,165,245,0.12)' : 'rgba(25,118,210,0.1)'} !important`,
      },
    },
    '& .MuiTableCell-root': {
      borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}`,
      py: 1.5,
    },
  };

  if (loading && employees.length === 0) {
    return <SkeletonTable />;
  }

  return (
    <Box sx={{ position: 'relative' }}>
      {loading && employees.length > 0 && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1,
            height: 3,
          }}
        >
          <LinearProgress sx={{ borderRadius: 0 }} />
        </Box>
      )}
      <Box sx={tableSx}>
        <DataTable
          columns={columns}
          data={employees}
          page={page}
          totalItems={totalEmployees}
          pageSize={pageSize}
          onPageChange={onPageChange}
          onRowClick={onViewDetail}
          emptyMessage={
            keyword ? `Không tìm thấy nhân viên nào cho "${keyword}"` : 'Không có nhân viên nào'
          }
        />
      </Box>
    </Box>
  );
}
