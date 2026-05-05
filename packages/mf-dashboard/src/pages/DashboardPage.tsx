import { useEffect } from 'react';
import { Grid, Box, Typography, Skeleton, useTheme, Avatar } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightlightIcon from '@mui/icons-material/Nightlight';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import { useDashboardStore } from '../store/dashboardStore';
import { TotalRevenueCard, ServiceSalesCard, GrowthPercentCard } from '../components/MetricCards';
import { TopEmployeeList } from '../components/TopEmployees';
import { MonthlyRevenueChart } from '../components/DashboardCharts';
import { MonthSelector } from '../components/MonthSelector';

function getGreeting(): { text: string; sub: string } {
  const hour = new Date().getHours();
  if (hour < 12) return { text: 'Chào buổi sáng', sub: 'Chúc một ngày làm việc hiệu quả!' };
  if (hour < 18) return { text: 'Chào buổi chiều', sub: 'Hy vọng bạn đang có một ngày tốt lành.' };
  return { text: 'Chào buổi tối', sub: 'Hãy xem lại kết quả hôm nay nhé.' };
}

function getGreetingConfig(isDark: boolean) {
  const hour = new Date().getHours();
  const isNight = hour >= 18 || hour < 6;
  return {
    icon: isNight ? <NightlightIcon sx={{ fontSize: 24, color: '#FFD54F' }} /> : <WbSunnyIcon sx={{ fontSize: 24, color: '#FFEE58' }} />,
    bg: isNight
      ? 'linear-gradient(135deg, #1a237e 0%, #283593 100%)'
      : 'linear-gradient(135deg, #0d47a1 0%, #1976d2 100%)',
  };
}

export default function DashboardPage() {
  const theme = useTheme();
  const { data, isLoading, error, selectedMonth, selectedYear, fetchDashboard, setMonth, setYear } =
    useDashboardStore();

  useEffect(() => {
    fetchDashboard({
      month: selectedMonth ?? undefined,
      year: selectedYear ?? undefined,
    });
  }, [selectedMonth, selectedYear, fetchDashboard]);

  const today = new Date().toLocaleDateString('vi-VN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  if (isLoading && !data) {
    return (
      <Box>
        <Skeleton variant="text" width={200} height={40} sx={{ mb: 2 }} />
        <Grid container spacing={2} mb={3}>
          {[1, 2, 3].map((i) => (
            <Grid item xs={12} md={4} key={i}>
              <Skeleton variant="rounded" height={120} sx={{ borderRadius: 3 }} />
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Skeleton variant="rounded" height={450} sx={{ borderRadius: 3 }} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Skeleton variant="rounded" height={450} sx={{ borderRadius: 3 }} />
          </Grid>
        </Grid>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          textAlign: 'center',
          py: 8,
          px: 3,
          borderRadius: 3,
          bgcolor: theme.palette.mode === 'light'
            ? 'rgba(211,47,47,0.04)'
            : 'rgba(239,83,80,0.08)',
          border: '1px solid',
          borderColor: theme.palette.mode === 'light'
            ? 'rgba(211,47,47,0.12)'
            : 'rgba(239,83,80,0.12)',
        }}
      >
        <Typography variant="h6" color="error" fontWeight={600}>
          Không thể tải dữ liệu
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {error}
        </Typography>
      </Box>
    );
  }

  if (!data) return null;

  return (
    <Box>
      {/* Welcome header */}
      <Box
        sx={{
          mb: 3,
          p: 3,
          borderRadius: 3,
          background: theme.palette.mode === 'light'
            ? 'linear-gradient(135deg, #0d47a1 0%, #1976d2 50%, #42a5f5 100%)'
            : 'linear-gradient(135deg, #0d1b2a 0%, #1b2838 50%, #0d47a1 100%)',
          color: '#fff',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative elements */}
        <Box
          sx={{
            position: 'absolute',
            top: -40,
            right: -20,
            width: 160,
            height: 160,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -50,
            right: 80,
            width: 120,
            height: 120,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.04)',
          }}
        />

        <Box
          sx={{ position: 'relative', zIndex: 1 }}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
          gap={2}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar
              sx={{
                width: 52,
                height: 52,
                bgcolor: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(4px)',
                boxShadow: '0 0 20px rgba(255,213,79,0.35)',
              }}
            >
              {getGreetingConfig(theme.palette.mode === 'dark').icon}
            </Avatar>
            <Box>
              <Typography variant="h5" fontWeight={700} sx={{ lineHeight: 1.3 }}>
                {getGreeting().text}
              </Typography>
              <Typography
                variant="body2"
                sx={{ opacity: 0.8, mt: 0.25 }}
              >
                {getGreeting().sub}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              px: 2,
              py: 1,
              borderRadius: 2,
              bgcolor: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(4px)',
            }}
          >
            <DashboardRoundedIcon sx={{ fontSize: 18, opacity: 0.8 }} />
            <Typography variant="body2" sx={{ opacity: 0.9, fontWeight: 500 }}>
              {today}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Filters */}
      <MonthSelector
        month={selectedMonth}
        year={selectedYear}
        onMonthChange={setMonth}
        onYearChange={setYear}
      />

      {/* Metric cards */}
      <Grid container spacing={2.5} mb={3}>
        <Grid item xs={12} sm={6} md={4}>
          <TotalRevenueCard value={data.total_revenue} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ServiceSalesCard value={data.total_service_sales} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <GrowthPercentCard value={data.growth_percent} />
        </Grid>
      </Grid>

      {/* Chart + Employees */}
      <Grid container spacing={2.5}>
        <Grid item xs={12} lg={8}>
          <MonthlyRevenueChart data={data.monthly_chart} />
        </Grid>
        <Grid item xs={12} lg={4}>
          <TopEmployeeList employees={data.top_employees} />
        </Grid>
      </Grid>
    </Box>
  );
}
