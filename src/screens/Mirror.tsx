import { useRef, useState } from 'react';
import { Chip } from '../ui/Chip';
import { Button } from '../ui/Button';
import { Bloom } from '../ui/Bloom';
import { MicGlyph } from '../ui/Icons';
import type { MirrorCard, MoodId } from '../types';
import type { LessonApi } from '../hooks/useLesson';

const MOOD_BASE: Record<MoodId, number> = { clear: 74, tired: 66, tense: 62, strong: 82 };

type Props = { card: MirrorCard; index: number; api: LessonApi };

export function Mirror({ card, index, api }: Props) {
  const { lesson, addXp, advanceFrom } = api;
  const [recording, setRecording] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [mirrorOn, setMirrorOn] = useState(false);
  const recTimer = useRef<number | null>(null);

  const onRecord = () => {
    if (recording) return;
    setRecording(true);
    setConfidence(null);
    recTimer.current = window.setTimeout(() => {
      setRecording(false);
      const nextAttempts = attempts + 1;
      setAttempts(nextAttempts);
      const base = lesson.mood ? MOOD_BASE[lesson.mood] : 70;
      const conf = Math.min(95, base + (nextAttempts - 1) * 7 + Math.round(Math.random() * 5));
      setConfidence(conf);
    }, 2000);
  };

  const onRetry = () => setConfidence(null);
  const onContinue = () => {
    addXp(4);
    advanceFrom(index);
  };

  const label = recording
    ? 'Listening for shape…'
    : confidence != null
      ? `Shape registered · ${confidence}%`
      : null;

  return (
    <section className="screen-section animate-fade-slide-in">
      <Chip>Mirror mode · tongue placement</Chip>
      <h2 className="heading-display heading-display--md mt-3">Find the shape</h2>
      <p className="body-text body-text--sm mt-2">{card.cue}</p>

      <div className="mirror-card">
        <div className="mirror-card__tag">side view</div>
        <svg className="mirror-card__svg" viewBox="0 0 320 200">
          <defs>
            <linearGradient id="lipG" x1="0" x2="1">
              <stop offset="0" stopColor="var(--color-lip)" />
              <stop offset="1" stopColor="var(--color-lip-deep)" />
            </linearGradient>
          </defs>
          <path
            d="M30,110 Q40,40 130,40 Q220,40 250,80 Q280,110 250,150 Q220,180 150,180 Q70,180 40,150 Z"
            fill="#F4E6D6" stroke="#E3D8C6" strokeWidth="2"
          />
          <path d="M150,95 Q170,90 200,98" stroke="var(--color-ink)" strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="158" cy="93" r="3" fill="var(--color-primary)">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2.2s" repeatCount="indefinite" />
          </circle>
          <text x="166" y="84" fontFamily="Inter" fontSize="10" fill="var(--color-ink)">target ridge</text>
          <path d="M210,110 Q235,108 248,118 Q235,128 210,124 Z" fill="url(#lipG)" />
          <g className="animate-tongue-lift">
            <path d="M120,150 Q160,120 200,128 Q210,140 195,148 Q150,160 120,150 Z" fill="var(--color-tongue)" />
            <path d="M120,150 Q160,120 200,128" stroke="var(--color-lip-deep)" strokeWidth="1.5" fill="none" opacity="0.5" />
          </g>
          <path
            d="M255,118 q12,0 22,4"
            stroke="var(--color-sage)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeDasharray="3 3"
          >
            <animate attributeName="stroke-dashoffset" values="0;-12" dur="1.4s" repeatCount="indefinite" />
          </path>
        </svg>

        <ul className="mirror-card__list">
          <li><span className="dot dot--primary" /> Tongue tip rises — does not touch the ridge</li>
          <li><span className="dot dot--sage" /> Lips slightly rounded, jaw relaxed</li>
          <li><span className="dot dot--amber" /> Voiced — feel a soft buzz in the throat</li>
        </ul>
      </div>

      <div className="row-tile">
        <span>Camera mirror (optional)</span>
        <button type="button" onClick={() => setMirrorOn(true)}>
          {mirrorOn ? 'requested · permission stub' : 'enable'}
        </button>
      </div>

      <div className="record-area is-revealed">
        <div className="body-text body-text--xs">When the shape feels right —</div>
        <button type="button" className="rec-btn" onClick={onRecord}>
          <span className={`rec-ring ${recording ? 'is-active animate-ring-expand' : ''}`} />
          <MicGlyph />
        </button>
        <div className="body-text body-text--xs mt-2">
          {label ?? <>say the <span className="font-display italic">R</span></>}
        </div>
        {confidence != null && <div style={{ width: '100%' }}>
          <Bloom confidence={confidence} attempts={attempts} />
        </div>}
      </div>

      {confidence != null && (
        <div className="spacer-auto fade-mask is-visible mt-5">
          <div className="cta-grid">
            <Button variant="soft" onClick={onRetry}>Try again</Button>
            <Button onClick={onContinue}>Continue</Button>
          </div>
        </div>
      )}

      <span className="sr-only">{card.word}</span>
    </section>
  );
}
