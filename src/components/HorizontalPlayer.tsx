import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Shuffle, Repeat, Heart, Share2 } from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';

interface Song {
  id: number;
  title: string;
  artist: string;
  duration: string;
  isPlaying: boolean;
}

interface HorizontalPlayerProps {
  currentSong: Song | null;
  isPlaying: boolean;
  onPlayPause: () => void;
}

export default function HorizontalPlayer({ currentSong, isPlaying, onPlayPause }: HorizontalPlayerProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(222); // 3:42 en segundos
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState('off');
  const [isLiked, setIsLiked] = useState(false);
  
  const progressInterval = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isPlaying) {
      progressInterval.current = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    }

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [isPlaying, duration]);

  const skipBack = () => {
    setCurrentTime(Math.max(0, currentTime - 10));
  };

  const skipForward = () => {
    setCurrentTime(Math.min(duration, currentTime + 10));
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleShuffle = () => {
    setIsShuffled(!isShuffled);
  };

  const toggleRepeat = () => {
    const modes = ['off', 'one', 'all'];
    const currentIndex = modes.indexOf(repeatMode);
    setRepeatMode(modes[(currentIndex + 1) % modes.length]);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleProgressChange = (value: number[]) => {
    setCurrentTime(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    setIsMuted(false);
  };

  if (!currentSong) {
    return (
      <div className="h-full bg-black border-l-2 border-[#FF8225] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#FF8225]/20 rounded-full flex items-center justify-center mb-4 mx-auto">
            <Play className="w-8 h-8 text-[#FF8225]" />
          </div>
          <p className="text-gray-400 font-mono">Select a track to begin</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-black border-l-2 border-[#FF8225] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-l from-[#FF8225]/20 via-[#FF8225]/5 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FF8225]/5 to-transparent"></div>
      
      <div className="relative z-10 h-full flex flex-col p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-[#FF8225] rounded-full animate-pulse"></div>
            <span className="text-[#FF8225] font-mono tracking-wider">NEURAL PLAYER</span>
            <div className="w-px h-4 bg-[#FF8225]/50"></div>
            <span className="text-gray-400 text-sm font-mono">PREMIUM</span>
          </div>
          <div className="text-[#FF8225] text-sm font-mono">v2.077</div>
        </div>

        {/* Main content area */}
        <div className="flex-1 flex flex-col justify-center">
          {/* Album artwork and info */}
          <div className="flex items-center space-x-8 mb-12">
            {/* Large album art */}
            <div className="relative flex-shrink-0">
              <div className="w-64 h-64 bg-gradient-to-br from-[#FF8225]/30 via-gray-900 to-black border-2 border-[#FF8225] rounded-xl flex items-center justify-center relative overflow-hidden">
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF8225]/20 to-transparent skew-x-12 translate-x-full animate-pulse"></div>
                <div className="text-[#FF8225] text-8xl opacity-60">♪</div>
                
                {/* Corner decorations */}
                <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#FF8225]"></div>
                <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#FF8225]"></div>
                <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#FF8225]"></div>
                <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#FF8225]"></div>
              </div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 bg-[#FF8225]/20 rounded-xl blur-xl -z-10"></div>
            </div>

            {/* Song info and actions */}
            <div className="flex-1">
              <div className="mb-6">
                <h1 className="text-4xl font-mono mb-2 text-[#FF8225]">{currentSong.title}</h1>
                <p className="text-xl text-gray-300 font-mono mb-4">{currentSong.artist}</p>
                <div className="flex items-center space-x-4 text-sm font-mono text-gray-400">
                  <span>Cyberpunk Collection</span>
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <span>2077</span>
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <span>{currentSong.duration}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center space-x-4 mb-8">
                <Button
                  onClick={toggleLike}
                  variant="ghost"
                  className={`p-3 rounded-full ${isLiked ? 'text-[#FF8225] bg-[#FF8225]/10' : 'text-gray-400 hover:text-[#FF8225]'}`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                </Button>
                
                <Button
                  variant="ghost"
                  className="p-3 rounded-full text-gray-400 hover:text-[#FF8225]"
                >
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>

              {/* Progress bar */}
              <div className="mb-6">
                <Slider
                  value={[currentTime]}
                  onValueChange={handleProgressChange}
                  max={duration}
                  step={1}
                  className="w-full mb-2"
                />
                <div className="flex justify-between text-sm text-gray-400 font-mono">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            {/* Left controls */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={toggleShuffle}
                className={`p-3 rounded-full ${isShuffled ? 'text-[#FF8225] bg-[#FF8225]/10' : 'text-gray-400 hover:text-[#FF8225]'}`}
              >
                <Shuffle className="w-5 h-5" />
              </Button>
              
              <Button
                variant="ghost"
                onClick={skipBack}
                className="p-3 rounded-full text-gray-400 hover:text-[#FF8225]"
              >
                <SkipBack className="w-6 h-6" />
              </Button>
            </div>

            {/* Center play button */}
            <Button
              onClick={onPlayPause}
              className="w-16 h-16 rounded-full bg-[#FF8225] hover:bg-[#FF8225]/80 text-black shadow-2xl shadow-[#FF8225]/50 transition-all duration-200 hover:scale-105"
            >
              {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
            </Button>

            {/* Right controls */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={skipForward}
                className="p-3 rounded-full text-gray-400 hover:text-[#FF8225]"
              >
                <SkipForward className="w-6 h-6" />
              </Button>
              
              <Button
                variant="ghost"
                onClick={toggleRepeat}
                className={`p-3 rounded-full relative ${repeatMode !== 'off' ? 'text-[#FF8225] bg-[#FF8225]/10' : 'text-gray-400 hover:text-[#FF8225]'}`}
              >
                <Repeat className="w-5 h-5" />
                {repeatMode === 'one' && (
                  <span className="absolute -top-1 -right-1 text-xs bg-[#FF8225] text-black rounded-full w-4 h-4 flex items-center justify-center">1</span>
                )}
              </Button>
            </div>
          </div>

          {/* Volume control */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <Button
              variant="ghost"
              onClick={toggleMute}
              className="p-2 rounded-full text-gray-400 hover:text-[#FF8225]"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </Button>
            
            <div className="w-32">
              <Slider
                value={[isMuted ? 0 : volume]}
                onValueChange={handleVolumeChange}
                max={100}
                step={1}
                className="w-full"
              />
            </div>
            
            <span className="text-sm text-gray-400 font-mono w-8 text-center">
              {isMuted ? 0 : volume}
            </span>
          </div>
        </div>

        {/* Status bar */}
        <div className="flex justify-center space-x-8 text-xs font-mono mt-8">
          <div className={`flex items-center space-x-2 ${isPlaying ? 'text-[#FF8225]' : 'text-gray-500'}`}>
            <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
            <span>STREAMING</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-500">
            <div className="w-2 h-2 bg-current rounded-full"></div>
            <span>320 KBPS</span>
          </div>
          <div className="flex items-center space-x-2 text-[#FF8225]">
            <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
            <span>NEURAL ENGINE</span>
          </div>
        </div>
      </div>

      {/* Animated border effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-16 h-1 bg-gradient-to-r from-[#FF8225] to-transparent animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-16 h-1 bg-gradient-to-l from-[#FF8225] to-transparent animate-pulse delay-1000"></div>
        <div className="absolute top-0 left-0 w-1 h-16 bg-gradient-to-b from-[#FF8225] to-transparent animate-pulse delay-500"></div>
        <div className="absolute bottom-0 right-0 w-1 h-16 bg-gradient-to-t from-[#FF8225] to-transparent animate-pulse delay-1500"></div>
      </div>
    </div>
  );
}