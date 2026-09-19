import { useEffect, useState } from 'react';

export function AnimatedCounter({ value, duration = 400 }: { value: number, duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const startValue = count;
    const endValue = value;

    if (startValue === endValue) return;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // easeOut cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      setCount(Math.floor(startValue + (endValue - startValue) * easeProgress));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(endValue);
      }
    };

    window.requestAnimationFrame(step);
  }, [value, duration]);

  return <span>{count}</span>;
}
