import React, { useState } from 'react';
import { X, Calculator } from 'lucide-react';
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="nu-calculator bg-slate-900 rounded-lg w-full max-w-4xl max-h-[95vh] sm:max-h-screen overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-700">
          <h2 className="text-lg sm:text-2xl font-bold text-white flex items-center">
            <Calculator className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
            NU Marks Calculator
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-slate-300 p-2 rounded-md hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Input Sections */}
            {Object.entries(sectionLimits).map(([section, config]) => (
              <div key={section} className="bg-slate-800 rounded-lg p-3 sm:p-4 border border-slate-700">
                <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
                  {config.name} ({config.total} MCQs)
                </h3>
                
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">
                      Attempted MCQs
                    </label>
                    <input
                      type="number"
                      min="0"
                      max={config.total}
                      value={formData[section as keyof FormData].attempted}
                      onChange={(e) => handleInputChange(section as keyof FormData, 'attempted', e.target.value)}
                      className="w-full px-3 sm:px-4 py-3 text-base bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                      placeholder={`Enter 0-${config.total}`}
                    />
                    {errors[`${section}_attempted`] && (
                      <p className="text-red-400 text-xs mt-1">{errors[`${section}_attempted`]}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">
                      Correct MCQs
                    </label>
                    <input
                      type="number"
                      min="0"
                      max={Number(formData[section as keyof FormData].attempted) || config.total}
                      value={formData[section as keyof FormData].correct}
                      onChange={(e) => handleInputChange(section as keyof FormData, 'correct', e.target.value)}
                      className="w-full px-3 sm:px-4 py-3 text-base bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                      placeholder={formData[section as keyof FormData].attempted ? `Enter 0-${formData[section as keyof FormData].attempted}` : 'Enter attempted first'}
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
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-6">
            <button
              onClick={calculateMarks}
              className="flex-1 bg-slate-600 hover:bg-slate-700 active:bg-slate-800 text-white font-medium py-3 sm:py-4 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 text-base transition-colors duration-200"
            >
              Calculate NU Marks
            </button>
            <button
              onClick={resetForm}
              className="flex-1 bg-slate-700 hover:bg-slate-800 active:bg-slate-900 text-white font-medium py-3 sm:py-4 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 text-base transition-colors duration-200"
            >
              Reset Form
            </button>
          </div>

          {/* Result Display */}
          {result !== null && (
            <div className="mt-4 sm:mt-6 bg-slate-800 rounded-lg p-4 sm:p-6 border border-slate-700 text-center">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">Your NU Marks</h3>
              <div className="text-2xl sm:text-3xl font-bold text-slate-300 mb-2">
                {result.toFixed(2)} / 100
              </div>
              <div className="text-sm sm:text-base text-slate-200">
                Marks calculated based on NU test pattern
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default NUMarksCalculator; 