import { Container } from '@mui/material';
import VideoList, { Video } from '../components/VideoList';
import { searchVideos, mapVideoResources } from '../lib/cloudinary';

// Revalidate the page every 60 seconds
export const revalidate = 60;

export default async function Home() {
  // Fetch video data from Cloudinary using 'searchVideos' helper functions and pass type & folder as parameters
  const results = await searchVideos({ expression: 'resource_type:video AND folder:video-player'});
  const defaultVideos: Video[] = mapVideoResources(results.resources);

  return (
    <Container sx={{ py: 10 }}>
        <VideoList videos={defaultVideos} />
    </Container>
  );
}
