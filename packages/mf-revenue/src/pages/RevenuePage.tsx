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
  Tabs,
  Tab,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  LinearProgress,
  Pagination as MuiPagination,
  useTheme,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import apiClient from '@blockhouse/shared-lib/api/client';
import { API_ENDPOINTS, usePagination, useDebounce, formatCurrency, formatDateTime, ConfirmDialog } from '@blockhouse/shared-lib';
import { useRevenueStore } from '../store/revenueStore';
import { SummaryCards } from '../components/SummaryCards';
import { OrderSearch } from '../components/OrderSearch';
import { OrderTable } from '../components/OrderTable';
import OrderDetail from '../components/OrderDetail/OrderDetail';
import OrderCreateForm from '../components/OrderForm/OrderCreateForm';
import OrderEditForm from '../components/OrderForm/OrderEditForm';
import { Order, OrderByDate, OrderByEmployeeAndDate, MonthlyRevenueRecord } from '../types/revenue.types';
import { OrderFormValues } from '../components/OrderForm/formSchema';
import dayjs from 'dayjs';

interface SimpleEmployee { id: number; name: string }
interface SimpleService { id: number; name: string; price: number }

const MONTH_NAMES = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
  'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];

export default function RevenuePage() {
  const {
    orders,
    totalOrders,
    ordersByDate,
    totalDays,
    ordersByEmployee,
    totalDateEmployees,
    monthlyRevenue,
    totalMonthlyRecords,
    isLoading,
    error,
    selectedOrder,
    activeTab,
    fetchOrders,
    fetchOrdersByDate,
    fetchRevenueByEmployee,
    fetchMonthlyRevenue,
    createOrder,
    updateOrder,
    deleteOrder,
    setSelectedOrder,
    setActiveTab,
    clearError,
  } = useRevenueStore();

  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const { page, pageSize, setPage } = usePagination(activeTab === 'monthly' ? 10 : 10);
  const [keyword, setKeyword] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const debouncedKeyword = useDebounce(keyword, 300);

  const [employees, setEmployees] = useState<SimpleEmployee[]>([]);
  const [services, setServices] = useState<SimpleService[]>([]);

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Order | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Order | null>(null);

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const loadFormData = async () => {
      try {
        const [empRes, svcRes] = await Promise.all([
          apiClient.post<{ data: { employees: SimpleEmployee[] } }>(API_ENDPOINTS.EMPLOYEES, { page: 1, page_size: 200 }),
          apiClient.get<{ data: SimpleService[] | { services: SimpleService[] } }>(API_ENDPOINTS.SERVICES_ALL),
        ]);
        setEmployees(empRes.data.data?.employees ?? []);
        const svcRaw = svcRes.data.data ?? svcRes.data;
        const svcArray = Array.isArray(svcRaw) ? svcRaw : (Array.isArray((svcRaw as any)?.services) ? (svcRaw as any).services : []);
        setServices(svcArray);
      } catch (err) {
        console.error('Failed to load form data:', err);
      }
    };
    loadFormData();
  }, []);

  const loadOrders = useCallback(() => {
    const params = {
      page,
      page_size: pageSize,
      keyword: debouncedKeyword || undefined,
      date_from: dateFrom || undefined,
      date_to: dateTo || undefined,
    };

    if (activeTab === 'all') fetchOrders(params);
    else if (activeTab === 'by_date') fetchOrdersByDate(params);
    else if (activeTab === 'by_employee') fetchRevenueByEmployee(params);
    else {
      const year = new Date().getFullYear();
      const monthStart = dayjs()
        .year(year)
        .month(selectedMonth - 1)
        .startOf('month')
        .format('YYYY-MM-DD');

      const monthEnd = dayjs()
        .year(year)
        .month(selectedMonth - 1)
        .endOf('month')
        .format('YYYY-MM-DD');
      const formatDate = (d: Date) => d.toISOString().split('T')[0];
      fetchMonthlyRevenue({
        ...params,
        date_from: monthStart,
        date_to: monthEnd,
      });
    }
  }, [page, pageSize, debouncedKeyword, dateFrom, dateTo, activeTab, fetchOrders, fetchOrdersByDate, fetchRevenueByEmployee, fetchMonthlyRevenue, selectedMonth]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const handleTabChange = (_: React.SyntheticEvent, newTab: string) => {
    setActiveTab(newTab as any);
    setPage(1);
  };

  const handleViewDetail = (order: Order) => {
    setSelectedOrder(order);
    setDetailDialogOpen(true);
  };

  const handleEdit = (order: Order) => {
    setEditTarget(order);
    setEditDialogOpen(true);
  };

  const handleDelete = (order: Order) => {
    setDeleteTarget(order);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteOrder(deleteTarget.id);
      setDeleteConfirmOpen(false);
      setDeleteTarget(null);
      loadOrders();
      setSnackbar({ open: true, message: 'Đã xoá đơn hàng!', severity: 'success' });
    } catch (err: any) {
      setSnackbar({ open: true, message: err.message || 'Xoá thất bại', severity: 'error' });
    }
  };

  const handleCreateSubmit = async (data: OrderFormValues) => {
    await createOrder({ ...data, total: calcTotal(data.services) });
    setCreateDialogOpen(false);
    loadOrders();
    setSnackbar({ open: true, message: 'Đã tạo đơn hàng thành công!', severity: 'success' });
  };

  const handleEditSubmit = async (data: OrderFormValues) => {
    if (!editTarget) return;
    await updateOrder(editTarget.id, { ...data, total: calcTotal(data.services) });
    setEditDialogOpen(false);
    setEditTarget(null);
    loadOrders();
    setSnackbar({ open: true, message: 'Đã cập nhật đơn hàng!', severity: 'success' });
  };

  const calcTotal = (items: { service_id: number; quantity: number }[]) =>
    items.reduce((sum, s) => {
      const svc = services.find((sv) => sv.id === s.service_id);
      return sum + (svc ? svc.price * s.quantity : 0);
    }, 0);

  const handleClearAll = () => {
    setKeyword('');
    setDateFrom('');
    setDateTo('');
    setPage(1);
  };

  const isInitialLoading = isLoading && (
    (activeTab === 'all' && orders.length === 0) ||
    (activeTab === 'by_date' && ordersByDate.length === 0) ||
    (activeTab === 'by_employee' && ordersByEmployee.length === 0) ||
    (activeTab === 'monthly' && monthlyRevenue.length === 0)
  );

  return (
    <Box>
      {/* Gradient header */}
      <Box
        sx={{
          mb: 3, p: 3, borderRadius: 3,
          background: isDark
            ? 'linear-gradient(135deg, #e65100 0%, #f57c00 100%)'
            : 'linear-gradient(135deg, #f57c00 0%, #ffb74d 100%)',
          color: '#fff', position: 'relative', overflow: 'hidden',
        }}
      >
        <Box sx={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
        <Box sx={{ position: 'absolute', bottom: -20, right: 80, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
        <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2} sx={{ position: 'relative', zIndex: 1 }}>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar sx={{ width: 48, height: 48, bgcolor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)' }}>
              <ReceiptLongIcon />
            </Avatar>
            <Box>
              <Typography variant="h5" fontWeight={700}>Quản lý doanh thu</Typography>
              <Typography variant="body2" sx={{ opacity: 0.85 }}>Quản lý đơn hàng và doanh thu tiệm</Typography>
            </Box>
          </Box>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => setCreateDialogOpen(true)}
            sx={{ borderColor: 'rgba(255,255,255,0.4)', color: '#fff', '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.1)' } }}
          >
            Tạo đơn hàng
          </Button>
        </Box>
      </Box>

      {/* Summary cards - only on "all" tab */}
      {activeTab === 'all' && (
        <Box mb={3}>
          {isInitialLoading ? (
            <Grid container spacing={2.5}>
              {[1, 2].map((i) => (
                <Grid item xs={12} sm={6} key={i}>
                  <Skeleton variant="rounded" height={120} sx={{ borderRadius: 3 }} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <SummaryCards totalOrders={totalOrders} orders={orders} />
          )}
        </Box>
      )}

      {/* Tabs */}
      <Paper
        elevation={0}
        sx={{
          mb: 2.5, borderRadius: 3,
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
          overflow: 'hidden',
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          sx={{
            minHeight: 48,
            '& .MuiTab-root': {
              textTransform: 'none', fontWeight: 600, fontSize: 13, minHeight: 48,
              minWidth: { xs: 'auto', md: 160 },
              px: { xs: 1.5, md: 2 },
              flexShrink: 0,
            },
            '& .MuiTabScrollButton-root': {
              width: 32, minWidth: 32,
            },
            '& .MuiTabs-indicator': { height: 3, borderRadius: '3px 3px 0 0' },
          }}
        >
          <Tab icon={<ReceiptLongIcon sx={{ fontSize: 18 }} />} iconPosition="start" label={<Box component="span" sx={{ display: { xs: 'inline', md: 'inline' } }}>Đơn hàng</Box>} value="all" />
          <Tab icon={<CalendarMonthIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="Theo ngày" value="by_date" />
          <Tab icon={<PersonIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="Nhân viên" value="by_employee" />
          <Tab icon={<TrendingUpIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="Tháng" value="monthly" />
        </Tabs>
      </Paper>

      {/* Search */}
      <OrderSearch
        keyword={keyword}
        onKeywordChange={(val) => { setKeyword(val); setPage(1); }}
        dateFrom={dateFrom}
        dateTo={dateTo}
        onDateFromChange={(val) => { setDateFrom(val); setPage(1); }}
        onDateToChange={(val) => { setDateTo(val); setPage(1); }}
        onClearAll={handleClearAll}
      />

      {/* Error */}
      {error && (
        <Fade in>
          <Alert severity="error" variant="filled" onClose={clearError} sx={{ mb: 2, borderRadius: 2 }}
            action={<Button color="inherit" size="small" onClick={loadOrders}>Thử lại</Button>}>
            {error}
          </Alert>
        </Fade>
      )}

      {/* Tab content */}
      <Fade in={!isInitialLoading} timeout={400}>
        <Box>
          {activeTab === 'all' && (
            <OrderTable
              orders={orders}
              page={page}
              totalOrders={totalOrders}
              pageSize={pageSize}
              onPageChange={setPage}
              onViewDetail={handleViewDetail}
              onEdit={handleEdit}
              onDelete={handleDelete}
              loading={isLoading}
              keyword={debouncedKeyword}
            />
          )}
          {activeTab === 'by_date' && (
            <OrderByDateTable
              data={ordersByDate}
              page={page}
              totalDays={totalDays}
              pageSize={pageSize}
              onPageChange={setPage}
              loading={isLoading}
              isDark={isDark}
            />
          )}
          {activeTab === 'by_employee' && (
            <OrderByEmployeeTable
              data={ordersByEmployee}
              page={page}
              total={totalDateEmployees}
              pageSize={pageSize}
              onPageChange={setPage}
              loading={isLoading}
              isDark={isDark}
            />
          )}
          {activeTab === 'monthly' && (
            <>
              <Box display="flex" justifyContent="flex-end" mb={2}>
                <FormControl size="small" sx={{ minWidth: 140 }}>
                  <InputLabel>Chọn tháng</InputLabel>
                  <Select
                    value={selectedMonth}
                    label="Chọn tháng"
                    onChange={(e) => setSelectedMonth(e.target.value as number)}
                  >
                    {MONTH_NAMES.map((name, idx) => (
                      <MenuItem key={idx + 1} value={idx + 1}>{name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <MonthlyRevenueTable
                data={monthlyRevenue}
                page={page}
                total={totalMonthlyRecords}
                pageSize={pageSize}
                onPageChange={setPage}
                loading={isLoading}
                isDark={isDark}
                selectedMonth={selectedMonth}
              />
            </>
          )}
        </Box>
      </Fade>

      {/* Dialogs */}
      <OrderDetail
        open={detailDialogOpen}
        order={selectedOrder}
        onClose={() => setDetailDialogOpen(false)}
        onEdit={(order) => { setDetailDialogOpen(false); handleEdit(order); }}
        onDelete={(order) => { setDetailDialogOpen(false); handleDelete(order); }}
      />

      <OrderCreateForm
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        onSubmit={handleCreateSubmit}
        employees={employees}
        services={services}
      />

      <OrderEditForm
        open={editDialogOpen}
        order={editTarget}
        onClose={() => { setEditDialogOpen(false); setEditTarget(null); }}
        onSubmit={handleEditSubmit}
        employees={employees}
        services={services}
      />

      <ConfirmDialog
        open={deleteConfirmOpen}
        title="Xoá đơn hàng"
        message={`Bạn có chắc muốn xoá đơn hàng #${deleteTarget?.id}? Hành động này không thể hoàn tác.`}
        confirmLabel="Xoá"
        onConfirm={handleConfirmDelete}
        onCancel={() => { setDeleteConfirmOpen(false); setDeleteTarget(null); }}
      />

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        TransitionComponent={Fade}
      >
        <Alert onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))} severity={snackbar.severity} variant="filled" sx={{ borderRadius: 2 }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

// --- Shared pagination wrapper ---
function TablePagination({ page, total, pageSize, onPageChange }: { page: number; total: number; pageSize: number; onPageChange: (p: number) => void }) {
  const totalPages = Math.ceil(total / pageSize);
  if (totalPages <= 1) return null;
  return (
    <Box display="flex" justifyContent="center" py={2}>
      <MuiPagination count={totalPages} page={page} onChange={(_, p) => onPageChange(p)} color="primary" />
    </Box>
  );
}

// --- Sub-tables ---

function OrderByDateTable({ data, page, totalDays, pageSize, onPageChange, loading, isDark }: {
  data: OrderByDate[]; page: number; totalDays: number; pageSize: number;
  onPageChange: (p: number) => void; loading?: boolean; isDark: boolean;
}) {
  return (
    <Box>
      <TablePagination page={page} total={totalDays} pageSize={pageSize} onPageChange={onPageChange} />
      <Paper sx={{ borderRadius: 3, overflowX: 'auto', border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}` }}>
        {loading && data.length > 0 && <Box sx={{ height: 3 }}><LinearProgress /></Box>}
        <Table sx={{ minWidth: 500 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: isDark ? 'rgba(245,124,0,0.06)' : 'rgba(230,81,0,0.04)' }}>
              {['Ngày', 'Tổng tiền', 'Số dịch vụ', 'Chi tiết'].map((col) => (
                <TableCell key={col} sx={{ fontWeight: 700, fontSize: 13, borderBottom: `2px solid ${isDark ? 'rgba(245,124,0,0.12)' : 'rgba(230,81,0,0.12)'}`, whiteSpace: 'nowrap' }}>{col}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length === 0 ? (
              <TableRow><TableCell colSpan={4} align="center" sx={{ py: 6 }}><Typography color="text.secondary">Không có dữ liệu theo ngày</Typography></TableCell></TableRow>
            ) : data.map((row, idx) => (
              <TableRow key={idx} hover sx={{ transition: 'background-color 0.2s' }}>
                <TableCell><Typography fontWeight={500}>{formatDateTime(row.date)}</Typography></TableCell>
                <TableCell><Typography fontWeight={600} color="primary">{formatCurrency(row.total)}</Typography></TableCell>
                <TableCell><Typography color="text.secondary">{row.services?.length || 0} dịch vụ</Typography></TableCell>
                <TableCell>
                  {row.services?.length > 0 && (
                    <Box display="flex" gap={0.5} flexWrap="wrap">
                      {row.services.map((s, i) => (
                        <Typography key={i} variant="caption" color="text.secondary">
                          {s.name || `#${s.service_id}`} x{s.quantity}{i < row.services.length - 1 ? ',' : ''}
                        </Typography>
                      ))}
                    </Box>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}

function OrderByEmployeeTable({ data, page, total, pageSize, onPageChange, loading, isDark }: {
  data: OrderByEmployeeAndDate[]; page: number; total: number; pageSize: number;
  onPageChange: (p: number) => void; loading?: boolean; isDark: boolean;
}) {
  return (
    <Box>
      <TablePagination page={page} total={total} pageSize={pageSize} onPageChange={onPageChange} />
      <Paper sx={{ borderRadius: 3, overflowX: 'auto', border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}` }}>
        {loading && data.length > 0 && <Box sx={{ height: 3 }}><LinearProgress /></Box>}
        <Table sx={{ minWidth: 500 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: isDark ? 'rgba(245,124,0,0.06)' : 'rgba(230,81,0,0.04)' }}>
              {['Ngày', 'Nhân viên', 'Tổng tiền', 'Dịch vụ'].map((col) => (
                <TableCell key={col} sx={{ fontWeight: 700, fontSize: 13, borderBottom: `2px solid ${isDark ? 'rgba(245,124,0,0.12)' : 'rgba(230,81,0,0.12)'}`, whiteSpace: 'nowrap' }}>{col}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length === 0 ? (
              <TableRow><TableCell colSpan={4} align="center" sx={{ py: 6 }}><Typography color="text.secondary">Không có dữ liệu theo nhân viên</Typography></TableCell></TableRow>
            ) : data.map((row, idx) => (
              <TableRow key={idx} hover sx={{ transition: 'background-color 0.2s' }}>
                <TableCell><Typography fontWeight={500}>{formatDateTime(row.date)}</Typography></TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Avatar sx={{ width: 28, height: 28, fontSize: 12, fontWeight: 600, bgcolor: 'primary.main', color: '#fff' }}>
                      {row.employee_name?.charAt(0).toUpperCase() || '?'}
                    </Avatar>
                    <Typography fontWeight={500}>{row.employee_name}</Typography>
                  </Box>
                </TableCell>
                <TableCell><Typography fontWeight={600} color="primary">{formatCurrency(row.total)}</Typography></TableCell>
                <TableCell>
                  {row.services?.length > 0 ? (
                    <Box display="flex" gap={0.5} flexWrap="wrap">
                      {row.services.map((s, i) => (
                        <Typography key={i} variant="caption" color="text.secondary">
                          {s.name || `#${s.service_id}`} x{s.quantity}{i < row.services.length - 1 ? ',' : ''}
                        </Typography>
                      ))}
                    </Box>
                  ) : '—'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}

function MonthlyRevenueTable({ data, page, total, pageSize, onPageChange, loading, isDark, selectedMonth }: {
  data: MonthlyRevenueRecord[]; page: number; total: number; pageSize: number;
  onPageChange: (p: number) => void; loading?: boolean; isDark: boolean; selectedMonth: number;
}) {
  // Detect year from data, fallback to current year
  const displayYear = data.length > 0 ? data[0].year : new Date().getFullYear();

  // Group flat records by employee
  const employeeMap = new Map<number, { name: string; months: Map<number, { total: number; order_count: number }> }>();

  data.forEach((rec) => {
    if (!employeeMap.has(rec.employee_id)) {
      employeeMap.set(rec.employee_id, { name: rec.employee_name, months: new Map() });
    }
    employeeMap.get(rec.employee_id)!.months.set(rec.month, { total: rec.total, order_count: rec.order_count });
  });

  const employees = Array.from(employeeMap.entries());
  const borderClr = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)';
  const headBorder = `2px solid ${isDark ? 'rgba(245,124,0,0.12)' : 'rgba(230,81,0,0.12)'}`;
  const cellSx = { borderBottom: `1px solid ${borderClr}` };

  const startIdx = (page - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  const paginatedEmployees = employees.slice(startIdx, endIdx);

  return (
    <Box>
      <TablePagination page={page} total={total} pageSize={pageSize} onPageChange={onPageChange} />
      <Paper sx={{ borderRadius: 3, overflowX: 'auto', border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}` }}>
        {loading && data.length > 0 && <Box sx={{ height: 3 }}><LinearProgress /></Box>}
        <Table sx={{ minWidth: 400 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: isDark ? 'rgba(245,124,0,0.06)' : 'rgba(230,81,0,0.04)' }}>
              <TableCell sx={{ fontWeight: 700, fontSize: 13, borderBottom: headBorder }}>
                Nhân viên
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 700, fontSize: 13, borderBottom: headBorder, minWidth: 150 }}>
                {MONTH_NAMES[selectedMonth - 1]}
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 700, fontSize: 13, borderBottom: headBorder, minWidth: 120 }}>
                Số đơn
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ py: 6 }}>
                  <Typography color="text.secondary">Không có dữ liệu doanh thu tháng</Typography>
                </TableCell>
              </TableRow>
            ) : paginatedEmployees.map(([empId, emp]) => {
              const entry = emp.months.get(selectedMonth);
              const rev = entry?.total ?? 0;
              const orderCount = entry?.order_count ?? 0;
              return (
                <TableRow key={empId} hover sx={{ transition: 'background-color 0.2s' }}>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Avatar sx={{ width: 28, height: 28, fontSize: 12, fontWeight: 600, bgcolor: 'primary.main', color: '#fff' }}>
                        {emp.name?.charAt(0).toUpperCase() || '?'}
                      </Avatar>
                      <Typography fontWeight={500}>{emp.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right" sx={cellSx}>
                    <Typography fontWeight={rev > 0 ? 600 : 400} color={rev > 0 ? 'primary' : 'text.disabled'} fontSize={13}>
                      {rev > 0 ? formatCurrency(rev) : '—'}
                    </Typography>
                  </TableCell>
                  <TableCell align="right" sx={cellSx}>
                    <Typography fontWeight={rev > 0 ? 600 : 400} color={rev > 0 ? 'text.primary' : 'text.disabled'} fontSize={13}>
                      {orderCount > 0 ? orderCount : '—'}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
