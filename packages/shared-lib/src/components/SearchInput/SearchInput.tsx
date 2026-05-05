import { TextField, InputAdornment } from '@mui/material';
  import SearchIcon from '@mui/icons-material/Search';

  interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
  }

  export default function SearchInput({
    value,
    onChange,
    placeholder = 'Tìm kiếm...',
  }: SearchInputProps) {
    return (
      <TextField
        size="small"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
        data-testid="search-input"
      />
    );
  }