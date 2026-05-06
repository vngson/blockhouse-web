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
  Chip,
  useTheme,
  Fade,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SpaIcon from '@mui/icons-material/Spa';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { formatCurrency, formatDateTime } from '@blockhouse/shared-lib';
import { Order } from '../../types/revenue.types';

interface OrderDetailProps {
  open: boolean;
  order: Order | null;
  onClose: () => void;
  onEdit: (order: Order) => void;
  onDelete: (order: Order) => void;
}

export default function OrderDetail({ open, order, onClose, onEdit, onDelete }: OrderDetailProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  if (!order) return null;

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
          px: 3, pt: 3, pb: 4,
          background: isDark
            ? 'linear-gradient(135deg, #e65100 0%, #f57c00 100%)'
            : 'linear-gradient(135deg, #f57c00 0%, #ffb74d 100%)',
          color: '#fff', position: 'relative', overflow: 'hidden',
        }}
      >
        <Box
          sx={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }}
        />
        <Box
          sx={{ position: 'absolute', bottom: -30, right: 30, width: 60, height: 60, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }}
        />

        <Box display="flex" alignItems="center" gap={2} sx={{ position: 'relative', zIndex: 1 }}>
          <Avatar
            sx={{
              width: 64, height: 64, fontSize: 28, fontWeight: 700,
              bgcolor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)',
            }}
          >
            <SpaIcon sx={{ fontSize: 32 }} />
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight={700}>
              Đơn hàng #{order.id}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.85 }}>
              {formatDateTime(order.datetime)}
            </Typography>
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
        {/* Order info */}
        <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: 1, mb: 1, display: 'block' }}>
          Thông tin đơn hàng
        </Typography>
        <Card variant="outlined" sx={{ borderRadius: 2, mb: 2.5 }}>
          <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
            <Box display="flex" alignItems="center" gap={1.5} py={0.75}>
              <Box sx={{
                width: 32, height: 32, borderRadius: 1.5,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                bgcolor: isDark ? 'rgba(66,165,245,0.08)' : 'rgba(25,118,210,0.06)',
              }}>
                <PersonIcon fontSize="small" color="primary" />
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ minWidth: 100 }}>Nhân viên</Typography>
              <Typography fontWeight={500}>{order.employee_name || '—'}</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1.5} py={0.75}>
              <Box sx={{
                width: 32, height: 32, borderRadius: 1.5,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                bgcolor: isDark ? 'rgba(66,165,245,0.08)' : 'rgba(25,118,210,0.06)',
              }}>
                <CalendarTodayIcon fontSize="small" color="primary" />
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ minWidth: 100 }}>Thời gian</Typography>
              <Typography fontWeight={500}>{formatDateTime(order.datetime)}</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1.5} py={0.75}>
              <Box sx={{
                width: 32, height: 32, borderRadius: 1.5,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                bgcolor: isDark ? 'rgba(66,165,245,0.08)' : 'rgba(25,118,210,0.06)',
              }}>
                <AttachMoneyIcon fontSize="small" color="primary" />
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ minWidth: 100 }}>Tổng tiền</Typography>
              <Typography fontWeight={600} color="primary">{formatCurrency(order.total)}</Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Services */}
        <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: 1, mb: 1, display: 'block' }}>
          Dịch vụ
        </Typography>
        <Card variant="outlined" sx={{ borderRadius: 2 }}>
          <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
            {order.services?.length > 0 ? (
              order.services.map((svc, idx) => (
                <React.Fragment key={idx}>
                  <Box display="flex" alignItems="center" justifyContent="space-between" py={0.75}>
                    <Box display="flex" alignItems="center" gap={1.5}>
                      <Box sx={{
                        width: 32, height: 32, borderRadius: 1.5,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        bgcolor: isDark ? 'rgba(66,165,245,0.08)' : 'rgba(25,118,210,0.06)',
                      }}>
                        <SpaIcon fontSize="small" color="primary" />
                      </Box>
                      <Typography fontWeight={500}>{svc.name || `Dịch vụ #${svc.service_id}`}</Typography>
                    </Box>
                    <Chip label={`x${svc.quantity}`} size="small" variant="outlined" />
                  </Box>
                  {idx < order.services.length - 1 && <Divider />}
                </React.Fragment>
              ))
            ) : (
              <Typography color="text.secondary">Không có thông tin dịch vụ</Typography>
            )}
          </CardContent>
        </Card>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
        <Button onClick={onClose}>Đóng</Button>
        <Button
          onClick={() => onDelete(order)}
          color="error"
          variant="outlined"
          startIcon={<DeleteIcon />}
        >
          Xoá
        </Button>
        <Button
          onClick={() => onEdit(order)}
          variant="outlined"
          startIcon={<EditIcon />}
        >
          Sửa
        </Button>
      </DialogActions>
    </Dialog>
  );
}
