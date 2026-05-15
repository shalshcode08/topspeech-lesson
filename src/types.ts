export type MoodId = 'clear' | 'tired' | 'tense' | 'strong';

export type Step =
  | { kind: 'start' }
  | { kind: 'checkin' }
  | { kind: 'card'; index: number }
  | { kind: 'complete' };

export type ListenCard = {
  type: 'listen';
  word: string;
  phonetic: string;
  cue: string;
};

export type SelectCard = {
  type: 'select';
  prompt: string;
  options: string[];
  answer: string;
};

export type MirrorCard = {
  type: 'mirror';
  word: string;
  cue: string;
};

export type BuildCard = {
  type: 'build';
  prompt: string;
  sentence: string[];
};

export type Card = ListenCard | SelectCard | MirrorCard | BuildCard;

export type LessonState = {
  streak: number;
  xp: number;
  xpGainedThisLesson: number;
  mood: MoodId | null;
  wordsPracticed: string[];
};
