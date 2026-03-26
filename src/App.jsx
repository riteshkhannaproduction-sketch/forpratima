import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Navbar from './components/Navbar';
import BackgroundEffects from './components/BackgroundEffects';
import HomePage from './pages/HomePage';
import AlbumPage from './pages/AlbumPage';

import LoveLettersPage from './pages/LoveLettersPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen font-sans relative">
        <BackgroundEffects />
        <Navbar />
        
        <main>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/album" element={<AlbumPage />} />
              <Route path="/letters" element={<LoveLettersPage />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
