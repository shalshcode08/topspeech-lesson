import type { Card } from '../types';

export const CARDS: Card[] = [
  { type: 'listen', word: 'Red',    phonetic: '/rɛd/',     cue: 'Listen, then repeat the word.' },
  { type: 'select', prompt: 'Tap the word that starts with the R sound', options: ['Lion','Rabbit','Wagon','Yellow'], answer: 'Rabbit' },
  { type: 'mirror', word: 'R', cue: 'Lift your tongue tip toward the ridge behind your top teeth — do not let it touch.' },
  { type: 'listen', word: 'Rabbit', phonetic: '/ˈræb.ɪt/', cue: 'Listen, then repeat. Notice the gentle R at the start.' },
  { type: 'build',  prompt: 'Build the sentence', sentence: ['The','red','robin','runs','through','the','rain'] },
];

export const TOTAL_CARDS = CARDS.length;
