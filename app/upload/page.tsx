'use client';
import React, { useState } from 'react';
import { Container, Typography, Box, Alert } from '@mui/material';
import Upload from '../../components/Upload';
import VideoList, { Video } from '../../components/VideoList';

export default function Home() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // Updated handleUpload function:
  // It sends the file to our /api/upload endpoint, then resets the upload state after completion.
  const handleUpload = async (file: File, title: string) => {
    setUploadError(null);
    setUploadSuccess(null);
    setIsUploading(true);

    // Validate that the file is a video.
    if (!file.type.startsWith('video/')) {
      setUploadError('Invalid file type. Please upload a video file.');
      setIsUploading(false);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      const data = await response.json();
      // Create a new video object.
      const newVideo: Video = {
        id: videos.length.toString(), // Using string type for id
        title,
        url: data.url,
        width: 100, // Adjust width/height as needed
        height: 100,
        public_id: data.public_id,
        filename: data.original_filename,
      };
      setVideos((prevVideos) => [...prevVideos, newVideo]);
      setUploadSuccess('Video uploaded successfully!');
    } catch (error: any) {
      console.error('Error uploading video:', error);
      setUploadError(error.message || 'Error uploading video. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{
          textAlign: 'center',
          fontWeight: 'bold',
          mt: 6,
          color: '#666',
        }}
      >
        Video Upload
      </Typography>

      {uploadSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {uploadSuccess}
        </Alert>
      )}
      {uploadError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {uploadError}
        </Alert>
      )}

      
      <Upload onUpload={handleUpload} isUploading={isUploading} />

      <Box sx={{ mt: 4 }}>
        <VideoList videos={videos} />
      </Box>
    </Container>
  );
}
