import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Shuffle, Repeat } from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';

export default function CyberpunkPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(100);
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState('off'); // 'off', 'one', 'all'
  
  const progressInterval = useRef<NodeJS.Timeout>();

  // Simular progreso de la canción
  useEffect(() => {
    if (isPlaying) {
      progressInterval.current = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
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

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

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

  return (
    <div className="relative w-full max-w-md mx-auto bg-black border-2 border-[#FF8225] rounded-lg overflow-hidden">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FF8225]/20 to-transparent blur-xl"></div>
      
      <div className="relative z-10 p-6">
        {/* Header con efectos cyberpunk */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-[#FF8225] rounded-full animate-pulse"></div>
            <span className="text-[#FF8225] text-sm font-mono">NEURAL PLAYER</span>
          </div>
          <div className="text-white text-xs font-mono">v2.077</div>
        </div>

        {/* Album artwork con efecto holográfico */}
        <div className="relative mb-6">
          <div className="w-full h-48 bg-gradient-to-br from-gray-900 to-black border border-[#FF8225]/50 rounded-lg flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF8225]/10 to-transparent skew-x-12 translate-x-full animate-pulse"></div>
            <div className="text-[#FF8225] text-6xl opacity-50">♪</div>
          </div>
          
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#FF8225]"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#FF8225]"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#FF8225]"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#FF8225]"></div>
        </div>

        {/* Song info */}
        <div className="text-center mb-6">
          <h3 className="text-white text-lg font-mono mb-1">Neon Dreams</h3>
          <p className="text-gray-400 text-sm font-mono">Cyber Synthwave</p>
        </div>

        {/* Progress bar */}
        <div className="mb-4">
          <Slider
            value={[currentTime]}
            onValueChange={handleProgressChange}
            max={duration}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1 font-mono">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Main controls */}
        <div className="flex items-center justify-center space-x-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleShuffle}
            className={`text-white hover:text-[#FF8225] hover:bg-[#FF8225]/10 ${
              isShuffled ? 'text-[#FF8225]' : ''
            }`}
          >
            <Shuffle className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={skipBack}
            className="text-white hover:text-[#FF8225] hover:bg-[#FF8225]/10"
          >
            <SkipBack className="w-5 h-5" />
          </Button>

          <Button
            onClick={togglePlay}
            className="w-12 h-12 rounded-full bg-[#FF8225] hover:bg-[#FF8225]/80 text-black shadow-lg shadow-[#FF8225]/25"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={skipForward}
            className="text-white hover:text-[#FF8225] hover:bg-[#FF8225]/10"
          >
            <SkipForward className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={toggleRepeat}
            className={`text-white hover:text-[#FF8225] hover:bg-[#FF8225]/10 ${
              repeatMode !== 'off' ? 'text-[#FF8225]' : ''
            }`}
          >
            <Repeat className="w-4 h-4" />
            {repeatMode === 'one' && (
              <span className="absolute -top-1 -right-1 text-xs">1</span>
            )}
          </Button>
        </div>

        {/* Volume control */}
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMute}
            className="text-white hover:text-[#FF8225] hover:bg-[#FF8225]/10 flex-shrink-0"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </Button>
          
          <Slider
            value={[isMuted ? 0 : volume]}
            onValueChange={handleVolumeChange}
            max={100}
            step={1}
            className="flex-1"
          />
          
          <span className="text-xs text-gray-400 font-mono w-8 text-right">
            {isMuted ? 0 : volume}
          </span>
        </div>

        {/* Status indicators */}
        <div className="flex justify-center space-x-4 mt-4 text-xs font-mono">
          <div className={`flex items-center space-x-1 ${isPlaying ? 'text-[#FF8225]' : 'text-gray-500'}`}>
            <div className="w-1 h-1 bg-current rounded-full"></div>
            <span>STREAM</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-500">
            <div className="w-1 h-1 bg-current rounded-full"></div>
            <span>320kbps</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-500">
            <div className="w-1 h-1 bg-current rounded-full"></div>
            <span>NEURAL</span>
          </div>
        </div>
      </div>

      {/* Animated border */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-8 h-0.5 bg-gradient-to-r from-[#FF8225] to-transparent animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-8 h-0.5 bg-gradient-to-l from-[#FF8225] to-transparent animate-pulse"></div>
        <div className="absolute top-0 left-0 w-0.5 h-8 bg-gradient-to-b from-[#FF8225] to-transparent animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-0.5 h-8 bg-gradient-to-t from-[#FF8225] to-transparent animate-pulse"></div>
      </div>
    </div>
  );
}