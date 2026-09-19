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
    // If already seen in this session, immediately skip to login
    if (sessionStorage.getItem('raven_intro_seen')) {
      finishIntro();
      return;
    }

    // Animation timeline
    const timers = [
      setTimeout(() => setStage(1), 500),   // Stage 1: Logo & RAVEN
      setTimeout(() => setStage(2), 1500),  // Stage 2: Full Name
      setTimeout(() => setStage(3), 2500),  // Stage 3: Tagline
      setTimeout(() => finishIntro(), 4000) // End: Redirect
    ];

    // Handle global keypress for skipping
    const handleKeyDown = () => finishIntro();
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Prevent flash of unstyled content or intro flash if already seen
  if (sessionStorage.getItem('raven_intro_seen')) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 flex flex-col items-center justify-center bg-raven-darker cursor-pointer z-50 transition-colors duration-1000"
      onClick={finishIntro}
      title="Click anywhere to skip"
    >
      <div className="flex flex-col items-center text-center space-y-6">
        
        {/* Stage 1: Logo & Name */}
        <div className={`transition-all duration-1000 transform ${stage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex items-center gap-3 font-mono font-bold tracking-widest text-4xl">
            <div className="relative flex h-12 w-12 items-center justify-center rounded bg-raven-light border border-raven-border shadow-[0_0_20px_rgba(0,240,255,0.2)]">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-raven-accent">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-raven-textTitle">
              RAVEN<span className="text-raven-accent">.</span>
            </span>
          </div>
        </div>

        {/* Stage 2: Full Name */}
        <div className={`transition-all duration-700 delay-100 ${stage >= 2 ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-raven-text font-mono text-sm tracking-widest uppercase">
            Ransomware Attack Visualization<br />and Event Navigator
          </p>
        </div>

        {/* Stage 3: Tagline */}
        <div className={`transition-all duration-700 delay-100 ${stage >= 3 ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-raven-textTitle text-xl font-light mt-4 italic">
            "Trace the Attack. Measure the Impact."
          </p>
        </div>

      </div>

      {/* Skip Hint */}
      <div className={`absolute bottom-8 text-raven-text/50 font-mono text-xs tracking-widest transition-opacity duration-1000 ${stage >= 1 ? 'opacity-100' : 'opacity-0'}`}>
        [ Press any key or click to skip ]
      </div>
    </div>
  );
}
