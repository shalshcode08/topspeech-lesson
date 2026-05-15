import { useMemo } from 'react';
import { Button } from '../ui/Button';
import { FlameGlyph, VoiceNoteGlyph } from '../ui/Icons';
import type { LessonApi } from '../hooks/useLesson';

const CONFETTI_COLORS = [
  'var(--color-primary)',
  'var(--color-sage)',
  'var(--color-amber)',
  'var(--color-primary-soft)',
  'var(--color-sage-soft)',
];

export function Complete({ api }: { api: LessonApi }) {
  const { lesson, finishLesson, restart } = api;

  const wordsUnique = useMemo(
    () => Array.from(new Set(lesson.wordsPracticed)),
    [lesson.wordsPracticed],
  );

  const xpEarned = lesson.xpGainedThisLesson;
  const newStreak = lesson.streak + 1;
  const newTotalXp = lesson.xp + xpEarned;

  return (
    <section className="screen-section complete animate-fade-slide-in">
      <div className="complete__confetti" aria-hidden="true">
        {Array.from({ length: 14 }, (_, k) => {
          const color = CONFETTI_COLORS[k % CONFETTI_COLORS.length];
          const left = (k * 7 + 5) % 95;
          const delay = (k % 7) * 90;
          return (
            <span
              key={k}
              className="animate-confetti"
              style={{ left: `${left}%`, background: color, animationDelay: `${delay}ms` }}
            />
          );
        })}
      </div>

      <div className="text-center mt-2">
        <div className="complete__eyebrow">Lesson complete</div>
        <h2 className="heading-display heading-display--lg mt-2">
          Your voice<br /><span className="italic">showed up</span> today.
        </h2>
        <p className="body-text body-text--sm mt-3" style={{ margin: '12px auto 0' }}>
          Small daily reps shape the muscle memory. We'll see you tomorrow.
        </p>
      </div>

      <div className="reward">
        <div className="reward__row">
          <div>
            <div className="reward__label">XP earned</div>
            <div className="reward__value animate-xp-count">
              +{xpEarned}
              <small>total {newTotalXp}</small>
            </div>
          </div>
          <div className="text-center">
            <div className="reward__label">Streak</div>
            <div className="reward__value reward__value--right animate-xp-count">
              {newStreak}
              <span className="animate-breathe" style={{ marginLeft: 6 }}>
                <FlameGlyph size={22} />
              </span>
            </div>
          </div>
        </div>

        <div className="reward__shimmer"><span className="animate-shimmer" /></div>
        <div className="reward__caption">{newTotalXp} XP · next tier at 300</div>
      </div>

      <div className="complete__words">
        <div className="complete__words-label">Words you practiced</div>
        <div className="complete__words-list">
          {wordsUnique.map(w => (
            <span key={w} className="word-pill animate-fade-slide-in">{w}</span>
          ))}
        </div>
      </div>

      <div className="insight">
        <div className="insight__row">
          <div className="insight__bubble"><VoiceNoteGlyph /></div>
          <div className="insight__text">
            <strong>Voice notes:</strong> Your R is most consistent at the start of short words.
            Tomorrow we'll bridge into mid-word Rs ("carrot", "berry").
          </div>
        </div>
      </div>

      <div className="row-tile">
        <div>Daily reminder · <strong>9:00 AM</strong></div>
        <button type="button">edit</button>
      </div>

      <div className="spacer-auto mt-6">
        <Button onClick={finishLesson}>Done</Button>
        <Button variant="ghost" onClick={restart}>Restart lesson</Button>
      </div>
    </section>
  );
}
