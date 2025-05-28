import React, { useState } from 'react';
import { TrendingUp, Search } from 'lucide-react';
import meritData, { UniversityMerit } from '../data/meritData';

interface MeritAnalysisProps {
  universityId?: string;
}

const MeritAnalysis: React.FC<MeritAnalysisProps> = ({ universityId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCampus, setSelectedCampus] = useState<string>('all');

  const filteredData: UniversityMerit[] = universityId 
    ? meritData.filter(uni => uni.id === universityId)
    : meritData;

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filterPrograms = (programs: UniversityMerit[]) => {
    return programs.filter(uni => {
      const matchesSearch = searchTerm === '' || 
        uni.name.toLowerCase().includes(searchTerm) ||
        uni.campuses.some(campus => 
          campus.campus.toLowerCase().includes(searchTerm) ||
          campus.programs.some(prog => prog.name.toLowerCase().includes(searchTerm))
        );
      return matchesSearch;
    });
  };

  return (
    <div className="space-y-6">
      {!universityId && (
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-electric-blue flex items-center text-center sm:text-left">
            <TrendingUp className="h-6 w-6 sm:h-7 sm:w-7 mr-2 sm:mr-3 flex-shrink-0" />
            <span>Merit Analysis 2024</span>
          </h2>
          
          <div className="relative w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search universities, programs..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full sm:w-64 px-4 py-2 text-sm sm:text-base bg-midnight-blue/60 rounded-lg focus:ring-2 focus:ring-electric-blue outline-none transition-all duration-300 border border-gray-600/50 pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>
      )}

      <div className="space-y-6">
        {filterPrograms(filteredData).map((university) => (
          <div key={university.id} className="bg-midnight-blue/20 rounded-xl border border-gray-700/30 overflow-hidden">
            {/* University Header */}
            <div className="p-3 sm:p-4 border-b border-gray-700/30 bg-midnight-blue/40">
              <h3 className="text-lg sm:text-xl font-semibold text-white">{university.name}</h3>
            </div>

            {/* Campus Tabs - Only show on desktop */}
            {university.campuses.length > 1 && (
              <div className="hidden sm:flex overflow-x-auto border-b border-gray-700/30 bg-midnight-blue/30">
                <button
                  onClick={() => setSelectedCampus('all')}
                  className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCampus === 'all'
                      ? 'text-electric-blue border-b-2 border-electric-blue'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  All Campuses
                </button>
                {university.campuses.map((campus) => (
                  <button
                    key={campus.campus}
                    onClick={() => setSelectedCampus(campus.campus)}
                    className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                      selectedCampus === campus.campus
                        ? 'text-electric-blue border-b-2 border-electric-blue'
                        : 'text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    {campus.campus}
                  </button>
                ))}
              </div>
            )}

            {/* Merit Data */}
            <div className="p-3 sm:p-4">
              {university.campuses
                .filter(campus => selectedCampus === 'all' || selectedCampus === campus.campus)
                .map((campus) => (
                  <div key={campus.campus} className="mb-6 last:mb-0">
                    <h4 className="text-base sm:text-lg font-medium text-electric-blue mb-3">{campus.campus}</h4>
                    
                    {/* Mobile View */}
                    <div className="sm:hidden space-y-3">
                      {campus.programs.map((program, idx) => (
                        <div key={idx} className="bg-midnight-blue/30 p-3 rounded-lg border border-gray-700/20">
                          <div className="space-y-2">
                            <div className="text-sm text-gray-200 font-medium">{program.name}</div>
                            <div className="flex flex-wrap gap-2 text-xs">
                              <div className="bg-midnight-blue/40 px-2 py-1 rounded">
                                <span className="text-gray-400">Merit:</span>
                                <span className="ml-1 text-electric-blue">{program.merit}</span>
                              </div>
                              {program.shift && (
                                <div className="bg-midnight-blue/40 px-2 py-1 rounded">
                                  <span className="text-gray-400">Shift:</span>
                                  <span className="ml-1 text-gray-300">{program.shift}</span>
                                </div>
                              )}
                              {program.category && (
                                <div className="bg-midnight-blue/40 px-2 py-1 rounded">
                                  <span className="text-gray-400">Category:</span>
                                  <span className="ml-1 text-gray-300">{program.category}</span>
                                </div>
                              )}
                              {program.seats && (
                                <div className="bg-midnight-blue/40 px-2 py-1 rounded">
                                  <span className="text-gray-400">Seats:</span>
                                  <span className="ml-1 text-gray-300">{program.seats}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Desktop View */}
                    <div className="hidden sm:block">
                      <table className="w-full">
                        <thead>
                          <tr className="text-left text-sm text-gray-400">
                            <th className="pb-2 font-medium px-2">Program</th>
                            <th className="pb-2 font-medium px-2">Last Merit</th>
                            {campus.programs.some(p => p.shift) && (
                              <th className="pb-2 font-medium px-2">Shift</th>
                            )}
                            {campus.programs.some(p => p.category) && (
                              <th className="pb-2 font-medium px-2">Category</th>
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {campus.programs.map((program, idx) => (
                            <tr key={idx} className="border-t border-gray-700/30">
                              <td className="py-2 px-2 text-sm text-gray-200">{program.name}</td>
                              <td className="py-2 px-2 text-sm text-gray-300">{program.merit}</td>
                              {campus.programs.some(p => p.shift) && (
                                <td className="py-2 px-2 text-sm text-gray-300">{program.shift || '-'}</td>
                              )}
                              {campus.programs.some(p => p.category) && (
                                <td className="py-2 px-2 text-sm text-gray-300">{program.category || '-'}</td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 sm:p-4 bg-electric-blue/10 rounded-lg border border-electric-blue/30">
        <p className="text-xs sm:text-sm text-gray-300">
          <strong>Note:</strong> Merit data is based on the closing merit of 2023. Actual merit for 2024 may vary based on competition and available seats.
        </p>
      </div>
    </div>
  );
};

export default MeritAnalysis; 