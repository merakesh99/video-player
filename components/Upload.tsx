import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';

interface UploadProps {
  onUpload: (file: File, title: string) => void;
  isUploading?: boolean;
}

const Upload: React.FC<UploadProps> = ({ onUpload, isUploading = false }) => {
  const [file, setFile] = useState<File | null>(null);
  const [videoName, setVideoName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const { getRootProps, getInputProps } = useDropzone({
    // TASK_03: Add file type validation for video files only. ( Here we are using 'video/*' to accept all video file types. )
    accept: { 'video/*': [] },
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const selectedFile = acceptedFiles[0];
        setFile(selectedFile);
        setVideoName(selectedFile.name);
        setError(null);
      }
    },
    onDropRejected: () => {
      setError('Invalid file type. Please upload a video file.');
    },
  });

  // Handle the submission and clear the state afterward.
  const handleSubmit = async () => {
    if (file && videoName) {
      await onUpload(file, videoName);
      setFile(null);
      setVideoName('');
    }
  };

  return (
    <>
    <Box
      sx={{
        p: 4,
        border: '2px dashed #1976d2',
        borderRadius: 2,
        textAlign: 'center',
        backgroundColor: '#fff',
      }}
    >
      {!file ? (
        <Box {...getRootProps()} sx={{ cursor: 'pointer', py: 4 }}>
          <input {...getInputProps()} />
          <Typography variant="body1" sx={{ color: '#666' }}>
          {/* TASK_02: User can drag & drop files */}
            Drag & drop a video file here, or click to select one. 
          </Typography>
        </Box>
      ) : (
        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Left Column: Dummy Video Thumbnail */}
          <Box
            sx={{
              width: 120,
              height: 80,
              backgroundColor: '#ccc',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#666',
              fontSize: '0.8rem',
              flexShrink: 0,
            }}
          >
            Video Thumbnail
          </Box>

          {/* TASK_01  User can edit video name also */}
          {/* Middle Column: Video Title Input */}
          <Box sx={{ flexGrow: 1 }}>
            <TextField
              label="Video Title"
              variant="outlined"
              value={videoName}
              onChange={(e) => setVideoName(e.target.value)}
              fullWidth
              disabled={isUploading}
              sx={{
                mb: 2,
                input: { color: '#000' },
                '& .MuiInputLabel-root': { color: '#99977', fontWeight: 'bold' },
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#fff',
                  '& fieldset': { borderColor: '#1976d2' },
                  '&.Mui-focused fieldset': { borderColor: '#115293' },
                  '&.Mui-disabled fieldset': { borderColor: '#1976d2' },
                },
              }}
            />
          </Box>

          {/* Right Column: Upload Button */}
          <Box sx={{ minWidth: 120 }}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleSubmit}
              disabled={isUploading || !file || !videoName}
              sx={{
                py: 1.5,
                fontWeight: 'bold',
                backgroundColor: '#1976d2',
                '&:hover': { backgroundColor: '#115293' },
                '&.Mui-disabled': {
                  backgroundColor: '#1976d2',
                  color: 'white',
                },
              }}
            >
              {isUploading ? (
                <CircularProgress
                  size={24}
                  thickness={4}
                  sx={{
                    color: '#fff',
                    '& .MuiCircularProgress-circle': {
                      strokeLinecap: 'round',
                    },
                  }}
                />
              ) : (
                'Upload'
              )}
            </Button>
          </Box>
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Box>

    <Box sx={{ mt: 2 }}>
      <Button
      variant="outlined"
      onClick={() => window.location.href = '/'}
      sx={{
        py: 1.5,
        fontWeight: 'bold',
        backgroundColor: '#1976d2',
        color: '#fff',
        '&:hover': { backgroundColor: '#115293' },
        '&.Mui-disabled': {
          backgroundColor: '#1976d2',
          color: 'white',
        },
      }}
      >
      Back to Home
      </Button>
    </Box>
    </>
  );
};

export default Upload;
