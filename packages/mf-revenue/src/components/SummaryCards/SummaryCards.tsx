import { Card, CardContent, Typography, Box, useTheme, Grid } from '@mui/material';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { formatCurrency } from '@blockhouse/shared-lib';
import { Order } from '../../types/revenue.types';

interface SummaryCardsProps {
  totalOrders: number;
  orders: Order[];
}

function MetricCard({
  label,
  value,
  icon,
  gradient,
  hoverShadow,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  gradient: string;
  hoverShadow: string;
}) {
  return (
    <Card
      sx={{
        position: 'relative',
        overflow: 'hidden',
        background: gradient,
        color: '#fff',
        borderRadius: 3,
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: hoverShadow,
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
              {label}
            </Typography>
            <Typography variant="h4" fontWeight={800} sx={{ letterSpacing: -0.5 }}>
              {value}
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
            {icon}
          </Box>
        </Box>
      </CardContent>
      <Box
        sx={{
          position: 'absolute', top: -20, right: -20, width: 100, height: 100,
          borderRadius: '50%', background: 'rgba(255,255,255,0.08)', zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute', bottom: -30, right: 30, width: 60, height: 60,
          borderRadius: '50%', background: 'rgba(255,255,255,0.05)', zIndex: 0,
        }}
      />
    </Card>
  );
}

export default function SummaryCards({ totalOrders, orders }: SummaryCardsProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);

  const cards = [
    {
      label: 'Tổng đơn hàng',
      value: totalOrders,
      icon: <ReceiptLongIcon sx={{ fontSize: 28 }} />,
      gradient: isDark
        ? 'linear-gradient(135deg, #e65100 0%, #f57c00 100%)'
        : 'linear-gradient(135deg, #f57c00 0%, #ffb74d 100%)',
      hoverShadow: isDark
        ? '0 8px 24px rgba(245,124,0,0.2)'
        : '0 8px 24px rgba(230,81,0,0.3)',
    },
    {
      label: 'Tổng doanh thu',
      value: formatCurrency(totalRevenue),
      icon: <AttachMoneyIcon sx={{ fontSize: 28 }} />,
      gradient: isDark
        ? 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)'
        : 'linear-gradient(135deg, #2e7d32 0%, #66bb6a 100%)',
      hoverShadow: isDark
        ? '0 8px 24px rgba(102,187,106,0.2)'
        : '0 8px 24px rgba(46,125,50,0.3)',
    },
  ];

  return (
    <Grid container spacing={2.5}>
      {cards.map((card) => (
        <Grid item xs={12} sm={6} key={card.label}>
          <MetricCard {...card} />
        </Grid>
      ))}
    </Grid>
  );
}
