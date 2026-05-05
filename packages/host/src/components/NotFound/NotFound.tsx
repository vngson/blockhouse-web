import { Box, Typography, Button } from '@mui/material';
  import { useNavigate } from 'react-router-dom';

  export default function NotFound() {
    const navigate = useNavigate();
    return (
      <Box display="flex" flexDirection="column" alignItems="center" py={12}>
        <Typography variant="h3" fontWeight={700} color="primary" gutterBottom>
          404
        </Typography>
        <Typography variant="h6" color="text.secondary" mb={3}>
          Trang không tồn tại
        </Typography>
        <Button variant="contained" onClick={() => navigate('/')}>
          Về Dashboard
        </Button>
      </Box>
    );
  }