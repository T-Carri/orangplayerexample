import { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Shuffle, Repeat, Heart, Share2, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';

interface Song {
  id: number;
  title: string;
  artist: string;
  duration: string;
  isPlaying: boolean;
  youtubeId?: string;
  description?: string;
}

interface YouTubePlayerProps {
  currentSong: Song | null;
  isPlaying: boolean;
  onPlayPause: () => void;
}

export default function YouTubePlayer({ currentSong, isPlaying, onPlayPause }: YouTubePlayerProps) {
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState('off');
  const [isLiked, setIsLiked] = useState(false);

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

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    setIsMuted(false);
  };

  // URLs de YouTube de ejemplo para las canciones
  const getYouTubeUrl = (song: Song) => {
    const defaultVideos: { [key: number]: string } = {
      1: "dQw4w9WgXcQ", // Neon Dreams - Rick Roll como ejemplo
      2: "jfKfPfyJRdk", // Digital Horizon
      3: "9bZkp7q19f0", // Chrome Pulse
      4: "kXYiU_JCYtU", // Electric Mind
      5: "M7lc1UVf-VE", // Neon City
      6: "ScNNfyq3d_w", // Cyber Rain
      7: "K4DyBUG242c", // Binary Soul
      8: "qeMFqkcPYcg", // Virtual Reality
      9: "ZZ5LpwO-An4", // Machine Heart
      10: "pAgnJDJN4VA" // Future Shock
    };
    
    return song.youtubeId || defaultVideos[song.id] || "dQw4w9WgXcQ";
  };

  const getDescription = (song: Song) => {
    const descriptions: { [key: number]: string } = {
      1: "Una experiencia sonora cyberpunk que te transporta a las calles neón de una ciudad futurista. Melodías sintéticas envueltas en atmósferas etéreas.",
      2: "Horizontes digitales se extienden infinitamente en esta composición que fusiona elementos electrónicos con paisajes sonoros inmersivos.",
      3: "Pulsos de cromo resuenan a través de circuitos neuronales creando una sinfonía de luz y sonido en perfecta armonía tecnológica.",
      4: "La mente eléctrica cobra vida a través de ondas sintéticas que exploran los límites entre lo humano y lo artificial.",
      5: "Un viaje nocturno por las calles iluminadas de una metrópolis cyberpunk, donde cada beat es un latido de la ciudad que nunca duerme.",
      6: "Lluvia cibernética cae sobre superficies holográficas mientras melodías ambient crean una atmósfera contemplativa y futurista.",
      7: "El alma binaria se expresa a través de secuencias algorítmicas que trascienden la barrera entre código y emoción humana.",
      8: "Realidad virtual convertida en experiencia auditiva, donde cada nota construye mundos digitales infinitos de posibilidades.",
      9: "El corazón de la máquina late con ritmos electrónicos que evocan la fusión perfecta entre tecnología y sentimiento.",
      10: "Shock del futuro materializado en ondas sonoras que predicen mundos por venir en esta odyssea cyberpunk definitiva."
    };
    
    return song.description || descriptions[song.id] || "Una experiencia musical cyberpunk única que fusiona elementos futuristas con melodías envolventes.";
  };

  if (!currentSong) {
    return (
      <div className="h-full bg-[#FF8225] border-r-4 border-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-black/20 rounded-full flex items-center justify-center mb-6 mx-auto border-2 border-black">
            <Play className="w-10 h-10 text-black" />
          </div>
          <p className="text-black font-mono text-lg">Selecciona una pista para comenzar</p>
        </div>
      </div>
    );
  }

  const youtubeId = getYouTubeUrl(currentSong);
  const description = getDescription(currentSong);

  return (
    <div className="h-full bg-[#FF8225] border-r-4 border-black relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      <div className="relative z-10 h-full flex flex-col p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 bg-black/10 rounded-lg p-4 border-2 border-black">
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-black rounded-full animate-pulse"></div>
            <span className="text-black font-mono tracking-wider">YOUTUBE PLAYER</span>
            <div className="w-px h-5 bg-black/50"></div>
            <span className="text-black/80 text-sm font-mono">NEURAL</span>
          </div>
          <div className="text-black text-sm font-mono">v2.077</div>
        </div>

        {/* YouTube iframe */}
        <div className="flex-1 mb-6">
          <div className="w-full h-full bg-black rounded-lg border-4 border-black overflow-hidden relative">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=${isPlaying ? 1 : 0}&mute=${isMuted ? 1 : 0}`}
              title={currentSong.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
            
            {/* Overlay controls */}
            <div className="absolute bottom-4 left-4 right-4 bg-[#FF8225]/90 rounded-lg p-3 border-2 border-black backdrop-blur-sm">
              <div className="flex items-center justify-between">
                {/* Left controls */}
                <div className="flex items-center space-x-3">
                  <Button
                    onClick={onPlayPause}
                    className="w-12 h-12 rounded-full bg-black hover:bg-black/80 text-[#FF8225] border-2 border-black shadow-lg"
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    onClick={toggleShuffle}
                    className={`p-2 rounded-lg border-2 border-black ${isShuffled ? 'text-black bg-black/20' : 'text-black hover:bg-black/10'}`}
                  >
                    <Shuffle className="w-5 h-5" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    onClick={toggleRepeat}
                    className={`p-2 rounded-lg border-2 border-black relative ${repeatMode !== 'off' ? 'text-black bg-black/20' : 'text-black hover:bg-black/10'}`}
                  >
                    <Repeat className="w-5 h-5" />
                    {repeatMode === 'one' && (
                      <span className="absolute -top-1 -right-1 text-xs bg-black text-[#FF8225] rounded-full w-4 h-4 flex items-center justify-center">1</span>
                    )}
                  </Button>
                </div>

                {/* Right controls */}
                <div className="flex items-center space-x-3">
                  <Button
                    onClick={toggleLike}
                    variant="ghost"
                    className={`p-2 rounded-lg border-2 border-black ${isLiked ? 'text-black bg-black/20' : 'text-black hover:bg-black/10'}`}
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    className="p-2 rounded-lg border-2 border-black text-black hover:bg-black/10"
                  >
                    <Share2 className="w-5 h-5" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    className="p-2 rounded-lg border-2 border-black text-black hover:bg-black/10"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Song information */}
        <div className="bg-black/10 rounded-lg p-6 border-2 border-black">
          {/* Song title and artist */}
          <div className="mb-4">
            <h1 className="text-3xl font-mono mb-2 text-black">{currentSong.title}</h1>
            <div className="flex items-center space-x-4 mb-3">
              <p className="text-xl text-black/80 font-mono">{currentSong.artist}</p>
              <div className="w-2 h-2 bg-black/60 rounded-full"></div>
              <span className="text-black/60 font-mono">{currentSong.duration}</span>
            </div>
            
            {/* Channel info */}
            <div className="flex items-center space-x-2 text-sm font-mono text-black/70 mb-4">
              <div className="w-6 h-6 bg-black/20 rounded-full flex items-center justify-center border border-black">
                <span className="text-xs">YT</span>
              </div>
              <span>Cyberpunk Music Channel</span>
              <div className="w-1 h-1 bg-black/50 rounded-full"></div>
              <span>2.1M suscriptores</span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-4">
            <h3 className="text-lg font-mono mb-2 text-black">Descripción</h3>
            <p className="text-black/80 font-mono text-sm leading-relaxed">
              {description}
            </p>
          </div>

          {/* Volume control */}
          <div className="flex items-center space-x-4 pt-4 border-t-2 border-black/20">
            <Button
              variant="ghost"
              onClick={toggleMute}
              className="p-2 rounded-lg border-2 border-black text-black hover:bg-black/10"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </Button>
            
            <div className="flex-1">
              <Slider
                value={[isMuted ? 0 : volume]}
                onValueChange={handleVolumeChange}
                max={100}
                step={1}
                className="w-full"
              />
            </div>
            
            <span className="text-black font-mono w-12 text-center">
              {isMuted ? 0 : volume}%
            </span>
          </div>

          {/* Status indicators */}
          <div className="flex justify-center space-x-6 text-xs font-mono mt-4 pt-4 border-t-2 border-black/20">
            <div className={`flex items-center space-x-2 ${isPlaying ? 'text-black' : 'text-black/60'}`}>
              <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
              <span>LIVE STREAM</span>
            </div>
            <div className="flex items-center space-x-2 text-black/60">
              <div className="w-2 h-2 bg-current rounded-full"></div>
              <span>1080p HD</span>
            </div>
            <div className="flex items-center space-x-2 text-black">
              <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
              <span>NEURAL ENGINE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-black"></div>
      <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-black"></div>
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-black"></div>
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-black"></div>
    </div>
  );
}