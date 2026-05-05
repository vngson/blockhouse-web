import { Box, Typography } from '@mui/material';
  import SearchOffIcon from '@mui/icons-material/SearchOff';

  interface EmptyStateProps {
    message?: string;
  }

  export default function EmptyState({ message = 'Không có dữ liệu' }: EmptyStateProps) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        py={6}
        data-testid="empty-state"
      >
        <SearchOffIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }} />
        <Typography color="text.secondary">{message}</Typography>
      </Box>
    );
  }