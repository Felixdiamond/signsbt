'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function YouWin() {
  const [sparkles, setSparkles] = useState<Array<{id: number, x: string, y: string, scale: number, delay: number}>>([]);
  const [confetti, setConfetti] = useState<Array<{id: number, x: number, y: number, color: string, size: number, speed: number}>>([]);
  const [showMessage, setShowMessage] = useState(false);
  const [messageStage, setMessageStage] = useState(0);
  const animationRef = useRef<number | null>(null);
  
  // Generate confetti and sparkles on load
  useEffect(() => {
    // Create fewer sparkles
    const newSparkles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      scale: Math.random() * 0.5 + 0.5,
      delay: Math.random() * 2
    }));
    setSparkles(newSparkles);
    
    // Create confetti pieces
    const colors = ['#F8814F', '#FFBE98', '#C2E0A3', '#FFD1DC', '#FFF8EC'];
    const newConfetti = Array.from({ length: 150 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: -20 - Math.random() * 100, // Start above the viewport
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 10 + 6,
      speed: Math.random() * 3 + 1
    }));
    setConfetti(newConfetti);
    
    // Animate confetti falling
    let animationFrameId: number;
    
    const animateConfetti = () => {
      setConfetti(prev => 
        prev.map(piece => ({
          ...piece,
          y: piece.y + piece.speed,
          x: piece.x + Math.sin(piece.y * 0.01) * 1 // Gentle side-to-side movement
        }))
      );
      animationFrameId = requestAnimationFrame(animateConfetti);
    };
    
    animationFrameId = requestAnimationFrame(animateConfetti);
    animationRef.current = animationFrameId;
    
    // Show victory message after a delay
    setTimeout(() => {
      setShowMessage(true);
    }, 1000);
    
    // Progress through message stages
    const messageTimer = setTimeout(() => {
      setMessageStage(1);
      setTimeout(() => {
        setMessageStage(2);
      }, 2000);
    }, 2500);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(messageTimer);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-[var(--cream)] px-4">
      {/* Enhanced pattern background with warm orange gradient overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none" 
           style={{
             backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f8814f' fill-opacity='0.2'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
             background: "linear-gradient(135deg, rgba(255,248,236,0.9) 0%, rgba(255,190,152,0.2) 50%, rgba(255,248,236,0.9) 100%), url(\"data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f8814f' fill-opacity='0.2'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
           }}
      ></div>
      
      {/* Orange accents */}
      <div className="absolute top-0 right-0 w-40 h-40 -mr-10 -mt-10 rounded-full bg-[var(--orange-light)] opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-60 h-60 -ml-20 -mb-20 rounded-full bg-[var(--orange-primary)] opacity-10 blur-3xl"></div>
      
      {/* Further reduced number of confetti for better performance */}
      {confetti.slice(0, 50).map((piece) => (
        <div 
          key={piece.id}
          className="absolute"
          style={{
            top: `${piece.y}px`,
            left: `${piece.x}px`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '0',
            transform: `rotate(${piece.id * 23}deg)`,
            opacity: 0.6,
            zIndex: 1
          }}
        />
      ))}
      
      {/* Significantly reduced sparkles */}
      {sparkles.slice(0, 10).map((sparkle) => (
        <div 
          key={sparkle.id}
          className="absolute animate-pulse"
          style={{
            top: sparkle.y,
            left: sparkle.x,
            transform: `scale(${sparkle.scale})`,
            animationDelay: `${sparkle.delay}s`,
            zIndex: 0
          }}
        >
          ✨
        </div>
      ))}
      
      {/* Enhanced decorative elements with MORE doodles */}
      <div className="absolute top-10 right-10 md:right-20 animate-pulse z-10" style={{ animationDuration: '4s' }}>
        <svg width="70" height="70" viewBox="0 0 60 60" fill="none">
          <path d="M30,10 L35,25 L50,30 L35,35 L30,50 L25,35 L10,30 L25,25 Z" 
                stroke="var(--orange-dark)" strokeWidth="2" fill="var(--orange-light)" fillOpacity="0.1" />
        </svg>
      </div>
      
      <div className="absolute bottom-10 left-10 md:left-20 animate-pulse z-10" style={{ animationDuration: '3s' }}>
        <svg width="90" height="90" viewBox="0 0 80 80" fill="none">
          <path d="M20,40 C20,30 30,20 40,20 C50,20 60,30 60,40 C60,50 50,60 40,60 C30,60 20,50 20,40 Z" 
                stroke="var(--orange-primary)" strokeWidth="2" strokeDasharray="5 3" fill="var(--orange-light)" fillOpacity="0.05" />
          <path d="M40,20 L40,15 M60,40 L65,40 M40,60 L40,65 M20,40 L15,40" 
                stroke="var(--orange-primary)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* Additional doodles */}
      <div className="absolute top-1/3 left-5 md:left-12 animate-float-slow z-10">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path d="M5,20 Q10,5 20,10 T35,20 Q30,35 20,30 T5,20" 
                stroke="var(--orange-primary)" strokeWidth="1.5" fill="none" strokeDasharray="2 1" />
        </svg>
      </div>

      <div className="absolute bottom-1/4 right-5 md:right-16 animate-float-opposite-slow z-10">
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
          <path d="M10,10 C15,15 35,15 40,10 C35,35 15,35 10,10 Z" 
                stroke="var(--orange-dark)" strokeWidth="1.5" fill="var(--orange-light)" fillOpacity="0.1" />
        </svg>
      </div>

      {/* Hand-drawn style squiggles */}
      <div className="absolute top-1/2 right-8 md:right-28 animate-float-med z-10">
        <svg width="60" height="30" viewBox="0 0 60 30" fill="none">
          <path d="M5,15 Q10,5 15,15 T25,15 T35,15 T45,15 T55,15" 
                stroke="var(--orange-primary)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </svg>
      </div>

      <div className="absolute left-1/3 bottom-10 hidden md:block animate-float-slow z-10">
        <svg width="70" height="40" viewBox="0 0 70 40" fill="none">
          <path d="M5,20 Q15,10 20,25 T40,15 T60,25" 
                stroke="var(--orange-dark)" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      </div>

      <div className="absolute right-1/4 top-16 hidden md:block animate-float-opposite-slow z-10">
        <svg width="45" height="45" viewBox="0 0 45 45" fill="none">
          <circle cx="22.5" cy="22.5" r="15" stroke="var(--orange-primary)" strokeWidth="1" fill="none" />
          <circle cx="22.5" cy="22.5" r="8" stroke="var(--orange-light)" strokeWidth="1" strokeDasharray="2 2" fill="none" />
        </svg>
      </div>
      
      {/* Victory message animations - improved layout */}
      <div className="z-10 py-10 w-full max-w-3xl mx-auto">
        {/* Stage-based content with better responsiveness */}
        {messageStage === 0 && showMessage && (
          <div className="animate-fadeIn flex flex-col items-center">
            <div className="handwritten text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-[var(--orange-dark)] animate-bounce-slow">
              YOU WIN!
            </div>
          </div>
        )}
        
        {messageStage >= 1 && (
          <div className={`animate-slideUp relative z-10 p-6 md:p-10 rounded-xl max-w-3xl mx-auto flex flex-col items-center ${messageStage === 1 ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
            {/* Hand-drawn border using the doodle-border class */}
            <div className="absolute inset-0 -z-10 doodle-border" aria-hidden="true"></div>
            
            <div className="handwritten text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 text-center text-[var(--orange-dark)]">
              <h1 className="relative inline-block animate-float-slow">
                ALRIGHT FINE, YOU WIN!
                <span className="absolute -top-6 right-0 transform rotate-12 text-3xl">🎉</span>
              </h1>
            </div>
            
            <div className="w-full max-w-md mx-auto relative">
              <Image 
                src="/youdeservetowin.png" 
                alt="You deserve to win" 
                width={400} 
                height={400}
                className="mb-6 shadow-md transform hover:rotate-2 transition-transform animate-float-med rounded-lg mx-auto"
                style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                priority
              />
            </div>
          </div>
        )}
        
        {messageStage >= 2 && (
          <div className="animate-fadeIn text-center mb-8 w-full max-w-xl mx-auto bg-white/80 p-4 sm:p-6 md:p-8 rounded-xl backdrop-blur-sm shadow-lg border-2 border-[var(--orange-primary)] doodle-border relative overflow-hidden">
            {/* Diagonal orange stripe for extra flair */}
            <div className="absolute -right-10 -top-10 w-28 h-28 bg-[var(--orange-primary)] opacity-20 rotate-45 transform-gpu"></div>
            <div className="absolute -left-10 -bottom-10 w-28 h-28 bg-[var(--orange-dark)] opacity-15 rotate-45 transform-gpu"></div>
            <p className="text-xl md:text-2xl mb-4 font-bold text-[var(--brown)] relative z-10">
              Post a tweet and tag <span className="text-[var(--orange-dark)] font-extrabold">@SIGN</span> saying you deserve to win.
            </p>
            
            <div className="handwritten text-base sm:text-lg md:text-xl mt-4 sm:mt-6 flex flex-col gap-2 relative z-10">
              <p className="transform -rotate-2 animate-float-opposite-slow inline-block text-[var(--orange-dark)] font-bold px-2 py-1 bg-[var(--cream)]/80 rounded-lg shadow-sm">Your persistence paid off!</p>
            </div>
            
            <div className="mt-6 sm:mt-8 md:mt-10 flex flex-wrap gap-3 sm:gap-4 md:gap-6 justify-center">
              <a 
                href="https://twitter.com/intent/tweet?text=Hey%20@sign%20I%20deserve%20to%20win%20because%20I%20believe%2C%20I%20am%20building%2C%20I%20am%20showing%20up%20and%20I%20will%20earn%20a%20SBT%2C%20some%20day.%20%23SignSBT" 
                target="_blank" 
                rel="noopener noreferrer"
                className="button-yes py-2 md:py-3 px-4 md:px-6 rounded-full font-bold text-base md:text-lg shadow-md hover:shadow-lg flex items-center gap-2 animate-pulse-subtle relative overflow-hidden group"
              >
                Tweet Now
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              
              <Link 
                href="/"
                className="button-no py-2 md:py-3 px-4 md:px-6 rounded-full font-bold text-base md:text-lg shadow-md transition-transform hover:scale-105 border-2 border-transparent hover:border-[var(--brown)]/20"
              >
                Start Over
              </Link>
            </div>
            
            <div className="mt-6 sm:mt-8 md:mt-10 flex flex-wrap gap-3 sm:gap-4 justify-center">
              <div className="transform rotate-3 transition-transform hover:rotate-6 relative group">
                <div className="absolute inset-0 bg-[var(--orange-primary)] opacity-0 group-hover:opacity-20 transition-opacity rounded-lg"></div>
                <Image src="/seeingsigns.jpg" alt="Sign SBT" width={100} height={100} className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover shadow-md rounded-lg border-2 border-[var(--orange-primary)]/50" />
              </div>
              <div className="transform -rotate-2 transition-transform hover:-rotate-5 relative group">
                <div className="absolute inset-0 bg-[var(--orange-primary)] opacity-0 group-hover:opacity-20 transition-opacity rounded-lg"></div>
                <Image src="/seeingsigns1.jpg" alt="Sign SBT" width={100} height={100} className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover shadow-md rounded-lg border-2 border-[var(--orange-primary)]/50" />
              </div>
              <div className="transform rotate-1 transition-transform hover:rotate-4 relative group">
                <div className="absolute inset-0 bg-[var(--orange-primary)] opacity-0 group-hover:opacity-20 transition-opacity rounded-lg"></div>
                <Image src="/seeingsigns2.jpg" alt="Sign SBT" width={100} height={100} className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover shadow-md rounded-lg border-2 border-[var(--orange-primary)]/50" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CSS Animations - optimized and matching the main page style */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes floatSlow {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(4px, -4px) rotate(1deg); }
          50% { transform: translate(0, -8px) rotate(-1deg); }
          75% { transform: translate(-4px, -4px) rotate(1deg); }
        }
        
        @keyframes floatMed {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(0, -5px) rotate(1deg); }
        }
        
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes floatOppositeSlow {
          0%, 100% { transform: rotate(-1deg); }
          50% { transform: translateY(-4px) rotate(1deg); }
        }
        
        @keyframes pulseSubtle {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }
        
        .animate-pulse-subtle {
          animation: pulseSubtle 2s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: floatSlow 6s ease-in-out infinite;
        }
        
        .animate-float-med {
          animation: floatMed 4s ease-in-out infinite;
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
        
        .animate-slideUp {
          animation: slideUp 0.8s ease-out forwards;
        }
        
        .animate-float-opposite-slow {
          animation: floatOppositeSlow 5s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: floatSlow 3s ease-in-out infinite;
        }
        
        @keyframes pulseSlow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
        
        .animate-slideUp {
          animation: slideUp 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        
        .animate-float-slow {
          animation: floatSlow 6s ease-in-out infinite;
        }
        
        .animate-float-med {
          animation: floatMed 3s ease-in-out infinite;
        }
        
        .animate-float-opposite-slow {
          animation: floatOppositeSlow 5s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spinSlow 15s linear infinite;
        }
        
        .animate-bounce-slow {
          animation: pulseSlow 2s infinite;
        }
        
        .animate-pulse-subtle {
          animation: pulseSlow 2s infinite;
        }
      `}</style>
    </div>
  );
}
