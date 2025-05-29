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
    name: 'Information Technology University Punjab',
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
  const searchInputRef = useRef<HTMLInputElement>(null);

  const placeholderSuggestions = [
    "FAST-NUCES", "NUST", "LUMS", "COMSATS", "UET Lahore", "GIKI", "PIEAS", "ITU", "IIUI", "Bahria"
  ];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

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
    : mockUniversities.filter(uni => 
        uni.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        uni.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        uni.category.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            {/* Main Heading */}
            <div className="mb-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
                <span className="block bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
                  Calculate Your
                </span>
                <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mt-2">
                  University Success
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed px-4">
              Your comprehensive platform for university admissions in Pakistan. Calculate aggregates, 
              explore test patterns, and make informed decisions about your academic future.
            </p>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-12">
              <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-4">
                <div className="flex items-center justify-center mb-2">
                  <Users className="w-5 h-5 text-cyan-400 mr-2" />
                  <span className="text-2xl font-bold text-white">100+</span>
                </div>
                <p className="text-sm text-gray-400">Students Helped</p>
              </div>
              <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-500/20 rounded-xl p-4">
                <div className="flex items-center justify-center mb-2">
                  <Award className="w-5 h-5 text-blue-400 mr-2" />
                  <span className="text-2xl font-bold text-white">{mockUniversities.length}+</span>
                </div>
                <p className="text-sm text-gray-400">Universities</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/20 rounded-xl p-4">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="w-5 h-5 text-purple-400 mr-2" />
                  <span className="text-2xl font-bold text-white">95%</span>
                </div>
                <p className="text-sm text-gray-400">Success Rate</p>
              </div>
            </div>

            {/* Live Status */}
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full mb-8">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-green-400 text-sm font-medium">
                Live - {filteredUniversities.length} Universities Available
              </span>
            </div>

            {/* Enhanced Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full opacity-20 blur-xl group-hover:opacity-30 transition-opacity"></div>
                <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-full p-1 group-hover:border-cyan-500/50 transition-all duration-300">
                  <div className="flex items-center">
                    <div className="pl-6 pr-4 py-1">
                      <Search className="w-5 h-5 text-cyan-400" />
                    </div>
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder={`Search for ${placeholderSuggestions[placeholderIndex]}...`}
                      value={searchTerm}
                      onChange={handleSearch}
                      className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none py-4 pr-4 text-base sm:text-lg"
                    />
                    {searchTerm && (
                      <button 
                        onClick={handleClearSearch}
                        className="p-2 text-gray-400 hover:text-white transition-colors mr-2"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                    <div className="hidden sm:flex items-center space-x-1 bg-slate-700/50 rounded-full px-3 py-1 mr-2">
                      <span className="text-xs text-gray-400">⌘K</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Universities Section */}
      <section id="universities" className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-sm border border-cyan-500/20 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-400 font-medium">Featured Universities</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Select Your{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Dream University
              </span>
            </h2>
            
            <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto">
              Explore our comprehensive database of top universities in Pakistan. 
              Each institution offers unique opportunities for your academic journey.
            </p>

            {/* Search Results Info */}
            {showResults && (
              <div className="mt-8 inline-flex flex-wrap items-center justify-center space-x-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl px-6 py-3">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-300">Results for</span>
                  <span className="font-semibold text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded">
                    "{searchTerm}"
                  </span>
                </div>
                <div className="hidden sm:block w-px h-4 bg-gray-600"></div>
                <div className="text-cyan-300">
                  {filteredUniversities.length} {filteredUniversities.length === 1 ? 'university' : 'universities'}
                </div>
                {filteredUniversities.length === 0 && (
                  <>
                    <div className="hidden sm:block w-px h-4 bg-gray-600"></div>
                    <button 
                      onClick={handleClearSearch}
                      className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
                    >
                      Clear search
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {filteredUniversities.length === 0 && showResults ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-4">No universities found</h3>
              <p className="text-gray-400 mb-6">
                Try searching with different keywords or browse all universities below.
              </p>
              <button 
                onClick={handleClearSearch}
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold py-2 px-6 rounded-full transition-all duration-200"
              >
                Show All Universities
              </button>
            </div>
          ) : (
            <UniversityGrid universities={filteredUniversities} />
          )}

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-2xl p-6 sm:p-8 lg:p-12">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">
                Ready to Start Your Journey?
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto text-sm sm:text-base">
                Join thousands of students who have successfully navigated their university 
                admissions with our comprehensive tools and guidance.
              </p>
              <button 
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold py-3 px-6 sm:px-8 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/25 hover:-translate-y-1"
              >
                Get Started Today
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;