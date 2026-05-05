import React, { Component, ErrorInfo, ReactNode } from 'react';
  import { Box, Typography, Button } from '@mui/material';

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
        return (
          <Box display="flex" flexDirection="column" alignItems="center" py={8}>
            <Typography variant="h5" gutterBottom>
              Đã xảy ra lỗi
            </Typography>
            <Typography color="text.secondary" mb={2}>
              {this.state.error?.message}
            </Typography>
            <Button variant="contained" onClick={() => window.location.reload()}>
              Tải lại trang
            </Button>
          </Box>
        );
      }
      return this.props.children;
    }
  }