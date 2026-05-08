import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Typography, Button, Chip } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback message={this.state.error?.message} />;
    }
    return this.props.children;
  }
}

function ErrorFallback({ message }: { message?: string }) {
  const [apiStatus, setApiStatus] = React.useState<'checking' | 'up' | 'down'>('checking');

  React.useEffect(() => {
    let cancelled = false;
    const baseUrl = (typeof process !== 'undefined' && process.env?.VITE_API_BASE_URL) || 'http://localhost:5000';
    fetch(`${baseUrl}/api/v1/health`, { signal: AbortSignal.timeout(5000) })
      .then((res) => {
        if (!cancelled) setApiStatus(res.ok ? 'up' : 'down');
      })
      .catch(() => {
        if (!cancelled) setApiStatus('down');
      });
    return () => { cancelled = true; };
  }, []);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" py={8} px={3}>
      <Typography variant="h5" gutterBottom fontWeight={600}>
        Đã xảy ra lỗi
      </Typography>
      {message && (
        <Typography color="text.secondary" mb={2} textAlign="center">
          {message}
        </Typography>
      )}
      <Box display="flex" alignItems="center" gap={1} mb={3}>
        <Typography variant="body2" color="text.secondary">
          API Server:
        </Typography>
        <Chip
          size="small"
          label={apiStatus === 'checking' ? 'Đang kiểm tra...' : apiStatus === 'up' ? 'Hoạt động' : 'Không phản hồi'}
          color={apiStatus === 'up' ? 'success' : apiStatus === 'down' ? 'error' : 'default'}
          variant="outlined"
        />
      </Box>
      <Button
        variant="contained"
        startIcon={<RefreshIcon />}
        onClick={() => window.location.reload()}
      >
        Tải lại trang
      </Button>
    </Box>
  );
}
