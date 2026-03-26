import React, { useEffect, useState } from 'react';
import { Music, Sparkles, Bell } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const res = await fetch('/api/letters/unread-count');
        const data = await res.json();
        if (data.count !== undefined) {
          setUnreadCount(data.count);
        }
      } catch (err) {
        console.error('Failed to fetch unread count', err);
      }
    };
    
    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5"
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 text-teal-400 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center">
             <Music className="w-4 h-4 text-teal-300" />
          </div>
          <span className="font-bold text-lg tracking-widest text-white uppercase text-sm">H & T</span>
        </Link>
        
        <div className="flex items-center gap-6 text-slate-300 text-sm font-medium">
          <Link to="/album" className="hover:text-pink-400 transition-colors">
            Our Album
          </Link>
          <Link to="/letters" className="hover:text-pink-400 transition-colors flex items-center gap-2 relative group">
            Letters <Sparkles className="w-4 h-4 text-pink-400 group-hover:animate-pulse" />
            {unreadCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-3 bg-pink-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-[0_0_10px_rgba(236,72,153,0.5)] border border-pink-400"
              >
                {unreadCount}
              </motion.span>
            )}
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
