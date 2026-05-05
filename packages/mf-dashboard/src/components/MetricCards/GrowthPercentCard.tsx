import { Card, CardContent, Typography, Box, useTheme } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

interface Props {
  value: number;
}

export default function GrowthPercentCard({ value }: Props) {
  const theme = useTheme();
  const isPositive = value >= 0;

  const gradient = isPositive
    ? theme.palette.mode === 'light'
      ? 'linear-gradient(135deg, #ed6c02 0%, #ff9800 100%)'
      : 'linear-gradient(135deg, #e65100 0%, #ed6c02 100%)'
    : theme.palette.mode === 'light'
      ? 'linear-gradient(135deg, #d32f2f 0%, #ef5350 100%)'
      : 'linear-gradient(135deg, #b71c1c 0%, #d32f2f 100%)';

  const shadowColor = isPositive
    ? 'rgba(237,108,2,0.3)'
    : 'rgba(211,47,47,0.3)';

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
          boxShadow: `0 8px 24px ${shadowColor}`,
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
              Tăng trưởng
            </Typography>
            <Typography variant="h4" fontWeight={800} sx={{ letterSpacing: -0.5 }}>
              {isPositive ? '+' : ''}{value.toFixed(1)}%
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
            {isPositive
              ? <TrendingUpIcon sx={{ fontSize: 28 }} />
              : <TrendingDownIcon sx={{ fontSize: 28 }} />}
          </Box>
        </Box>
      </CardContent>

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
