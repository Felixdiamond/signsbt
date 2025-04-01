'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function NoThanks() {
  const [stage, setStage] = useState(0);
  const [fadeIn, setFadeIn] = useState(false);
  const [doodles, setDoodles] = useState<Array<{id: number; type: string; x: number; y: number; rotation: number; scale: number; delay: number;}>>([]);
  const [sparkles, setSparkles] = useState<Array<{id: number; x: string; y: string; delay: number;}>>([]);
  const [shakeClass, setShakeClass] = useState('');
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Generate random doodles
  useEffect(() => {
    const types = ['circle', 'squiggle', 'zigzag', 'heart', 'cross', 'star'];
    const newDoodles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      type: types[Math.floor(Math.random() * types.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotation: Math.random() * 360,
      scale: Math.random() * 0.5 + 0.5,
      delay: Math.random() * 2
    }));
    
    setDoodles(newDoodles);
    
    // Create sparkles (fewer than you-win page)
    const newSparkles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      delay: Math.random() * 3
    }));
    setSparkles(newSparkles);
  }, []);
  
  useEffect(() => {
    // Fade in initial content
    setFadeIn(true);
    
    // Auto-progress through the stages with nice delays
    const firstTimer = setTimeout(() => {
      // Shake effect when transitioning to stage 1
      setShakeClass('animate-shake');
      setTimeout(() => setShakeClass(''), 1000);
      
      setStage(1);
      
      // Second stage transition
      const secondTimer = setTimeout(() => {
        setStage(2);
      }, 3500);
      
      return () => clearTimeout(secondTimer);
    }, 2800);
    
    return () => clearTimeout(firstTimer);
  }, []);
  
  // Function to render a doodle based on type
  const renderDoodle = (type: string) => {
    switch (type) {
      case 'circle':
        return (
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="15" stroke="var(--orange-primary)" strokeWidth="2" strokeDasharray="4 2" fill="none" />
          </svg>
        );
      case 'squiggle':
        return (
          <svg width="60" height="30" viewBox="0 0 60 30" fill="none">
            <path d="M5,15 Q15,5 25,15 T45,15" stroke="var(--orange-dark)" strokeWidth="2" fill="none" />
          </svg>
        );
      case 'zigzag':
        return (
          <svg width="50" height="20" viewBox="0 0 50 20" fill="none">
            <path d="M5,10 L15,5 L25,15 L35,5 L45,15" stroke="var(--orange-primary)" strokeWidth="2" fill="none" />
          </svg>
        );
      case 'heart':
        return (
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
            <path d="M15,25 C12,22 5,18 5,12 C5,8 8,5 12,5 C13,5 14,6 15,7 C16,6 17,5 18,5 C22,5 25,8 25,12 C25,18 18,22 15,25 Z" stroke="var(--orange-dark)" strokeWidth="1.5" fill="none" />
          </svg>
        );
      case 'cross':
        return (
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
            <path d="M10,10 L20,20 M10,20 L20,10" stroke="var(--orange-light)" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'star':
        return (
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M20,5 L23,15 L33,15 L25,22 L28,32 L20,26 L12,32 L15,22 L7,15 L17,15 Z" stroke="var(--orange-primary)" strokeWidth="1.5" fill="none" />
          </svg>
        );
      default:
        return null;
    }
  };
  
  return (
    <div ref={containerRef} className={`min-h-screen bg-[var(--cream)] flex flex-col items-center justify-center relative overflow-hidden p-4 ${shakeClass}`}>
      {/* Background patterns and elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Warm gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--orange-light)]/10 to-[var(--cream)] opacity-70"></div>
        
        {/* Diagonal pattern stripes */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <pattern id="diagonalPattern" patternUnits="userSpaceOnUse" width="60" height="60" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="60" stroke="var(--orange-primary)" strokeWidth="4" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#diagonalPattern)" />
        </svg>

        {/* Decorative corner blobs */}
        <div className="absolute top-0 left-0 w-80 h-80 -ml-40 -mt-40 rounded-full bg-[var(--orange-light)] opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 -mr-40 -mb-40 rounded-full bg-[var(--orange-primary)] opacity-15 blur-3xl"></div>
        
        {/* Doodles scattered around */}
        {doodles.map((doodle) => (
          <div 
            key={doodle.id}
            className="absolute animate-float-slow"
            style={{
              top: `${doodle.y}%`,
              left: `${doodle.x}%`,
              transform: `rotate(${doodle.rotation}deg) scale(${doodle.scale})`,
              animationDelay: `${doodle.delay}s`,
              opacity: 0.6
            }}
          >
            {renderDoodle(doodle.type)}
          </div>
        ))}
        
        {/* A few sparkles */}
        {sparkles.map((sparkle) => (
          <div 
            key={sparkle.id}
            className="absolute animate-pulse"
            style={{
              top: sparkle.y,
              left: sparkle.x,
              animationDelay: `${sparkle.delay}s`,
              zIndex: 1
            }}
          >
            ✨
          </div>
        ))}
      </div>
      
      {/* Stage 0: Initial message with orange accents */}
      {stage === 0 && (
        <div className={`text-center transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'} max-w-md mx-auto z-10`}>
          <div className="handwritten text-4xl sm:text-5xl text-[var(--orange-dark)] mb-6 relative inline-block">
            <span className="relative z-10">Oh no...</span>
            <svg className="absolute bottom-0 left-0 w-full h-3 -z-10" viewBox="0 0 100 10">
              <path d="M0,5 Q25,10 50,5 T100,5" stroke="var(--orange-primary)" strokeWidth="2" fill="none" />
            </svg>
          </div>
          <div className="relative mx-auto w-48 h-48 sm:w-64 sm:h-64 mb-8 overflow-visible">
            <div className="absolute inset-0 rounded-full bg-white/50 shadow-lg backdrop-blur-sm"></div>
            <Image 
              src="/seeingsigns2.jpg" 
              alt="Disappointed" 
              width={250} 
              height={250}
              className="absolute inset-0 w-full h-full object-cover transform rotate-3 shadow-md rounded-lg border-2 border-[var(--orange-primary)]/50"
            />
            <div className="absolute -bottom-4 -right-4 transform rotate-12">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M35,20 L20,35 L5,20 L20,5 Z" fill="var(--orange-light)" opacity="0.5" />
              </svg>
            </div>
          </div>
          <p className="text-xl sm:text-2xl mb-4 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm inline-block">
            Looks like you don't want a Sign SBT...
          </p>
        </div>
      )}
      
      {/* Stage 1: Second message with more interactive elements */}
      {stage === 1 && (
        <div className="text-center animate-fadeIn max-w-md mx-auto z-10">
          <div className="handwritten text-4xl sm:text-5xl text-[var(--orange-dark)] mb-6 sm:mb-8 relative inline-block">
            <span className="relative z-10">But wait...</span>
            <div className="absolute -bottom-2 right-0 w-full h-2 bg-[var(--orange-light)]/30 -z-10 rounded-full"></div>
          </div>
          <div className="relative w-48 h-48 sm:w-72 sm:h-72 mx-auto mb-8 overflow-visible">
            <div className="absolute inset-0 rounded-full border-4 border-dashed border-[var(--orange-primary)]/40 animate-spin-slower"></div>
            <div className="absolute inset-4 rounded-full border-4 border-dotted border-[var(--orange-dark)]/30 animate-spin-slow-reverse"></div>
            <div className="absolute inset-8 rounded-full border-4 border-[var(--orange-light)]/20 animate-spin-slow"></div>
            <div className="absolute inset-0 w-full h-full flex items-center justify-center">
              <div className="relative bg-white/80 backdrop-blur-sm rounded-lg p-2 transform rotate-3 shadow-md border-2 border-[var(--orange-primary)]/30">
                <Image 
                  src="/sign1.jpg" 
                  alt="Sign SBT" 
                  width={150} 
                  height={150}
                  className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-md animate-float-gentle"
                />
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center z-10 mt-28 sm:mt-32">
              <p className="handwritten text-2xl sm:text-3xl font-bold text-[var(--orange-dark)] px-3 py-1 bg-white/90 backdrop-blur-sm rounded-lg inline-block shadow-sm">
                Are you sure?
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Stage 2: Final message with enhanced design */}
      {stage === 2 && (
        <div className="text-center animate-fadeIn max-w-md mx-auto z-10">
          <div className="p-6 sm:p-8 bg-white/80 backdrop-blur-md rounded-xl shadow-lg border-2 border-[var(--orange-primary)]/30 doodle-border relative overflow-hidden">
            {/* Accent decorations */}
            <div className="absolute -right-10 -top-10 w-28 h-28 bg-[var(--orange-primary)] opacity-10 rotate-45"></div>
            <div className="absolute -left-10 -bottom-10 w-28 h-28 bg-[var(--orange-dark)] opacity-10 rotate-45"></div>

            <div className="handwritten text-4xl sm:text-5xl text-[var(--orange-dark)] mb-6 relative inline-block">
              <span className="relative z-10">That's okay!</span>
              <svg className="absolute bottom-0 left-0 w-full h-3 -z-10" viewBox="0 0 100 10">
                <path d="M0,5 Q25,10 50,5 T100,5" stroke="var(--orange-primary)" strokeWidth="2" fill="none" />
              </svg>
            </div>
            
            <div className="handwritten text-lg sm:text-xl mt-4 sm:mt-6 flex flex-col gap-2 relative z-10">
              <p className="transform -rotate-2 animate-float-opposite-slow inline-block text-[var(--orange-dark)] font-bold px-2 py-1 bg-[var(--cream)]/80 rounded-lg shadow-sm">
                We'll always be here if you change your mind!
              </p>
              <p className="transform rotate-1 mt-2 animate-float-med inline-block text-[var(--orange-dark)] font-bold px-2 py-1 bg-[var(--cream)]/80 rounded-lg shadow-sm">
                The SIGN community welcomes everyone
              </p>
            </div>
            
            <div className="mt-6 sm:mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
              <Link
                href="/"
                className="button-primary py-3 px-6 rounded-full font-bold text-lg shadow-md hover:shadow-lg transition-all duration-300 flex justify-center items-center gap-2 bg-[var(--orange-primary)] text-white hover:bg-[var(--orange-dark)]"
              >
                <span>Try Again</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3,12 H21 M13,4 L21,12 L13,20" />
                </svg>
              </Link>
              
              <a
                href="https://sign.global/orange-dynasty"
                target="_blank"
                rel="noopener noreferrer"
                className="button-secondary py-3 px-6 rounded-full font-bold text-lg shadow-md hover:shadow-lg transition-all duration-300 flex justify-center items-center gap-2 bg-white text-[var(--orange-dark)] border-2 border-[var(--orange-primary)] hover:bg-[var(--cream)]"
              >
                <span>Visit SIGN</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18,13 L18,21 L3,21 L3,6 L12,6" />
                  <path d="M15,3 L21,3 L21,9" />
                  <path d="M10,14 L21,3" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Image gallery at the bottom */}
          <div className="mt-6 sm:mt-8 flex flex-wrap gap-2 sm:gap-4 justify-center">
            <div className="transform rotate-3 transition-transform hover:rotate-6 relative group">
              <div className="absolute inset-0 bg-[var(--orange-primary)] opacity-0 group-hover:opacity-20 transition-opacity rounded-lg"></div>
              <Image src="/seeingsigns.jpg" alt="Sign SBT" width={100} height={100} className="w-20 h-20 sm:w-24 sm:h-24 object-cover shadow-md rounded-lg border-2 border-[var(--orange-primary)]/50" />
            </div>
            <div className="transform -rotate-2 transition-transform hover:-rotate-5 relative group">
              <div className="absolute inset-0 bg-[var(--orange-primary)] opacity-0 group-hover:opacity-20 transition-opacity rounded-lg"></div>
              <Image src="/seeingsigns1.jpg" alt="Sign SBT" width={100} height={100} className="w-20 h-20 sm:w-24 sm:h-24 object-cover shadow-md rounded-lg border-2 border-[var(--orange-primary)]/50" />
            </div>
          </div>
        </div>
      )}
      
      {/* CSS animations */}
      <style jsx>{`
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-5px) rotate(2deg); }
        }
        
        @keyframes spin-slower {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-slow-reverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        
        .animate-float-gentle {
          animation: float-gentle 4s ease-in-out infinite;
        }
        
        .animate-spin-slower {
          animation: spin-slower 20s linear infinite;
        }
        
        .animate-spin-slow-reverse {
          animation: spin-slow-reverse 15s linear infinite;
        }
        
        .animate-shake {
          animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
        }
        
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }
        
        .doodle-border {
          position: relative;
        }
        
        .doodle-border:before {
          content: '';
          position: absolute;
          top: -8px;
          left: -8px;
          right: -8px;
          bottom: -8px;
          border: 2px solid var(--orange-primary);
          border-radius: 1rem;
          opacity: 0.3;
          transform: rotate(-1deg);
        }
      `}</style>
    </div>
  );
}
