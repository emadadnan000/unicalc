import React, { useState, useEffect } from 'react';
import { Calculator, BarChart2, BookOpen, Award, ShieldCheck, Heart, Lightbulb, GraduationCap, Code, ExternalLink, MessageCircle, Linkedin, Github, Instagram, Globe, Smartphone } from 'lucide-react';
import { FaXTwitter, FaWhatsapp } from 'react-icons/fa6';

const FeatureCard = ({ icon: Icon, title, children, delay = 0 }: { icon: React.ElementType, title: string, children: React.ReactNode, delay?: number }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className={`bg-gradient-to-br from-gray-900/80 to-gray-800/50 p-5 sm:p-6 rounded-2xl border border-cyan-500/20 shadow-lg shadow-cyan-500/5 transform transition-all duration-700 hover:scale-105 hover:shadow-cyan-500/20 hover:shadow-xl group ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400 transition-all duration-300 group-hover:bg-cyan-500/20 group-hover:scale-110">
          <Icon className="w-6 h-6 transition-transform duration-300 group-hover:rotate-12" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-2 transition-colors duration-300 group-hover:text-cyan-100">{title}</h3>
          <p className="text-gray-300 transition-colors duration-300 group-hover:text-gray-200">{children}</p>
        </div>
      </div>
    </div>
  );
};

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

const AboutPage: React.FC = () => {
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
        {/* Header Section with Staggered Animation */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className={`text-4xl md:text-5xl font-bold text-white mb-4 transform transition-all duration-1000 ${
            headerVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
          }`}>
            About <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse">UniCalc</span>
          </h1>
          <p className={`text-xl text-gray-300 max-w-3xl mx-auto transform transition-all duration-1000 delay-300 ${
            headerVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            Helping students with university admission calculations
          </p>
        </div>

        {/* Story and Mission Grid */}
        <AnimatedSection delay={600} className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gradient-to-br from-cyan-500/5 to-blue-500/5 p-6 sm:p-8 rounded-2xl border border-cyan-500/20 transform transition-all duration-500 hover:scale-105 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/10">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <Lightbulb className="w-6 h-6 mr-2 text-cyan-400 animate-bounce" />
              The Story Behind UniCalc
            </h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Hi! I'm <span className="text-cyan-400 font-semibold">Azan</span>, a computer science student at FAST and founder of the <a href="https://csconnect.pk" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-300 hover:underline">CSConnect.pk</a> community. My mission is to commonize CS education and help more people get into top universities. As the founder of <a href="https://csconnect.pk" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-300 hover:underline">CSConnect.pk</a>, I noticed many students in our community kept asking which university suits them according to their aggregate scores. This gave me the idea to solve their problem by creating UniCalc, which started as a simple aggregate calculator for FAST and gradually expanded to include other universities with more features.
            </p>
          </div>

          <div className="bg-gradient-to-br from-cyan-500/5 to-blue-500/5 p-6 sm:p-8 rounded-2xl border border-cyan-500/20 transform transition-all duration-500 hover:scale-105 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/10">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <GraduationCap className="w-6 h-6 mr-2 text-cyan-400 animate-pulse" />
              Our Mission
            </h2>
            <p className="text-gray-300 leading-relaxed">
              We aim to make CS education more accessible and help students get into top universities by providing clear calculations and useful resources that reduce stress around admissions. Our goal is to help students make informed decisions about their education with reliable tools.
            </p>
          </div>
        </AnimatedSection>

        {/* Why Choose Section */}
        <AnimatedSection delay={900} className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Why Choose <span className="text-cyan-400 animate-pulse">UniCalc</span>?
          </h2>
          <p className="text-gray-300 max-w-4xl mx-auto text-lg leading-relaxed">
            Simple, reliable tools to help you understand university admission requirements and calculate your chances.
          </p>
        </AnimatedSection>

        {/* Feature Cards with Staggered Animation */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <FeatureCard icon={Calculator} title="Accurate Calculations" delay={1200}>
            Calculate aggregate scores using official university formulas with support for Matric, FSc, A-Levels, and other systems.
          </FeatureCard>
          
          <FeatureCard icon={BarChart2} title="Merit Analysis" delay={1350}>
            View merit trends and admission requirements for various programs across Pakistani universities.
          </FeatureCard>
          
          <FeatureCard icon={BookOpen} title="Test Preparation" delay={1500}>
            Access practice questions and study materials for university entrance tests.
          </FeatureCard>
          
          <FeatureCard icon={Award} title="Eligibility Check" delay={1650}>
            Check eligibility for different programs and get recommendations based on your academic profile.
          </FeatureCard>
          
          <FeatureCard icon={ShieldCheck} title="Reliable Data" delay={1800}>
            Official university formulas with updated information to ensure accurate calculations.
          </FeatureCard>
          
          <FeatureCard icon={Heart} title="Student-Friendly" delay={1950}>
            Built by students for students, making complex admission processes simple and stress-free.
          </FeatureCard>
        </div>

        {/* Community Section */}
        <AnimatedSection delay={2100} className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl p-6 sm:p-8 mb-12 sm:mb-16 border border-cyan-500/20 transform transition-all duration-500 hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-3 flex items-center">
                <FaWhatsapp className="w-6 h-6 mr-2 text-green-400 animate-bounce" />
                Join Entry Test Group
              </h3>
              <p className="text-gray-300 mb-4 md:mb-0 leading-relaxed">
                Connect with other students preparing for university admissions. Share resources, ask questions, and support each other through the process.
              </p>
            </div>
            <a 
              href="https://chat.whatsapp.com/FAr6YQiz3TqAcWgtdqtd7j" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-green-500/30 active:scale-95 whitespace-nowrap group font-semibold"
            >
              <FaWhatsapp className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:rotate-12" />
              Join WhatsApp Group
            </a>
          </div>
        </AnimatedSection>

        {/* Developer Section */}
        <AnimatedSection delay={2300} className="text-center px-2">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 mb-4 sm:mb-6">
            <Code className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400 animate-bounce" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">About the Developer</h2>
          <div className="max-w-4xl mx-auto mb-6 sm:mb-8">
            <p className="text-gray-300 mb-4 text-sm sm:text-base leading-relaxed">
              <span className="text-cyan-400 font-bold text-lg">Azan</span> - A computer science student at FAST and founder of <a href="https://csconnect.pk" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-300 hover:underline">CSConnect.pk</a> community, passionate about making CS education accessible to everyone. I believe more students should have the chance to study at top universities and I'm currently building tools that solve real problems for the student community.
            </p>
            <div className="bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-xl p-4 mb-6 border border-cyan-500/20">
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed italic">
                "My goal is to help students get into the top CS universities of Pakistan." - <span className="text-cyan-400 font-semibold">Azan</span>
              </p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <a 
              href="https://linkedin.com/in/azanw" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30 active:scale-95 group"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:rotate-12" />
            </a>
            <a 
              href="https://github.com/azannw" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 hover:bg-gray-700 text-gray-100 rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-gray-500/30 active:scale-95 group"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:rotate-12" />
            </a>
            <a 
              href="https://instagram.com/csconnect.pk" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-pink-500/30 active:scale-95 group"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:rotate-12" />
            </a>
            <a 
              href="https://csconnect.pk" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/30 active:scale-95 group"
              aria-label="Website"
            >
              <Globe className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:rotate-12" />
            </a>
            {/* <a 
              href="https://x.com/azannw" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-black hover:bg-gray-900 text-white rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-gray-500/30 active:scale-95 group"
              aria-label="X (Twitter)"
            >
              <FaXTwitter className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:rotate-12" /> */}
            {/* </a> */}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default AboutPage;