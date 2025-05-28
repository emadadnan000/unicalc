import React from 'react';
import meritData, { ProgramMerit } from '../data/meritData';
import { ChevronRight } from 'lucide-react';

interface EligibilityTableProps {
  aggregate: number;
  universityId: string | undefined;
}

const EligibilityTable: React.FC<EligibilityTableProps> = ({ aggregate, universityId }) => {
  const getEligiblePrograms = () => {
    const eligiblePrograms: {
      university: string;
      campus: string;
      programs: (ProgramMerit & { eligibilityStatus: 'High' | 'Medium' | 'Low' })[];
    }[] = [];

    // Filter universities to only include the current one if universityId is provided
    const universitiesToCheck = universityId 
      ? meritData.filter(u => u.id === universityId)
      : meritData;

    universitiesToCheck.forEach(university => {
      university.campuses.forEach(campus => {
        const eligibleProgramsInCampus = campus.programs.filter(program => {
          if (typeof program.merit === 'string') {
            if (program.merit.includes('-')) {
              const [min] = program.merit.split('-').map(Number);
              return aggregate >= (min - 2); // Consider eligible if within 2% of lower bound
            }
            if (program.merit.includes('/')) {
              return true; // For NUST-style merit numbers, show all programs
            }
            if (program.merit.startsWith('#')) {
              return true; // For GIKI-style merit numbers, show all programs
            }
            return false;
          }
          return aggregate >= (program.merit - 2); // Consider eligible if within 2% of merit
        });

        if (eligibleProgramsInCampus.length > 0) {
          const programsWithStatus = eligibleProgramsInCampus.map(program => ({
            ...program,
            eligibilityStatus: getEligibilityStatus(aggregate, program.merit)
          }));

          eligiblePrograms.push({
            university: university.name,
            campus: campus.campus,
            programs: programsWithStatus
          });
        }
      });
    });

    return eligiblePrograms;
  };

  const getEligibilityStatus = (aggregate: number, merit: number | string): 'High' | 'Medium' | 'Low' => {
    if (typeof merit === 'string') {
      if (merit.includes('-')) {
        const [min] = merit.split('-').map(Number);
        const diff = aggregate - min;
        if (diff >= 3) return 'High';
        if (diff >= 0) return 'Medium';
        return 'Low';
      }
      return 'Medium'; // For special cases like NUST and GIKI
    }

    const diff = aggregate - merit;
    if (diff >= 3) return 'High';
    if (diff >= 0) return 'Medium';
    return 'Low';
  };

  const getStatusColor = (status: 'High' | 'Medium' | 'Low') => {
    switch (status) {
      case 'High':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Low':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
    }
  };

  const eligiblePrograms = getEligiblePrograms();

  if (eligiblePrograms.length === 0) {
    return (
      <div className="p-6 text-center bg-midnight-blue/20 rounded-xl border border-gray-700/30">
        <p className="text-gray-300">No eligible programs found with your current aggregate.</p>
        <p className="text-sm text-gray-400 mt-2">Try improving your scores or consider other programs.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg sm:text-xl font-semibold text-electric-blue">Eligible Programs</h3>
      
      <div className="space-y-4 sm:space-y-6">
        {eligiblePrograms.map((uni, index) => (
          <div key={index} className="bg-midnight-blue/20 p-3 sm:p-4 rounded-xl border border-gray-700/30">
            <div className="flex items-center mb-3 sm:mb-4">
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-electric-blue mr-2" />
              <h4 className="text-base sm:text-lg font-medium text-white">
                {uni.university} - {uni.campus}
              </h4>
            </div>
            
            <div className="space-y-3">
              {uni.programs.map((program, idx) => (
                <div key={idx} className="bg-midnight-blue/10 p-3 rounded-lg border border-gray-700/30">
                  <div className="flex flex-col space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="text-sm font-medium text-white">{program.name}</h5>
                        {(program.shift || program.category) && (
                          <div className="flex gap-2 mt-1">
                            {program.shift && <span className="text-[10px] text-gray-400">{program.shift}</span>}
                            {program.category && <span className="text-[10px] text-gray-400">{program.category}</span>}
                          </div>
                        )}
                      </div>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-medium ${getStatusColor(program.eligibilityStatus)}`}>
                        {program.eligibilityStatus} Chance
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-300">
                      <span>Last Merit:</span>
                      <span>{program.merit}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 sm:p-4 bg-electric-blue/10 rounded-lg border border-electric-blue/30 mt-4">
        <p className="text-xs sm:text-sm text-gray-300">
          <strong>Note:</strong> Eligibility is calculated based on last year's merit. Actual chances may vary based on competition and available seats.
        </p>
      </div>
    </div>
  );
};

export default EligibilityTable; 
