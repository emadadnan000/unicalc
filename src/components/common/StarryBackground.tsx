import React, { useEffect, useState } from 'react';

interface Star {
  id: number;
  top: string;
  left: string;
  size: string;
  delay: string;
  duration: string;
}

const StarryBackground: React.FC = () => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = [];
      const starCount = 150;
      
      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: i,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          size: `${Math.random() * 3 + 1}px`,
          delay: `${Math.random() * 3}s`,
          duration: `${Math.random() * 3 + 2}s`
        });
      }
      
      setStars(newStars);
    };
    
    generateStars();
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-deep-space">
      <div className="absolute inset-0 bg-gradient-radial from-midnight-blue via-deep-space to-deep-space opacity-80" />
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            animationDelay: star.delay,
            animationDuration: star.duration
          }}
        />
      ))}
    </div>
  );
};

export default StarryBackground;