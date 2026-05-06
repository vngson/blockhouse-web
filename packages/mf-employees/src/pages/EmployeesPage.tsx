import React, { useEffect, useState, useCallback } from 'react';
import {
  Box,
  Button,
  Typography,
  Avatar,
  Grid,
  Skeleton,
  Alert,
  Snackbar,
  Fade,
  useTheme,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PeopleIcon from '@mui/icons-material/People';
import { usePagination, useDebounce } from '@blockhouse/shared-lib';
import { useEmployeeStore } from '../store/employeeStore';
import { SummaryCards } from '../components/SummaryCards';
import { EmployeeSearch } from '../components/EmployeeSearch';
import { EmployeeTable } from '../components/EmployeeTable';
import { EmployeeDetail } from '../components/EmployeeDetail';
import { EmployeeAddForm } from '../components/EmployeeForm';
import { EmployeeEditForm } from '../components/EmployeeForm';
import { Employee, EmployeeStatus } from '../types/employee.types';

export default function EmployeesPage() {
  const {
    employees,
    totalEmployees,
    isLoading,
    error,
    selectedEmployee,
    fetchEmployees,
    createEmployee,
    toggleStatus,
    setSelectedEmployee,
    clearError,
  } = useEmployeeStore();

  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const { page, pageSize, setPage } = usePagination(10);
  const [keyword, setKeyword] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const debouncedKeyword = useDebounce(keyword, 300);

  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [statusTarget, setStatusTarget] = useState<Employee | null>(null);

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  const loadEmployees = useCallback(() => {
    fetchEmployees({
      page,
      page_size: pageSize,
      keyword: debouncedKeyword || undefined,
      date_from: dateFrom || undefined,
      date_to: dateTo || undefined,
    });
  }, [page, pageSize, debouncedKeyword, dateFrom, dateTo, fetchEmployees]);

  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  const handleViewDetail = (employee: Employee) => {
    setSelectedEmployee(employee);
    setDetailDialogOpen(true);
  };

  const handleToggleStatus = (employee: Employee) => {
    setStatusTarget(employee);
    setEditDialogOpen(true);
  };

  const handleConfirmToggle = async () => {
    if (!statusTarget) return;
    const newStatus =
      statusTarget.status === EmployeeStatus.ACTIVE
        ? EmployeeStatus.INACTIVE
        : EmployeeStatus.ACTIVE;
    await toggleStatus(statusTarget.id, newStatus);
    setEditDialogOpen(false);
    setStatusTarget(null);
    loadEmployees();
    setSnackbar({
      open: true,
      message: 'Đã cập nhật trạng thái!',
      severity: 'success',
    });
  };

  const handleCreate = async (data: { name: string; phone: string }) => {
    await createEmployee(data);
    setAddDialogOpen(false);
    loadEmployees();
    setSnackbar({
      open: true,
      message: 'Đã thêm nhân viên thành công!',
      severity: 'success',
    });
  };

  const handleClearAll = () => {
    setKeyword('');
    setDateFrom('');
    setDateTo('');
    setPage(1);
  };

  const isInitialLoading = isLoading && employees.length === 0;

  return (
    <Box>
      {/* Gradient page header */}
      <Box
        sx={{
          mb: 3,
          p: 3,
          borderRadius: 3,
          background: isDark
            ? 'linear-gradient(135deg, #0d47a1 0%, #1976d2 100%)'
            : 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
          color: '#fff',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative circles */}
        <Box
          sx={{
            position: 'absolute',
            top: -30,
            right: -20,
            width: 120,
            height: 120,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -20,
            right: 80,
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.04)',
          }}
        />

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          gap={2}
          sx={{ position: 'relative', zIndex: 1 }}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar
              sx={{
                width: 48,
                height: 48,
                bgcolor: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(4px)',
              }}
            >
              <PeopleIcon />
            </Avatar>
            <Box>
              <Typography variant="h5" fontWeight={700}>
                Quản lý nhân viên
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.85 }}>
                Quản lý danh sách nhân viên tiệm
              </Typography>
            </Box>
          </Box>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => setAddDialogOpen(true)}
            sx={{
              borderColor: 'rgba(255,255,255,0.4)',
              color: '#fff',
              '&:hover': {
                borderColor: '#fff',
                bgcolor: 'rgba(255,255,255,0.1)',
              },
            }}
          >
            Thêm nhân viên
          </Button>
        </Box>
      </Box>

      {/* Summary cards */}
      <Box mb={3}>
        {isInitialLoading ? (
          <Grid container spacing={2.5}>
            {[1, 2, 3].map((i) => (
              <Grid item xs={12} sm={4} key={i}>
                <Skeleton variant="rounded" height={120} sx={{ borderRadius: 3 }} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <SummaryCards totalEmployees={totalEmployees} employees={employees} />
        )}
      </Box>

      {/* Search section */}
      <EmployeeSearch
        keyword={keyword}
        onKeywordChange={(val) => {
          setKeyword(val);
          setPage(1);
        }}
        dateFrom={dateFrom}
        dateTo={dateTo}
        onDateFromChange={(val) => {
          setDateFrom(val);
          setPage(1);
        }}
        onDateToChange={(val) => {
          setDateTo(val);
          setPage(1);
        }}
        onClearAll={handleClearAll}
      />

      {/* Error alert */}
      {error && (
        <Fade in>
          <Alert
            severity="error"
            variant="filled"
            onClose={clearError}
            sx={{ mb: 2, borderRadius: 2 }}
            action={
              <Button color="inherit" size="small" onClick={loadEmployees}>
                Thử lại
              </Button>
            }
          >
            {error}
          </Alert>
        </Fade>
      )}

      {/* Table */}
      <Fade in={!isInitialLoading} timeout={400}>
        <Box>
          <EmployeeTable
            employees={employees}
            page={page}
            totalEmployees={totalEmployees}
            pageSize={pageSize}
            onPageChange={setPage}
            onViewDetail={handleViewDetail}
            onToggleStatus={handleToggleStatus}
            loading={isLoading}
            keyword={debouncedKeyword}
          />
        </Box>
      </Fade>

      {/* Dialogs */}
      <EmployeeDetail
        open={detailDialogOpen}
        employee={selectedEmployee}
        onClose={() => setDetailDialogOpen(false)}
        onToggleStatus={(emp) => {
          setDetailDialogOpen(false);
          handleToggleStatus(emp);
        }}
      />

      <EmployeeAddForm
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        onSubmit={handleCreate}
      />

      <EmployeeEditForm
        open={editDialogOpen}
        employee={statusTarget}
        onConfirm={handleConfirmToggle}
        onCancel={() => {
          setEditDialogOpen(false);
          setStatusTarget(null);
        }}
      />

      {/* Success/Error Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        TransitionComponent={Fade}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          variant="filled"
          sx={{ borderRadius: 2 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
