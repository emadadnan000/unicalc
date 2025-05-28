import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import UniversityGrid from '../university/UniversityGrid';
import universities from '../../data/universities';

const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Example university names for placeholder
  const placeholderSuggestions = [
    "FAST", "NUST", "LUMS", "COMSATS", "UET Lahore", "GIKI", "Bahria", "IBA"
  ];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    // Rotate through placeholder suggestions
    const placeholderInterval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholderSuggestions.length);
    }, 3000);

    return () => clearInterval(placeholderInterval);
  }, [placeholderSuggestions.length]);

  useEffect(() => {
    // Update search results
    setShowResults(searchTerm.trim() !== '');
  }, [searchTerm]);

  useEffect(() => {
    // Add keyboard shortcut listener
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setShowResults(false);
    searchInputRef.current?.focus();
  };

  const filteredUniversities = searchTerm.trim() === '' 
    ? universities 
    : universities.filter(uni => 
        uni.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        uni.shortName.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <div style={{
      paddingTop: '80px',
      backgroundColor: '#0a0a1a',
      color: '#FFFFFF',
      minHeight: '100vh'
    }}>
      {/* <h1 className="slide-up" style={{textAlign: 'center', margin: '20px 0', fontSize: '2rem'}}>
        University Admission Calculator
      </h1> */}
      
      {/* Hero Section with Enhanced Styling */}
      <section style={{
        padding: '48px 16px',
        backgroundColor: '#0a0a1a',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          textAlign: 'center',
          padding: '16px'
        }}>
          {/* Enhanced heading with animation */}
          <h1 className="homepage-heading slide-up-delay-1" style={{
            fontSize: '3rem',
            marginBottom: '24px',
            lineHeight: '1.2'
          }}>
            Calculate Your <span className="highlight-text">University</span> Admission Chances
          </h1>
          
          {/* Animated paragraph */}
          <p className="slide-up-delay-2" style={{
            fontSize: '1.25rem',
            marginBottom: '32px',
            maxWidth: '800px',
            marginLeft: 'auto',
            marginRight: 'auto',
            opacity: '0.9',
            lineHeight: '1.6'
          }}>
            UniCalc is your all-in-one platform for university admissions in Pakistan. Calculate your aggregate, 
            explore test patterns, check eligibility, and make informed decisions about your academic future. 
            Our tools are designed to simplify your university application process.
          </p>
          
          <div className="mt-8">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>
              <span className="text-cyan-400 text-sm font-medium">Live - {filteredUniversities.length} Universities Available</span>
            </div>
          </div>
          
          {/* Enhanced Search Bar */}
          <div className="slide-up-delay-3" style={{
            marginTop: '40px',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            <div className="clean-shadow" style={{
              position: 'relative',
              borderRadius: '9999px',
              overflow: 'hidden',
              border: '2px solid var(--electric-blue)',
              backgroundColor: 'rgba(18, 19, 48, 0.7)',
              padding: '4px',
              boxShadow: '0 0 20px rgba(0, 180, 255, 0.2)'
            }}>
              <input
                ref={searchInputRef}
                type="text"
                placeholder={`Search for ${placeholderSuggestions[placeholderIndex]}...`}
                value={searchTerm}
                onChange={handleSearch}
                style={{
                  width: '100%',
                  padding: '18px 28px',
                  paddingRight: '64px',
                  backgroundColor: 'transparent',
                  color: '#FFFFFF',
                  border: 'none',
                  outline: 'none',
                  fontSize: '1.125rem',
                  fontFamily: 'Poppins, sans-serif'
                }}
              />
              {searchTerm ? (
                <button 
                  onClick={handleClearSearch}
                  style={{
                    position: 'absolute',
                    right: '48px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#AAAAAA',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <X style={{width: '20px', height: '20px'}} />
                </button>
              ) : (
                <div style={{ display: 'none' }}></div>
              )}
              <div style={{
                position: 'absolute',
                right: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--electric-blue)'
              }}>
                <Search style={{width: '22px', height: '22px'}} />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Universities Section with Enhanced Styling */}
      <section id="universities" style={{
        padding: '60px 16px',
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: '#0a0a1a'
      }}>
        <div style={{
          margin: '0 auto',
          padding: '0 16px'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '50px'
          }}>
            <h2 className="homepage-heading slide-up important-text" style={{
              fontSize: '2.25rem',
              marginBottom: '16px',
            }}>
              Select Your <span className="highlight-text">University</span>
            </h2>
            <p className="slide-up-delay-1" style={{
              maxWidth: '600px',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginBottom: '20px',
              fontSize: '1.125rem',
              opacity: '0.9'
            }}>
              Browse through our comprehensive database of top universities in Pakistan to find your perfect academic match.
            </p>
            
            {showResults && (
              <div style={{
                marginTop: '16px',
                color: '#7eeaff',
                background: 'rgba(0, 180, 255, 0.1)',
                padding: '10px 20px',
                borderRadius: '12px',
                display: 'inline-block'
              }}>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                    Your Complete University
                  </span>{' '}
                  <span className="relative inline-block">
                    <span className="relative z-10">Admission Companion</span>
                    <span className="absolute bottom-0 left-0 w-full h-3 bg-cyan-500/20 -rotate-1 -z-0" />
                  </span>
                </h2>
                <p className="text-xl text-gray-300 max-w-4xl mx-auto px-4">
                  UniCalc is your all-in-one platform for navigating university admissions in Pakistan. From calculating your aggregate to understanding test patterns, we've got you covered every step of the way.
                </p>
                <div className="flex items-center">
                  <span className="mr-1">Showing results for</span>
                  <span className="font-semibold text-cyan-400">"{searchTerm}"</span>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-cyan-300">{filteredUniversities.length} {filteredUniversities.length === 1 ? 'university' : 'universities'}</span>
                </div>
                {filteredUniversities.length === 0 && (
                  <button 
                    onClick={handleClearSearch}
                    style={{
                      color: 'var(--electric-blue)',
                      textDecoration: 'underline',
                      marginTop: '8px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: '500'
                    }}
                  >
                    Clear search
                  </button>
                )}
              </div>
            )}
          </div>
          
          <UniversityGrid universities={filteredUniversities} />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
