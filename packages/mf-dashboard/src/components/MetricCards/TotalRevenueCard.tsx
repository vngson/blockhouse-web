import { Card, CardContent, Typography, Box, useTheme } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

interface Props {
  value: number;
}

export default function TotalRevenueCard({ value }: Props) {
  const theme = useTheme();
  const formatted = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(value);

  return (
    <Card
      sx={{
        position: 'relative',
        overflow: 'hidden',
        background: theme.palette.mode === 'light'
          ? 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)'
          : 'linear-gradient(135deg, #0d47a1 0%, #1976d2 100%)',
        color: '#fff',
        borderRadius: 3,
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: theme.palette.mode === 'light'
            ? '0 8px 24px rgba(25,118,210,0.3)'
            : '0 8px 24px rgba(66,165,245,0.2)',
        },
      }}
    >
      <CardContent sx={{ position: 'relative', zIndex: 1 }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography
              variant="body2"
              sx={{ opacity: 0.85, fontWeight: 500, letterSpacing: 0.5, mb: 0.5 }}
            >
              Tổng doanh thu
            </Typography>
            <Typography variant="h4" fontWeight={800} sx={{ letterSpacing: -0.5 }}>
              {formatted}
            </Typography>
          </Box>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              background: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(4px)',
            }}
          >
            <AttachMoneyIcon sx={{ fontSize: 28 }} />
          </Box>
        </Box>
      </CardContent>

      {/* Decorative circle */}
      <Box
        sx={{
          position: 'absolute',
          top: -20,
          right: -20,
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)',
          zIndex: 0,
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
          zIndex: 0,
        }}
      />
    </Card>
  );
}
