'use client';

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  
  // Simplified state management
  const [clickCount, setClickCount] = useState(0);
  const [noButtonSize, setNoButtonSize] = useState(1);
  const [noButtonText, setNoButtonText] = useState("No");
  const [yesButtonText, setYesButtonText] = useState("Yes");
  const [breakOutOfCard, setBreakOutOfCard] = useState(false);
  const [showInitialMeme, setShowInitialMeme] = useState(true);
  
  // Reduced number of decorative elements for better performance
  const [floatingElements, setFloatingElements] = useState<Array<{id: number, type: string, top: number, left: number, rotation: number, animationDelay: number}>>([]);
  
  // Initialize floating background elements - reduced for better performance
  useEffect(() => {
    const elements = [];
    const types = ['leaf', 'star', 'heart', 'circle', 'squiggle'];
    
    // Reduced from 20 to 10 elements for better performance
    for (let i = 0; i < 10; i++) {
      elements.push({
        id: i,
        type: types[Math.floor(Math.random() * types.length)],
        top: Math.random() * 100,
        left: Math.random() * 100,
        rotation: Math.random() * 360,
        animationDelay: Math.random() * 5
      });
    }
    
    setFloatingElements(elements);
    
    // Hide the initial meme after 3 seconds
    const timer = setTimeout(() => {
      setShowInitialMeme(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const yesMessages = [
    "Yes", // Initial text
    "Are you really sure you want it?",
    "Do you think you deserve it?",
    "Think about it properly",
    "Seems like you don't want it, buddy",
    "What if I give you feet pics, you still want Sign SBT?",
    "Stop clicking YES",
    "Stop",
    "You're persistent"
  ];

  // Fixed question text that doesn't change
  const questionText = "Do you think you should get a Sign SBT?";

  // Function to handle Yes button click - simplified with fixed growth for No button
  const handleYesClick = () => {
    // Break out of card on the first click
    if (clickCount === 0) {
      setBreakOutOfCard(true);
    }
    
    if (clickCount >= yesMessages.length - 1) {
      // Redirect to win page on final yes click
      router.push('/you-win');
      return;
    }
    
    // Update click count and change Yes button text
    setClickCount(prevCount => prevCount + 1);
    setYesButtonText(yesMessages[clickCount + 1]);
    
    // Use predefined sizes for No button to prevent any bouncing
    // This uses a lookup table instead of calculations which might cause layout shifts
    // Make these values MUCH larger to ensure the button gets huge
    const noButtonSizes = [1, 3, 8, 15, 25, 40, 70, 120, 180, 250];
    const newSize = noButtonSizes[Math.min(clickCount + 1, noButtonSizes.length - 1)];
    setNoButtonSize(newSize);
  };

  // Function to handle No button click - redirects to no-thanks page
  const handleNoClick = () => {
    // Just redirect to no-thanks page without breaking card
    router.push('/no-thanks');
  };

  // Function to render the right floating element
  const renderFloatingElement = (element: {id: number, type: string, top: number, left: number, rotation: number, animationDelay: number}) => {
    switch (element.type) {
      case 'leaf':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--orange-dark)" strokeWidth="1">
            <path d="M12,2 C17,2 22,7 22,12 C22,17 17,22 12,22 C7,22 2,17 2,12 C2,7 7,2 12,2 Z" />
            <path d="M12,5 C12,15 5,12 5,12 C15,12 12,19 12,19 C12,9 19,12 19,12 C9,12 12,5 12,5 Z" />
          </svg>
        );
      case 'star':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--orange-light)" opacity="0.6">
            <path d="M12,2 L15,9 L22,9 L16,14 L18,21 L12,17 L6,21 L8,14 L2,9 L9,9 Z" />
          </svg>
        );
      case 'heart':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--pink-accent)" opacity="0.6">
            <path d="M12,21 C10,19 4,14 4,8 C4,5 6,3 9,3 C10.5,3 12,4 12,5 C12,4 13.5,3 15,3 C18,3 20,5 20,8 C20,14 14,19 12,21 Z" />
          </svg>
        );
      case 'circle':
        return (
          <svg width="16" height="16" viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="7" fill="var(--orange-primary)" opacity="0.4" />
          </svg>
        );
      case 'squiggle':
        return (
          <svg width="32" height="16" viewBox="0 0 32 16" fill="none" stroke="var(--green-accent)" strokeWidth="2">
            <path d="M2,8 C6,4 10,12 16,8 C22,4 26,12 30,8" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen p-4 flex flex-col items-center justify-center relative overflow-visible">
      {/* Initial Meme Overlay - shown for 3 seconds */}
      {showInitialMeme && (
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center animate-fadeOut">
          <Image 
            src="/oninitialload.png" 
            alt="Initial Load Meme" 
            width={500} 
            height={500}
            priority
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
      {/* Organic hand-drawn border that surrounds everything */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg width="100%" height="100%" className="absolute">
          <filter id="paper-texture" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise" />
            <feDiffuseLighting in="noise" lightingColor="#fff8ec" surfaceScale="1" result="light">
              <feDistantLight azimuth="45" elevation="35" />
            </feDiffuseLighting>
          </filter>
          <rect width="100%" height="100%" fill="var(--cream)" filter="url(#paper-texture)" opacity="0.3" />
        </svg>
      </div>
      {/* Improved organic background doodles */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        {/* Warm glow background */}
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_center,var(--orange-light)_0%,transparent_75%)]" style={{ opacity: 0.15 }} />
        
        {/* Hand-drawn doodle elements */}
        <svg className="absolute top-0 left-0 w-full h-full" style={{ opacity: 0.15 }}>
          <pattern id="organicPattern" x="0" y="0" width="400" height="400" patternUnits="userSpaceOnUse">
            {/* Squiggly lines */}
            <path d="M10,100 C50,80 70,120 100,100 C130,80 150,120 180,100" stroke="var(--orange-dark)" strokeWidth="2" fill="none" />
            <path d="M50,200 C90,180 110,220 140,200 C170,180 190,220 220,200" stroke="var(--orange-primary)" strokeWidth="2" fill="none" />
            <path d="M200,150 C220,100 250,190 280,150 C310,110 340,180 370,150" stroke="var(--orange-dark)" strokeWidth="2" fill="none" />
            
            {/* Stars and hearts */}
            <path d="M80,50 l5,15 15,0 -12,9 5,15 -13,-9 -13,9 5,-15 -12,-9 15,0z" fill="var(--orange-light)" opacity="0.7" />
            <path d="M280,350 l5,15 15,0 -12,9 5,15 -13,-9 -13,9 5,-15 -12,-9 15,0z" fill="var(--orange-light)" opacity="0.7" />
            <path d="M350,230 C340,210 320,210 310,230 300,250 350,280 350,280 350,280 400,250 390,230 380,210 360,210 350,230z" fill="var(--pink-accent)" opacity="0.7" />
            
            {/* Circles and dots */}
            <circle cx="120" cy="330" r="15" fill="var(--orange-primary)" opacity="0.4" />
            <circle cx="320" cy="80" r="10" fill="var(--green-accent)" opacity="0.4" />
            <circle cx="50" cy="250" r="5" fill="var(--orange-dark)" opacity="0.4" />
            <circle cx="250" cy="300" r="8" fill="var(--orange-primary)" opacity="0.4" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#organicPattern)" />
        </svg>
        
        {/* Animated floating doodles */}
        <div className="absolute top-10 left-[10%] animate-float-slow">
          <svg width="80" height="80" viewBox="0 0 80 80">
            <path d="M40,10 C60,10 70,30 70,40 C70,50 60,70 40,70 C20,70 10,50 10,40 C10,30 20,10 40,10 Z" 
                  stroke="var(--orange-primary)" strokeWidth="2" fill="none" strokeDasharray="5 3" />
          </svg>
        </div>
        
        <div className="absolute bottom-[15%] right-[10%] animate-float-opposite">
          <svg width="90" height="90" viewBox="0 0 90 90">
            <path d="M30,20 Q45,5 60,20 Q75,35 60,50 Q45,65 30,50 Q15,35 30,20 Z" 
                  stroke="var(--orange-dark)" strokeWidth="2" fill="none" />
          </svg>
        </div>
        
        <div className="absolute top-[25%] right-[15%] animate-float-fast">
          <svg width="60" height="60" viewBox="0 0 60 60">
            <path d="M20,10 L30,30 L50,30 L35,40 L40,60 L25,48 L10,60 L15,40 L0,30 L20,30 Z" 
                  stroke="var(--orange-light)" strokeWidth="1" fill="none" />
          </svg>
        </div>
        
        <div className="absolute bottom-[20%] left-[15%] animate-float-slower">
          <svg width="70" height="70" viewBox="0 0 70 70">
            <path d="M10,35 C10,20 20,10 35,10 C50,10 60,20 60,35 C60,50 50,60 35,60 C20,60 10,50 10,35 Z" 
                  stroke="var(--green-accent)" strokeWidth="2" fill="none" />
            <path d="M20,35 L50,35 M35,20 L35,50" stroke="var(--green-accent)" strokeWidth="2" />
          </svg>
        </div>
        
        {/* More floating elements for richness */}
        {floatingElements.map((element) => (
          <div 
            key={element.id} 
            className="absolute animate-float"
            style={{
              top: `${element.top}%`,
              left: `${element.left}%`,
              transform: `rotate(${element.rotation}deg)`,
              animationDelay: `${element.animationDelay}s`,
              opacity: 0.4
            }}
          >
            {renderFloatingElement(element)}
          </div>
        ))}
      </div>
      

      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(var(--rotation)); }
          25% { transform: translate(10px, -10px) rotate(calc(var(--rotation) + 5deg)); }
          50% { transform: translate(5px, 5px) rotate(calc(var(--rotation) - 10deg)); }
          75% { transform: translate(-5px, 10px) rotate(calc(var(--rotation) + 15deg)); }
        }
        
        .animate-float {
          --rotation: 0deg;
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float 12s ease-in-out infinite;
        }
        
        .animate-float-fast {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-slower {
          animation: float 15s ease-in-out infinite;
        }
        
        .animate-float-opposite {
          animation: floatOpposite 10s ease-in-out infinite;
        }
        
        @keyframes floatOpposite {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(-10px, 10px) rotate(-5deg); }
          50% { transform: translate(-5px, -5px) rotate(10deg); }
          75% { transform: translate(5px, -10px) rotate(-15deg); }
        }
        
        @keyframes fall {
          0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        
        @keyframes fadeOut {
          0% { opacity: 1; }
          80% { opacity: 1; }
          100% { opacity: 0; visibility: hidden; }
        }
        
        .animate-fadeOut {
          animation: fadeOut 3s ease-in-out forwards;
        }
        
        .buttons-container {
          display: block; /* Changed to block to allow natural document flow */
          width: 100%;
          position: relative;
          overflow: visible;
          padding: 16px;
          margin-top: 16px;
          margin-bottom: 16px;
          text-align: center; /* Center the buttons */
        }
        
        /* Ensure container doesn't restrict button growth but keep initial state compact */
        .main-container {
          overflow: visible !important;
          max-width: 100vw !important;
          width: auto !important;
          min-height: auto;
          display: block; /* Changed to block to allow natural flow */
          text-align: center;
          transition: all 0.3s ease;
        }
        
        /* Animation for when buttons get pushed */
        @keyframes gentle-push {
          0% { transform: translateX(0); }
          25% { transform: translateX(5px); }
          75% { transform: translateX(-5px); }
          100% { transform: translateX(0); }
        }
      `}</style>
      
      {/* Content for both card and non-card states */}
      {!breakOutOfCard ? (
        /* Card with single border - only shown before first click */
        <div className="flex flex-col items-center text-center mx-auto p-8 main-container relative"
             style={{ width: 'auto', maxWidth: '500px', position: 'relative', zIndex: 1, overflow: 'visible' }}>
          
          {/* Single hand-drawn border */}
          <div className="absolute -inset-4 -z-10">
            <svg width="100%" height="100%" viewBox="0 0 400 500" preserveAspectRatio="none">
              <path d="M20,10 C15,15 10,40 10,50 C10,60 8,150 10,200 C12,250 8,350 10,400 C12,450 15,460 20,470 C25,480 40,490 50,490 
                     C100,490 300,495 350,490 C370,488 380,485 385,480 C390,475 395,460 395,450 
                     C395,420 398,300 395,250 C392,200 398,100 395,70 C392,40 390,25 380,15 C370,5 350,5 340,5 
                     C320,5 80,0 60,5 C40,5 25,5 20,10 Z" 
                     stroke="var(--orange-dark)" strokeWidth="2" fill="none" strokeDasharray="4" />
            </svg>
          </div>
          
          <div className="handwritten text-4xl font-bold mb-6 text-[var(--orange-dark)]">
            <h1 className="relative inline-block">
              Sign SBT
              <span className="absolute -top-6 -right-6 transform rotate-12 text-2xl">✨</span>
            </h1>
          </div>
          
          <div className="flex justify-center mb-6">
            <Image 
              src="/sign.png" 
              alt="Sign SBT" 
              width={200} 
              height={200}
              className="transform hover:rotate-3 transition-transform duration-300 mx-auto"
              priority
            />
          </div>
          
          <h2 className="text-2xl mb-6 font-bold">{questionText}</h2>
          
          {/* Buttons side by side with equal initial sizes */}
          <div className="flex flex-row justify-center items-center gap-4 flex-wrap mb-6">
            <button 
              onClick={handleYesClick}
              className="button-yes rounded-full font-bold shadow-md hover:shadow-lg"
              style={{
                padding: '12px 24px',
                fontSize: '16px',
                minWidth: '100px',
                transition: 'all 0.2s ease'
              }}
            >
              {yesButtonText}
            </button>
            
            <button 
              onClick={handleNoClick}
              className="button-no rounded-full font-bold shadow-md hover:shadow-lg"
              style={{ 
                padding: '12px 24px',
                fontSize: '16px',
                minWidth: '100px'
              }}
            >
              {noButtonText}
            </button>
          </div>
          
          <div className="mt-4 text-sm opacity-70 handwritten">
            <p>You know you want to...</p>
          </div>
        </div>
      ) : (
        /* Content without card - after first click */
        <div className="flex flex-col items-center text-center mx-auto relative z-10 my-8">
          <div className="handwritten text-4xl font-bold mb-6 text-[var(--orange-dark)]">
            <h1 className="relative inline-block">
              Sign SBT
              <span className="absolute -top-6 -right-6 transform rotate-12 text-2xl">✨</span>
            </h1>
          </div>
          
          <div className="flex justify-center mb-6">
            <Image 
              src="/sign.png" 
              alt="Sign SBT" 
              width={200} 
              height={200}
              className="transform hover:rotate-3 transition-transform duration-300 mx-auto"
              priority
            />
          </div>
          
          <h2 className="text-2xl mb-6 font-bold">{questionText}</h2>
          
          {/* Super simple layout with No button pushing Yes button */}
          <div className="w-full overflow-visible flex flex-col items-center">
            {/* The giant No button first, so it pushes the Yes button */}
            <div className="mb-6">
              <button 
                onClick={handleNoClick}
                className="button-no font-bold shadow-md"
                style={{ 
                  // Use fixed pixel padding that changes with size to avoid calculations
                  padding: noButtonSize > 200 ? '80px 120px' :
                           noButtonSize > 100 ? '70px 100px' :
                           noButtonSize > 50 ? '60px 90px' :
                           noButtonSize > 20 ? '40px 60px' :
                           noButtonSize > 10 ? '30px 50px' :
                           noButtonSize > 5 ? '25px 40px' : '20px 30px',
                  // Use fixed font sizes based on button size
                  fontSize: noButtonSize > 200 ? '52px' :
                            noButtonSize > 100 ? '44px' :
                            noButtonSize > 50 ? '36px' :
                            noButtonSize > 20 ? '28px' :
                            noButtonSize > 10 ? '22px' :
                            noButtonSize > 5 ? '18px' : '16px',
                  // Fixed widths based on size steps - MUCH bigger max sizes
                  width: noButtonSize > 200 ? '95vw' :
                         noButtonSize > 100 ? '90vw' :
                         noButtonSize > 50 ? '80vw' :
                         noButtonSize > 20 ? '70vw' :
                         noButtonSize > 10 ? '50vw' :
                         noButtonSize > 5 ? '40vw' : 'auto',
                  // Fixed heights based on size steps - MUCH bigger max sizes
                  height: noButtonSize > 200 ? '90vh' :
                          noButtonSize > 100 ? '85vh' :
                          noButtonSize > 50 ? '75vh' :
                          noButtonSize > 20 ? '60vh' :
                          noButtonSize > 10 ? '40vh' :
                          noButtonSize > 5 ? '30vh' : 'auto',
                  /* IMPORTANT: Remove all transitions and animations */
                  transition: 'none !important',
                  animation: 'none !important',
                  transform: 'none !important',
                  lineHeight: '1.2',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
                  borderRadius: '30px',
                  display: 'block',
                  margin: '0 auto'
                }}
              >
                {noButtonText}
              </button>
            </div>
            
            {/* Yes button always below the No button */}
            <div className="mt-4">
              <button 
                onClick={handleYesClick}
                className="button-yes rounded-full font-bold shadow-md hover:shadow-lg"
                style={{
                  padding: '12px 24px',
                  fontSize: noButtonSize > 10 ? '14px' : '16px', // Gets smaller as No gets bigger
                  minWidth: '100px'
                }}
              >
                {yesButtonText}
              </button>
            </div>
          </div>
          
          <div className="mt-4 text-sm opacity-70 handwritten">
            <p>You know you want to...</p>
          </div>
        </div>
      )}
      

      
      {/* Additional decorative elements */}
      <div className="absolute bottom-10 left-10 animate-pulse" style={{ animationDuration: '3s' }}>
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <path d="M20,40 C20,30 30,20 40,20 C50,20 60,30 60,40 C60,50 50,60 40,60 C30,60 20,50 20,40 Z" 
                stroke="var(--orange-primary)" strokeWidth="2" strokeDasharray="5 3" fill="none" />
          <path d="M40,20 L40,15 M60,40 L65,40 M40,60 L40,65 M20,40 L15,40" 
                stroke="var(--orange-primary)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      
      <div className="absolute top-10 right-10 animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }}>
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <path d="M30,10 L35,25 L50,30 L35,35 L30,50 L25,35 L10,30 L25,25 Z" 
                stroke="var(--orange-light)" strokeWidth="2" fill="none" />
        </svg>
      </div>
    </div>
  );
}
