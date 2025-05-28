import React from 'react';

interface TestPatternIndicatorsProps {
  hasNegativeMarking: boolean;
  hasCalculator: boolean;
  negativeMarkingValue?: string;
}

export const TestPatternIndicators: React.FC<TestPatternIndicatorsProps> = ({
  hasNegativeMarking,
  hasCalculator,
  negativeMarkingValue = '-0.25',
}) => {
  return (
    <div className="flex justify-between w-full mt-3">
      {hasNegativeMarking ? (
        <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
          {negativeMarkingValue} Neg.
        </span>
      ) : (
        <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
          No Neg. Marking
        </span>
      )}
      
      <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${
        hasCalculator 
          ? 'bg-green-500/20 text-green-400 border-green-500/30' 
          : 'bg-red-500/20 text-red-400 border-red-500/30'
      } border`}>
        {hasCalculator ? 'Calculator Allowed' : 'No Calculator'}
      </span>
    </div>
  );
};
