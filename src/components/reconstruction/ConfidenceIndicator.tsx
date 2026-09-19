export function ConfidenceIndicator({ score }: { score: number }) {
  let color = 'bg-raven-severity-low';

  if (score >= 85) {
    color = 'bg-raven-status-success';
  } else if (score >= 60) {
    color = 'bg-raven-severity-medium';
  }

  return (
    <div className="flex flex-col gap-1 w-20">
      <div className="flex justify-between items-center text-[10px] font-mono uppercase text-raven-text-tertiary leading-none">
        <span>Conf</span>
        <span>{score}%</span>
      </div>
      <div className="h-1.5 w-full bg-raven-bg-surface-3 rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}
