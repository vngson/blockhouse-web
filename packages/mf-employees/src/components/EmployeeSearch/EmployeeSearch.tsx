import React, { useState } from 'react';
import {
  Box,
  Chip,
  Collapse,
  IconButton,
  Tooltip,
  Button,
  Paper,
  TextField,
  InputAdornment,
  useTheme,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/vi';
import dayjs from 'dayjs';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import CloseIcon from '@mui/icons-material/Close';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

interface EmployeeSearchProps {
  keyword: string;
  onKeywordChange: (value: string) => void;
  dateFrom: string;
  dateTo: string;
  onDateFromChange: (value: string) => void;
  onDateToChange: (value: string) => void;
  onClearAll: () => void;
}

function formatDateLabel(dateStr: string) {
  if (!dateStr) return '';
  return dayjs(dateStr).format('DD/MM/YYYY');
}

export default function EmployeeSearch({
  keyword,
  onKeywordChange,
  dateFrom,
  dateTo,
  onDateFromChange,
  onDateToChange,
  onClearAll,
}: EmployeeSearchProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [expanded, setExpanded] = useState(false);

  const hasActiveFilters = Boolean(dateFrom || dateTo);
  const activeFilterCount = (dateFrom ? 1 : 0) + (dateTo ? 1 : 0);

  const inputBaseSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2.5,
      bgcolor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)',
      transition: 'all 0.25s ease',
      '& fieldset': {
        borderColor: 'transparent',
      },
      '&:hover': {
        bgcolor: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.04)',
        '& fieldset': {
          borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
        },
      },
      '&.Mui-focused': {
        bgcolor: isDark ? 'rgba(255,255,255,0.06)' : '#fff',
        boxShadow: isDark
          ? '0 0 0 2px rgba(66,165,245,0.25)'
          : '0 0 0 2px rgba(25,118,210,0.15)',
        '& fieldset': {
          borderColor: `${theme.palette.primary.main} !important`,
        },
      },
    },
    '& .MuiOutlinedInput-input': {
      fontSize: 14,
      py: 1,
    },
  };

  const datePickerSx = {
    minWidth: 210,
    '& .MuiOutlinedInput-root': {
      borderRadius: 2.5,
      bgcolor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)',
      transition: 'all 0.25s ease',
      fontSize: 14,
      '& fieldset': {
        borderColor: 'transparent',
      },
      '&:hover': {
        bgcolor: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.04)',
        '& fieldset': {
          borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
        },
      },
      '&.Mui-focused': {
        bgcolor: isDark ? 'rgba(255,255,255,0.06)' : '#fff',
        boxShadow: isDark
          ? '0 0 0 2px rgba(66,165,245,0.25)'
          : '0 0 0 2px rgba(25,118,210,0.15)',
        '& fieldset': {
          borderColor: `${theme.palette.primary.main} !important`,
        },
      },
    },
    '& .MuiInputLabel-root': {
      fontSize: 13,
      '&.Mui-focused': {
        color: theme.palette.primary.main,
        fontWeight: 500,
      },
    },
    '& .MuiIconButton-root': {
      color: dateFrom || dateTo ? theme.palette.primary.main : 'text.secondary',
      transition: 'color 0.2s',
      '&:hover': {
        bgcolor: isDark ? 'rgba(66,165,245,0.08)' : 'rgba(25,118,210,0.06)',
      },
    },
    '& .MuiInputAdornment-root': {
      ml: 0.5,
    },
  };

  return (
    <Box mb={2.5}>
      <Paper
        elevation={0}
        sx={{
          px: 2.5,
          py: 2.25,
          borderRadius: 3,
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
          bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.7)',
          backdropFilter: 'blur(8px)',
        }}
      >
        {/* Search row */}
        <Box display="flex" alignItems="center" gap={1.5} flexWrap="wrap">
          <Box sx={{ flex: 1, minWidth: 260 }}>
            <TextField
              size="small"
              value={keyword}
              onChange={(e) => onKeywordChange(e.target.value)}
              placeholder="Tìm nhân viên theo tên, SĐT..."
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon
                      sx={{
                        fontSize: 20,
                        color: keyword ? theme.palette.primary.main : 'text.secondary',
                        transition: 'color 0.2s',
                      }}
                    />
                  </InputAdornment>
                ),
              }}
              sx={inputBaseSx}
            />
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Button
              size="small"
              onClick={() => setExpanded((prev) => !prev)}
              startIcon={<TuneIcon sx={{ fontSize: 18 }} />}
              endIcon={
                expanded ? (
                  <ExpandLessIcon sx={{ fontSize: 18, transition: 'transform 0.2s' }} />
                ) : (
                  <ExpandMoreIcon sx={{ fontSize: 18, transition: 'transform 0.2s' }} />
                )
              }
              variant={expanded ? 'contained' : 'outlined'}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                px: 2,
                transition: 'all 0.2s',
                ...(hasActiveFilters &&
                  !expanded && {
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                    '&:hover': {
                      borderColor: theme.palette.primary.main,
                      bgcolor: isDark
                        ? 'rgba(66,165,245,0.08)'
                        : 'rgba(25,118,210,0.06)',
                    },
                  }),
              }}
            >
              {hasActiveFilters ? `${activeFilterCount} bộ lọc` : 'Bộ lọc'}
            </Button>
            {hasActiveFilters && (
              <Tooltip title="Xoá tất cả bộ lọc">
                <IconButton
                  size="small"
                  onClick={onClearAll}
                  sx={{
                    bgcolor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                    '&:hover': {
                      bgcolor: theme.palette.error.main,
                      color: '#fff',
                    },
                    transition: 'all 0.2s',
                  }}
                >
                  <FilterListOffIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Box>

        {/* Date filters */}
        <Collapse in={expanded}>
          <Box
            display="flex"
            gap={2}
            flexWrap="wrap"
            alignItems="center"
            mt={2}
            pt={2}
            sx={{
              borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vi">
              <DatePicker
                label="Từ ngày"
                value={dateFrom ? dayjs(dateFrom) : null}
                onChange={(newValue) => {
                  onDateFromChange(newValue ? newValue.format('YYYY-MM-DD') : '');
                }}
                format="DD/MM/YYYY"
                maxDate={dayjs()}
                slotProps={{
                  textField: {
                    size: 'small',
                    sx: datePickerSx,
                  },
                  openPickerButton: {
                    sx: { p: 0.5 },
                  },
                }}
              />
              <DatePicker
                label="Đến ngày"
                value={dateTo ? dayjs(dateTo) : null}
                onChange={(newValue) => {
                  onDateToChange(newValue ? newValue.format('YYYY-MM-DD') : '');
                }}
                format="DD/MM/YYYY"
                minDate={dateFrom ? dayjs(dateFrom) : undefined}
                maxDate={dayjs()}
                slotProps={{
                  textField: {
                    size: 'small',
                    sx: datePickerSx,
                  },
                  openPickerButton: {
                    sx: { p: 0.5 },
                  },
                }}
              />
            </LocalizationProvider>
          </Box>
        </Collapse>
      </Paper>

      {/* Active filter chips */}
      {hasActiveFilters && (
        <Box display="flex" gap={1} flexWrap="wrap" mt={1.5}>
          {dateFrom && (
            <Chip
              icon={<CalendarMonthIcon sx={{ fontSize: 16 }} />}
              label={`Từ: ${formatDateLabel(dateFrom)}`}
              onDelete={() => onDateFromChange('')}
              size="small"
              variant="outlined"
              deleteIcon={<CloseIcon sx={{ fontSize: 14 }} />}
              sx={{
                borderRadius: 2,
                fontWeight: 500,
                px: 0.5,
                py: 1,
                height: 'auto',
                '& .MuiChip-label': { px: 1 },
                borderColor: isDark ? 'rgba(66,165,245,0.3)' : 'rgba(25,118,210,0.2)',
                color: theme.palette.text.primary,
                bgcolor: 'transparent',
                '& .MuiChip-icon': {
                  color: theme.palette.primary.main,
                  ml: 1,
                },
                '& .MuiChip-deleteIcon': {
                  color: 'text.secondary',
                  mr: 0.5,
                  transition: 'all 0.2s',
                  '&:hover': {
                    color: theme.palette.error.main,
                    bgcolor: isDark ? 'rgba(239,83,80,0.12)' : 'rgba(211,47,47,0.08)',
                    borderRadius: 1,
                  },
                },
                transition: 'all 0.2s',
                '&:hover': {
                  borderColor: theme.palette.primary.main,
                  bgcolor: isDark ? 'rgba(66,165,245,0.06)' : 'rgba(25,118,210,0.04)',
                },
              }}
            />
          )}
          {dateTo && (
            <Chip
              icon={<CalendarMonthIcon sx={{ fontSize: 16 }} />}
              label={`Đến: ${formatDateLabel(dateTo)}`}
              onDelete={() => onDateToChange('')}
              size="small"
              variant="outlined"
              deleteIcon={<CloseIcon sx={{ fontSize: 14 }} />}
              sx={{
                borderRadius: 2,
                fontWeight: 500,
                px: 0.5,
                py: 1,
                height: 'auto',
                '& .MuiChip-label': { px: 1 },
                borderColor: isDark ? 'rgba(66,165,245,0.3)' : 'rgba(25,118,210,0.2)',
                color: theme.palette.text.primary,
                bgcolor: 'transparent',
                '& .MuiChip-icon': {
                  color: theme.palette.primary.main,
                  ml: 1,
                },
                '& .MuiChip-deleteIcon': {
                  color: 'text.secondary',
                  mr: 0.5,
                  transition: 'all 0.2s',
                  '&:hover': {
                    color: theme.palette.error.main,
                    bgcolor: isDark ? 'rgba(239,83,80,0.12)' : 'rgba(211,47,47,0.08)',
                    borderRadius: 1,
                  },
                },
                transition: 'all 0.2s',
                '&:hover': {
                  borderColor: theme.palette.primary.main,
                  bgcolor: isDark ? 'rgba(66,165,245,0.06)' : 'rgba(25,118,210,0.04)',
                },
              }}
            />
          )}
        </Box>
      )}
    </Box>
  );
}
