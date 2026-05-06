import React from 'react';
import { Box, Paper, TextField, InputAdornment, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface ServiceSearchProps {
  keyword: string;
  onKeywordChange: (value: string) => void;
}

export default function ServiceSearch({ keyword, onKeywordChange }: ServiceSearchProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2.5,
      bgcolor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)',
      transition: 'all 0.25s ease',
      '& fieldset': { borderColor: 'transparent' },
      '&:hover': {
        bgcolor: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.04)',
        '& fieldset': { borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)' },
      },
      '&.Mui-focused': {
        bgcolor: isDark ? 'rgba(255,255,255,0.06)' : '#fff',
        boxShadow: isDark
          ? '0 0 0 2px rgba(66,165,245,0.25)'
          : '0 0 0 2px rgba(25,118,210,0.15)',
        '& fieldset': { borderColor: `${theme.palette.primary.main} !important` },
      },
    },
    '& .MuiOutlinedInput-input': { fontSize: 14, py: 1 },
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        px: 2.5,
        borderRadius: 3,
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
        bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.7)',
        backdropFilter: 'blur(8px)',
        mb: 2.5,
      }}
    >
      <TextField
        size="small"
        value={keyword}
        onChange={(e) => onKeywordChange(e.target.value)}
        placeholder="Tìm dịch vụ theo tên..."
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
        sx={inputSx}
      />
    </Paper>
  );
}
