import { useRef, useState } from 'react';
import { Chip } from '../ui/Chip';
import { Button } from '../ui/Button';
import { Bloom } from '../ui/Bloom';
import { PlayGlyph, PauseGlyph, MicGlyph } from '../ui/Icons';
import type { ListenCard, MoodId } from '../types';
import type { LessonApi } from '../hooks/useLesson';

const MOOD_BASE: Record<MoodId, number> = { clear: 78, tired: 68, tense: 64, strong: 84 };

type Props = { card: ListenCard; index: number; api: LessonApi };

export function Listen({ card, index, api }: Props) {
  const { lesson, addXp, recordWord, advanceFrom } = api;

  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState(false);
  const [recording, setRecording] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [confidence, setConfidence] = useState<number | null>(null);
  const playTimer = useRef<number | null>(null);
  const recTimer = useRef<number | null>(null);

  const onPlay = () => {
    if (playing) return;
    setPlaying(true);
    playTimer.current = window.setTimeout(() => {
      setPlaying(false);
      setPlayed(true);
    }, 1600);
  };

  const onRecord = () => {
    if (recording) return;
    setRecording(true);
    setConfidence(null);
    recTimer.current = window.setTimeout(() => {
      setRecording(false);
      const nextAttempts = attempts + 1;
      setAttempts(nextAttempts);
      const base = lesson.mood ? MOOD_BASE[lesson.mood] : 72;
      const conf = Math.min(96, base + (nextAttempts - 1) * 8 + Math.round(Math.random() * 6));
      setConfidence(conf);
    }, 2100);
  };

  const onRetry = () => {
    setConfidence(null);
  };

  const onContinue = () => {
    recordWord(card.word);
    addXp(4);
    advanceFrom(index);
  };

  const playLabel = playing
    ? 'Playing target audio…'
    : played
      ? 'Tap to hear again'
      : 'Tap to hear the target sound';

  const recLabel = recording
    ? 'Listening…'
    : confidence != null
      ? `Heard you · ${confidence}% match`
      : 'Hold the mic or tap once';

  return (
    <section className="screen-section animate-fade-slide-in">
      <Chip>Listen & repeat</Chip>
      <p className="body-text body-text--sm mt-3">{card.cue}</p>

      <div className="card mt-6 center-stack">
        <div>
          <div className="word-display__word">{card.word}</div>
          <div className="word-display__phon text-center">{card.phonetic}</div>
        </div>

        <button type="button" className="play-btn" onClick={onPlay}>
          {playing ? <PauseGlyph /> : <PlayGlyph />}
          <span className={`play-ring ${playing ? 'is-active animate-ring-expand' : ''}`} />
        </button>
        <div className="body-text body-text--xs mt-2">{playLabel}</div>
      </div>

      <div className={`record-area ${played ? 'is-revealed' : ''}`}>
        <div className="body-text body-text--xs">Your turn</div>
        <div className="heading-display heading-display--sm mt-2">Say "{card.word}"</div>

        <button type="button" className="rec-btn" onClick={onRecord}>
          <span className={`rec-ring ${recording ? 'is-active animate-ring-expand' : ''}`} />
          <MicGlyph />
        </button>
        <div className="body-text body-text--xs mt-2">{recLabel}</div>

        <div className={`wave-row ${recording ? 'is-visible' : ''}`}>
          {Array.from({ length: 24 }, (_, k) => (
            <span
              key={k}
              className="animate-wave-bar"
              style={{ height: `${4 + (k % 6) * 3}px`, animationDelay: `${(k % 5) * 60}ms` }}
            />
          ))}
        </div>

        {confidence != null && <div style={{ width: '100%' }}>
          <Bloom confidence={confidence} attempts={attempts} />
        </div>}
      </div>

      {confidence != null && (
        <div className="spacer-auto fade-mask is-visible mt-6">
          <div className="cta-grid">
            <Button variant="soft" onClick={onRetry}>Try again</Button>
            <Button onClick={onContinue}>Continue</Button>
          </div>
          <p className="body-text body-text--xs text-center mt-3">
            No score is wrong here — each attempt is progress.
          </p>
        </div>
      )}
    </section>
  );
}
