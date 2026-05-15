import { Button } from '../ui/Button';
import { Chip } from '../ui/Chip';
import type { LessonApi } from '../hooks/useLesson';

const BAR_HEIGHTS = [2,4,6,9,12,14,15,14,12,10,13,15,16,14,11,9,7,5,3,2,1];

export function Start({ api }: { api: LessonApi }) {
  const { lesson, goCheckin } = api;

  return (
    <section className="screen-section animate-fade-slide-in">
      <div className="mt-4"><Chip>Day {lesson.streak}</Chip></div>

      <div className="mt-3">
        <h1 className="heading-display heading-display--xl">
          Initial<br /><span className="italic">R</span> sound
        </h1>
        <p className="body-text mt-3">
          Today we'll practice words that begin with R. Five short exercises,
          about four minutes — short, steady, no pressure.
        </p>
      </div>

      <div className="hero-card">
        <div className="hero-card__bg"><span /><span /></div>
        <div className="hero-card__wave">
          {BAR_HEIGHTS.map((tall, i) => (
            <span
              key={i}
              className="animate-wave-bar"
              style={{ height: `${tall * 4 + 8}px`, animationDelay: `${(i % 7) * 80}ms` }}
            />
          ))}
        </div>
        <div className="hero-card__meta">
          <span>warm-up · soft volume</span>
          <strong>~4 min</strong>
        </div>
      </div>

      <div className="stat-grid">
        <div className="stat-tile">
          <div className="stat-tile__label">Streak</div>
          <div className="stat-tile__value">{lesson.streak}<small>days</small></div>
        </div>
        <div className="stat-tile">
          <div className="stat-tile__label">XP</div>
          <div className="stat-tile__value">{lesson.xp}</div>
        </div>
        <div className="stat-tile">
          <div className="stat-tile__label">Words</div>
          <div className="stat-tile__value">34</div>
        </div>
      </div>

      <div className="spacer-auto">
        <Button onClick={goCheckin}>Begin lesson</Button>
        <Button variant="ghost" onClick={goCheckin}>Need a longer warm-up?</Button>
      </div>
    </section>
  );
}
