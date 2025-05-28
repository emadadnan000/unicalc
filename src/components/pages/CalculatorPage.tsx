import React, { useState, useEffect, ChangeEvent } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calculator, GraduationCap, Info, ChevronLeft, TrendingUp, Star, Users, MapPin, Calendar, Award, FileText, BarChart2 } from 'lucide-react';
import { FaWhatsapp } from "react-icons/fa6";
import universities, { University, Program } from '../../data/universities';
import testPatterns, { UniversityTestPattern } from '../../data/testPatterns';
import EligibilityTable from '../EligibilityTable';
import MeritAnalysis from '../MeritAnalysis';

type EducationType = 'FSc' | 'A-Level';

interface FormData {
  matricMarks: { obtained: number; total: number };
  fscMarks: { obtained: number; total: number };
  entryTestType: string;
  entryTestMarks: { obtained: number; total: number };
  educationType: EducationType;
}

// New interfaces for enhanced features
interface UniversityFact {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight?: string;
}

interface MeritData {
  year: number;
  merit: number;
  seats?: number;
}

interface UniversityData {
  [key: string]: {
    facts: UniversityFact[];
    csmerits: MeritData[];
  };
}

// Mock data for university facts and merits
const universityData: UniversityData = {
  nust: {
    facts: [
      {
        icon: <Award className="h-6 w-6" />,
        title: "QS World Ranking",
        description: "Ranked among top 500 universities globally",
        highlight: "#371 in Engineering"
      },
      {
        icon: <Users className="h-6 w-6" />,
        title: "Student Diversity",
        description: "Over 17,000 students from 50+ countries",
        highlight: "40% International"
      },
      {
        icon: <MapPin className="h-6 w-6" />,
        title: "Campus Network",
        description: "Multiple campuses across Pakistan",
        highlight: "Islamabad, Karachi, Risalpur"
      },
      {
        icon: <Calendar className="h-6 w-6" />,
        title: "Established",
        description: "Founded in 1991 as a premier technology university",
        highlight: "32+ Years"
      }
    ],
    csmerits: [
      { year: 2023, merit: 186.5, seats: 400 },
      { year: 2022, merit: 184.2, seats: 380 }
    ]
  },
  fast: {
    facts: [
      {
        icon: <Award className="h-6 w-6" />,
        title: "Industry Recognition",
        description: "Leading computer science education in Pakistan",
        highlight: "Top CS University"
      },
      {
        icon: <Users className="h-6 w-6" />,
        title: "Alumni Network",
        description: "Graduates working at top tech companies globally",
        highlight: "Google, Microsoft, Meta"
      },
      {
        icon: <MapPin className="h-6 w-6" />,
        title: "Campuses",
        description: "Campuses in major cities of Pakistan",
        highlight: "Islamabad, Lahore, Karachi"
      },
      {
        icon: <Calendar className="h-6 w-6" />,
        title: "Founded",
        description: "Established as National University of Computer Sciences",
        highlight: "Since 2000"
      }
    ],
    csmerits: [
      { year: 2023, merit: 82.5, seats: 320 },
      { year: 2022, merit: 81.2, seats: 300 }
    ]
  },
  lums: {
    facts: [
      {
        icon: <Award className="h-6 w-6" />,
        title: "Global Rankings",
        description: "Consistently ranked among top Asian universities",
        highlight: "QS Asia Top 100"
      },
      {
        icon: <Users className="h-6 w-6" />,
        title: "Selective Admission",
        description: "Highly competitive admission process",
        highlight: "5% Acceptance Rate"
      },
      {
        icon: <MapPin className="h-6 w-6" />,
        title: "Beautiful Campus",
        description: "State-of-the-art facilities in Lahore",
        highlight: "100-acre campus"
      },
      {
        icon: <Calendar className="h-6 w-6" />,
        title: "Heritage",
        description: "Rich history of academic excellence",
        highlight: "Since 1985"
      }
    ],
    csmerits: [
      { year: 2023, merit: 89.2, seats: 150 },
      { year: 2022, merit: 87.8, seats: 140 }
    ]
  },
  itu: {
    facts: [
      {
        icon: <Award className="h-6 w-6" />,
        title: "Government Institution",
        description: "Punjab's premier public technology university",
        highlight: "High ROI"
      },
      {
        icon: <Users className="h-6 w-6" />,
        title: "Growing Community",
        description: "Rapidly expanding student body and faculty",
        highlight: "5000+ Students"
      },
      {
        icon: <MapPin className="h-6 w-6" />,
        title: "Lahore Campus",
        description: "Modern facilities in the heart of Punjab",
        highlight: "Tech Hub Location"
      },
      {
        icon: <Calendar className="h-6 w-6" />,
        title: "Recent Growth",
        description: "Established as independent university",
        highlight: "Since 2012"
      }
    ],
    csmerits: [
      { year: 2023, merit: 78.3, seats: 200 },
      { year: 2022, merit: 76.9, seats: 180 }
    ]
  },
  comsats: {
    facts: [
      {
        icon: <Award className="h-6 w-6" />,
        title: "Largest Network",
        description: "Largest university network in Pakistan",
        highlight: "40+ Campuses"
      },
      {
        icon: <Users className="h-6 w-6" />,
        title: "Massive Scale",
        description: "Serving hundreds of thousands of students",
        highlight: "200,000+ Students"
      },
      {
        icon: <MapPin className="h-6 w-6" />,
        title: "Nationwide Presence",
        description: "Campuses in every major city",
        highlight: "All Provinces"
      },
      {
        icon: <Calendar className="h-6 w-6" />,
        title: "Established",
        description: "Decades of educational excellence",
        highlight: "Since 1998"
      }
    ],
    csmerits: [
      { year: 2023, merit: 65.7, seats: 500 },
      { year: 2022, merit: 64.1, seats: 480 }
    ]
  }
};

const CalculatorPage: React.FC = () => {
  const { universityId } = useParams<{ universityId: string }>();
  const [university, setUniversity] = useState<University | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  
  const [formData, setFormData] = useState<FormData>({
    matricMarks: { obtained: 0, total: 1100 },
    fscMarks: { obtained: 0, total: 1100 },
    entryTestType: '',
    entryTestMarks: { obtained: 0, total: 100 },
    educationType: 'FSc'
  });

  const [aggregate, setAggregate] = useState<number | null>(null);
  const [admissionPrediction, setAdmissionPrediction] = useState<{ rating: string; comment: string } | null>(null);
  const [activeSection, setActiveSection] = useState<string>('form');
  const [showTestPattern, setShowTestPattern] = useState<boolean>(false);
  const [satInfoVisible, setSatInfoVisible] = useState<boolean>(false);

  // New state variables for enhanced features
  const [showFacts, setShowFacts] = useState<boolean>(false);
  const [showMerits, setShowMerits] = useState<boolean>(false);

  useEffect(() => {
    const uni = universities.find(u => u.id === universityId);
    if (uni) {
      setUniversity(uni);
      setSelectedProgram(uni.programs[0]);
      setFormData(prev => ({
        ...prev,
        entryTestType: uni.programs[0].testOptions[0]
      }));
    }
  }, [universityId]);

  useEffect(() => {
    // Hide SAT info when test type changes
    if (formData.entryTestType !== 'SAT') {
      setSatInfoVisible(false);
    } else {
      setSatInfoVisible(true);
    }
  }, [formData.entryTestType]);

  const handleProgramChange = (programId: string) => {
    if (university) {
      const program = university.programs.find(p => p.id === programId);
      if (program) {
        setSelectedProgram(program);
        setFormData(prev => ({
          ...prev,
          entryTestType: program.testOptions[0]
        }));
        setAggregate(null);
        setActiveSection('form');
      }
    }
  };

  const handleInputChange = (
    field: keyof FormData,
    subField: 'obtained' | 'total' | null,
    value: number | string | EducationType
  ) => {
    if (subField) {
      setFormData((prev: FormData) => ({
        ...prev,
        [field]: {
          ...prev[field as keyof Pick<FormData, 'matricMarks' | 'fscMarks' | 'entryTestMarks'>],
          [subField]: value
        }
      }));
    } else {
      setFormData((prev: FormData) => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const getPrediction = (aggregateScore: number) => {
    if (!selectedProgram || !selectedProgram.admissionChances) {
      return { rating: 'Unknown', comment: 'No prediction data available for this program.' };
    }
    
    const prediction = selectedProgram.admissionChances.find(
      chance => aggregateScore >= chance.min && aggregateScore <= chance.max
    );
    
    return prediction || { rating: 'Unknown', comment: 'Your score is outside the prediction range.' };
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'Very High':
        return 'bg-green-500';
      case 'High':
        return 'bg-blue-500';
      case 'Medium':
        return 'bg-yellow-500';
      case 'Low':
        return 'bg-orange-500';
      case 'Very Low':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const calculateAggregate = () => {
    if (!selectedProgram) return;

    const { formula } = selectedProgram;
    
    const matricPercentage = (formData.matricMarks.obtained / formData.matricMarks.total) * 100;
    const fscPercentage = (formData.fscMarks.obtained / formData.fscMarks.total) * 100;
    const testPercentage = (formData.entryTestMarks.obtained / formData.entryTestMarks.total) * 100;
    
    let calculatedAggregate = 0;
    
    // Special case for NUST with A-Level students (25% O-Level weightage)
    if (university?.id === "nust" && formData.educationType === 'A-Level') {
      calculatedAggregate = 
        (matricPercentage * 0.25) + 
        (fscPercentage * formula.intermediate) + 
        (testPercentage * formula.entryTest);
    } 
    // General case with uniform A-Level 10% bonus
    else {
      calculatedAggregate = 
        (matricPercentage * formula.matriculation) + 
        (fscPercentage * formula.intermediate) + 
        (testPercentage * formula.entryTest);
        
      // Apply A-Level bonus for other universities 
      if (formData.educationType === 'A-Level' && university?.id !== "nust") {
        calculatedAggregate *= 1.1; // 10% increase for A-Level students
      }
    }

    const finalAggregate = Math.min(100, calculatedAggregate);
    setAggregate(finalAggregate);
    
    // Get admission prediction
    const prediction = getPrediction(finalAggregate);
    setAdmissionPrediction(prediction);
    
    // No need for alert - we now display the information directly in the UI
    
    setActiveSection('results');
  };

  // Helper functions for new features
  const getCurrentUniversityData = () => {
    return university?.id ? universityData[university.id] || null : null;
  };

  const predictCurrentYearMerit = (merits: MeritData[]): number => {
    if (merits.length < 2) return merits[0]?.merit || 0;
    
    // Simple linear projection based on last two years
    const trend = merits[0].merit - merits[1].merit;
    return Math.round((merits[0].merit + trend) * 10) / 10;
  };

  const getMeritTrend = (merits: MeritData[]): 'increasing' | 'decreasing' | 'stable' => {
    if (merits.length < 2) return 'stable';
    const diff = merits[0].merit - merits[1].merit;
    if (diff > 1) return 'increasing';
    if (diff < -1) return 'decreasing';
    return 'stable';
  };

  // CSS to hide number input spinners
  const inputStyles = `
    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    input[type=number] {
      -moz-appearance: textfield;
    }
  `;

  if (!university || !selectedProgram) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <div className="glassmorphic-card p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-4 text-glow">University Not Found</h2>
          <p className="text-white mb-6">The university you're looking for doesn't exist or is not available yet.</p>
          <Link 
            to="/" 
            className="px-6 py-3 bg-electric-blue text-deep-space rounded-full font-medium inline-flex items-center hover:bg-soft-cyan transition-all duration-300 transform hover:scale-105 shadow-glow"
          >
            <span className="mr-2 w-5 h-5">←</span>
            Go Back Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-gray-100 pt-[70px] sm:pt-0 relative">
      <style>{inputStyles}</style>

      {/* University Banner - Now scrolls with content */}
      <div className="py-4 sm:py-5">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex flex-col items-center justify-center px-2">
            <div className="flex items-center gap-3">
              <GraduationCap className="h-7 w-7 sm:h-8 sm:w-8 text-electric-blue animate-bounce" />
              <h1 className="text-xl sm:text-2xl font-bold text-center text-gray-800 dark:text-white">
                {university.shortName} Aggregate Calculator
              </h1>
            </div>
            <p className="text-center mt-2 text-gray-600 dark:text-gray-300 max-w-[52rem] mx-auto text-sm sm:text-base">
              Calculate your aggregate for {university.name} programs
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-2 sm:px-4 pt-8 pb-12">
        <div className="max-w-[52rem] mx-auto glassmorphic-card p-4 sm:p-8 transform transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] border border-gray-700/30">
          {/* Tabs */}
          <div className="flex mb-4 sm:mb-8 border-b border-gray-700/50 overflow-x-auto no-scrollbar">
            <button 
              onClick={() => {setActiveSection('form'); setShowTestPattern(false); setShowFacts(false); setShowMerits(false);}} 
              className={`pb-2 sm:pb-3 px-3 sm:px-4 text-xs sm:text-base font-medium transition-all whitespace-nowrap flex items-center gap-1 sm:gap-2 flex-shrink-0 ${
                activeSection === 'form' && !showTestPattern ? 'text-electric-blue border-b-2 border-electric-blue' : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <Calculator className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
              <span>Calculator</span>
            </button>
            {aggregate !== null && (
              <button 
                onClick={() => {setActiveSection('results'); setShowTestPattern(false); setShowFacts(false); setShowMerits(false);}} 
                className={`pb-2 sm:pb-3 px-3 sm:px-4 text-xs sm:text-base font-medium transition-all whitespace-nowrap flex items-center gap-1 sm:gap-2 flex-shrink-0 ${
                  activeSection === 'results' && !showTestPattern ? 'text-electric-blue border-b-2 border-electric-blue' : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <TrendingUp className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
                <span>Results</span>
              </button>
            )}
            <button 
              onClick={() => {setShowTestPattern(true); setActiveSection(''); setShowFacts(false); setShowMerits(false);}} 
              className={`pb-2 sm:pb-3 px-3 sm:px-4 text-xs sm:text-base font-medium transition-all whitespace-nowrap flex items-center gap-1 sm:gap-2 flex-shrink-0 ${
                showTestPattern ? 'text-electric-blue border-b-2 border-electric-blue' : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <FileText className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
              <span>Pattern</span>
            </button>
            <button 
              onClick={() => {setShowFacts(true); setActiveSection(''); setShowTestPattern(false); setShowMerits(false);}} 
              className={`pb-2 sm:pb-3 px-3 sm:px-4 text-xs sm:text-base font-medium transition-all whitespace-nowrap flex items-center gap-1 sm:gap-2 flex-shrink-0 ${
                showFacts ? 'text-electric-blue border-b-2 border-electric-blue' : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <Star className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
              <span>Facts</span>
            </button>
            <button 
              onClick={() => {setShowMerits(true); setActiveSection(''); setShowTestPattern(false); setShowFacts(false);}} 
              className={`pb-2 sm:pb-3 px-3 sm:px-4 text-xs sm:text-base font-medium transition-all whitespace-nowrap flex items-center gap-1 sm:gap-2 flex-shrink-0 ${
                showMerits ? 'text-electric-blue border-b-2 border-electric-blue' : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <BarChart2 className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
              <span>Merit</span>
            </button>
          </div>

          {/* Form Section */}
          {activeSection === 'form' && (
            <div className="space-y-4 sm:space-y-6">
              {/* Program Selection */}
              <div className="space-y-2 sm:space-y-3">
                <label className="block text-xs sm:text-sm font-medium text-gray-300">Select Program</label>
                <select 
                  value={selectedProgram.id}
                  onChange={(e) => handleProgramChange(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-midnight-blue/60 rounded focus:ring-2 focus:ring-electric-blue outline-none transition-all duration-300 border border-gray-600/50"
                >
                  {university.programs.map(program => (
                    <option key={program.id} value={program.id}>{program.name}</option>
                  ))}
                </select>
              </div>

              {/* Education Type Selection */}
              <div className="space-y-2 sm:space-y-3">
                <label className="block text-xs sm:text-sm font-medium text-gray-300">Education System</label>
                <div className="flex flex-wrap gap-2 sm:gap-4">
                  {['FSc', 'A-Level'].map(type => (
                    <button
                      key={type}
                      onClick={() => handleInputChange('educationType', null, type as EducationType)}
                      className={`px-3 sm:px-4 py-2 text-xs sm:text-sm rounded transition-all duration-300 transform hover:scale-105 ${
                        formData.educationType === type 
                          ? 'bg-electric-blue text-deep-space shadow-lg' 
                          : 'bg-midnight-blue/70 text-gray-300 hover:bg-midnight-blue'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                {formData.educationType === 'A-Level' && (
                  <p className="text-xs text-electric-blue italic">
                    {/* A-Level students receive a 10% bonus in aggregate calculation */}
                  </p>
                )}
              </div>

              {/* Matric/O-Level Marks */}
              <div className="space-y-2 sm:space-y-3">
                <label className="block text-xs sm:text-sm font-medium text-gray-300">
                  {formData.educationType === 'FSc' ? 'Matric' : 'O-Level'} Marks
                </label>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                  <div className="flex-1 relative">
                    <input
                      type="number"
                      placeholder="Obtained marks"
                      value={formData.matricMarks.obtained || ''}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('matricMarks', 'obtained', Number(e.target.value))}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-midnight-blue/60 rounded focus:ring-2 focus:ring-electric-blue outline-none transition-all duration-300 border border-gray-600/50"
                    />
                    <span className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 text-[10px] sm:text-xs">marks</span>
                  </div>
                  <div className="flex-1 relative">
                    <input
                      type="number"
                      placeholder="Total marks"
                      value={formData.matricMarks.total}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('matricMarks', 'total', Number(e.target.value))}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-midnight-blue/60 rounded focus:ring-2 focus:ring-electric-blue outline-none transition-all duration-300 border border-gray-600/50"
                    />
                    <span className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 text-[10px] sm:text-xs">total</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400">Contributes {selectedProgram.formula.matriculation * 100}% to your aggregate score</p>
              </div>

              {/* FSc/A-Level Marks */}
              <div className="space-y-2 sm:space-y-3">
                <label className="block text-xs sm:text-sm font-medium text-gray-300">
                  {formData.educationType === 'FSc' ? 'Intermediate' : 'A-Level'} Marks
                </label>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                  <div className="flex-1 relative">
                    <input
                      type="number"
                      placeholder="Obtained marks"
                      value={formData.fscMarks.obtained || ''}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('fscMarks', 'obtained', Number(e.target.value))}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-midnight-blue/60 rounded focus:ring-2 focus:ring-electric-blue outline-none transition-all duration-300 border border-gray-600/50"
                    />
                    <span className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 text-[10px] sm:text-xs">marks</span>
                  </div>
                  <div className="flex-1 relative">
                    <input
                      type="number"
                      placeholder="Total marks"
                      value={formData.fscMarks.total}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('fscMarks', 'total', Number(e.target.value))}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-midnight-blue/60 rounded focus:ring-2 focus:ring-electric-blue outline-none transition-all duration-300 border border-gray-600/50"
                    />
                    <span className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 text-[10px] sm:text-xs">total</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400">Contributes {selectedProgram.formula.intermediate * 100}% to your aggregate score</p>
              </div>

              {/* Entry Test Selection */}
              <div className="space-y-2 sm:space-y-3">
                <label className="block text-xs sm:text-sm font-medium text-gray-300">Entry Test Type</label>
                <div className="flex gap-2 sm:gap-4 flex-wrap">
                  {selectedProgram.testOptions.map(type => (
                    <button
                      key={type}
                      onClick={() => handleInputChange('entryTestType', null, type)}
                      className={`px-3 sm:px-4 py-2 text-xs sm:text-sm rounded transition-all duration-300 transform hover:scale-105 ${
                        formData.entryTestType === type 
                          ? 'bg-electric-blue text-deep-space shadow-lg' 
                          : 'bg-midnight-blue/70 text-gray-300 hover:bg-midnight-blue'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                {satInfoVisible && (
                  <div className="mt-2 p-3 bg-soft-cyan/10 rounded border border-soft-cyan/30 text-sm text-gray-300">
                    <p><strong>Note:</strong> For SAT, FAST typically requires a minimum score of 1100. The calculation here is an estimate; please verify the current requirements on the FAST website.</p>
                  </div>
                )}
              </div>

              {/* Entry Test Marks */}
              <div className="space-y-2 sm:space-y-3">
                <label className="block text-xs sm:text-sm font-medium text-gray-300">Entry Test Marks</label>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                  <div className="flex-1 relative">
                    <input
                      type="number"
                      placeholder="Obtained marks"
                      value={formData.entryTestMarks.obtained || ''}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('entryTestMarks', 'obtained', Number(e.target.value))}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-midnight-blue/60 rounded focus:ring-2 focus:ring-electric-blue outline-none transition-all duration-300 border border-gray-600/50"
                    />
                    <span className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 text-[10px] sm:text-xs">marks</span>
                  </div>
                  <div className="flex-1 relative">
                    <input
                      type="number"
                      placeholder="Total marks"
                      value={formData.entryTestMarks.total}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('entryTestMarks', 'total', Number(e.target.value))}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-midnight-blue/60 rounded focus:ring-2 focus:ring-electric-blue outline-none transition-all duration-300 border border-gray-600/50"
                    />
                    <span className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 text-[10px] sm:text-xs">total</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400">Contributes {selectedProgram.formula.entryTest * 100}% to your aggregate score</p>
              </div>

              {/* Calculate Button */}
              <div className="flex justify-center mt-4 sm:mt-8">
                <button
                  onClick={calculateAggregate}
                  className="w-full sm:w-auto px-4 sm:px-8 py-2.5 bg-electric-blue text-deep-space rounded-lg hover:bg-soft-cyan transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2 text-sm sm:text-base font-medium"
                >
                  <Calculator className="h-4 w-4 sm:h-5 sm:w-5" />
                  Calculate Aggregate
                </button>
              </div>
            </div>
          )}

          {/* Test Pattern Section */}
          {showTestPattern && university && (
            <div className="space-y-6">
              <div className="bg-midnight-blue/20 p-6 sm:p-8 rounded-xl border border-gray-700/30">
                {/* Test Pattern Section */}
                <div className="space-y-6">
                  {(() => {
                    const testPattern = testPatterns.find(pattern => pattern.id === university.id);
                    if (!testPattern) return null;
                    
                    return (
                      <div className="bg-midnight-blue/20 p-6 sm:p-8 rounded-xl border border-gray-700/30 relative overflow-hidden">
                        <h3 className="font-semibold text-electric-blue mb-5 text-xl sm:text-2xl flex items-center">
                          <span className="bg-electric-blue/20 rounded-full p-2 mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-electric-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                          </span>
                          {testPattern.name}
                        </h3>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                          <div className="bg-midnight-blue/40 p-4 rounded-lg">
                            <h4 className="text-gray-300 text-sm uppercase tracking-wider mb-3">Format</h4>
                            <div className="flex justify-between items-center">
                              <span className="text-white font-medium text-base sm:text-lg">
                                {testPattern.pattern.totalMCQs} MCQs
                              </span>
                              <span className="text-white font-medium text-base sm:text-lg">
                                {testPattern.pattern.duration}
                              </span>
                            </div>
                          </div>
                          
                          <div className="bg-midnight-blue/40 p-4 rounded-lg">
                            <h4 className="text-gray-300 text-sm uppercase tracking-wider mb-3">Total Marks</h4>
                            <div className="text-white font-medium text-base sm:text-lg">
                              {testPattern.pattern.totalMarks} Marks
                            </div>
                          </div>
                        </div>

                        {testPattern.pattern.subjects.length > 0 && (
                          <div className="bg-midnight-blue/40 p-4 rounded-lg mb-6">
                            <h4 className="text-gray-300 text-sm uppercase tracking-wider mb-4">Subject Distribution</h4>
                            <div className="space-y-4">
                              <ul className="space-y-3">
                                {testPattern.pattern.subjects.map((subject, index) => (
                                  <li key={index} className="flex items-center">
                                    <span className="w-2 h-2 bg-electric-blue rounded-full mr-3"></span>
                                    <span className="flex-1">{subject.name}</span>
                                    <span className="text-gray-300 font-light">{subject.mcqs} MCQs</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}

                        {testPattern.pattern.notes && (
                          <div className="bg-midnight-blue/40 p-4 rounded-lg mb-6">
                            <h4 className="text-gray-300 text-sm uppercase tracking-wider mb-3">Additional Notes</h4>
                            <p className="text-white">
                              {testPattern.pattern.notes}
                            </p>
                          </div>
                        )}
                        
                        <div className="flex flex-row justify-between items-center mt-4 max-w-full">
                          <div>
                            {!testPattern.pattern.hasNegativeMarking && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-medium bg-green-500/20 text-green-400 border border-green-500/30 shadow-sm">
                                No Neg. Marking
                              </span>
                            )}
                            {testPattern.pattern.hasNegativeMarking && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-medium bg-red-500/20 text-red-400 border border-red-500/30 shadow-sm">
                                Has Neg. Marking
                              </span>
                            )}
                          </div>
                          <div>
                            {!testPattern.pattern.allowsCalculator && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-medium bg-red-500/20 text-red-400 border border-red-500/30 shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                No Calculator
                              </span>
                            )}
                            {testPattern.pattern.allowsCalculator && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-medium bg-green-500/20 text-green-400 border border-green-500/30 shadow-sm">
                                Calculator Allowed
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                <div className="p-3 sm:p-4 bg-soft-cyan/10 rounded-lg border border-soft-cyan/30 text-sm">
                  <p className="text-gray-300"><strong>Note:</strong> Test patterns may change. Always verify the latest information from the official university websites before your test.</p>
                </div>
              </div>
            </div>
          )}

          {/* Results Section */}
          {activeSection === 'results' && aggregate !== null && !showTestPattern && !showFacts && !showMerits && (
            <div className="space-y-6">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-electric-blue">Your Aggregate Results</h2>
              
              {/* Score Display */}
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-44 md:h-44 flex items-center justify-center rounded-full bg-midnight-blue/30 border-6 sm:border-8 border-electric-blue/30">
                  <div className="text-center w-full px-1.5 sm:px-2">
                    <span className="block text-2xl sm:text-2xl md:text-3xl font-bold text-electric-blue">{aggregate.toFixed(2)}%</span>
                    <span className="text-[11px] sm:text-xs text-gray-300">Aggregate Score</span>
                    {admissionPrediction && (
                      <div className="mt-1 sm:mt-1.5 flex justify-center">
                        <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] sm:text-xs ${getRatingColor(admissionPrediction.rating)} text-deep-space font-medium whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[90%]`}>
                          {admissionPrediction.rating} Chance
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Score Breakdown */}
              <div className="space-y-3 bg-midnight-blue/20 p-3 sm:p-4 rounded-lg">
                <h3 className="font-medium text-base sm:text-lg text-gray-200">Score Breakdown</h3>
                <div className="space-y-2 sm:space-y-3 px-1">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-400">
                      {formData.educationType === 'FSc' ? 'Matric' : 'O-Level'} 
                      {university?.id === "nust" && formData.educationType === 'A-Level' ? 
                        ' (25%)' : ` (${selectedProgram.formula.matriculation * 100}%)`}:
                    </span>
                    <span className="text-electric-blue font-medium">
                      {((formData.matricMarks.obtained / formData.matricMarks.total) * 100).toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-400">{formData.educationType === 'FSc' ? 'Intermediate' : 'A-Level'} ({selectedProgram.formula.intermediate * 100}%):</span>
                    <span className="text-electric-blue font-medium">
                      {((formData.fscMarks.obtained / formData.fscMarks.total) * 100).toFixed(2)}%
                    </span>
                  </div>
                  {selectedProgram.formula.entryTest > 0 && (
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-gray-400">{formData.entryTestType} ({selectedProgram.formula.entryTest * 100}%):</span>
                      <span className="text-electric-blue font-medium">
                        {((formData.entryTestMarks.obtained / formData.entryTestMarks.total) * 100).toFixed(2)}%
                      </span>
                    </div>
                  )}
                  {university?.id === "itu" && (
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-gray-400">Interview (20%):</span>
                      <span className="text-gray-300 font-medium">Not included in this calculator</span>
                    </div>
                  )}
                  {formData.educationType === 'A-Level' && university?.id !== "nust" && (
                    <div className="flex justify-between text-xs sm:text-sm">
                      {/* <span className="text-gray-400">A-Level Bonus (10%):</span> */}
                      {/* <span className="text-green-400 font-medium">Applied</span> */}
                    </div>
                  )}
                </div>
              </div>

              {/* Eligibility Table */}
              <div className="mt-8">
                <EligibilityTable aggregate={aggregate} universityId={universityId} />
              </div>

              <div className="mt-4 flex items-start gap-2 text-sm p-4 bg-electric-blue/10 rounded-lg border border-electric-blue/30">
                <Info className="h-5 w-5 flex-shrink-0 text-electric-blue" />
                <p className="text-gray-300">
                  {university.id === "nust" && formData.educationType === 'A-Level' ? (
                    <>Based on the {university.name} admission formula for A-Level students: O-Level (25%) + A-Level ({selectedProgram.formula.intermediate * 100}%) + {formData.entryTestType} ({selectedProgram.formula.entryTest * 100}%)</>
                  ) : (
                    <>Based on the {university.name} admission formula: {formData.educationType === 'FSc' ? 'Matric' : 'O-Level'} ({selectedProgram.formula.matriculation * 100}%) + {formData.educationType} ({selectedProgram.formula.intermediate * 100}%) + {formData.entryTestType} ({selectedProgram.formula.entryTest * 100}%)</>
                  )}
                  {formData.educationType === 'A-Level' && university.id !== "nust" && ' with 10% additional weightage for A-Level students.'}
                  {university.id === "itu" && ' plus 20% weightage for interview performance.'}
                </p>
              </div>

              {/* Admission Prediction */}
              {admissionPrediction && (
                <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-midnight-blue/20 rounded-lg border border-electric-blue/30">
                  <h3 className="font-medium text-electric-blue mb-2">Admission Prediction</h3>
                  <p className="text-sm text-gray-300">
                    <span className={`inline-block mr-2 px-2 py-1 rounded text-xs ${getRatingColor(admissionPrediction.rating)} text-deep-space font-medium`}>
                      {admissionPrediction.rating}
                    </span>
                    {admissionPrediction.comment}
                  </p>
                </div>
              )}

              {/* Important Notes */}
              <div className="p-3 sm:p-4 bg-midnight-blue bg-opacity-30 rounded-lg">
                <h3 className="text-sm font-medium text-electric-blue mb-2">Important Notes</h3>
                <ul className="text-xs text-white space-y-1">
                  <li>• This is an estimate based on official formulas but does not guarantee admission.</li>
                  <li>• Admission chances may vary based on the number of applicants and available seats.</li>
                  <li>• The admission prediction is based on historical data and trends at each university.</li>
                  <li>• Check the university website for the most current admission criteria.</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex mt-4 sm:mt-6">
                <div className="flex justify-center w-full">
                  <button
                    onClick={() => setActiveSection('form')}
                    className="px-6 py-2.5 bg-midnight-blue text-white rounded-lg hover:bg-midnight-blue/80 transition-all duration-300 text-sm sm:text-base font-medium"
                  >
                    Edit Information
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Interesting Facts Section */}
          {showFacts && (
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-electric-blue flex items-center">
                <Star className="h-7 w-7 mr-3 text-electric-blue" />
                Interesting Facts About {university.shortName}
              </h2>
              
              {getCurrentUniversityData()?.facts && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {getCurrentUniversityData()!.facts.map((fact, index) => (
                    <div 
                      key={index}
                      className="bg-midnight-blue/20 p-6 rounded-xl border border-gray-700/30 hover:border-electric-blue/50 transition-all duration-300"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 p-3 bg-electric-blue/20 rounded-full text-electric-blue">
                          {fact.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white mb-2">{fact.title}</h3>
                          <p className="text-gray-300 text-sm mb-3">{fact.description}</p>
                          {fact.highlight && (
                            <div className="inline-flex items-center px-3 py-1 bg-electric-blue/10 rounded-full border border-electric-blue/30">
                              <span className="text-electric-blue font-medium text-xs">{fact.highlight}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Merit Analysis Section */}
          {showMerits && (
            <div className="space-y-6">
              <MeritAnalysis universityId={university.id} />
            </div>
          )}
        </div>

        {/* Additional Resources */}
        <div className="max-w-2xl mx-auto mt-6 sm:mt-8">
          <div className="flex justify-center">
            <a
              href="https://chat.whatsapp.com/Cat16toNG2FHVNbSuel3FG"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-md text-xs sm:text-base font-medium"
            >
              <FaWhatsapp className="h-3 w-3 sm:h-5 sm:w-5" />
              Join Entry Test Group
            </a>
          </div>
        </div>
      </main>

      {/* Breadcrumbs at the bottom */}
      <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-4 mb-4">
        <div className="flex items-center text-sm max-w-[52rem] mx-auto">
          <Link 
            to="/" 
            className="text-electric-blue hover:text-soft-cyan transition-colors duration-300"
          >
            Home
          </Link>
          <ChevronLeft className="mx-2 w-4 h-4 text-muted-purple" />
          <span className="text-white">{university.name}</span>
        </div>
      </div>
    </div>
  );
};

export default CalculatorPage;
