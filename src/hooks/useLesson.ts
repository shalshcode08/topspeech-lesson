import { useCallback, useState } from 'react';
import type { LessonState, MoodId, Step } from '../types';
import { TOTAL_CARDS } from '../data/cards';

const INITIAL: LessonState = {
  streak: 7,
  xp: 240,
  xpGainedThisLesson: 0,
  mood: null,
  wordsPracticed: [],
};

export function useLesson() {
  const [step, setStep] = useState<Step>({ kind: 'start' });
  const [lesson, setLesson] = useState<LessonState>(INITIAL);

  const goStart    = useCallback(() => setStep({ kind: 'start' }), []);
  const goCheckin  = useCallback(() => setStep({ kind: 'checkin' }), []);
  const goCard     = useCallback((index: number) => setStep({ kind: 'card', index }), []);
  const goComplete = useCallback(() => setStep({ kind: 'complete' }), []);

  const setMood = useCallback((mood: MoodId) => {
    setLesson(s => ({ ...s, mood }));
  }, []);

  const addXp = useCallback((delta: number) => {
    setLesson(s => ({ ...s, xpGainedThisLesson: s.xpGainedThisLesson + delta }));
  }, []);

  const recordWord = useCallback((word: string) => {
    setLesson(s => ({ ...s, wordsPracticed: [...s.wordsPracticed, word] }));
  }, []);

  const advanceFrom = useCallback((index: number) => {
    if (index + 1 >= TOTAL_CARDS) goComplete();
    else goCard(index + 1);
  }, [goCard, goComplete]);

  const finishLesson = useCallback(() => {
    setLesson(s => ({
      ...s,
      xp: s.xp + s.xpGainedThisLesson,
      streak: s.streak + 1,
      xpGainedThisLesson: 0,
      wordsPracticed: [],
      mood: null,
    }));
    goStart();
  }, [goStart]);

  const restart = useCallback(() => {
    setLesson(s => ({
      ...s,
      xpGainedThisLesson: 0,
      wordsPracticed: [],
      mood: null,
    }));
    goStart();
  }, [goStart]);

  return {
    step,
    lesson,
    goStart,
    goCheckin,
    goCard,
    goComplete,
    setMood,
    addXp,
    recordWord,
    advanceFrom,
    finishLesson,
    restart,
  };
}

export type LessonApi = ReturnType<typeof useLesson>;
