import { useState } from 'react';
import { Chip } from '../ui/Chip';
import { Button } from '../ui/Button';
import { TinySpeakerGlyph } from '../ui/Icons';
import type { SelectCard } from '../types';
import type { LessonApi } from '../hooks/useLesson';

type Props = { card: SelectCard; index: number; api: LessonApi };

export function Select({ card, index, api }: Props) {
  const { addXp, recordWord, advanceFrom } = api;
  const [resolved, setResolved] = useState(false);
  const [wrong, setWrong] = useState<string | null>(null);

  const choose = (opt: string) => {
    if (resolved) return;
    if (opt === card.answer) {
      setResolved(true);
      recordWord(card.answer);
      addXp(3);
    } else {
      setWrong(opt);
      setTimeout(() => setWrong(null), 900);
    }
  };

  return (
    <section className="screen-section animate-fade-slide-in">
      <Chip>Sound recognition</Chip>
      <h2 className="heading-display heading-display--md mt-3">{card.prompt}</h2>
      <p className="body-text body-text--sm mt-2">Tap a word to hear it · tap once to choose.</p>

      <div className="opt-grid">
        {card.options.map(opt => {
          const isAnswer = resolved && opt === card.answer;
          const isWrong = wrong === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => choose(opt)}
              className={`opt-card ${isAnswer ? 'is-correct' : ''} ${isWrong ? 'is-wrong' : ''}`}
            >
              <div className="opt-card__word">{opt}</div>
              <div className="opt-card__hint"><TinySpeakerGlyph /> hear it</div>
            </button>
          );
        })}
      </div>

      <div className="feedback-line">
        {resolved && <span className="ok">Nice — that's the R sound.</span>}
        {!resolved && wrong && (
          <span className="soft">
            Listen for the soft <span className="font-display italic text-ink">R</span> at the start — try another.
          </span>
        )}
      </div>

      {resolved && (
        <div className="spacer-auto fade-mask is-visible mt-6">
          <Button onClick={() => advanceFrom(index)}>Continue</Button>
        </div>
      )}
    </section>
  );
}
