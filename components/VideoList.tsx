'use client';
import React, { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TableHead,
} from '@mui/material';
import Link from 'next/link';

export interface Video {
  id: string;
  title: string;
  url: string;
  width: number;
  height: number;
  public_id: string;
  filename: string;
}

interface VideoListProps {
  videos: Video[];
}

/*  
    TASK_04.	Render all the uploaded file in table list & grid format
              there should be a button in the ui to toggle between table 
              view and grid view.

*/

const VideoList: React.FC<VideoListProps> = ({ videos }) => {
  const [view, setView] = useState<'grid' | 'table'>('grid');
  return (
    <Box>
      <Button
        variant="contained"
        onClick={() => setView(view === 'grid' ? 'table' : 'grid')}
        sx={{ mb: 2 }}
      >
        Toggle {view === 'grid' ? 'List View' : 'Grid View'}
      </Button>
      {view === 'grid' ? (
        // Responsive flexbox layout using breakpoints in the sx prop
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          {videos.map((video) => (
            <Box
              key={video.id}
              sx={{
                flex: {
                  xs: '1 1 100%',    // Full width on extra-small screens
                  sm: '1 1 calc(50% - 16px)', // About half on small screens
                  md: '1 1 calc(33.333% - 16px)', // About one-third on medium screens and up
                },
                maxWidth: {
                  xs: '100%',
                  sm: 'calc(50% - 16px)',
                  md: 'calc(33.333% - 16px)',
                },
              }}
            >
              <Card
                sx={{
                  borderRadius: 2,
                  cursor: 'pointer',
                  textDecoration: 'none',
                  backgroundColor: '#0a0a0a',
                  color: () => '#ededed',
                }}
              >
                <Link href={`/video/${video.filename}`} passHref>
                  <CardMedia
                    component="video"
                    src={video.url}
                    sx={{ height: 200, width: '100%', borderRadius: 2 }}
                  />
                </Link>
                <CardContent
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    padding: 2,
                  }}
                >
                  {/* First Column: Avatar */}
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: '50%',
                      backgroundColor: '#1a1a1a',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ededed',
                      fontWeight: 'bold',
                    }}
                  >
                    RS
                  </Box>

                  {/* Second Column: Texts */}
                  <Box
                    sx={{
                      flex: 1,
                      marginLeft: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1,
                    }}
                  >
                    <Link href={`/video/${video.filename}`} passHref>
                      {/* Title */}
                      <Typography
                        variant="h6"
                        noWrap
                        sx={{
                          textDecoration: 'none',
                          overflow: 'hidden',
                          // backgroundColor: '#1a1a1a',
                        }}
                      >
                        {video.title}
                      </Typography>
                    </Link>

                    {/* Name */}
                    <Typography
                      variant="body2"
                      sx={{ textDecoration: 'none', color: '#aaa' }}
                    >
                      <strong>Rakesh Sadhukhan</strong>
                    </Typography>

                    {/* Views */}
                    <Typography
                      variant="body2"
                      sx={{ textDecoration: 'none', color: '#aaa' }}
                    >
                      200 views • 1 days ago
                    </Typography>
                  </Box>

                  {/* Third Column: Three Dots */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'flex-end',
                      cursor: 'pointer',
                      marginLeft: 2,
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="span"
                      sx={{ fontWeight: 'bold', color: '#ededed' }}
                    >
                      ⋮
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      ) : (
        // Table view remains as-is
        <TableContainer component={Paper} sx={{ mt: 2, backgroundColor: '#0a0a0a' }}>
        <Table>
          <TableHead>
            <TableRow>
              {/* Optionally add headers if needed */}
            </TableRow>
          </TableHead>
          <TableBody>
            {videos.map((video) => (
              <TableRow
                key={video.id}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottom: '1px solid #333',
                }}
              >
                {/* Video Thumbnail */}
                <TableCell sx={{ borderBottom: 'none', p: 1, width: '25%' }}>
                  <Link href={`/video/${video.filename}`} passHref>
                    <Box
                      component="video"
                      src={video.url}
                      controls={false} // hides default controls for thumbnail display
                      sx={{
                        width: '100%',
                        borderRadius: 4,
                        cursor: 'pointer',
                      }}
                    />
                  </Link>
                </TableCell>
      
                {/* Video Details */}
                <TableCell
                  sx={{
                    borderBottom: 'none',
                    p: 2,
                    color: '#fff',
                    width: '50%',
                  }}
                >
                  <Link href={`/video/${video.filename}`} passHref>
                    <Typography
                      variant="h6"
                      noWrap
                      sx={{
                        color: '#ededed',
                        fontWeight: 'bold',
                        textDecoration: 'none',
                        mb: 1,
                      }}
                    >
                      {video.title}
                    </Typography>
                  </Link>
                  <Typography variant="caption" sx={{ color: '#aaa', display: 'block' }}>
                    200 views • 1 days ago
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      mt: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: 30,
                        height: 30,
                        borderRadius: '50%',
                        backgroundColor: '#1a1a1a',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ededed',
                        fontWeight: 'bold',
                      }}
                    >
                      RS
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#aaa',
                        fontWeight: 'bold',
                      }}
                    >
                      Rakesh Sadhukhan
                    </Typography>
                  </Box>
                </TableCell>
      
                {/* Options: Three Dots */}
                <TableCell align="right" sx={{ borderBottom: 'none', p: 2, width: '25%' }}>
                  <Link href={`/video/${video.filename}`} passHref>
                    <Typography
                      variant="h6"
                      component="span"
                      sx={{ fontWeight: 'bold', color: '#ededed', cursor: 'pointer' }}
                    >
                      ⋮
                    </Typography>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      

      )}
    </Box>
  );
};

export default VideoList;
