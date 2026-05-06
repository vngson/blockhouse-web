import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  IconButton,
  useTheme,
  Fade,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import UpdateIcon from '@mui/icons-material/Update';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import { StatusBadge, formatCurrency, formatDateTime } from '@blockhouse/shared-lib';
import { Employee, EmployeeStatus } from '../../types/employee.types';

interface EmployeeDetailProps {
  open: boolean;
  employee: Employee | null;
  onClose: () => void;
  onToggleStatus: (employee: Employee) => void;
}

function InfoRow({
  icon,
  label,
  value,
  isDark,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  isDark: boolean;
}) {
  return (
    <Box display="flex" alignItems="center" gap={1.5} py={0.75}>
      <Box
        sx={{
          width: 32,
          height: 32,
          borderRadius: 1.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: isDark ? 'rgba(66,165,245,0.08)' : 'rgba(25,118,210,0.06)',
        }}
      >
        {React.cloneElement(icon as React.ReactElement, {
          fontSize: 'small',
          color: 'primary',
        })}
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ minWidth: 120 }}>
        {label}
      </Typography>
      <Box flex={1}>{value}</Box>
    </Box>
  );
}

export default function EmployeeDetail({
  open,
  employee,
  onClose,
  onToggleStatus,
}: EmployeeDetailProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  if (!employee) return null;

  const isActive = employee.status === EmployeeStatus.ACTIVE;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      TransitionComponent={Fade}
      transitionDuration={300}
    >
      {/* Gradient header */}
      <Box
        sx={{
          px: 3,
          pt: 3,
          pb: 4,
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
            top: -20,
            right: -20,
            width: 100,
            height: 100,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -30,
            right: 30,
            width: 60,
            height: 60,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
          }}
        />

        <Box
          display="flex"
          alignItems="center"
          gap={2}
          sx={{ position: 'relative', zIndex: 1 }}
        >
          <Avatar
            sx={{
              width: 64,
              height: 64,
              fontSize: 28,
              fontWeight: 700,
              bgcolor: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(4px)',
            }}
          >
            {employee.name.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight={700}>
              {employee.name}
            </Typography>
            <Box display="flex" alignItems="center" gap={1} mt={0.5}>
              <StatusBadge status={employee.status} />
            </Box>
          </Box>
        </Box>

        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', top: 8, right: 8, color: 'rgba(255,255,255,0.7)' }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent sx={{ pt: 3 }}>
        {/* Contact section */}
        <Typography
          variant="overline"
          color="text.secondary"
          sx={{ letterSpacing: 1, mb: 1, display: 'block' }}
        >
          Thông tin
        </Typography>
        <Card variant="outlined" sx={{ borderRadius: 2, mb: 2.5 }}>
          <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
            <InfoRow
              icon={<PersonIcon />}
              label="Tên"
              value={
                <Typography fontWeight={500}>{employee.name}</Typography>
              }
              isDark={isDark}
            />
            <InfoRow
              icon={<PhoneIcon />}
              label="Số điện thoại"
              value={
                <Typography fontWeight={500}>{employee.phone}</Typography>
              }
              isDark={isDark}
            />
            <InfoRow
              icon={isActive ? <ToggleOnIcon /> : <ToggleOffIcon />}
              label="Trạng thái"
              value={
                <StatusBadge status={employee.status} />
              }
              isDark={isDark}
            />
          </CardContent>
        </Card>

        {/* Revenue section */}
        <Typography
          variant="overline"
          color="text.secondary"
          sx={{ letterSpacing: 1, mb: 1, display: 'block' }}
        >
          Doanh thu
        </Typography>
        <Card variant="outlined" sx={{ borderRadius: 2, mb: 2.5 }}>
          <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
            <InfoRow
              icon={<AttachMoneyIcon />}
              label="Tổng doanh thu"
              value={
                <Typography fontWeight={600} color="primary">
                  {formatCurrency(employee.income)}
                </Typography>
              }
              isDark={isDark}
            />
          </CardContent>
        </Card>

        {/* Timestamps section */}
        <Typography
          variant="overline"
          color="text.secondary"
          sx={{ letterSpacing: 1, mb: 1, display: 'block' }}
        >
          Thời gian
        </Typography>
        <Card variant="outlined" sx={{ borderRadius: 2 }}>
          <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
            <InfoRow
              icon={<CalendarTodayIcon />}
              label="Ngày tạo"
              value={
                <Typography fontWeight={500}>{formatDateTime(employee.created_at)}</Typography>
              }
              isDark={isDark}
            />
            <InfoRow
              icon={<UpdateIcon />}
              label="Cập nhật"
              value={
                <Typography fontWeight={500}>{formatDateTime(employee.updated_at)}</Typography>
              }
              isDark={isDark}
            />
          </CardContent>
        </Card>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
        <Button onClick={onClose}>Đóng</Button>
        <Button
          onClick={() => onToggleStatus(employee)}
          variant="outlined"
          color={isActive ? 'warning' : 'success'}
        >
          {isActive ? 'Ngưng hoạt động' : 'Kích hoạt lại'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
