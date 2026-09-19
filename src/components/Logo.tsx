export function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`relative flex items-center gap-2 font-sans font-bold tracking-[-0.02em] ${className}`}>
      {/* Ambient Glow */}
      <div className="absolute inset-0 -z-10 bg-raven-pulse/8 blur-[100px] pointer-events-none rounded-full w-[200px] h-[200px] -left-10 -top-10" />
      
      <div className="relative flex h-8 w-8 items-center justify-center rounded bg-raven-bg-surface border border-raven-border-subtle shadow-[0_0_15px_rgba(110,86,245,0.15)]">
        {/* Abstract bird/shield logo composed of SVG paths */}
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-raven-pulse">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        </svg>
      </div>
      <span className="text-xl font-bold text-transparent bg-clip-text bg-raven-gradient drop-shadow-sm">
        RAVEN
      </span>
    </div>
  );
}
