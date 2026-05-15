import { useState } from 'react';
import { Chip } from '../ui/Chip';
import { MoodIcon } from '../ui/Icons';
import type { LessonApi } from '../hooks/useLesson';
import type { MoodId } from '../types';

type Mood = {
  id: MoodId;
  label: string;
  note: string;
  icon: 'sun' | 'moon' | 'leaf' | 'sprout';
};

const MOODS: Mood[] = [
  { id: 'clear',  label: 'Clear & ready',  note: "We'll keep the standard pace",   icon: 'sun' },
  { id: 'tired',  label: 'A little tired', note: "We'll shorten today's lesson",   icon: 'moon' },
  { id: 'tense',  label: 'Tense',          note: "We'll begin with extra warm-up", icon: 'leaf' },
  { id: 'strong', label: 'Strong & warm',  note: "We'll add a challenge word",     icon: 'sprout' },
];

export function Checkin({ api }: { api: LessonApi }) {
  const { setMood, goCard } = api;
  const [chosen, setChosen] = useState<MoodId | null>(null);

  const choose = (mood: Mood) => {
    setChosen(mood.id);
    setMood(mood.id);
    setTimeout(() => goCard(0), 900);
  };

  return (
    <section className="screen-section animate-fade-slide-in">
      <Chip>Voice check-in · before we begin</Chip>
      <h2 className="heading-display heading-display--lg mt-3">
        How does your voice feel today?
      </h2>
      <p className="body-text body-text--sm mt-2">
        We'll adapt today's lesson to where you are right now. There's no wrong answer.
      </p>

      <div className="mood-grid">
        {MOODS.map(m => (
          <button
            key={m.id}
            type="button"
            onClick={() => choose(m)}
            className={`mood-card ${chosen === m.id ? 'is-selected' : ''}`}
          >
            <div className="animate-breathe"><MoodIcon id={m.icon} /></div>
            <div>
              <div className="mood-card__label">{m.label}</div>
              <div className="mood-card__note">{m.note}</div>
            </div>
          </button>
        ))}
      </div>

      <div className="spacer-auto mt-6">
        <div className={`body-text body-text--xs text-center fade-mask ${chosen ? 'is-visible' : ''}`}>
          {chosen
            ? `${MOODS.find(m => m.id === chosen)?.note} — continuing…`
            : "Pick how you're feeling to continue"}
        </div>
      </div>
    </section>
  );
}
