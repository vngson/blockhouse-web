import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Box, Card, CardContent, Typography, useTheme } from '@mui/material';
import { ServiceRevenue } from '../../types/dashboard.types';

const COLORS = ['#1976d2', '#2e7d32', '#ed6c02', '#9c27b0', '#d32f2f'];
const GRADIENT_IDS = ['gradBlue', 'gradGreen', 'gradOrange', 'gradPurple', 'gradRed'];
const GRADIENT_COLORS = [
  ['#42a5f5', '#1976d2'],
  ['#66bb6a', '#2e7d32'],
  ['#ffa726', '#ed6c02'],
  ['#ce93d8', '#9c27b0'],
  ['#ef5350', '#d32f2f'],
];

interface Props {
  data: ServiceRevenue[];
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;

  return (
    <Box
      sx={{
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(8px)',
        borderRadius: 2,
        p: 2,
        boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
        border: '1px solid rgba(0,0,0,0.06)',
        minWidth: 180,
      }}
    >
      <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1 }}>
        Tháng {String(label).replace('T', '')}
      </Typography>
      {payload.map((entry: any, idx: number) => (
        <Box key={idx} display="flex" justifyContent="space-between" gap={3} mb={0.3}>
          <Box display="flex" alignItems="center" gap={0.5}>
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: entry.color,
              }}
            />
            <Typography variant="caption" color="text.secondary">
              {entry.name}
            </Typography>
          </Box>
          <Typography variant="caption" fontWeight={600}>
            {new Intl.NumberFormat('vi-VN').format(entry.value)}đ
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

export default function MonthlyRevenueChart({ data }: Props) {
  const theme = useTheme();
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const chartData = months.map((month) => {
    const entry: Record<string, number | string> = { month: `T${month}` };
    data.forEach((service) => {
      const found = service.monthly_data.find((d) => d.month === month);
      entry[service.service_name] = found ? found.revenue : 0;
    });
    return entry;
  });

  const gridColor = theme.palette.mode === 'light'
    ? 'rgba(0,0,0,0.06)'
    : 'rgba(255,255,255,0.06)';
  const axisColor = theme.palette.mode === 'light'
    ? 'rgba(0,0,0,0.4)'
    : 'rgba(255,255,255,0.4)';

  return (
    <Card
      sx={{
        borderRadius: 3,
        background: theme.palette.mode === 'light'
          ? '#fff'
          : 'rgba(27,40,56,0.8)',
        border: theme.palette.mode === 'light'
          ? '1px solid rgba(0,0,0,0.06)'
          : '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5 }}>
          Biểu đồ doanh thu theo tháng
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Phân tích doanh thu theo từng dịch vụ
        </Typography>

        <ResponsiveContainer width="100%" height={380}>
          <BarChart data={chartData} barGap={2} barCategoryGap="20%">
            <defs>
              {GRADIENT_IDS.map((id, idx) => (
                <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={GRADIENT_COLORS[idx][0]} stopOpacity={1} />
                  <stop offset="100%" stopColor={GRADIENT_COLORS[idx][1]} stopOpacity={0.85} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: axisColor, fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: axisColor, fontSize: 12 }}
              tickFormatter={(v) => `${(v / 1000000).toFixed(1)}tr`}
              width={50}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ paddingTop: 16 }}
              formatter={(value: string) => (
                <span style={{ fontSize: 12, color: axisColor }}>{value}</span>
              )}
            />
            {data.map((service, idx) => (
              <Bar
                key={service.service_id}
                dataKey={service.service_name}
                fill={`url(#${GRADIENT_IDS[idx % GRADIENT_IDS.length]})`}
                radius={[6, 6, 0, 0]}
                maxBarSize={32}
              >
                {chartData.map((_, cellIdx) => (
                  <Cell
                    key={cellIdx}
                    fill={`url(#${GRADIENT_IDS[idx % GRADIENT_IDS.length]})`}
                  />
                ))}
              </Bar>
            ))}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
