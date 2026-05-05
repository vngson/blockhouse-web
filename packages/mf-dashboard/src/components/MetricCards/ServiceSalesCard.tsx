import { Card, CardContent, Typography, Box, useTheme } from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';

interface Props {
  value: number;
}

export default function ServiceSalesCard({ value }: Props) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        position: 'relative',
        overflow: 'hidden',
        background: theme.palette.mode === 'light'
          ? 'linear-gradient(135deg, #2e7d32 0%, #66bb6a 100%)'
          : 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)',
        color: '#fff',
        borderRadius: 3,
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: theme.palette.mode === 'light'
            ? '0 8px 24px rgba(46,125,50,0.3)'
            : '0 8px 24px rgba(102,187,106,0.2)',
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
              Dịch vụ đã bán
            </Typography>
            <Typography variant="h4" fontWeight={800} sx={{ letterSpacing: -0.5 }}>
              {value.toLocaleString('vi-VN')}
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
            <StorefrontIcon sx={{ fontSize: 28 }} />
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
