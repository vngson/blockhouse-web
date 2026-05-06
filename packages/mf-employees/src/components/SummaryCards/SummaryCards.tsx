import { Card, CardContent, Typography, Box, useTheme, Grid } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import { Employee, EmployeeStatus } from '../../types/employee.types';

interface SummaryCardsProps {
  totalEmployees: number;
  employees: Employee[];
}

function MetricCard({
  label,
  value,
  icon,
  gradient,
  hoverShadow,
}: {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  gradient: string;
  hoverShadow: string;
}) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

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

export default function SummaryCards({ totalEmployees, employees }: SummaryCardsProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const activeCount = employees.filter((e) => e.status === EmployeeStatus.ACTIVE).length;
  const inactiveCount = employees.filter((e) => e.status === EmployeeStatus.INACTIVE).length;

  const cards = [
    {
      label: 'Tổng nhân viên',
      value: totalEmployees,
      icon: <PeopleIcon sx={{ fontSize: 28 }} />,
      gradient: isDark
        ? 'linear-gradient(135deg, #0d47a1 0%, #1976d2 100%)'
        : 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
      hoverShadow: isDark
        ? '0 8px 24px rgba(66,165,245,0.2)'
        : '0 8px 24px rgba(25,118,210,0.3)',
    },
    {
      label: 'Đang hoạt động',
      value: activeCount,
      icon: <CheckCircleOutlineIcon sx={{ fontSize: 28 }} />,
      gradient: isDark
        ? 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)'
        : 'linear-gradient(135deg, #2e7d32 0%, #66bb6a 100%)',
      hoverShadow: isDark
        ? '0 8px 24px rgba(102,187,106,0.2)'
        : '0 8px 24px rgba(46,125,50,0.3)',
    },
    {
      label: 'Ngưng hoạt động',
      value: inactiveCount,
      icon: <PauseCircleOutlineIcon sx={{ fontSize: 28 }} />,
      gradient: isDark
        ? 'linear-gradient(135deg, #37474f 0%, #546e7a 100%)'
        : 'linear-gradient(135deg, #78909c 0%, #90a4ae 100%)',
      hoverShadow: isDark
        ? '0 8px 24px rgba(84,110,122,0.2)'
        : '0 8px 24px rgba(120,144,156,0.3)',
    },
  ];

  return (
    <Grid container spacing={2.5}>
      {cards.map((card) => (
        <Grid item xs={12} sm={4} key={card.label}>
          <MetricCard {...card} />
        </Grid>
      ))}
    </Grid>
  );
}
