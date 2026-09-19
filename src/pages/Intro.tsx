import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Intro() {
  const navigate = useNavigate();
  const [stage, setStage] = useState(0);

  const finishIntro = () => {
    sessionStorage.setItem('raven_intro_seen', 'true');
    navigate('/login', { replace: true });
  };

  useEffect(() => {
    if (sessionStorage.getItem('raven_intro_seen')) {
      finishIntro();
      return;
    }

    const timers = [
      setTimeout(() => setStage(1), 200),   // 1. (0-200ms) Black to base-bg fade in (handled by wrapper)
      setTimeout(() => setStage(2), 600),   // 2. (200-600ms) RAVEN mark fades/scales in with glow
      setTimeout(() => setStage(3), 1000),  // 3. (600-1000ms) Wordmark draws in
      setTimeout(() => setStage(4), 1600),  // 4. (1000-1600ms) Tagline fades in
      setTimeout(() => setStage(5), 2200),  // 6. (2200-2600ms) Cross-fade transition starts
      setTimeout(() => finishIntro(), 2600) // End
    ];

    const handleKeyDown = () => finishIntro();
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (sessionStorage.getItem('raven_intro_seen')) {
    return null;
  }

  return (
    <div 
      className={`fixed inset-0 flex flex-col items-center justify-center cursor-pointer z-50 transition-colors duration-200 ${stage === 0 ? 'bg-black' : 'bg-raven-bg-base'} ${stage >= 5 ? 'opacity-0 transition-opacity duration-400 ease-in-out' : 'opacity-100'}`}
      onClick={finishIntro}
      title="Click anywhere to skip"
    >
      <div className="relative flex flex-col items-center text-center space-y-6">
        
        {/* Ambient Glow */}
        <div 
          className={`absolute inset-0 -z-10 bg-raven-pulse/8 blur-[100px] pointer-events-none rounded-full w-[300px] h-[300px] -left-20 -top-20 transition-opacity duration-1000 ${stage >= 1 ? 'opacity-100' : 'opacity-0'}`} 
        />
        
        <div className="flex items-center gap-3">
          {/* Logo Mark */}
          <div 
            className={`relative flex h-12 w-12 items-center justify-center rounded bg-raven-bg-surface border border-raven-border-subtle shadow-[0_0_15px_rgba(110,86,245,0.15)] transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${stage >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-raven-pulse">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
            </svg>
          </div>
          
          {/* Wordmark */}
          <span 
            className={`text-3xl font-bold tracking-[-0.02em] font-sans text-transparent bg-clip-text bg-raven-gradient drop-shadow-sm transition-all duration-400 ease-out ${stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
          >
            RAVEN
          </span>
        </div>

        {/* Tagline */}
        <div 
          className={`mt-4 text-sm tracking-wide text-raven-text-secondary transition-all duration-600 ease-out ${stage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
        >
          Intelligence System
        </div>
      </div>

      {/* Skip Hint */}
      <div className={`absolute bottom-8 text-raven-text-tertiary/50 font-mono text-xs tracking-widest transition-opacity duration-1000 ${stage >= 1 ? 'opacity-100' : 'opacity-0'}`}>
        [ Press any key or click to skip ]
      </div>
    </div>
  );
}
