import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'default' | 'small' | 'large';
};

export function Button({ variant = 'primary', size = 'default', className = '', ...props }: ButtonProps) {
  let baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-all duration-150 ease-[cubic-bezier(0.34,1.56,0.64,1)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-raven-bg-base focus:ring-raven-pulse active:scale-[0.97] active:duration-100 active:ease-out disabled:opacity-50 disabled:pointer-events-none ";
  
  // Height & padding per spec
  if (size === 'small') baseClasses += 'h-8 px-3 text-xs '; // 32px
  else if (size === 'large') baseClasses += 'h-11 px-5 text-base font-semibold '; // 44px
  else baseClasses += 'h-9 px-4 text-sm '; // 36px

  const variants = {
    primary: "bg-raven-pulse text-white hover:bg-raven-pulse-hover border border-transparent shadow-[0_0_15px_rgba(110,86,245,0.0)] hover:shadow-[0_0_15px_rgba(110,86,245,0.4)]",
    secondary: "bg-raven-bg-surface-2 text-raven-text-primary border border-raven-border-subtle hover:bg-raven-bg-surface-3 hover:border-raven-border-strong",
    ghost: "bg-transparent text-raven-text-secondary hover:text-raven-text-primary hover:bg-raven-bg-surface-2",
    danger: "bg-raven-severity-critical/10 text-raven-severity-critical border border-raven-severity-critical/20 hover:bg-raven-severity-critical/20"
  };

  baseClasses += variants[variant] || variants.primary;

  return (
    <button className={`${baseClasses} ${className}`} {...props} />
  );
}
