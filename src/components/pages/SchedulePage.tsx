import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';

const AnimatedSection = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className={`transform transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  );
};

const SchedulePage: React.FC = () => {
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHeaderVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 pt-24 pb-16 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className={`text-4xl md:text-5xl font-bold text-white mb-4 transform transition-all duration-1000 ${
            headerVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
          }`}>
            University <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse">Schedule</span>
          </h1>
          <p className={`text-xl text-gray-300 max-w-3xl mx-auto transform transition-all duration-1000 delay-300 ${
            headerVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            See all university timelines in one place. Stay updated with admission deadlines and entry test dates.
          </p>
        </div>

        {/* Calendar Section */}
        <AnimatedSection delay={600} className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 p-4 sm:p-6 rounded-2xl border border-cyan-500/20 shadow-lg shadow-cyan-500/5">
            <div className="w-full h-[600px] bg-gray-800 rounded-lg overflow-hidden">
                <iframe 
                    src="https://calendar.google.com/calendar/embed?src=d10f57f4778ed5c046d307a1f07b1d19a9cb42216d0e0a9f8e684c0804b6b5e9%40group.calendar.google.com&ctz=Asia%2FKarachi" //custom calendar URL
                    style={{border: 0}} 
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    scrolling="no"
                    className="w-full h-full"
                    title="University Schedule"
                ></iframe>
            </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default SchedulePage;
