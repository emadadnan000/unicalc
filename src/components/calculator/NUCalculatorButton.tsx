import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import NUMarksCalculator from './NUMarksCalculator';

interface NUCalculatorButtonProps {
  className?: string;
  variant?: 'primary' | 'secondary';
}

const NUCalculatorButton: React.FC<NUCalculatorButtonProps> = ({ 
  className = '', 
  variant = 'primary' 
}) => {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  const baseClasses = "flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500";
  
  const variantClasses = {
    primary: "bg-slate-600 hover:bg-slate-700 text-white px-6 py-3",
    secondary: "bg-slate-700 hover:bg-slate-800 text-white px-4 py-2 text-sm"
  };

  return (
    <>
      <button
        onClick={() => setIsCalculatorOpen(true)}
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      >
        <Calculator className="mr-2 h-5 w-5" />
        NU Marks Calculator
      </button>

      <NUMarksCalculator
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />
    </>
  );
};

export default NUCalculatorButton; 