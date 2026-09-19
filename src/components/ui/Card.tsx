

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  interactive?: boolean;
};

export function Card({ interactive = false, className = '', children, ...props }: CardProps) {
  let classes = 'bg-raven-bg-surface border border-raven-border-subtle rounded-md p-5 ';
  
  if (interactive) {
    classes += 'cursor-pointer hover:border-raven-border-strong transition-colors duration-150 ';
  }

  return (
    <div className={`${classes} ${className}`} {...props}>
      {children}
    </div>
  );
}
