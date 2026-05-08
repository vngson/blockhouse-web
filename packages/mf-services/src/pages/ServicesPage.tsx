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
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import { usePagination, useDebounce, useRequestAbort } from '@blockhouse/shared-lib';
import { useServiceStore } from '../store/serviceStore';
import { SummaryCards } from '../components/SummaryCards';
import { ServiceSearch } from '../components/ServiceSearch';
import { ServiceTable } from '../components/ServiceTable';
import { ServiceFormDialog } from '../components/ServiceForm';
import { Service } from '../types/service.types';

export default function ServicesPage() {
  const {
    services,
    totalServices,
    isLoading,
    error,
    selectedService,
    fetchServices,
    createService,
    updateService,
    setSelectedService,
    clearError,
  } = useServiceStore();

  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const { page, pageSize, setPage } = usePagination(10);
  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDebounce(keyword, 300);
  const { getSignal, abort } = useRequestAbort();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [mode, setMode] = useState<'add' | 'edit'>('add');

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  const loadServices = useCallback(() => {
    fetchServices({
      page,
      page_size: pageSize,
      keyword: debouncedKeyword || undefined,
    }, { signal: getSignal() });
  }, [page, pageSize, debouncedKeyword, fetchServices, getSignal]);

  useEffect(() => {
    loadServices();
    return () => abort();
  }, [loadServices, abort]);

  const handleAdd = () => {
    setMode('add');
    setSelectedService(null);
    setDialogOpen(true);
  };

  const handleEdit = (service: Service) => {
    setMode('edit');
    setSelectedService(service);
    setDialogOpen(true);
  };

  const handleSubmit = async (data: { name: string; description: string; price: number }) => {
    try {
      if (mode === 'add') {
        await createService(data);
        setSnackbar({ open: true, message: 'Đã thêm dịch vụ thành công!', severity: 'success' });
      } else if (selectedService) {
        await updateService(selectedService.id, data);
        setSnackbar({ open: true, message: 'Đã cập nhật dịch vụ!', severity: 'success' });
      }
      setDialogOpen(false);
      setSelectedService(null);
      loadServices();
    } catch (err: unknown) {
      setSnackbar({
        open: true,
        message: err instanceof Error ? err.message : 'Thao tác thất bại',
        severity: 'error',
      });
    }
  };

  const isInitialLoading = isLoading && services.length === 0;

  return (
    <Box>
      {/* Gradient page header */}
      <Box
        sx={{
          mb: 3,
          p: 3,
          borderRadius: 3,
          background: isDark
            ? 'linear-gradient(135deg, #4a148c 0%, #7b1fa2 100%)'
            : 'linear-gradient(135deg, #7b1fa2 0%, #ce93d8 100%)',
          color: '#fff',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
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
              <HomeRepairServiceIcon />
            </Avatar>
            <Box>
              <Typography variant="h5" fontWeight={700}>
                Quản lý dịch vụ
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.85 }}>
                Quản lý danh sách dịch vụ tiệm
              </Typography>
            </Box>
          </Box>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleAdd}
            sx={{
              borderColor: 'rgba(255,255,255,0.4)',
              color: '#fff',
              '&:hover': {
                borderColor: '#fff',
                bgcolor: 'rgba(255,255,255,0.1)',
              },
            }}
          >
            Thêm dịch vụ
          </Button>
        </Box>
      </Box>

      {/* Summary cards */}
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
          <SummaryCards totalServices={totalServices} services={services} />
        )}
      </Box>

      {/* Search */}
      <ServiceSearch
        keyword={keyword}
        onKeywordChange={(val) => {
          setKeyword(val);
          setPage(1);
        }}
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
              <Button color="inherit" size="small" onClick={loadServices}>
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
          <ServiceTable
            services={services}
            page={page}
            totalServices={totalServices}
            pageSize={pageSize}
            onPageChange={setPage}
            onEdit={handleEdit}
            loading={isLoading}
            keyword={debouncedKeyword}
          />
        </Box>
      </Fade>

      {/* Form dialog */}
      <ServiceFormDialog
        open={dialogOpen}
        mode={mode}
        service={selectedService}
        onClose={() => {
          setDialogOpen(false);
          setSelectedService(null);
        }}
        onSubmit={handleSubmit}
      />

      {/* Snackbar */}
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
