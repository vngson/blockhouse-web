import { Box, CircularProgress } from '@mui/material';

  interface LoadingOverlayProps {
    loading?: boolean;
  }

  export default function LoadingOverlay({ loading = true }: LoadingOverlayProps) {
    if (!loading) return null;
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        py={4}
        data-testid="loading-overlay"
      >
        <CircularProgress />
      </Box>
    );
  }