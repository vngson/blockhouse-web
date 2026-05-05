import { Box, Card, CardContent, Typography, useTheme } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { EmployeeRevenue } from '../../types/dashboard.types';
import TopEmployeeCard from './TopEmployeeCard';

interface Props {
  employees: EmployeeRevenue[];
}

export default function TopEmployeeList({ employees }: Props) {
  const theme = useTheme();
  const maxRevenue = employees.length > 0
    ? Math.max(...employees.map((e) => e.revenue))
    : 0;

  return (
    <Card
      sx={{
        borderRadius: 3,
        height: '100%',
        background: theme.palette.mode === 'light'
          ? '#fff'
          : 'rgba(27,40,56,0.8)',
        border: theme.palette.mode === 'light'
          ? '1px solid rgba(0,0,0,0.06)'
          : '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <EmojiEventsIcon
            sx={{
              color: '#FFD700',
              fontSize: 24,
            }}
          />
          <Box>
            <Typography variant="h6" fontWeight={700}>
              Top nhân viên
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Xếp hạng theo doanh thu
            </Typography>
          </Box>
        </Box>

        {employees.map((emp, idx) => (
          <TopEmployeeCard
            key={emp.id}
            employee={emp}
            rank={idx + 1}
            maxRevenue={maxRevenue}
          />
        ))}
      </CardContent>
    </Card>
  );
}
