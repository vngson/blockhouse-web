import React, { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  InputAdornment,
  CircularProgress,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  useTheme,
  Fade,
  Stack,
  Divider,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { orderFormSchema, OrderFormValues } from './formSchema';
import { formatCurrency, NumberStepper } from '@blockhouse/shared-lib';
import { Order } from '../../types/revenue.types';

interface SimpleEmployee { id: number; name: string }
interface SimpleService { id: number; name: string; price: number }

interface OrderEditFormProps {
  open: boolean;
  order: Order | null;
  onClose: () => void;
  onSubmit: (data: OrderFormValues) => Promise<void>;
  employees: SimpleEmployee[];
  services: SimpleService[];
}

export default function OrderEditForm({ open, order, onClose, onSubmit, employees, services }: OrderEditFormProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      datetime: '',
      employee_id: 0,
      services: [{ service_id: 0, quantity: 1 }],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'services' });
  const watchServices = watch('services');

  const totalAmount = watchServices.reduce((sum, s) => {
    const svc = services.find((sv) => sv.id === s.service_id);
    return sum + (svc ? svc.price * s.quantity : 0);
  }, 0);

  useEffect(() => {
    if (open && order) {
      reset({
        datetime: order.datetime?.slice(0, 16),
        employee_id: order.employee_id || 0,
        services: order.services?.map((s) => ({ service_id: s.service_id, quantity: s.quantity })) || [{ service_id: 0, quantity: 1 }],
      });
    }
  }, [open, order, reset]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const fieldSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      transition: 'all 0.2s',
      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.primary.main },
    },
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth TransitionComponent={Fade} transitionDuration={300}>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pb: 0 }}>
        <Box sx={{
          width: 40, height: 40, borderRadius: 2,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          bgcolor: isDark ? 'rgba(66,165,245,0.12)' : 'rgba(25,118,210,0.08)',
        }}>
          <EditIcon color="primary" />
        </Box>
        <Box>
          <Typography variant="h6" fontWeight={700}>Cập nhật đơn hàng #{order?.id}</Typography>
          <Typography variant="caption" color="text.secondary">Chỉnh sửa thông tin đơn hàng</Typography>
        </Box>
      </DialogTitle>

      <form onSubmit={handleSubmit(onSubmit as any)}>
        <DialogContent sx={{ pt: 3 }}>
          <Stack spacing={2.5}>
            <TextField
              {...register('datetime')}
              label="Thời gian"
              type="datetime-local"
              error={!!errors.datetime}
              helperText={errors.datetime?.message}
              fullWidth
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarTodayIcon fontSize="small" color="action" />
                  </InputAdornment>
                ),
              }}
              sx={fieldSx}
            />

            <FormControl fullWidth error={!!errors.employee_id}>
              <InputLabel>Nhân viên</InputLabel>
              <Controller
                name="employee_id"
                control={control}
                render={({ field }) => (
                  <Select {...field} label="Nhân viên" sx={{ borderRadius: 2 }}>
                    <MenuItem value={0} disabled>Chọn nhân viên</MenuItem>
                    {employees.map((emp) => (
                      <MenuItem key={emp.id} value={emp.id}>{emp.name}</MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.employee_id && (
                <Typography variant="caption" color="error" sx={{ ml: 2, mt: 0.5 }}>
                  {errors.employee_id.message}
                </Typography>
              )}
            </FormControl>

            <Divider />

            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="subtitle2" fontWeight={600}>Dịch vụ</Typography>
              <Button size="small" startIcon={<AddIcon />} onClick={() => append({ service_id: 0, quantity: 1 })}>
                Thêm dịch vụ
              </Button>
            </Box>

            {fields.map((field, index) => (
              <Box key={field.id} display="flex" gap={1.5} alignItems="flex-start">
                <FormControl sx={{ flex: 1 }} error={!!errors.services?.[index]?.service_id}>
                  <InputLabel size="small">Dịch vụ</InputLabel>
                  <Controller
                    name={`services.${index}.service_id`}
                    control={control}
                    render={({ field: ctrlField }) => (
                      <Select {...ctrlField} size="small" label="Dịch vụ" sx={{ borderRadius: 2 }}>
                        <MenuItem value={0} disabled>Chọn dịch vụ</MenuItem>
                        {services.map((svc) => (
                          <MenuItem key={svc.id} value={svc.id}>
                            {svc.name} — {formatCurrency(svc.price)}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>

                <Controller
                  name={`services.${index}.quantity`}
                  control={control}
                  render={({ field }) => (
                    <NumberStepper
                      value={field.value ?? 1}
                      onChange={field.onChange}
                      step={1}
                      min={1}
                      size="small"
                      width={100}
                    />
                  )}
                />

                <IconButton
                  size="small"
                  onClick={() => fields.length > 1 && remove(index)}
                  disabled={fields.length <= 1}
                  sx={{ mt: 1, color: fields.length <= 1 ? 'text.disabled' : 'error.main' }}
                >
                  <DeleteOutlineIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}

            {errors.services?.message && (
              <Typography variant="caption" color="error">{errors.services.message}</Typography>
            )}

            <Box display="flex" justifyContent="flex-end" pt={1}>
              <Typography variant="h6" fontWeight={700}>
                Tổng: <Box component="span" color="primary">{formatCurrency(totalAmount)}</Box>
              </Typography>
            </Box>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button onClick={handleClose}>Huỷ</Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            startIcon={isSubmitting ? <CircularProgress size={16} color="inherit" /> : <CheckIcon />}
            sx={{ minWidth: 140 }}
          >
            {isSubmitting ? 'Đang lưu...' : 'Cập nhật'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
