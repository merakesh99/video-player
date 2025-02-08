import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import Link from 'next/link';
import cloudinary from 'cloudinary';

export const runtime = 'nodejs'; // Ensure using the Node.js runtime

// Configure Cloudinary with your environment variables.
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log('Cloudinary configured:', cloudinary.v2.config());


// Define the page props interface.
interface PageProps {
  params: {
    id: string;
  };
}

export default async function VideoPage({ params }: {params: Promise<{ id: string }>}) {
  const { id } = await params;
  console.log('Video ID:', id);
  let videoDetails: any = null;

  const data = `video-player/${id}`; // Use the video public id from the URL path.
  // console.log('Video Data:', data);
  try {
    // Fetch video details from Cloudinary using the video public id.
    videoDetails = await cloudinary.v2.api.resource(data, { resource_type: 'video' });
  } catch (error) {
    console.error('Error fetching video details:', error);
  }

  if (!videoDetails) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h5" align="center" color="error">
          Video not found.
        </Typography>
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Link href="/" passHref>
            <Button variant="outlined">Go Back</Button>
          </Link>
        </Box>
      </Container>
    );
  }

  // Use the title from Cloudinary's context (if set) or fallback to the public id.
  const title = videoDetails.context?.custom?.title || videoDetails.public_id;
  const videoUrl = videoDetails.secure_url;

  return (
    <Container sx={{ py: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        align="center"
        sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}
      >
        {title}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'left', mb: 3 }}>
        <Box
          sx={{
            width: '100%',
            maxWidth: 800,
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: 3,
          }}
        >
          <video
            src={videoUrl}
            controls
            autoPlay
            controlsList="nodownload"
            style={{
              width: '100%',
              borderRadius: 2,
            }}
          />
        </Box>
      </Box>
      <Typography variant="h5" align="left" sx={{ color: '#fff' }}>
        {title}
      </Typography>
      {/* <Box sx={{ textAlign: 'center' }}>
        <Link href="/" passHref>
          <Button variant="outlined">Go Back</Button>
        </Link>
      </Box> */}
    </Container>
  );
}
