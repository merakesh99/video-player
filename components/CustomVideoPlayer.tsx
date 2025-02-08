'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Box, IconButton, Slider, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

interface CustomVideoPlayerProps {
  src: string;
}

const CustomVideoPlayer: React.FC<CustomVideoPlayerProps> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setProgress(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    if (!videoRef.current) return;
    const newTime = newValue as number;
    videoRef.current.currentTime = newTime;
    setProgress(newTime);
  };

  const handleFullScreenToggle = () => {
    if (!videoRef.current) return;
    if (!document.fullscreenElement) {
      videoRef.current.requestFullscreen().catch((err) => {
        console.error('Error attempting full screen:', err);
      });
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <Box>
      <Box sx={{ position: 'relative' }}>
        <video
          ref={videoRef}
          src={src}
          style={{ width: '100%', borderRadius: 8 }}
          controls={false} // hide default controls
        />
      </Box>
      {/* Custom Controls */}
      <Box
        sx={{
          mt: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          px: 1,
          py: 0.5,
          borderRadius: 1,
        }}
      >
        {/* Play/Pause */}
        <IconButton onClick={handlePlayPause} sx={{ color: 'white' }}>
          {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>
        {/* Progress Slider */}
        <Box sx={{ flexGrow: 1, mx: 2 }}>
          <Slider
            min={0}
            max={duration}
            value={progress}
            onChange={handleSliderChange}
            sx={{ color: 'white' }}
          />
        </Box>
        {/* Time Display */}
        <Typography sx={{ color: 'white', mr: 2 }} variant="body2">
          {formatTime(progress)} / {formatTime(duration)}
        </Typography>
        {/* Fullscreen Toggle */}
        <IconButton onClick={handleFullScreenToggle} sx={{ color: 'white' }}>
          {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
        </IconButton>
      </Box>
    </Box>
  );
};

export default CustomVideoPlayer;
