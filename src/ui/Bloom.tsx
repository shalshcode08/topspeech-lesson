type Band = 'crisp' | 'clear' | 'forming' | 'building';

const NOTES: Record<Band, string> = {
  crisp:    'Crisp R — well shaped.',
  clear:    'Clear R — keep the tongue light.',
  forming:  'Forming — the R is coming through.',
  building: 'Building — your voice is finding its shape.',
};

const COLORS: Record<Band, string> = {
  crisp:    'var(--color-sage)',
  clear:    'var(--color-sage)',
  forming:  'var(--color-amber)',
  building: 'var(--color-amber)',
};

function bandFor(conf: number): Band {
  if (conf >= 90) return 'crisp';
  if (conf >= 80) return 'clear';
  if (conf >= 70) return 'forming';
  return 'building';
}

type Props = { confidence: number; attempts: number };

export function Bloom({ confidence, attempts }: Props) {
  const band = bandFor(confidence);
  const r = 26;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - confidence / 100);

  return (
    <div className="bloom animate-bloom-in">
      <div className="bloom__ring">
        <svg viewBox="0 0 60 60">
          <circle cx="30" cy="30" r={r} fill="none" stroke="#E5EBE0" strokeWidth="6" />
          <circle
            cx="30" cy="30" r={r} fill="none"
            stroke={COLORS[band]} strokeWidth="6" strokeLinecap="round"
            strokeDasharray={circumference.toFixed(2)}
            strokeDashoffset={offset.toFixed(2)}
          />
        </svg>
        <div className="bloom__ring-num">{confidence}<small>%</small></div>
      </div>
      <div>
        <div className="bloom__band">{band}</div>
        <div className="bloom__note">{NOTES[band]}</div>
        <div className="bloom__meta">Attempt {attempts} · we're listening for shape, not perfection.</div>
      </div>
    </div>
  );
}
