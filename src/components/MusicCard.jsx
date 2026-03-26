import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, MessageCircleHeart, Disc3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MusicCard({ song, isPlaying, onPlayPause }) {
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(() => {});
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const currentSeconds = duration * (progress / 100);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="glass-card group relative overflow-hidden flex flex-col pt-0 transition-transform duration-500 ease-out z-10"
    >
      {/* Background glow based on play state */}
      <div className={`absolute inset-0 bg-gradient-to-br from-teal-500/10 to-indigo-500/10 transition-opacity duration-1000 ${isPlaying ? 'opacity-100' : 'opacity-0'}`} />
      
      <audio 
        ref={audioRef} 
        src={song.audio} 
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => onPlayPause(false)}
      />

      {/* Hero Image Section */}
      <div className="relative w-full h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent z-10" />
        <img 
          src={song.image} 
          alt={song.title} 
          className={`w-full h-full object-cover transition-transform duration-[20s] ${isPlaying ? 'scale-125' : 'scale-100'}`}
        />
        
        {isPlaying && (
          <div className="absolute top-4 right-4 z-20">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Disc3 className="w-8 h-8 text-teal-400 drop-shadow-[0_0_15px_rgba(20,184,166,1)]" />
            </motion.div>
          </div>
        )}
      </div>

      {/* Content & Player */}
      <div className="flex-1 flex flex-col p-6 pt-0 z-20 relative">
        <div className="flex justify-between items-end mb-6 -mt-8">
          <div className="backdrop-blur-md bg-slate-900/40 p-3 rounded-2xl border border-white/5 shadow-2xl">
            <h3 className="text-xl font-bold tracking-tight text-white mb-1 group-hover:text-teal-300 transition-colors drop-shadow-md line-clamp-1">
              {song.title}
            </h3>
            <p className="text-teal-200/70 font-medium tracking-widest text-xs uppercase line-clamp-1">
              {song.artist}
            </p>
          </div>
          
          <button 
            onClick={() => onPlayPause(!isPlaying)}
            className="w-16 h-16 shrink-0 rounded-full bg-gradient-to-br from-teal-400 to-indigo-500 flex items-center justify-center text-white transition-all duration-300 shadow-[0_0_20px_rgba(20,184,166,0.5)] hover:shadow-[0_0_30px_rgba(20,184,166,0.8)] hover:scale-110 active:scale-95 border border-teal-300/50"
          >
            {isPlaying ? <Pause className="w-7 h-7 fill-current" /> : <Play className="w-7 h-7 fill-current ml-1.5" />}
          </button>
        </div>

        {/* Custom audio visualizer / progress bar */}
        <div className="mb-4">
          <div className="h-1.5 w-full bg-slate-800/80 rounded-full overflow-hidden backdrop-blur-md shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-teal-400 via-indigo-400 to-teal-300 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.8)] animate-shimmer transition-all duration-100 ease-linear"
              style={{ width: `${progress}%`, backgroundSize: '200% auto' }}
            />
          </div>
          <div className="flex justify-between text-[11px] font-mono tracking-wider text-slate-500 mt-2">
            <span className={isPlaying ? 'text-teal-400 drop-shadow-[0_0_8px_rgba(20,184,166,0.6)] font-bold' : ''}>{formatTime(currentSeconds)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Message Toggle Bar */}
        <div className="mt-auto border-t border-slate-700/50 pt-4 cursor-pointer" onClick={() => setShowMessage(!showMessage)}>
          <div className="flex items-center gap-2 text-slate-400 hover:text-indigo-300 transition-colors group/msg">
             <MessageCircleHeart className={`w-5 h-5 transition-transform ${showMessage ? 'scale-110 text-teal-400 drop-shadow-[0_0_8px_rgba(20,184,166,0.8)]' : 'group-hover/msg:scale-110'}`} />
             <span className="text-sm font-semibold tracking-wider uppercase text-xs">Read Note</span>
          </div>
        </div>

        {/* Secret Message Overlay/Expand */}
        <AnimatePresence>
          {showMessage && (
            <motion.div 
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-slate-900/80 backdrop-blur-2xl border border-teal-500/30 p-5 rounded-xl text-slate-200 text-sm leading-relaxed italic shadow-[0_0_30px_rgba(20,184,166,0.1)] relative">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-teal-400 to-indigo-500 rounded-l-xl" />
                <span className="text-teal-300 text-lg mr-2">"</span>
                {song.message}
                <span className="text-teal-300 text-lg ml-2">"</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
