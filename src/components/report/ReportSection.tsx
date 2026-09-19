import type { ReactNode } from 'react';

interface ReportSectionProps {
  title: string;
  children: ReactNode;
}

export function ReportSection({ title, children }: ReportSectionProps) {
  return (
    <section className="mb-12 print:mb-8 print:break-inside-avoid">
      <h2 className="text-xl font-bold text-raven-text-primary mb-4 pb-2 border-b-2 border-raven-border-strong uppercase tracking-wide">
        {title}
      </h2>
      <div className="space-y-4">
        {children}
      </div>
    </section>
  );
}
