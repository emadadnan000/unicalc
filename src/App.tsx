// import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './components/pages/HomePage';
import AboutPage from './components/pages/AboutPage';
import CalculatorPage from './components/pages/CalculatorPage';
import StarryBackground from './components/common/StarryBackground';
import SEOHead from './components/SEOHead';

function App() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      <SEOHead />
      <StarryBackground />
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/calculator/:universityId" element={<CalculatorPage />} />
            <Route path="/calculator/:universityId/:programId" element={<CalculatorPage />} />
            <Route path="/calculator/:universityId/:programId/:section" element={<CalculatorPage />} />
            <Route path="/calculator" element={<Navigate to="/" replace />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/universities" element={<Navigate to="/" replace />} />
            <Route path="/nu-calculator" element={<Navigate to="/" replace />} />
            {/* Catch-all route for 404s - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default App;