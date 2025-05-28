import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator } from 'lucide-react';
import { Program } from '../../data/universities';

interface CalculatorFormProps {
  program: Program;
  testType: string;
  onCalculate: (matriculation: number, intermediate: number, entryTest: number) => void;
  isCalculated: boolean;
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({ program, testType, onCalculate, isCalculated }) => {
  const [matriculation, setMatriculation] = useState<number>(program.minimumCriteria.matriculation);
  const [intermediate, setIntermediate] = useState<number>(program.minimumCriteria.intermediate);
  const [entryTest, setEntryTest] = useState<number>(program.minimumCriteria.entryTest);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateInputs = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (matriculation < 0 || matriculation > 100) {
      newErrors.matriculation = 'Must be between 0 and 100';
    }
    
    if (intermediate < 0 || intermediate > 100) {
      newErrors.intermediate = 'Must be between 0 and 100';
    }
    
    if (entryTest < 0 || entryTest > 100) {
      newErrors.entryTest = 'Must be between 0 and 100';
    }
    
    if (matriculation < program.minimumCriteria.matriculation) {
      newErrors.matriculation = `Minimum required is ${program.minimumCriteria.matriculation}%`;
    }
    
    if (intermediate < program.minimumCriteria.intermediate) {
      newErrors.intermediate = `Minimum required is ${program.minimumCriteria.intermediate}%`;
    }
    
    if (entryTest < program.minimumCriteria.entryTest) {
      newErrors.entryTest = `Minimum required is ${program.minimumCriteria.entryTest}%`;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateInputs()) {
      onCalculate(matriculation, intermediate, entryTest);
    }
  };

  return (
    <form onSubmit={handleCalculate} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative">
          <input
            type="number"
            id="matriculation"
            className="input-field bg-midnight-blue bg-opacity-50 transition-all duration-300 focus:ring-2 focus:ring-electric-blue"
            placeholder=" "
            min="0"
            max="100"
            value={matriculation}
            onChange={(e) => setMatriculation(Number(e.target.value))}
          />
          <label htmlFor="matriculation" className="floating-label">
            Matriculation Percentage (%)
          </label>
          {errors.matriculation && (
            <p className="text-danger text-xs mt-1">{errors.matriculation}</p>
          )}
        </div>
        
        <div className="relative">
          <input
            type="number"
            id="intermediate"
            className="input-field bg-midnight-blue bg-opacity-50 transition-all duration-300 focus:ring-2 focus:ring-electric-blue"
            placeholder=" "
            min="0"
            max="100"
            value={intermediate}
            onChange={(e) => setIntermediate(Number(e.target.value))}
          />
          <label htmlFor="intermediate" className="floating-label">
            Intermediate Percentage (%)
          </label>
          {errors.intermediate && (
            <p className="text-danger text-xs mt-1">{errors.intermediate}</p>
          )}
        </div>
      </div>
      
      <div className="relative">
        <input
          type="number"
          id="entryTest"
          className="input-field bg-midnight-blue bg-opacity-50 transition-all duration-300 focus:ring-2 focus:ring-electric-blue"
          placeholder=" "
          min="0"
          max="100"
          value={entryTest}
          onChange={(e) => setEntryTest(Number(e.target.value))}
        />
        <label htmlFor="entryTest" className="floating-label">
          {testType} Score (%)
        </label>
        {errors.entryTest && (
          <p className="text-danger text-xs mt-1">{errors.entryTest}</p>
        )}
      </div>
      
      <motion.button
        type="submit"
        className="w-full px-6 py-3 bg-electric-blue text-deep-space rounded-full font-medium flex items-center justify-center hover:bg-soft-cyan transition-all duration-300 transform hover:scale-105"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        animate={isCalculated ? { y: [0, -5, 0], transition: { duration: 0.5 } } : {}}
      >
        <Calculator className="mr-2 w-5 h-5" />
        {isCalculated ? 'Recalculate' : 'Calculate Aggregate'}
      </motion.button>
    </form>
  );
};

export default CalculatorForm;