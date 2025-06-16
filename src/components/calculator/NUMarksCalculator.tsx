import React, { useState } from 'react';
import { X, Calculator } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import './nu-calculator.css';

interface SectionData {
  attempted: number | string;
  correct: number | string;
}

interface FormData {
  advancedMaths: SectionData;
  basicMaths: SectionData;
  iq: SectionData;
  english: SectionData;
}

interface NUMarksCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

const NUMarksCalculator: React.FC<NUMarksCalculatorProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    advancedMaths: { attempted: '', correct: '' },
    basicMaths: { attempted: '', correct: '' },
    iq: { attempted: '', correct: '' },
    english: { attempted: '', correct: '' }
  });

  const [result, setResult] = useState<number | null>(null);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const sectionLimits = {
    advancedMaths: { total: 50, name: 'Advanced Maths' },
    basicMaths: { total: 20, name: 'Basic Maths' },
    iq: { total: 20, name: 'IQ' },
    english: { total: 30, name: 'English' }
  };

  const validateInputs = (): boolean => {
    const newErrors: {[key: string]: string} = {};

    Object.entries(formData).forEach(([section, data]) => {
      const limit = sectionLimits[section as keyof typeof sectionLimits];
      const attempted = Number(data.attempted) || 0;
      const correct = Number(data.correct) || 0;
      
      if (attempted < 0 || attempted > limit.total) {
        newErrors[`${section}_attempted`] = `Must be between 0 and ${limit.total}`;
      }
      
      if (correct < 0 || correct > attempted) {
        newErrors[`${section}_correct`] = `Must be between 0 and ${attempted}`;
      }
      
      if (correct > limit.total) {
        newErrors[`${section}_correct`] = `Cannot exceed ${limit.total}`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateMarks = (): void => {
    if (!validateInputs()) return;

    let totalMarks = 0;

    // Advanced Maths, Basic Maths, IQ: +1 for correct, -0.25 for incorrect
    ['advancedMaths', 'basicMaths', 'iq'].forEach(section => {
      const data = formData[section as keyof FormData];
      const correct = Number(data.correct) || 0;
      const attempted = Number(data.attempted) || 0;
      const incorrect = attempted - correct;
      totalMarks += correct * 1 - incorrect * 0.25;
    });

    // English: +0.33 for correct, -0.0825 for incorrect
    const englishData = formData.english;
    const englishCorrect = Number(englishData.correct) || 0;
    const englishAttempted = Number(englishData.attempted) || 0;
    const englishIncorrect = englishAttempted - englishCorrect;
    totalMarks += englishCorrect * 0.33 - englishIncorrect * 0.0825;

    // Ensure marks don't go below 0
    totalMarks = Math.max(0, totalMarks);

    setResult(Math.round(totalMarks * 100) / 100);
  };

  const handleInputChange = (
    section: keyof FormData,
    field: keyof SectionData,
    value: string
  ): void => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    
    // Clear result when inputs change
    if (result !== null) {
      setResult(null);
    }
  };

  const resetForm = (): void => {
    setFormData({
      advancedMaths: { attempted: '', correct: '' },
      basicMaths: { attempted: '', correct: '' },
      iq: { attempted: '', correct: '' },
      english: { attempted: '', correct: '' }
    });
    setResult(null);
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4"
      onClick={onClose}
    >
      <div 
        className="nu-calculator bg-slate-900 rounded-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-slate-700">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center">
            <Calculator className="mr-2 h-5 w-5" />
            NU Marks Calculator
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-slate-300 p-2 rounded-md hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4">
          {/* Result Display - Show at top when available */}
          {result !== null && (
            <div className="mb-4 bg-gradient-to-r from-green-800 to-green-700 rounded-lg p-3 border border-green-600 text-center">
              <h3 className="text-base font-bold text-white mb-1">Your NU Score</h3>
              <div className="text-xl sm:text-2xl font-bold text-green-200">
                {result.toFixed(2)} / 100
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Input Sections - Compact Design */}
            {Object.entries(sectionLimits).map(([section, config]) => (
              <div key={section} className="bg-slate-800 rounded-lg p-3 border border-slate-700">
                <h3 className="text-sm font-semibold text-white mb-2">
                  {config.name} ({config.total} MCQs)
                </h3>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">Attempted</label>
                    <input
                      type="number"
                      min="0"
                      max={config.total}
                      value={formData[section as keyof FormData].attempted}
                      onChange={(e) => handleInputChange(section as keyof FormData, 'attempted', e.target.value)}
                      className="w-full px-2 py-2 text-sm bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-500"
                      placeholder={`0-${config.total}`}
                    />
                    {errors[`${section}_attempted`] && (
                      <p className="text-red-400 text-xs mt-1">{errors[`${section}_attempted`]}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 mb-1">Correct</label>
                    <input
                      type="number"
                      min="0"
                      max={Number(formData[section as keyof FormData].attempted) || config.total}
                      value={formData[section as keyof FormData].correct}
                      onChange={(e) => handleInputChange(section as keyof FormData, 'correct', e.target.value)}
                      className="w-full px-2 py-2 text-sm bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-500"
                      placeholder={formData[section as keyof FormData].attempted ? `0-${formData[section as keyof FormData].attempted}` : '0'}
                    />
                    {errors[`${section}_correct`] && (
                      <p className="text-red-400 text-xs mt-1">{errors[`${section}_correct`]}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={calculateMarks}
              className="flex-1 bg-slate-600 hover:bg-slate-700 active:bg-slate-800 text-white font-medium py-2.5 px-4 rounded text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 transition-colors duration-200"
            >
              Calculate NU Marks
            </button>
            <button
              onClick={resetForm}
              className="bg-slate-700 hover:bg-slate-800 active:bg-slate-900 text-white font-medium py-2.5 px-4 rounded text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 transition-colors duration-200"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NUMarksCalculator; 