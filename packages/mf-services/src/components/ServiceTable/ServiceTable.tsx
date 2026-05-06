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
import EditIcon from '@mui/icons-material/Edit';
import SpaIcon from '@mui/icons-material/Spa';
import { DataTable, formatCurrency } from '@blockhouse/shared-lib';
import { Service } from '../../types/service.types';

interface ServiceTableProps {
  services: Service[];
  page: number;
  totalServices: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onEdit: (service: Service) => void;
  loading?: boolean;
  keyword?: string;
}

function SkeletonTable() {
  const cols = ['Dịch vụ', 'Mô tả', 'Giá', 'Thao tác'];
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
                  <Skeleton variant="text" height={24} width={col === 'Thao tác' ? 100 : undefined} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default function ServiceTable({
  services,
  page,
  totalServices,
  pageSize,
  onPageChange,
  onEdit,
  loading,
  keyword,
}: ServiceTableProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const columns = [
    {
      key: 'name',
      label: 'Dịch vụ',
      render: (row: Service) => (
        <Box display="flex" alignItems="center" gap={1.5}>
          {/* <Avatar
            sx={{
              width: 36,
              height: 36,
              fontSize: 14,
              fontWeight: 600,
              bgcolor: theme.palette.secondary.main,
              color: '#fff',
            }}
          >
            {row.name.charAt(0).toUpperCase()}
          </Avatar> */}
          <Typography fontWeight={500}>{row.name}</Typography>
        </Box>
      ),
    },
    {
      key: 'description',
      label: 'Mô tả',
      render: (row: Service) => (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            maxWidth: 280,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {row.description}
        </Typography>
      ),
    },
    {
      key: 'price',
      label: 'Giá',
      render: (row: Service) => (
        <Typography fontWeight={600} color="primary">
          {formatCurrency(row.price)}
        </Typography>
      ),
    },
    {
      key: 'actions',
      label: 'Thao tác',
      width: 100,
      render: (row: Service) => (
        <Tooltip title="Chỉnh sửa">
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(row);
            }}
            sx={{
              borderRadius: 1.5,
              transition: 'all 0.2s',
              '&:hover': {
                bgcolor: isDark ? 'rgba(66,165,245,0.12)' : 'rgba(25,118,210,0.08)',
              },
            }}
          >
            <EditIcon fontSize="small" sx={{ color: 'primary.main' }} />
          </IconButton>
        </Tooltip>
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

  if (loading && services.length === 0) {
    return <SkeletonTable />;
  }

  return (
    <Box sx={{ position: 'relative' }}>
      {loading && services.length > 0 && (
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1, height: 3 }}>
          <LinearProgress sx={{ borderRadius: 0 }} />
        </Box>
      )}
      <Box sx={tableSx}>
        <DataTable
          columns={columns}
          data={services}
          page={page}
          totalItems={totalServices}
          pageSize={pageSize}
          onPageChange={onPageChange}
          onRowClick={onEdit}
          emptyMessage={keyword ? `Không tìm thấy dịch vụ nào cho "${keyword}"` : 'Không có dịch vụ nào'}
        />
      </Box>
    </Box>
  );
}
