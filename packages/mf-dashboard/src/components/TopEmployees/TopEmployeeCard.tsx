import { Card, CardContent, Typography, Box, LinearProgress, useTheme } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { EmployeeRevenue } from '../../types/dashboard.types';

const RANK_CONFIG: Record<number, { color: string; bg: string; icon: any }> = {
  1: { color: '#FFD700', bg: 'linear-gradient(135deg, #FFD700 0%, #FFA000 100%)', icon: EmojiEventsIcon },
  2: { color: '#C0C0C0', bg: 'linear-gradient(135deg, #C0C0C0 0%, #9E9E9E 100%)', icon: WorkspacePremiumIcon },
  3: { color: '#CD7F32', bg: 'linear-gradient(135deg, #CD7F32 0%, #8D6E63 100%)', icon: MilitaryTechIcon },
};

interface Props {
  employee: EmployeeRevenue;
  rank: number;
  maxRevenue: number;
}

export default function TopEmployeeCard({ employee, rank, maxRevenue }: Props) {
  const theme = useTheme();
  const config = RANK_CONFIG[rank];
  const isTop3 = !!config;
  const Icon = config?.icon;
  const progress = maxRevenue > 0 ? (employee.revenue / maxRevenue) * 100 : 0;

  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        mb: 1.5,
        borderRadius: 2,
        position: 'relative',
        overflow: 'hidden',
        background: theme.palette.mode === 'light'
          ? isTop3 ? `linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.8))` : '#fff'
          : isTop3 ? `linear-gradient(135deg, rgba(27,40,56,0.95), rgba(27,40,56,0.8))` : theme.palette.background.paper,
        border: isTop3
          ? `1px solid ${config.color}40`
          : theme.palette.mode === 'light'
            ? '1px solid rgba(0,0,0,0.06)'
            : '1px solid rgba(255,255,255,0.06)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateX(4px)',
          boxShadow: isTop3
            ? `0 4px 16px ${config.color}25`
            : '0 4px 16px rgba(0,0,0,0.08)',
        },
      }}
    >
      {/* Rank badge */}
      <Box
        sx={{
          width: 56,
          height: '100%',
          minHeight: 72,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: isTop3 ? config.bg : theme.palette.mode === 'light'
            ? 'rgba(0,0,0,0.04)'
            : 'rgba(255,255,255,0.06)',
          color: isTop3 ? '#fff' : theme.palette.text.secondary,
          position: 'relative',
        }}
      >
        {isTop3 && Icon ? (
          <Icon sx={{ fontSize: 22, mb: -0.5 }} />
        ) : null}
        <Typography
          variant={isTop3 ? 'h6' : 'body1'}
          fontWeight={800}
          sx={{ lineHeight: 1, mt: isTop3 ? 0.3 : 0 }}
        >
          {rank}
        </Typography>
      </Box>

      <CardContent sx={{ flex: 1, py: 1.5, px: 2, '&:last-child': { pb: 1.5 } }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
          <Typography fontWeight={700} fontSize={14}>
            {employee.name}
          </Typography>
          <Typography
            variant="caption"
            fontWeight={600}
            sx={{
              color: isTop3 ? config.color : 'text.secondary',
            }}
          >
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(employee.revenue)}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              flex: 1,
              height: 6,
              borderRadius: 3,
              bgcolor: theme.palette.mode === 'light'
                ? 'rgba(0,0,0,0.06)'
                : 'rgba(255,255,255,0.08)',
              '& .MuiLinearProgress-bar': {
                borderRadius: 3,
                background: isTop3 ? config.bg : undefined,
              },
            }}
          />
          <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>
            {employee.order_count} đơn
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
