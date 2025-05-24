'use client';
import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Typography,
  Alert,
  Stack,
  useTheme
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

export default function ReportPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const theme = useTheme();

  const handleDownloadReport = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      
      const response = await fetch('/api/report');
      
      if (!response.ok) {
        throw new Error('Failed to generate report');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'student-report.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to download report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mt: 4, mb: 4 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          sx={{ 
            textAlign: 'center', 
            fontWeight: 'bold',
            color: theme.palette.primary.main,
            mb: 4
          }}
        >
          Academic Performance Report
        </Typography>

        <Card elevation={3} sx={{ borderRadius: 4 }}>
          <CardContent sx={{ p: 4 }}>
            <Stack spacing={3} alignItems="center">
              {error && (
                <Alert 
                  severity="error"
                  icon={<ErrorIcon />}
                  sx={{ width: '100%', mb: 2 }}
                >
                  {error}
                </Alert>
              )}

              {success && (
                <Alert 
                  severity="success"
                  icon={<CheckCircleIcon />}
                  sx={{ width: '100%', mb: 2 }}
                >
                  Report downloaded successfully!
                </Alert>
              )}

              <Typography 
                variant="body1" 
                sx={{ 
                  textAlign: 'center', 
                  color: 'text.secondary',
                  mb: 3
                }}
              >
                Generate a comprehensive PDF report containing student performance data, 
                grade distributions, and academic statistics.
              </Typography>

              <Box sx={{ position: 'relative' }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleDownloadReport}
                  disabled={loading}
                  startIcon={!loading && <DownloadIcon />}
                  sx={{
                    px: 6,
                    py: 1.5,
                    borderRadius: 50,
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    '&:disabled': {
                      backgroundColor: theme.palette.action.disabledBackground,
                      color: theme.palette.text.disabled
                    }
                  }}
                >
                  {loading ? (
                    <>
                      <CircularProgress size={24} sx={{ mr: 2 }} />
                      Generating Report...
                    </>
                  ) : (
                    'Download Full Report'
                  )}
                </Button>
              </Box>

              <Typography 
                variant="body2" 
                sx={{ 
                  textAlign: 'center', 
                  color: 'text.secondary',
                  mt: 2
                }}
              >
                Report includes:
                <br />
                - Student performance charts
                <br />
                - Grade distribution analysis
                <br />
                - Detailed academic statistics
              </Typography>
            </Stack>
          </CardContent>
        </Card>

        <Box sx={{ 
          mt: 4,
          textAlign: 'center',
          color: 'text.secondary',
          display: 'flex',
          justifyContent: 'center',
          gap: 2
        }}>
          <Typography variant="caption">
            PDF format | Secure download
          </Typography>
          <Typography variant="caption">
            Updated daily | Confidential
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}