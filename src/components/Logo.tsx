export function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 font-mono font-bold tracking-wider ${className}`}>
      <div className="relative flex h-8 w-8 items-center justify-center rounded bg-raven-light border border-raven-border shadow-[0_0_15px_rgba(0,240,255,0.15)]">
        {/* Abstract bird/shield logo composed of SVG paths */}
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-raven-accent">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        </svg>
      </div>
      <span className="text-raven-textTitle text-lg">
        RAVEN<span className="text-raven-accent">.</span>
      </span>
    </div>
  );
}
