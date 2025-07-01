import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Sparkles, TrendingUp, Users, Award } from 'lucide-react';

interface University {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  category: string;
  image: string;
}

interface UniversityGridProps {
  universities: University[];
}

// Comprehensive university data with more institutions
const mockUniversities: University[] = [
  { 
    id: 'fast', 
    name: 'FAST National University of Computer and Emerging Sciences', 
    shortName: 'FAST-NUCES', 
    logo: '', 
    category: 'Computer Science',
    image: './imgs/fast.jpg'
  },
  { 
    id: 'nust', 
    name: 'National University of Sciences and Technology', 
    shortName: 'NUST', 
    logo: '', 
    category: 'Engineering & Technology',
    image: './imgs/nust.jpg'
  },
  
  { 
    id: 'comsats', 
    name: 'COMSATS University Islamabad', 
    shortName: 'COMSATS (CUI)', 
    logo: '', 
    category: 'Technology & Sciences',
    image: './imgs/comsats.jpg'
  },
  { 
    id: 'uet', 
    name: 'University of Engineering and Technology Lahore', 
    shortName: 'UET Lahore', 
    logo: '', 
    category: 'Engineering',
    image: './imgs/uet.jpg'
  },
  { 
    id: 'giki', 
    name: 'Ghulam Ishaq Khan Institute of Engineering Sciences', 
    shortName: 'GIKI', 
    logo: '', 
    category: 'Engineering & Sciences',
    image: './imgs/giki.jpg'
  },
  {
    id: 'pieas',
    name: 'Pakistan Institute of Engineering and Applied Sciences',
    shortName: 'PIEAS',
    logo: '',
    category: 'Nuclear & Engineering',
    image: './imgs/pieas.jpg'
  },
  {
    id: 'itu',
    name: 'Information Technology University',
    shortName: 'ITU',
    logo: '',
    category: 'Information Technology',
    image: './imgs/itu.jpg'
  },
  {
    id: 'islamicuni',
    name: 'International Islamic University Islamabad',
    shortName: 'IIUI',
    logo: '',
    category: 'Islamic Studies & Sciences',
    image: './imgs/iiui.jpg'
  },
  {
    id: 'ned',
    name: 'NED University of Engineering and Technology',
    shortName: 'NED University',
    logo: '',
    category: 'Engineering',
    image: './imgs/ned.jpg'
  },
  {
    id: 'air',
    name: 'AIR University',
    shortName: 'AIR',
    logo: '',
    category: 'Cybersecurity',
    image: './imgs/air.jpg'
  },
  {
    id: 'bahria',
    name: 'Bahria University',
    shortName: 'Bahria University',
    logo: '',
    category: 'Multidisciplinary',
    image: './imgs/bahria.jpg'
  },
  {
    id: 'quaideazam',
    name: 'Quaid-i-Azam University Islamabad',
    shortName: 'QAU',
    logo: '',
    category: 'Research University',
    image: './imgs/qau.jpg'
  },
  {
    id: 'ist',
    name: 'Institute of Space Technology',
    shortName: 'IST',
    logo: '',
    category: 'Space & Aerospace',
    image: './imgs/ist.jpg'
  },
  {
    id: 'nutech',
    name: 'National University of Technology',
    shortName: 'NUTECH',
    logo: '',
    category: 'Technology',
    image: './imgs/nutech.jpg'
  },
  
 
  {
    id: 'pucit',
    name: 'Punjab University College of Information Technology',
    shortName: 'PUCIT',
    logo: '',
    category: 'Information Technology',
    image: './imgs/pu.jpg'
  }
];

const UniversityGrid: React.FC<UniversityGridProps> = ({ universities }) => {
  const navigate = useNavigate();

  const handleCalculateClick = (universityId: string) => {
    navigate(`/calculator/${universityId}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {universities.map((uni) => (
        <div
          key={uni.id}
          className="group relative bg-gradient-to-br from-slate-900/80 to-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1"
        >
          <div className="h-48 bg-gray-800 overflow-hidden relative">
            <img 
              src={uni.image} 
              alt={`${uni.name} Campus`} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop&crop=entropy&auto=format';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute top-4 right-4">
              <span className="text-xs bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full border border-white/20">
                {uni.category}
              </span>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="text-3xl">{uni.logo}</div>
            </div>
            
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2">
              {uni.shortName}
            </h3>
            
            <p className="text-gray-400 text-sm mb-6 line-clamp-2 leading-relaxed">
              {uni.name}
            </p>
            
            <button 
              onClick={() => handleCalculateClick(uni.id)}
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white py-3 px-4 rounded-xl transition-all duration-200 font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            >
              Calculate Aggregate
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const placeholderSuggestions = [
    "FAST-NUCES", "NUST", "LUMS", "COMSATS", "UET Lahore", "GIKI", "PIEAS", "ITU", "IIUI", "Bahria"
  ];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const placeholderInterval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholderSuggestions.length);
    }, 3000);
    return () => clearInterval(placeholderInterval);
  }, [placeholderSuggestions.length]);

  useEffect(() => {
    setShowResults(searchTerm.trim() !== '');
  }, [searchTerm]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setShowResults(false);
    searchInputRef.current?.focus();
  };

  const handleGetStarted = () => {
    const universitiesSection = document.getElementById('universities');
    if (universitiesSection) {
      universitiesSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const filteredUniversities = searchTerm.trim() === '' 
    ? mockUniversities 
    : searchTerm.trim().toLowerCase() === 'itu' 
      ? mockUniversities.filter(uni => uni.id === 'itu')
      : mockUniversities.filter(uni => 
          uni.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          uni.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          uni.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
  
  // Add result count text
  const resultCount = filteredUniversities.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-cyan-500/20 via-blue-500/15 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-60 h-60 bg-gradient-to-r from-blue-500/15 via-cyan-500/20 to-teal-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-gradient-to-r from-purple-500/15 via-pink-500/10 to-cyan-500/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        
        {/* Floating particles */}
        <div className="absolute top-20 left-1/4 w-2 h-2 bg-cyan-400/60 rounded-full animate-bounce" style={{animationDelay: '1s', animationDuration: '3s'}}></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-400/60 rounded-full animate-bounce" style={{animationDelay: '2s', animationDuration: '4s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-purple-400/60 rounded-full animate-bounce" style={{animationDelay: '3s', animationDuration: '5s'}}></div>

        {/* Moving gradient orbs */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute animate-ping" style={{
            top: '20%',
            left: '80%',
            animationDuration: '4s',
            animationDelay: '1s'
          }}>
            <div className="w-3 h-3 bg-cyan-400/30 rounded-full"></div>
          </div>
          <div className="absolute animate-ping" style={{
            top: '60%',
            left: '15%',
            animationDuration: '3s',
            animationDelay: '2s'
          }}>
            <div className="w-2 h-2 bg-blue-400/30 rounded-full"></div>
          </div>
          <div className="absolute animate-ping" style={{
            top: '80%',
            right: '20%',
            animationDuration: '5s',
            animationDelay: '0.5s'
          }}>
            <div className="w-2.5 h-2.5 bg-purple-400/30 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center">
            {/* Main Heading with staggered animation */}
            <div className="mb-6 sm:mb-8">
              <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span 
                  className={`block bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent transition-all duration-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                  style={{
                    transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                    transitionDelay: isLoaded ? '0.2s' : '0s'
                  }}
                >
                  Calculate Your
                </span>
                <span 
                  className={`block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mt-1.5 sm:mt-2.5 transition-all duration-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} 
                  style={{
                    transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                    transitionDelay: isLoaded ? '0.4s' : '0s'
                  }}
                >
                  University Success
                </span>
              </h1>
            </div>

            {/* Subtitle with delayed animation */}
            <div className="relative">
              <p 
                className={`text-sm sm:text-base lg:text-lg text-gray-300 max-w-2xl sm:max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed px-4 transition-all duration-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} 
                style={{
                  transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                  transitionDelay: isLoaded ? '0.6s' : '0s',
                  textShadow: 'none'
                }}
              >
                Your comprehensive platform for university admissions in Pakistan. Calculate merit for FAST, NUST, ITU, COMSATS & 15+ top universities. Get accurate aggregate calculations, explore CS and Engineering programs, and make informed decisions about your academic future with our free admission calculator.
              </p>

            </div>

            {/* Animated Stats Cards */}
            <div className={`grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-xs sm:max-w-2xl mx-auto mb-6 sm:mb-8 transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{transitionDelay: '600ms'}}>
              <div className="group bg-gradient-to-br from-cyan-500/15 to-blue-500/15 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-3 sm:p-4 hover:border-cyan-400/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/20">
                <div className="flex items-center justify-center mb-1 sm:mb-2 group-hover:scale-105 transition-transform duration-300">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 mr-1.5 sm:mr-2 group-hover:text-cyan-300 animate-pulse" style={{animationDuration: '2s'}} />
                  <span 
                    className="text-xl sm:text-2xl font-bold text-white inline-block"
                    style={{
                      animation: 'float 3s ease-in-out infinite',
                      animationDelay: '0.2s'
                    }}
                  >
                    1000+
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Students Helped</p>
              </div>
              <div className="group bg-gradient-to-br from-blue-500/15 to-purple-500/15 backdrop-blur-sm border border-blue-500/30 rounded-xl p-3 sm:p-4 hover:border-blue-400/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/20">
                <div className="flex items-center justify-center mb-1 sm:mb-2 group-hover:scale-105 transition-transform duration-300">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 mr-1.5 sm:mr-2 group-hover:text-blue-300 animate-bounce" style={{animationDuration: '3s'}} />
                  <span 
                    className="text-xl sm:text-2xl font-bold text-white inline-block"
                    style={{
                      animation: 'float 3s ease-in-out infinite',
                      animationDelay: '0.4s'
                    }}
                  >
                    {mockUniversities.length}+
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Universities</p>
              </div>
              <div className="group bg-gradient-to-br from-purple-500/15 to-pink-500/15 backdrop-blur-sm border border-purple-500/30 rounded-xl p-3 sm:p-4 hover:border-purple-400/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/20">
                <div className="flex items-center justify-center mb-1 sm:mb-2 group-hover:scale-105 transition-transform duration-300">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 mr-1.5 sm:mr-2 group-hover:text-purple-300 animate-ping" style={{animationDuration: '4s'}} />
                  <span 
                    className="text-xl sm:text-2xl font-bold text-white inline-block"
                    style={{
                      animation: 'float 3s ease-in-out infinite',
                      animationDelay: '0.6s'
                    }}
                  >
                    95%
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Success Rate</p>
              </div>
            </div>

            {/* Enhanced Live Status with animations */}
            <div className={`inline-flex items-center space-x-2 sm:space-x-3 px-4 sm:px-6 py-1.5 sm:py-2.5 bg-green-500/15 border border-green-500/40 rounded-full mb-6 sm:mb-10 backdrop-blur-sm hover:bg-green-500/20 transition-all duration-300 hover:scale-105 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{transitionDelay: '800ms'}}>
              <span className="relative flex h-3 w-3 sm:h-4 sm:w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 sm:h-4 sm:w-4 bg-green-500"></span>
              </span>
              <span className="text-green-400 text-sm sm:text-base font-medium animate-pulse">
                Live - {filteredUniversities.length} Universities Available
              </span>
            </div>

            {/* Enhanced Search Bar with full-width background */}
            <div className={`w-full max-w-xs sm:max-w-2xl lg:max-w-3xl mx-auto mb-2 sm:mb-4 transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{transitionDelay: '1000ms'}}>
              <div className="relative group">
                {/* Full-width animated background */}
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-purple-500/30 rounded-2xl opacity-75 blur-lg group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/50 via-blue-500/50 to-purple-500/50 rounded-2xl opacity-50 group-hover:opacity-75 transition-all duration-300"></div>
                
                {/* Search container */}
                <div className="relative bg-slate-800/80 backdrop-blur-xl border border-slate-600/50 rounded-2xl p-1 sm:p-2 group-hover:border-cyan-500/50 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-cyan-500/25">
                  <div className="flex items-center">
                    <div className="pl-4 sm:pl-6 pr-3 sm:pr-4 py-2">
                      <Search className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 group-hover:text-cyan-300 transition-colors group-hover:scale-110 transform duration-300 animate-pulse" style={{animationDuration: '2s'}} />
                    </div>
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder={`Search for ${placeholderSuggestions[placeholderIndex]}...`}
                      value={searchTerm}
                      onChange={handleSearch}
                      className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none py-3 sm:py-5 pr-4 text-base sm:text-lg lg:text-xl font-medium"
                    />
                    {searchTerm && (
                      <button 
                        onClick={handleClearSearch}
                        className="p-2 sm:p-3 text-gray-400 hover:text-white transition-all duration-200 hover:scale-110 mr-1 sm:mr-2 rounded-full hover:bg-slate-700/50"
                      >
                        <X className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    )}
                    <div className="hidden sm:flex items-center space-x-1 bg-slate-700/70 rounded-xl px-3 sm:px-4 py-1 sm:py-2 mr-1 sm:mr-2 group-hover:bg-slate-600/70 transition-all duration-300">
                      <span className="text-xs sm:text-sm text-gray-300 font-mono">⌘K</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
      </section>

      {/* Universities Section */}
      <section id="universities" className="relative py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-4">
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 backdrop-blur-sm border border-cyan-500/30 rounded-full px-4 sm:px-6 py-1.5 sm:py-2 mb-4 sm:mb-6 hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 animate-spin" style={{animationDuration: '3s'}} />
              <span className="text-sm sm:text-base text-cyan-400 font-semibold">Featured Universities</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6">
              Select Your{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Dream University
              </span>
            </h2>
            
            <p className="text-base sm:text-lg xl:text-xl text-gray-300 max-w-3xl mx-auto">
              Explore our comprehensive database of top universities in Pakistan. 
              Each institution offers unique opportunities for your academic journey.
            </p>

            {/* Search Results Info */}
            {showResults && (
              <div className="mt-10 inline-flex flex-wrap items-center justify-center space-x-4 bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl px-8 py-4 hover:scale-105 transition-transform duration-300">
                <div className="flex items-center space-x-3">
                  <span className="text-gray-300">Results for</span>
                  <span className="font-bold text-cyan-400 bg-cyan-500/20 px-3 py-1 rounded-lg border border-cyan-500/30">
                    "{searchTerm}"
                  </span>
                </div>
                <div className="hidden sm:block w-px h-6 bg-gray-600"></div>
                <div className="text-cyan-300 font-semibold">
                  {filteredUniversities.length} {filteredUniversities.length === 1 ? 'university' : 'universities'}
                </div>
                {filteredUniversities.length === 0 && (
                  <>
                    <div className="hidden sm:block w-px h-6 bg-gray-600"></div>
                    <button 
                      onClick={handleClearSearch}
                      className="text-cyan-400 hover:text-cyan-300 transition-colors font-semibold hover:scale-105 transform duration-200"
                    >
                      Clear search
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {filteredUniversities.length === 0 && showResults ? (
            <div className="text-center py-20">
              <div className="text-8xl mb-6 animate-bounce">🔍</div>
              <h3 className="text-3xl font-bold mb-6">No universities found</h3>
              <p className="text-gray-400 mb-8 text-lg">
                Try searching with different keywords or browse all universities below.
              </p>
              <button 
                onClick={handleClearSearch}
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25"
              >
                Show All Universities
              </button>
            </div>
          ) : (
            <>
              {showResults && (
                <div className="mb-6 text-center">
                  <p className="text-gray-300">
                    Results: <span className="text-cyan-400 font-medium">
                      {filteredUniversities.length} {filteredUniversities.length === 1 ? 'university' : 'universities'}
                    </span> found
                  </p>
                </div>
              )}
              <UniversityGrid universities={filteredUniversities} />
            </>
          )}





          {/* FAQ Section for SEO */}
          <div className="mt-20 mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Frequently Asked <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Questions</span>
              </h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                Common questions about university admission calculators in Pakistan
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-gradient-to-br from-slate-800/70 to-slate-700/60 backdrop-blur-xl border border-slate-600/50 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-3 text-white">How accurate is the FAST calculator?</h3>
                <p className="text-gray-300 leading-relaxed">
                  Our FAST-NUCES calculator uses the official merit formula provided by the university. 
                  For Engineering programs, it's Matric (17%) + FSc (50%) + Entry Test (33%). For CS programs, 
                  it's Matric (10%) + FSc/A-Level (40%) + Entry Test (50%). We update formulas annually.
                </p>
              </div>

              <div className="bg-gradient-to-br from-slate-800/70 to-slate-700/60 backdrop-blur-xl border border-slate-600/50 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-3 text-white">Can I calculate merit for A-Level students?</h3>
                <p className="text-gray-300 leading-relaxed">
                  Yes! Our calculator supports both FSc and A-Level students. For FAST University, we provide 
                  separate options for A-Level immediate and A-Level with gap year. The system automatically 
                  converts A-Level grades to equivalent percentages for accurate merit calculation.
                </p>
              </div>

              <div className="bg-gradient-to-br from-slate-800/70 to-slate-700/60 backdrop-blur-xl border border-slate-600/50 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-3 text-white">Which universities are supported by the calculator?</h3>
                <p className="text-gray-300 leading-relaxed">
                  We support 15+ top Pakistani universities including FAST-NUCES, NUST, ITU, COMSATS, GIKI, 
                  PIEAS, UET, QAU, Punjab University, NED, AIR University, Bahria University, and more. 
                  Each university has specific merit formulas for different programs.
                </p>
              </div>

              <div className="bg-gradient-to-br from-slate-800/70 to-slate-700/60 backdrop-blur-xl border border-slate-600/50 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-3 text-white">How do I calculate NUST NET merit?</h3>
                <p className="text-gray-300 leading-relaxed">
                  For NUST, enter your Matric marks, FSc/A-Level marks, and NET entry test score. 
                  Our NUST calculator automatically applies the correct weightage for different programs. 
                  Engineering and CS programs have different merit calculation formulas.
                </p>
              </div>

              <div className="bg-gradient-to-br from-slate-800/70 to-slate-700/60 backdrop-blur-xl border border-slate-600/50 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-3 text-white">Is the calculator free to use?</h3>
                <p className="text-gray-300 leading-relaxed">
                  Yes, our university admission calculator is completely free! Calculate merit for any Pakistani 
                  university, get detailed breakdowns, and compare your chances across multiple institutions 
                  without any charges or registration required.
                </p>
              </div>
            </div>
          </div>

          {/* Enhanced CTA Section */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-br from-slate-800/70 to-slate-700/60 backdrop-blur-xl border border-slate-600/50 rounded-3xl p-8 sm:p-12 lg:p-16 hover:border-cyan-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10 group">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 group-hover:text-cyan-300 transition-colors duration-300">
                Start Calculating Your University Merit Today
              </h3>
              <p className="text-gray-300 mb-8 max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed">
                Join thousands of Pakistani students who have successfully calculated their admission merit 
                for FAST, NUST, ITU, COMSATS and other top universities. Get accurate predictions and plan your academic future.
              </p>
              <button 
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-4 px-10 sm:px-12 rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/30 hover:-translate-y-2 hover:scale-105 text-lg"
              >
                Calculate Merit Now - Free
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Add floating animation for stats numbers
const styles = `
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }
`;

// Add the styles to the head
try {
  const styleElement = document.createElement('style');
  styleElement.innerHTML = styles;
  document.head.appendChild(styleElement);
} catch (e) {}

export default HomePage;