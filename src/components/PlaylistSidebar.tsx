import { useState } from 'react';
import { Play, Pause, Music, Clock, MoreVertical } from 'lucide-react';
import { Button } from './ui/button';

interface Song {
  id: number;
  title: string;
  artist: string;
  duration: string;
  isPlaying: boolean;
  youtubeId?: string;
  description?: string;
}

interface PlaylistSidebarProps {
  currentSong: Song | null;
  onSongSelect: (song: Song) => void;
  isPlaying: boolean;
}

export default function PlaylistSidebar({ currentSong, onSongSelect, isPlaying }: PlaylistSidebarProps) {
  const [hoveredSong, setHoveredSong] = useState<number | null>(null);

  const songs: Song[] = [
    { id: 1, title: "Neon Dreams", artist: "Cyber Synthwave", duration: "3:42", isPlaying: false },
    { id: 2, title: "Digital Horizon", artist: "Neural Network", duration: "4:15", isPlaying: false },
    { id: 3, title: "Chrome Pulse", artist: "Data Stream", duration: "3:28", isPlaying: false },
    { id: 4, title: "Electric Mind", artist: "Code Matrix", duration: "4:03", isPlaying: false },
    { id: 5, title: "Neon City", artist: "Pixel Dreams", duration: "3:55", isPlaying: false },
    { id: 6, title: "Cyber Rain", artist: "Tech Noir", duration: "4:22", isPlaying: false },
    { id: 7, title: "Binary Soul", artist: "Ghost Protocol", duration: "3:38", isPlaying: false },
    { id: 8, title: "Virtual Reality", artist: "System Override", duration: "4:08", isPlaying: false },
    { id: 9, title: "Machine Heart", artist: "AI Collective", duration: "3:52", isPlaying: false },
    { id: 10, title: "Future Shock", artist: "Quantum Leap", duration: "4:16", isPlaying: false },
  ];

  const handleSongClick = (song: Song) => {
    onSongSelect(song);
  };

  return (
    <div className="h-full bg-[#FF8225] border-l-4 border-black relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px'
        }}></div>
      </div>
      
      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="p-6 border-b-4 border-black bg-black/10 rounded-b-lg mx-4 mt-4">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-4 h-4 bg-black rounded-full animate-pulse"></div>
            <h2 className="text-black font-mono tracking-wider">NEURAL PLAYLIST</h2>
          </div>
          
          <div className="flex items-center justify-between text-sm font-mono">
            <span className="text-black/70">{songs.length} tracks</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
              <span className="text-black">ACTIVE</span>
            </div>
          </div>
        </div>

        {/* Song list */}
        <div className="flex-1 overflow-y-auto p-4">
          {songs.map((song, index) => {
            const isCurrentSong = currentSong?.id === song.id;
            const isCurrentlyPlaying = isCurrentSong && isPlaying;
            
            return (
              <div
                key={song.id}
                className={`group relative p-4 mb-2 rounded-lg border-2 border-black cursor-pointer transition-all duration-200 hover:bg-black/10 ${
                  isCurrentSong ? 'bg-black/20 shadow-lg' : 'bg-black/5'
                }`}
                onMouseEnter={() => setHoveredSong(song.id)}
                onMouseLeave={() => setHoveredSong(null)}
                onClick={() => handleSongClick(song)}
              >
                {/* Song index/play button */}
                <div className="flex items-center space-x-4">
                  <div className="w-10 flex items-center justify-center">
                    {isCurrentlyPlaying ? (
                      <div className="flex space-x-1">
                        <div className="w-1 h-4 bg-black animate-pulse"></div>
                        <div className="w-1 h-3 bg-black animate-pulse delay-100"></div>
                        <div className="w-1 h-5 bg-black animate-pulse delay-200"></div>
                      </div>
                    ) : hoveredSong === song.id ? (
                      <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                        <Play className="w-4 h-4 text-[#FF8225] ml-0.5" />
                      </div>
                    ) : (
                      <div className={`w-8 h-8 rounded-full border-2 border-black flex items-center justify-center ${isCurrentSong ? 'bg-black text-[#FF8225]' : 'bg-transparent'}`}>
                        <span className={`text-sm font-mono ${isCurrentSong ? 'text-[#FF8225]' : 'text-black'}`}>
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Song info */}
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-mono truncate ${isCurrentSong ? 'text-black' : 'text-black'}`}>
                      {song.title}
                    </h4>
                    <p className="text-sm text-black/70 font-mono truncate">
                      {song.artist}
                    </p>
                  </div>

                  {/* Duration and menu */}
                  <div className="flex items-center space-x-3">
                    <span className="text-xs text-black/60 font-mono bg-black/10 px-2 py-1 rounded border border-black">
                      {song.duration}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-2 h-auto w-8 border-2 border-black rounded-lg text-black hover:bg-black/10"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Active indicator */}
                {isCurrentSong && (
                  <div className="absolute left-0 top-0 bottom-0 w-2 bg-black rounded-r-lg"></div>
                )}

                {/* Corner decorations for current song */}
                {isCurrentSong && (
                  <>
                    <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-black"></div>
                    <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-black"></div>
                    <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-black"></div>
                    <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-black"></div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer stats */}
        <div className="p-4 border-t-4 border-black bg-black/10 rounded-t-lg mx-4 mb-4">
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center space-x-2 text-black/70">
              <div className="w-6 h-6 bg-black/20 rounded-full flex items-center justify-center border-2 border-black">
                <Music className="w-3 h-3 text-black" />
              </div>
              <span>CYBERPUNK 2077</span>
            </div>
            <div className="flex items-center space-x-2 text-black/70">
              <div className="w-6 h-6 bg-black/20 rounded-full flex items-center justify-center border-2 border-black">
                <Clock className="w-3 h-3 text-black" />
              </div>
              <span>42:18 total</span>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="mt-3 bg-black/20 h-2 rounded-full border border-black overflow-hidden">
            <div className="h-full bg-black rounded-full w-1/3 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Side decoration */}
      <div className="absolute top-0 left-0 bottom-0 w-1 bg-black"></div>
      
      {/* Corner decorations */}
      <div className="absolute top-4 left-4 w-6 h-6 border-t-4 border-l-4 border-black"></div>
      <div className="absolute bottom-4 left-4 w-6 h-6 border-b-4 border-l-4 border-black"></div>
    </div>
  );
}