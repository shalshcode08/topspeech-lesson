import { useMemo, useState } from 'react';
import { Chip } from '../ui/Chip';
import { Button } from '../ui/Button';
import { SpeakerGlyph } from '../ui/Icons';
import type { BuildCard } from '../types';
import type { LessonApi } from '../hooks/useLesson';

type Props = { card: BuildCard; index: number; api: LessonApi };

function shuffleWithIndex(words: string[]) {
  return words
    .map((w, i) => ({ w, i, key: Math.random() }))
    .sort((a, b) => a.key - b.key)
    .map(({ w, i }) => ({ word: w, originalIndex: i }));
}

export function Build({ card, index, api }: Props) {
  const { addXp, advanceFrom } = api;
  const pool = useMemo(() => shuffleWithIndex(card.sentence), [card.sentence]);
  const [placed, setPlaced] = useState<number[]>([]);
  const [playing, setPlaying] = useState(false);

  const placeWord = (poolIdx: number) => {
    if (placed.includes(poolIdx)) return;
    setPlaced(prev => [...prev, poolIdx]);
  };

  const removeWord = (poolIdx: number) => {
    setPlaced(prev => prev.filter(x => x !== poolIdx));
  };

  const isComplete = placed.length === card.sentence.length;
  const isCorrect = isComplete && placed.every((poolIdx, k) => pool[poolIdx].word === card.sentence[k]);

  const onHear = () => {
    setPlaying(true);
    setTimeout(() => setPlaying(false), 1600);
  };

  const onContinue = () => {
    addXp(5);
    advanceFrom(index);
  };

  return (
    <section className="screen-section animate-fade-slide-in">
      <Chip>Sentence build</Chip>
      <h2 className="heading-display heading-display--md mt-3">{card.prompt}</h2>
      <p className="body-text body-text--sm mt-2">Tap the words in order. Listen for every R.</p>

      <button type="button" onClick={onHear} className={`hear-btn ${playing ? 'is-playing' : ''}`}>
        <SpeakerGlyph />
        <span>{playing ? 'playing…' : 'hear the sentence'}</span>
      </button>

      <div className="build-slot">
        {placed.map(poolIdx => (
          <button
            key={poolIdx}
            type="button"
            onClick={() => removeWord(poolIdx)}
            className="word-chip word-chip--placed animate-fade-slide-in"
          >
            {pool[poolIdx].word}
          </button>
        ))}
      </div>

      <div className="build-pool">
        {pool.map((item, poolIdx) => {
          const used = placed.includes(poolIdx);
          return (
            <button
              key={poolIdx}
              type="button"
              onClick={() => placeWord(poolIdx)}
              disabled={used}
              className={`word-chip ${used ? 'is-used' : ''}`}
            >
              {item.word}
            </button>
          );
        })}
      </div>

      <div className="feedback-line">
        {isCorrect && <span className="ok">Beautiful — five Rs in one breath.</span>}
        {isComplete && !isCorrect && <span className="soft">Close — tap any word above to undo and try.</span>}
      </div>

      {isCorrect && (
        <div className="spacer-auto fade-mask is-visible mt-5">
          <Button onClick={onContinue}>Continue</Button>
        </div>
      )}
    </section>
  );
}
