import { useState } from 'react';
import {
  Box,
  Chip,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  ListItemText,
  useTheme,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';

const MONTHS = [
  'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4',
  'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8',
  'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12',
];

const YEARS = Array.from({ length: 6 }, (_, i) => new Date().getFullYear() - i);

interface Props {
  month: number | null;
  year: number | null;
  onMonthChange: (month: number | null) => void;
  onYearChange: (year: number | null) => void;
}

export default function MonthSelector({ month, year, onMonthChange, onYearChange }: Props) {
  const theme = useTheme();
  const [yearAnchor, setYearAnchor] = useState<null | HTMLElement>(null);

  const displayMonth = month ?? new Date().getMonth() + 1;
  const displayYear = year ?? new Date().getFullYear();

  const handlePrevMonth = () => {
    let m = displayMonth - 1;
    let y = displayYear;
    if (m < 1) {
      m = 12;
      y -= 1;
    }
    onMonthChange(m);
    onYearChange(y);
  };

  const handleNextMonth = () => {
    let m = displayMonth + 1;
    let y = displayYear;
    if (m > 12) {
      m = 1;
      y += 1;
    }
    onMonthChange(m);
    onYearChange(y);
  };

  const handleClear = () => {
    onMonthChange(null);
    onYearChange(null);
  };

  const hasFilter = month !== null || year !== null;

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      mb={3}
      flexWrap="wrap"
      gap={1}
    >
      {/* Month navigator */}
      <Box display="flex" alignItems="center" gap={0.5}>
        <IconButton
          size="small"
          onClick={handlePrevMonth}
          sx={{
            bgcolor: theme.palette.mode === 'light'
              ? 'rgba(0,0,0,0.04)'
              : 'rgba(255,255,255,0.06)',
            '&:hover': {
              bgcolor: theme.palette.mode === 'light'
                ? 'rgba(0,0,0,0.08)'
                : 'rgba(255,255,255,0.12)',
            },
          }}
        >
          <ArrowBackIosNewIcon sx={{ fontSize: 14 }} />
        </IconButton>

        <Box
          sx={{
            px: 2,
            py: 0.75,
            borderRadius: 2,
            background: theme.palette.mode === 'light'
              ? 'linear-gradient(135deg, #1976d2, #42a5f5)'
              : 'linear-gradient(135deg, #0d47a1, #1976d2)',
            color: '#fff',
            minWidth: 160,
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" fontWeight={600}>
            {MONTHS[displayMonth - 1]} {displayYear}
          </Typography>
        </Box>

        <IconButton
          size="small"
          onClick={handleNextMonth}
          sx={{
            bgcolor: theme.palette.mode === 'light'
              ? 'rgba(0,0,0,0.04)'
              : 'rgba(255,255,255,0.06)',
            '&:hover': {
              bgcolor: theme.palette.mode === 'light'
                ? 'rgba(0,0,0,0.08)'
                : 'rgba(255,255,255,0.12)',
            },
          }}
        >
          <ArrowForwardIosIcon sx={{ fontSize: 14 }} />
        </IconButton>
      </Box>

      {/* Quick actions */}
      <Box display="flex" alignItems="center" gap={1}>
        <Box
          onClick={(e) => setYearAnchor(e.currentTarget)}
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.75,
            px: 1.5,
            py: 0.5,
            borderRadius: 2,
            cursor: 'pointer',
            border: '1px solid',
            borderColor: theme.palette.mode === 'light'
              ? 'rgba(0,0,0,0.12)'
              : 'rgba(255,255,255,0.12)',
            bgcolor: theme.palette.mode === 'light'
              ? 'rgba(25,118,210,0.04)'
              : 'rgba(66,165,245,0.06)',
            transition: 'all 0.2s',
            '&:hover': {
              bgcolor: theme.palette.mode === 'light'
                ? 'rgba(25,118,210,0.1)'
                : 'rgba(66,165,245,0.12)',
              borderColor: theme.palette.primary.main,
              boxShadow: `0 0 0 2px ${theme.palette.primary.main}20`,
            },
            '&:active': {
              transform: 'scale(0.97)',
            },
          }}
        >
          <CalendarMonthIcon
            sx={{
              fontSize: 16,
              color: theme.palette.primary.main,
            }}
          />
          <Typography
            variant="body2"
            fontWeight={700}
            sx={{
              color: theme.palette.primary.main,
              lineHeight: 1,
            }}
          >
            {displayYear}
          </Typography>
          <ExpandMoreIcon
            sx={{
              fontSize: 16,
              color: theme.palette.mode === 'light'
                ? 'rgba(0,0,0,0.4)'
                : 'rgba(255,255,255,0.4)',
              transition: 'transform 0.2s',
              transform: Boolean(yearAnchor) ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        </Box>

        {hasFilter && (
          <Box
            onClick={handleClear}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.75,
              px: 1.5,
              py: 0.5,
              borderRadius: 2,
              cursor: 'pointer',
              border: '1px solid',
              borderColor: theme.palette.mode === 'light'
                ? 'rgba(211,47,47,0.2)'
                : 'rgba(239,83,80,0.2)',
              bgcolor: theme.palette.mode === 'light'
                ? 'rgba(211,47,47,0.04)'
                : 'rgba(239,83,80,0.06)',
              transition: 'all 0.2s',
              '&:hover': {
                bgcolor: theme.palette.mode === 'light'
                  ? 'rgba(211,47,47,0.1)'
                  : 'rgba(239,83,80,0.12)',
                borderColor: theme.palette.error.main,
                boxShadow: `0 0 0 2px ${theme.palette.error.main}20`,
              },
              '&:active': {
                transform: 'scale(0.97)',
              },
            }}
          >
            <FilterListOffIcon
              sx={{
                fontSize: 16,
                color: theme.palette.error.main,
              }}
            />
            <Typography
              variant="body2"
              fontWeight={600}
              sx={{
                color: theme.palette.error.main,
                lineHeight: 1,
              }}
            >
              Xoá lọc
            </Typography>
          </Box>
        )}

        <Menu
          anchorEl={yearAnchor}
          open={Boolean(yearAnchor)}
          onClose={() => setYearAnchor(null)}
          PaperProps={{
            sx: {
              borderRadius: 2,
              mt: 0.5,
              minWidth: 120,
              boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            },
          }}
        >
          {YEARS.map((y) => (
            <MenuItem
              key={y}
              selected={y === displayYear}
              onClick={() => {
                onYearChange(y);
                setYearAnchor(null);
              }}
              sx={{ borderRadius: 1, mx: 0.5 }}
            >
              <ListItemText
                primary={y}
                primaryTypographyProps={{ fontWeight: y === displayYear ? 700 : 400 }}
              />
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Box>
  );
}
