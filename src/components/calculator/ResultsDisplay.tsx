import React from 'react';
import { motion } from 'framer-motion';
import { Formula } from '../../data/universities';

interface ResultsDisplayProps {
  result: {
    matriculationContribution: number;
    intermediateContribution: number;
    entryTestContribution: number;
    aggregate: number;
    admissionChance: string;
  };
  formula: Formula;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, formula }) => {
  const getChanceColor = (chance: string) => {
    switch (chance) {
      case 'Excellent':
        return 'bg-success';
      case 'Very Good':
        return 'bg-soft-cyan';
      case 'Good':
        return 'bg-electric-blue';
      case 'Moderate':
        return 'bg-warning';
      case 'Low':
        return 'bg-danger';
      default:
        return 'bg-muted-purple';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-2/3">
          <div>
            <h3 className="text-sm text-electric-blue mb-4">Contribution Breakdown</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1 text-white">
                  <span>Matriculation ({formula.matriculation * 100}%)</span>
                  <span>{result.matriculationContribution.toFixed(2)}%</span>
                </div>
                <div className="progress-bar-container">
                  <motion.div 
                    className="progress-bar bg-soft-cyan"
                    initial={{ width: 0 }}
                    animate={{ width: `${result.matriculationContribution}%` }}
                    transition={{ duration: 1, delay: 0.1 }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-xs mb-1 text-white">
                  <span>Intermediate ({formula.intermediate * 100}%)</span>
                  <span>{result.intermediateContribution.toFixed(2)}%</span>
                </div>
                <div className="progress-bar-container">
                  <motion.div 
                    className="progress-bar bg-electric-blue"
                    initial={{ width: 0 }}
                    animate={{ width: `${result.intermediateContribution}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-xs mb-1 text-white">
                  <span>Entry Test ({formula.entryTest * 100}%)</span>
                  <span>{result.entryTestContribution.toFixed(2)}%</span>
                </div>
                <div className="progress-bar-container">
                  <motion.div 
                    className="progress-bar bg-muted-purple"
                    initial={{ width: 0 }}
                    animate={{ width: `${result.entryTestContribution}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:w-1/3">
          <div className="h-full flex flex-col justify-center items-center p-4 bg-midnight-blue bg-opacity-50 rounded-lg">
            <h3 className="text-sm text-electric-blue mb-3">Total Aggregate</h3>
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold text-white mb-2"
            >
              {result.aggregate.toFixed(2)}%
            </motion.div>
            <div className={`px-3 py-1 rounded-full text-xs ${getChanceColor(result.admissionChance)} text-deep-space font-medium`}>
              {result.admissionChance} Chance
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-midnight-blue bg-opacity-30 rounded-lg">
        <h3 className="text-sm font-medium text-electric-blue mb-2">Important Notes</h3>
        <ul className="text-xs text-white space-y-1">
          <li>• This is an estimate based on official formulas but does not guarantee admission.</li>
          <li>• Admission chances may vary based on the number of applicants and available seats.</li>
          <li>• Check the university website for the most current admission criteria.</li>
        </ul>
      </div>
    </div>
  );
};

export default ResultsDisplay;