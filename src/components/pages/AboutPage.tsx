import React from 'react';
// import { motion } from 'framer-motion';
import { GraduationCap, Calculator, Users, MessageCircle, Code, ExternalLink, Lightbulb } from 'lucide-react';
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';

const AboutPage: React.FC = () => {
  return (
    <div className="pt-24 pb-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white">About <span className="text-electric-blue">UniCalc</span></h1>
        
        <div className="space-y-8">
          <div className="glassmorphic-card p-6 rounded-xl hover:shadow-glow transition-all duration-300">
            <div className="flex items-start gap-4">
              <Lightbulb className="w-8 h-8 text-electric-blue flex-shrink-0" />
              <div>
                <h2 className="text-xl font-semibold mb-2 text-white">The Story Behind UniCalc</h2>
                <p className="text-soft-cyan mb-3">
                  Hi, I'm Azan! As the founder of <a href="https://csconnect.pk" target="_blank" rel="noopener noreferrer" className="text-electric-blue hover:text-white transition-colors">csconnect.pk</a>, I noticed a recurring pattern of questions from students about university admissions. Many were struggling to calculate their aggregates and wondering if they would qualify for their dream universities. Seeing this community need, I created UniCalc as a simple solution to help students instantly determine their admission chances based on universities' official merit formulas.
                </p>
                <p className="text-soft-cyan">
                  {/*  */}
                </p>
              </div>
            </div>
          </div>

          <div className="glassmorphic-card p-6 rounded-xl hover:shadow-glow transition-all duration-300">
            <div className="flex items-start gap-4">
              <GraduationCap className="w-8 h-8 text-electric-blue flex-shrink-0" />
              <div>
                <h2 className="text-xl font-semibold mb-2 text-white">Our Mission</h2>
                <p className="text-soft-cyan">
                  UniCalc aims to empower Pakistani students with accurate information during the stressful university application season. By providing transparent calculations based on official merit formulas, we help students make informed decisions about their educational future.
                </p>
              </div>
            </div>
          </div>

          <div className="glassmorphic-card p-6 rounded-xl hover:shadow-glow transition-all duration-300">
            <div className="flex items-start gap-4">
              <Calculator className="w-8 h-8 text-electric-blue flex-shrink-0" />
              <div>
                <h2 className="text-xl font-semibold mb-2 text-white">How It Works</h2>
                <p className="text-soft-cyan mb-3">
                  UniCalc is designed to be intuitive and accurate. Select your preferred university, input your academic scores, and instantly see your aggregate score calculated according to the official university formula. For A-Level students, special weightage calculations are automatically applied where relevant.
                </p>
                <p className="text-soft-cyan">
                  {/* Have questions about entry tests? Join our <a href="https://chat.whatsapp.com/Cat16toNG2FHVNbSuel3FG" target="_blank" rel="noopener noreferrer" className="text-electric-blue hover:text-white transition-colors font-medium">Entry Test Group</a> where you can ask any questions related to university entry tests and get support from fellow applicants. */}
                </p>
              </div>
            </div>
          </div>

          <div className="glassmorphic-card p-6 rounded-xl hover:shadow-glow transition-all duration-300">
            <div className="flex items-start gap-4">
              <Users className="w-8 h-8 text-electric-blue flex-shrink-0" />
              <div>
                <h2 className="text-xl font-semibold mb-2 text-white">Join Our Community</h2>
                <p className="text-soft-cyan mb-4">
                  Connect with fellow applicants in our WhatsApp group for admission tips, peer support, and the latest updates on university admissions across Pakistan.
                </p>
                <a 
                  href="https://chat.whatsapp.com/Cat16toNG2FHVNbSuel3FG" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Join Entry Test Group
                </a>
              </div>
            </div>
          </div>

          <div className="glassmorphic-card p-6 rounded-xl hover:shadow-glow transition-all duration-300">
            <div className="flex items-start gap-4">
              <Code className="w-8 h-8 text-electric-blue flex-shrink-0" />
              <div>
                <h2 className="text-xl font-semibold mb-2 text-white">About the Developer</h2>
                <p className="text-soft-cyan mb-4">
                  I'm passionate about creating tech solutions that solve real problems for students. When I'm not coding, I'm engaging with the CS community in Pakistan and exploring new ways to make education more accessible.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a 
                    href="https://linkedin.com/in/azanw" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center text-electric-blue hover:text-white transition-colors"
                  >
                    <FaLinkedin className="w-5 h-5 mr-1" />
                    LinkedIn
                  </a>
                  <a 
                    href="https://github.com/azannw" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center text-electric-blue hover:text-white transition-colors"
                  >
                    <FaGithub className="w-5 h-5 mr-1" />
                    GitHub
                  </a>
                  <a 
                    href="https://instagram.com/csconnect.pk" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center text-electric-blue hover:text-white transition-colors"
                  >
                    <FaInstagram className="w-5 h-5 mr-1" />
                    Instagram
                  </a>
                  <a 
                    href="https://csconnect.pk" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center text-electric-blue hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-5 h-5 mr-1" />
                    CSConnect
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
