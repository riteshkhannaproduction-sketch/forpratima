import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LetterForm from '../components/LetterForm';
import LettersList from '../components/LettersList';

export default function LoveLettersPage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleLetterAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="pt-24 pb-20 px-6 min-h-screen relative z-10 max-w-6xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 mb-4">
          Love Letters 💌
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          A digital journal to share our favorite memories, inspired by the songs we listen to.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 relative">
          <div className="sticky top-24">
            <LetterForm onLetterAdded={handleLetterAdded} />
          </div>
        </div>
        
        <div className="lg:col-span-7">
          <LettersList refreshTrigger={refreshTrigger} />
        </div>
      </div>
    </div>
  );
}
