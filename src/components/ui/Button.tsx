

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'default' | 'small' | 'large';
};

export function Button({ variant = 'primary', size = 'default', className = '', ...props }: ButtonProps) {
  let baseClasses = 'inline-flex items-center justify-center rounded transition-all duration-100 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-raven-accent focus-visible:ring-offset-2 focus-visible:ring-offset-raven-bg-base ';
  
  // Height & padding per spec
  if (size === 'small') baseClasses += 'h-8 px-3 text-xs '; // 32px
  else if (size === 'large') baseClasses += 'h-11 px-5 text-base font-semibold '; // 44px
  else baseClasses += 'h-9 px-4 text-sm font-medium '; // 36px

  // Variant styling per spec
  if (variant === 'primary') {
    baseClasses += 'bg-raven-accent text-raven-text-inverse hover:bg-raven-accent-hover active:scale-[0.98] ';
  } else if (variant === 'secondary') {
    baseClasses += 'bg-transparent border border-raven-border-strong text-raven-text-primary hover:bg-raven-bg-surface-2 ';
  } else if (variant === 'danger') {
    baseClasses += 'bg-transparent border border-raven-severity-critical text-raven-severity-critical hover:bg-raven-severity-critical/10 ';
  }

  return (
    <button className={`${baseClasses} ${className}`} {...props} />
  );
}
