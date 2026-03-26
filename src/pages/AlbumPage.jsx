import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MusicCard from '../components/MusicCard';
import { songs } from '../data/songs';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Headphones } from 'lucide-react';

export default function AlbumPage() {
  const [playingId, setPlayingId] = useState(null);
  const navigate = useNavigate();

  const handlePlayPause = (id, isPlaying) => {
    if (isPlaying) {
      setPlayingId(id);
    } else if (playingId === id) {
      setPlayingId(null);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-16 px-6 relative z-10 selection:bg-teal-500/30">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-800/60 pb-8"
        >
          <div>
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-slate-400 hover:text-teal-400 font-medium mb-6 transition-colors group text-sm uppercase tracking-widest"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Return
            </button>
            <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400 tracking-tight">
              Curated for Tina
            </h1>
            <p className="text-teal-400 mt-3 text-lg font-medium tracking-wide">
              A collection of moments wrapped in melodies.
            </p>
          </div>
          <div className="px-5 py-2.5 rounded-full bg-slate-800/50 backdrop-blur-md border border-slate-700/50 text-slate-300 font-medium tracking-wider text-sm flex items-center gap-2 shadow-lg">
            <Headphones className="w-4 h-4 text-teal-400" />
            {songs.length} Tracks
          </div>
        </motion.div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
          {songs.map((song, index) => (
            <motion.div
              key={song.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <MusicCard 
                song={song} 
                isPlaying={playingId === song.id}
                onPlayPause={(isPlaying) => handlePlayPause(song.id, isPlaying)}
              />
            </motion.div>
          ))}
        </div>

        {/* Footer info */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-24 pt-8 border-t border-slate-800/60 text-center flex flex-col items-center justify-center gap-2"
        >
          <p className="text-slate-500 font-medium tracking-widest text-sm uppercase">Forever yours</p>
          <div className="w-12 h-1 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-full" />
        </motion.div>

      </div>
    </div>
  );
}
