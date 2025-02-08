import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        {/* Application Title */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Button color="inherit" component={Link} href="/">
            Video Player
          </Button>
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" component={Link} href="/upload"
            sx={{
              py: 1.5,
              fontWeight: 'bold',
              backgroundColor: '#115293',
              '&:hover': { backgroundColor: '#1976d2' },
              '&.Mui-disabled': {
                backgroundColor: '#1976d2',
                color: 'white',
              }
            }
            }
          >
            Upload Video
          </Button>
        </Box>
      </Toolbar>
    </AppBar >
  );
};

export default Navbar;
