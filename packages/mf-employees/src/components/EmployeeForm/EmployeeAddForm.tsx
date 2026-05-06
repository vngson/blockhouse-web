import React from 'react';
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
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import CheckIcon from '@mui/icons-material/Check';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { employeeAddSchema, EmployeeAddFormData } from './formSchema';

interface EmployeeAddFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: EmployeeAddFormData) => Promise<void>;
}

export default function EmployeeAddForm({ open, onClose, onSubmit }: EmployeeAddFormProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<EmployeeAddFormData>({
    resolver: zodResolver(employeeAddSchema),
    defaultValues: { name: '', phone: '' },
  });

  const watchPhone = watch('phone', '');

  const handleClose = () => {
    reset();
    onClose();
  };

  const onFormSubmit = async (data: EmployeeAddFormData) => {
    await onSubmit(data);
    reset();
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
          <PersonAddIcon color="primary" />
        </Box>
        <Box>
          <Typography variant="h6" fontWeight={700}>
            Thêm nhân viên mới
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Điền thông tin để tạo nhân viên
          </Typography>
        </Box>
      </DialogTitle>

      <form onSubmit={handleSubmit(onFormSubmit)}>
        <DialogContent sx={{ pt: 3 }}>
          <Stack spacing={2.5}>
            <TextField
              {...register('name')}
              label="Tên nhân viên"
              error={!!errors.name}
              helperText={errors.name?.message}
              fullWidth
              autoFocus
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon fontSize="small" color="action" />
                  </InputAdornment>
                ),
              }}
              sx={fieldSx}
            />
            <TextField
              {...register('phone')}
              label="Số điện thoại"
              error={!!errors.phone}
              helperText={
                errors.phone?.message ||
                (watchPhone.length > 0 ? `${watchPhone.length}/15 chữ số` : 'Ví dụ: 0912345678')
              }
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon fontSize="small" color="action" />
                  </InputAdornment>
                ),
              }}
              sx={fieldSx}
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
            {isSubmitting ? 'Đang thêm...' : 'Thêm nhân viên'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
