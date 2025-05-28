// import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './components/pages/HomePage';
import AboutPage from './components/pages/AboutPage';
import CalculatorPage from './components/pages/CalculatorPage';
import StarryBackground from './components/common/StarryBackground';

function App() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      <StarryBackground />
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/calculator/:universityId" element={<CalculatorPage />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default App;