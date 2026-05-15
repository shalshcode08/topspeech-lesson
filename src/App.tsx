import { useLesson } from './hooks/useLesson';
import { CARDS } from './data/cards';
import { ProgressBar } from './ui/ProgressBar';
import { FlameGlyph, CloseGlyph } from './ui/Icons';
import { Start } from './screens/Start';
import { Checkin } from './screens/Checkin';
import { Listen } from './screens/Listen';
import { Select } from './screens/Select';
import { Mirror } from './screens/Mirror';
import { Build } from './screens/Build';
import { Complete } from './screens/Complete';

export function App() {
  const api = useLesson();
  const { step, lesson, goStart } = api;

  const activeIndex =
    step.kind === 'card' ? step.index :
    step.kind === 'complete' ? CARDS.length :
    0;

  const onClose = () => {
    if (step.kind === 'start' || step.kind === 'complete') return;
    const ok = confirm("Leave today's lesson? Your streak is safe — progress will be saved.");
    if (ok) goStart();
  };

  const renderStep = () => {
    if (step.kind === 'start')    return <Start api={api} />;
    if (step.kind === 'checkin')  return <Checkin api={api} />;
    if (step.kind === 'complete') return <Complete api={api} />;

    const card = CARDS[step.index];
    if (card.type === 'listen') return <Listen card={card} index={step.index} api={api} key={step.index} />;
    if (card.type === 'select') return <Select card={card} index={step.index} api={api} key={step.index} />;
    if (card.type === 'mirror') return <Mirror card={card} index={step.index} api={api} key={step.index} />;
    return <Build card={card} index={step.index} api={api} key={step.index} />;
  };

  return (
    <>
      <div className="ambient" aria-hidden="true">
        <div className="ambient__blob ambient__blob--a animate-sweep-glow" />
        <div className="ambient__blob ambient__blob--b animate-sweep-glow" />
        <div className="ambient__blob ambient__blob--c animate-sweep-glow" />
      </div>

      <div className="app-shell">
        <header className="topbar">
          <div className="topbar__row">
            <button type="button" onClick={onClose} className="icon-btn" aria-label="Close lesson">
              <CloseGlyph />
            </button>
            <ProgressBar activeIndex={activeIndex} />
            <div className="streak-pill">
              <FlameGlyph />
              <span className="streak-pill__num">{lesson.streak}</span>
            </div>
          </div>
        </header>

        <main className="screen">
          {renderStep()}
        </main>
      </div>
    </>
  );
}
