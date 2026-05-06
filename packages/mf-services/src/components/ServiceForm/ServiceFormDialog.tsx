import React, { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Box,
  Typography,
  InputAdornment,
  CircularProgress,
  useTheme,
  Fade,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import SpaIcon from '@mui/icons-material/Spa';
import DescriptionIcon from '@mui/icons-material/Description';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CheckIcon from '@mui/icons-material/Check';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { serviceFormSchema, ServiceFormValues } from './formSchema';
import { Service } from '../../types/service.types';

interface ServiceFormDialogProps {
  open: boolean;
  mode: 'add' | 'edit';
  service?: Service | null;
  onClose: () => void;
  onSubmit: (data: ServiceFormValues) => Promise<void>;
}

export default function ServiceFormDialog({ open, mode, service, onClose, onSubmit }: ServiceFormDialogProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: { name: '', description: '', price: 0 },
  });

  useEffect(() => {
    if (open && mode === 'edit' && service) {
      reset({ name: service.name, description: service.description, price: service.price });
    } else if (open && mode === 'add') {
      reset({ name: '', description: '', price: 0 });
    }
  }, [open, mode, service, reset]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const fieldSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      transition: 'all 0.2s',
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main,
      },
    },
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      TransitionComponent={Fade}
      transitionDuration={300}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pb: 0 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: isDark ? 'rgba(66,165,245,0.12)' : 'rgba(25,118,210,0.08)',
          }}
        >
          {mode === 'add' ? (
            <AddIcon color="primary" />
          ) : (
            <EditIcon color="primary" />
          )}
        </Box>
        <Box>
          <Typography variant="h6" fontWeight={700}>
            {mode === 'add' ? 'Thêm dịch vụ mới' : 'Cập nhật dịch vụ'}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {mode === 'add' ? 'Điền thông tin để tạo dịch vụ' : 'Chỉnh sửa thông tin dịch vụ'}
          </Typography>
        </Box>
      </DialogTitle>

      <form onSubmit={handleSubmit(onSubmit as any)}>
        <DialogContent sx={{ pt: 3 }}>
          <Stack spacing={2.5}>
            <TextField
              {...register('name')}
              label="Tên dịch vụ"
              error={!!errors.name}
              helperText={errors.name?.message}
              fullWidth
              autoFocus
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SpaIcon fontSize="small" color="action" />
                  </InputAdornment>
                ),
              }}
              sx={fieldSx}
            />
            <TextField
              {...register('description')}
              label="Mô tả"
              error={!!errors.description}
              helperText={errors.description?.message}
              fullWidth
              multiline
              rows={3}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1 }}>
                    <DescriptionIcon fontSize="small" color="action" />
                  </InputAdornment>
                ),
              }}
              sx={fieldSx}
            />
            <TextField
              {...register('price', { valueAsNumber: true })}
              label="Giá (VNĐ)"
              type="number"
              error={!!errors.price}
              helperText={errors.price?.message || 'Ví dụ: 50000'}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoneyIcon fontSize="small" color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{
                ...fieldSx,
                '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button':
                  {
                    WebkitAppearance: 'none',
                    margin: 0,
                  },
                '& input[type=number]': {
                  MozAppearance: 'textfield',
                },
              }}
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button onClick={handleClose}>Huỷ</Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            startIcon={
              isSubmitting ? <CircularProgress size={16} color="inherit" /> : <CheckIcon />
            }
            sx={{ minWidth: 140 }}
          >
            {isSubmitting
              ? 'Đang lưu...'
              : mode === 'add'
                ? 'Thêm dịch vụ'
                : 'Cập nhật'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
