import React, { forwardRef, useState } from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', type, error, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    let classes = 'h-9 px-3 w-full rounded bg-raven-bg-surface-2 border text-raven-text-primary text-sm placeholder:text-raven-text-tertiary focus:outline-none focus:border-raven-accent focus:shadow-[0_0_0_3px_rgba(61,220,151,0.15)] transition-all ';
    
    if (error) {
      classes += 'border-raven-severity-critical ';
    } else {
      classes += 'border-raven-border-subtle ';
    }

    return (
      <div className="w-full">
        <div className="relative">
          <input ref={ref} type={inputType} className={`${classes} ${isPassword ? 'pr-10' : ''} ${className}`} {...props} />
          
          {isPassword && (
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-0 top-0 h-9 w-10 flex items-center justify-center text-raven-text-tertiary hover:text-raven-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-raven-accent rounded"
              onClick={() => setShowPassword(!showPassword)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {showPassword ? (
                  <>
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </>
                ) : (
                  <>
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </>
                )}
              </svg>
            </button>
          )}
        </div>
        {error && <p className="mt-1 text-xs text-raven-severity-critical">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';
