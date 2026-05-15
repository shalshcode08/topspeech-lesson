import { TOTAL_CARDS } from '../data/cards';

export function ProgressBar({ activeIndex }: { activeIndex: number }) {
  const segments = Array.from({ length: TOTAL_CARDS }, (_, i) => {
    let pct = 0;
    if (i < Math.floor(activeIndex)) pct = 100;
    else if (i === Math.floor(activeIndex)) pct = (activeIndex - i) * 100;
    return pct;
  });

  return (
    <div className="progress-bar">
      {segments.map((pct, i) => (
        <div key={i} className="progress-bar__segment">
          <div className="progress-bar__fill" style={{ width: `${pct}%` }} />
        </div>
      ))}
    </div>
  );
}
