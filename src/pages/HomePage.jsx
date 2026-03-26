import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-6">
      <div className="z-10 text-center max-w-3xl mx-auto flex flex-col items-center">
        
        {/* Subtle top badge with slow pulsing border */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 px-5 py-2 rounded-full border border-teal-500/30 bg-teal-500/10 backdrop-blur-md text-teal-300 text-sm font-semibold tracking-widest shadow-[0_0_20px_rgba(20,184,166,0.2)]"
        >
          A SPECIAL COLLECTION
        </motion.div>

        {/* Shimmering Title */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, type: 'spring', stiffness: 100 }}
          className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-indigo-300 to-teal-300 mb-6 tracking-tight leading-tight animate-shimmer drop-shadow-2xl"
        >
          Our Midnight Melodies
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-2xl text-slate-300 font-light mb-4"
        >
          Welcome to a playlist made specially for you.
        </motion.p>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-md md:text-lg text-slate-400/80 mb-8 italic leading-relaxed max-w-lg"
        >
          "Every song here holds a memory, a feeling, or a little message from my heart to yours."
        </motion.p>

        {/* Made by Harshit for Tina with pulsing glow */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1, delay: 0.8 }}
           className="mb-12"
        >
          <motion.p 
            animate={{ opacity: [0.6, 1, 0.6], textShadow: ["0px 0px 4px rgba(20,184,166,0)", "0px 0px 12px rgba(20,184,166,0.8)", "0px 0px 4px rgba(20,184,166,0)"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="text-teal-400 font-semibold tracking-[0.2em] uppercase text-sm"
          >
            Made by Harshit for Pratima ✨
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <button 
            onClick={() => navigate('/album')}
            className="group relative inline-flex items-center justify-center px-10 py-4 font-bold tracking-wide text-slate-900 transition-all duration-500 bg-teal-400 rounded-full hover:bg-teal-300 shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_40px_rgba(20,184,166,0.7)] hover:scale-105 active:scale-95 overflow-hidden border border-teal-200"
          >
            <span className="relative z-10 flex items-center gap-3 text-lg">
              <Play className="w-5 h-5 fill-slate-900" />
              Listen Now
            </span>
          </button>
        </motion.div>
      </div>

      <FloatingShapes />
    </div>
  );
}

function FloatingShapes() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: "110vh", x: Math.random() * 100 + "vw", opacity: 0, rotate: 0 }}
          animate={{ 
            y: "-10vh", 
            x: Math.random() * 100 + "vw", 
            opacity: [0, 0.4, 0],
            rotate: 360
          }}
          transition={{ 
            duration: Math.random() * 15 + 15, 
            repeat: Infinity, 
            delay: Math.random() * 10,
            ease: "linear"
          }}
          className="absolute"
        >
          {i % 3 === 0 ? (
            <div className="w-8 h-8 rounded-full border border-teal-500/40 shadow-[0_0_15px_rgba(20,184,166,0.2)]" />
          ) : i % 3 === 1 ? (
             <div className="w-6 h-6 rotate-45 border border-indigo-400/40 shadow-[0_0_15px_rgba(99,102,241,0.2)]" />
          ) : (
            <div className="w-2 h-2 rounded-full bg-teal-300/60 shadow-[0_0_15px_rgba(20,184,166,0.8)]" />
          )}
        </motion.div>
      ))}
    </div>
  );
}
