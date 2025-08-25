import { useState } from 'react';
import PlaylistSidebar from './components/PlaylistSidebar';
import YouTubePlayer from './components/YouTubePlayer';

interface Song {
  id: number;
  title: string;
  artist: string;
  duration: string;
  isPlaying: boolean;
  youtubeId?: string;
  description?: string;
}

export default function App() {
  const [currentSong, setCurrentSong] = useState<Song | null>({
    id: 1,
    title: "Neon Dreams",
    artist: "Cyber Synthwave",
    duration: "3:42",
    isPlaying: false
  });
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSongSelect = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="h-screen bg-[#FF8225] overflow-hidden relative">
      {/* Enhanced background effects with #FF8225 base and black accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main grid pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(0, 0, 0, 0.3) 2px, transparent 2px),
              linear-gradient(90deg, rgba(0, 0, 0, 0.3) 2px, transparent 2px)
            `,
            backgroundSize: '80px 80px'
          }}></div>
        </div>
        
        {/* Secondary fine grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(0, 0, 0, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 0, 0, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        
        {/* Floating particles - black instead of orange */}
        <div className="absolute top-1/5 left-1/5 w-4 h-4 bg-black/30 rounded-full animate-pulse"></div>
        <div className="absolute top-2/3 right-1/5 w-3 h-3 bg-black/40 rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-1/4 left-2/5 w-5 h-5 bg-black/20 rounded-full animate-pulse delay-300"></div>
        <div className="absolute top-1/2 right-1/2 w-3 h-3 bg-black/35 rounded-full animate-pulse delay-1200"></div>
        <div className="absolute bottom-1/5 right-1/4 w-4 h-4 bg-black/25 rounded-full animate-pulse delay-900"></div>
        <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-black/40 rounded-full animate-pulse delay-1500"></div>
        <div className="absolute bottom-2/3 left-3/4 w-3 h-3 bg-black/30 rounded-full animate-pulse delay-2000"></div>
        
        {/* Scanning lines with black theme */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-black/40 to-transparent animate-pulse"></div>
        <div className="absolute top-1/3 left-0 w-full h-0.5 bg-gradient-to-r from-black/30 via-transparent to-black/30 animate-pulse delay-2000"></div>
        <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-transparent via-black/40 to-transparent animate-pulse delay-1000"></div>
        
        {/* Vertical scanning lines */}
        <div className="absolute top-0 left-1/4 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-black/30 to-transparent animate-pulse delay-1500"></div>
        <div className="absolute top-0 right-1/3 bottom-0 w-1 bg-gradient-to-b from-black/20 via-transparent to-black/20 animate-pulse delay-2500"></div>
        
        {/* Corner effects with black borders */}
        <div className="absolute top-0 left-0 w-40 h-40 border-t-4 border-l-4 border-black/50"></div>
        <div className="absolute top-0 right-0 w-40 h-40 border-t-4 border-r-4 border-black/50"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 border-b-4 border-l-4 border-black/50"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 border-b-4 border-r-4 border-black/50"></div>
        
        {/* Additional black accent lines */}
        <div className="absolute top-1/2 left-0 w-2 h-40 bg-gradient-to-b from-transparent via-black/40 to-transparent animate-pulse"></div>
        <div className="absolute top-1/2 right-0 w-2 h-40 bg-gradient-to-b from-transparent via-black/40 to-transparent animate-pulse delay-1000"></div>
        <div className="absolute top-0 left-1/2 w-40 h-2 bg-gradient-to-r from-transparent via-black/40 to-transparent animate-pulse delay-500"></div>
        <div className="absolute bottom-0 left-1/2 w-40 h-2 bg-gradient-to-r from-transparent via-black/40 to-transparent animate-pulse delay-1500"></div>
        
        {/* Diagonal accent lines */}
        <div className="absolute top-1/4 left-1/4 w-32 h-0.5 bg-black/30 rotate-45 animate-pulse delay-3000"></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 h-0.5 bg-black/30 rotate-45 animate-pulse delay-3500"></div>
      </div>

      {/* Main layout - INVERTIDO: Player izquierda, Playlist derecha */}
      <div className="relative z-10 h-full flex">
        {/* Left side - YouTube Player (ocupa más espacio) */}
        <div className="flex-1 min-w-0">
          <YouTubePlayer 
            currentSong={currentSong}
            isPlaying={isPlaying}
            onPlayPause={handlePlayPause}
          />
        </div>

        {/* Right sidebar - Playlist */}
        <div className="w-1/3 min-w-96 max-w-md">
          <PlaylistSidebar 
            currentSong={currentSong}
            onSongSelect={handleSongSelect}
            isPlaying={isPlaying}
          />
        </div>
      </div>

      {/* Global status indicator */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20">
        <div className="bg-black/20 border-4 border-black rounded-xl px-8 py-3 backdrop-blur-sm">
          <div className="flex items-center space-x-4">
            <div className="w-3 h-3 bg-black rounded-full animate-pulse"></div>
            <span className="text-black font-mono tracking-wider text-lg">CYBERPUNK NEURAL YOUTUBE PLAYER</span>
            <div className="w-3 h-3 bg-black rounded-full animate-pulse delay-500"></div>
          </div>
        </div>
      </div>

      {/* Bottom status bar */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-black/50 to-transparent z-20"></div>
      
      {/* Side status bars */}
      <div className="absolute top-0 left-0 bottom-0 w-2 bg-gradient-to-b from-transparent via-black/30 to-transparent z-20"></div>
      <div className="absolute top-0 right-0 bottom-0 w-2 bg-gradient-to-b from-transparent via-black/30 to-transparent z-20"></div>

      {/* Corner accent elements */}
      <div className="absolute top-8 left-8 w-12 h-12 border-4 border-black rounded-tl-2xl z-20"></div>
      <div className="absolute top-8 right-8 w-12 h-12 border-4 border-black rounded-tr-2xl z-20"></div>
      <div className="absolute bottom-8 left-8 w-12 h-12 border-4 border-black rounded-bl-2xl z-20"></div>
      <div className="absolute bottom-8 right-8 w-12 h-12 border-4 border-black rounded-br-2xl z-20"></div>
    </div>
  );
}