import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Clock, User, Inbox, Sparkles, X } from 'lucide-react';

export default function LettersList({ refreshTrigger }) {
  const [letters, setLetters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedLetter, setSelectedLetter] = useState(null);

  useEffect(() => {
    fetchLetters();
  }, [refreshTrigger]);

  const fetchLetters = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/letters');
      if (!res.ok) throw new Error('Failed to fetch letters');
      const data = await res.json();
      setLetters(data);
    } catch (err) {
      console.error(err);
      setError('Could not load letters. They might be lost in the mail.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    setLetters(prev => prev.map(letter => 
      letter._id === id ? { ...letter, isRead: true } : letter
    ));
    
    try {
      await fetch(`/api/letters/${id}/read`, { method: 'PATCH' });
    } catch (err) {
      console.error('Failed to mark letter as read', err);
    }
  };

  const handleLetterClick = (letter) => {
    if (!letter.isRead) {
      handleMarkAsRead(letter._id);
    }
    setSelectedLetter(letter);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass p-8 rounded-2xl text-center text-red-400 border border-red-500/20">
        {error}
      </div>
    );
  }

  if (letters.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-12 rounded-2xl border border-white/5 text-center flex flex-col items-center justify-center min-h-[400px]"
      >
        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
          <Inbox className="w-8 h-8 text-slate-400 hover:text-pink-400 transition-colors" />
        </div>
        <h3 className="text-xl font-medium text-white mb-2">No letters yet 💌</h3>
        <p className="text-slate-400 text-sm max-w-sm">
          Be the first to write a love letter and share a special memory or dedication!
        </p>
      </motion.div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="columns-1 lg:columns-2 gap-6 text-left"
      >
        <AnimatePresence>
          {letters.map((letter) => (
            <motion.div
              key={letter._id}
              variants={itemVariants}
              layout
              onClick={() => handleLetterClick(letter)}
              className={`glass p-6 md:p-8 rounded-2xl border transition-all group relative overflow-hidden break-inside-avoid mb-6 inline-block w-full text-left
                ${!letter.isRead 
                  ? 'border-pink-500/50 shadow-[0_0_20px_rgba(236,72,153,0.15)] cursor-pointer hover:border-pink-400 hover:shadow-[0_0_25px_rgba(236,72,153,0.3)]' 
                  : 'border-white/10 hover:border-pink-500/30 cursor-pointer'
                }
              `}
            >
              {/* Subtle glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="flex flex-col gap-4 mb-6 relative z-10">
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-2 group-hover:text-pink-100 transition-colors flex items-center gap-3">
                    {letter.title}
                    {!letter.isRead && (
                      <span className="text-[10px] uppercase font-bold tracking-wider bg-pink-500/20 text-pink-300 px-2 py-0.5 rounded-full border border-pink-500/50 flex items-center gap-1 backdrop-blur-sm">
                        <Sparkles className="w-3 h-3" /> New
                      </span>
                    )}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                    <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                      <User className="w-3.5 h-3.5 text-pink-400" />
                      {letter.name}
                    </span>
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <Clock className="w-3.5 h-3.5" />
                      {formatDate(letter.createdAt)}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 bg-indigo-500/10 px-3 py-1.5 rounded-lg border border-indigo-500/20 text-indigo-300 text-sm shrink-0 self-start">
                  <Music className="w-3.5 h-3.5" />
                  <span className="max-w-[150px] truncate">{letter.song}</span>
                </div>
              </div>
              
              <div className="relative z-10">
                <p className="text-slate-200 leading-relaxed whitespace-pre-wrap font-light tracking-wide text-[15px] line-clamp-4">
                  {letter.body}
                </p>
                {letter.body.length > 150 && (
                  <span className="text-pink-400 text-sm mt-3 inline-block group-hover:underline">
                    Read full letter...
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Letter Modal */}
      <AnimatePresence>
        {selectedLetter && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedLetter(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="glass w-full max-w-2xl my-auto p-8 md:p-12 rounded-3xl border border-white/20 relative overflow-hidden shadow-[0_0_50px_rgba(236,72,153,0.15)]"
            >
              {/* Decorative gradients */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl -z-10" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -z-10" />
              
              <button 
                onClick={() => setSelectedLetter(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-8">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-pink-400 tracking-widest uppercase mb-4 bg-pink-500/10 px-3 py-1 rounded-full border border-pink-500/20">
                  <User className="w-3.5 h-3.5" />
                  From {selectedLetter.name}
                </span>
                
                <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-200 via-purple-300 to-indigo-200 mb-6 leading-tight">
                  {selectedLetter.title}
                </h2>
                
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 text-slate-300">
                    <Clock className="w-4 h-4 text-purple-400" />
                    {formatDate(selectedLetter.createdAt)}
                  </span>
                  
                  <span className="flex items-center gap-2 bg-indigo-500/10 px-3 py-1.5 rounded-lg border border-indigo-500/30 text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                    <Music className="w-4 h-4" />
                    Inspired by: <strong className="font-semibold text-indigo-200">{selectedLetter.song}</strong>
                  </span>
                </div>
              </div>
              
              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />
              
              <div className="prose prose-invert max-w-none">
                <p className="text-slate-200 text-lg leading-relaxed whitespace-pre-wrap font-light tracking-wide">
                  {selectedLetter.body}
                </p>
              </div>
              
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
