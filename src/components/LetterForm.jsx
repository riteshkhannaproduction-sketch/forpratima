import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Heart, Music, Type } from 'lucide-react';

export default function LetterForm({ onLetterAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    song: '',
    body: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const API_URL = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${API_URL}/api/letters`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to submit letter');
      }

      setFormData({ name: '', title: '', song: '', body: '' });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
      if (onLetterAdded) {
        onLetterAdded();
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass p-8 rounded-2xl border border-white/10 relative overflow-hidden"
    >
      {/* Decorative gradient blur */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl -z-10" />

      <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
        <Heart className="w-5 h-5 text-pink-400" />
        Write a Letter
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-300 ml-1">Your Name</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Type className="h-4 w-4 text-slate-500" />
            </div>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. H & T"
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500/50 text-white placeholder-slate-500 transition-all"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-300 ml-1">Letter Title</label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            placeholder="A special night..."
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500/50 text-white placeholder-slate-500 transition-all"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-300 ml-1">Inspired by Song</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Music className="h-4 w-4 text-slate-500" />
            </div>
            <input
              type="text"
              name="song"
              required
              value={formData.song}
              onChange={handleChange}
              placeholder="Song that reminds you of this"
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500/50 text-white placeholder-slate-500 transition-all"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-300 ml-1">Message</label>
          <textarea
            name="body"
            required
            rows="5"
            value={formData.body}
            onChange={handleChange}
            placeholder="Write your heart out..."
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500/50 text-white placeholder-slate-500 transition-all resize-none"
          ></textarea>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20"
            >
              {error}
            </motion.div>
          )}

          {showSuccess && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="text-green-400 text-sm bg-green-400/10 p-3 rounded-lg border border-green-400/20"
            >
              Letter sealed and sent! 💌
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isSubmitting}
          type="submit"
          className="w-full py-4 mt-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 text-white font-semibold rounded-xl shadow-[0_0_20px_rgba(236,72,153,0.3)] flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Send Letter'}
          <Send className="w-4 h-4" />
        </motion.button>
      </form>
    </motion.div>
  );
}
