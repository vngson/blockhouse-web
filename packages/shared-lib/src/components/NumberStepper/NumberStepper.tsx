import React, { useCallback, useRef, useState } from 'react';
import { Box, IconButton, InputAdornment, OutlinedInput, useTheme } from '@mui/material';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

interface NumberStepperProps {
  value: number;
  onChange: (value: number) => void;
  step?: number;
  min?: number;
  max?: number;
  label?: string;
  size?: 'small' | 'medium';
  width?: number | string;
  error?: boolean;
  disabled?: boolean;
}

export default function NumberStepper({
  value,
  onChange,
  step = 1,
  min,
  max,
  size = 'small',
  width = 140,
  error = false,
  disabled = false,
}: NumberStepperProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const inputRef = useRef<HTMLInputElement>(null);
  const [draft, setDraft] = useState<string | null>(null);

  const clamp = useCallback(
    (v: number) => {
      if (min !== undefined && v < min) return min;
      if (max !== undefined && v > max) return v;
      return v;
    },
    [min, max],
  );

  const handleDecrement = () => {
    const next = clamp(value - step);
    onChange(next);
    setDraft(null);
  };
  const handleIncrement = () => {
    const next = clamp(value + step);
    onChange(next);
    setDraft(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDraft(e.target.value);
  };

  const commit = () => {
    if (draft === null) return;
    const num = Number(draft);
    if (draft === '' || isNaN(num)) {
      onChange(min ?? 0);
    } else {
      onChange(clamp(num));
    }
    setDraft(null);
  };

  const displayValue = draft !== null ? draft : value;

  const btnBg = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)';
  const btnHover = isDark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.08)';

  const isSmall = size === 'small';
  const inputHeight = isSmall ? 40 : 56;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        width,
        height: inputHeight,
        borderRadius: 2,
        border: '1px solid',
        borderColor: error ? 'error.main' : 'divider',
        overflow: 'hidden',
        transition: 'border-color 0.2s',
        '&:hover': { borderColor: error ? 'error.main' : 'primary.main' },
        bgcolor: 'transparent',
      }}
    >
      <IconButton
        size="small"
        onClick={handleDecrement}
        disabled={disabled || (min !== undefined && value <= min)}
        sx={{
          borderRadius: 0,
          width: inputHeight,
          height: inputHeight,
          color: 'text.secondary',
          bgcolor: btnBg,
          '&:hover': { bgcolor: btnHover },
          '&.Mui-disabled': { bgcolor: 'transparent', color: 'text.disabled' },
        }}
      >
        <RemoveRoundedIcon fontSize="small" />
      </IconButton>

      <OutlinedInput
        inputRef={inputRef}
        value={displayValue}
        onChange={handleChange}
        onBlur={commit}
        onKeyDown={(e) => { if (e.key === 'Enter') commit(); }}
        type="text"
        inputMode="numeric"
        disabled={disabled}
        notched={false}
        sx={{
          flex: 1,
          minWidth: 0,
          '& .MuiOutlinedInput-input': {
            textAlign: 'center',
            p: 0,
            fontSize: isSmall ? '0.875rem' : '1rem',
            fontWeight: 600,
            height: inputHeight,
            lineHeight: `${inputHeight}px`,
          },
          '& fieldset': { border: 'none' },
        }}
      />

      <IconButton
        size="small"
        onClick={handleIncrement}
        disabled={disabled || (max !== undefined && value >= max)}
        sx={{
          borderRadius: 0,
          width: inputHeight,
          height: inputHeight,
          color: 'text.secondary',
          bgcolor: btnBg,
          '&:hover': { bgcolor: btnHover },
          '&.Mui-disabled': { bgcolor: 'transparent', color: 'text.disabled' },
        }}
      >
        <AddRoundedIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}
