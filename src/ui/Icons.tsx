export function MoodIcon({ id }: { id: 'sun' | 'moon' | 'leaf' | 'sprout' }) {
  if (id === 'sun') return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="4" fill="var(--color-amber)"/>
      <g stroke="var(--color-amber)" strokeWidth="1.6" strokeLinecap="round">
        <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.5 5.5l1.4 1.4M17.1 17.1l1.4 1.4M5.5 18.5l1.4-1.4M17.1 6.9l1.4-1.4"/>
      </g>
    </svg>
  );
  if (id === 'moon') return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" fill="var(--color-sage)"/>
    </svg>
  );
  if (id === 'leaf') return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path d="M5 19c0-8 6-14 14-14 0 8-6 14-14 14z" fill="var(--color-sage)"/>
      <path d="M5 19c4-4 8-7 14-14" stroke="var(--color-ink)" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path d="M12 21V11" stroke="var(--color-primary-deep)" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M12 11C9 11 6 9 6 5c4 0 6 3 6 6z" fill="var(--color-primary)"/>
      <path d="M12 13c3 0 6-2 6-6-4 0-6 3-6 6z" fill="var(--color-primary-deep)"/>
    </svg>
  );
}

export function PlayGlyph() {
  return <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M6 4l13 7-13 7V4z" fill="white"/></svg>;
}
export function PauseGlyph() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="6" y="5" width="3" height="12" rx="1" fill="white"/>
      <rect x="13" y="5" width="3" height="12" rx="1" fill="white"/>
    </svg>
  );
}
export function MicGlyph() {
  return (
    <svg width="22" height="28" viewBox="0 0 22 28" fill="none">
      <rect x="6" y="2" width="10" height="16" rx="5" fill="var(--color-primary)"/>
      <path d="M2 14a9 9 0 0 0 18 0M11 23v3" stroke="var(--color-primary-soft)" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}
export function SpeakerGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 5v4h2l4 3V2L4 5H2z" fill="var(--color-ink)"/>
      <path d="M10 4c1.5 1 1.5 5 0 6" stroke="var(--color-ink)" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
    </svg>
  );
}
export function TinySpeakerGlyph() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
      <path d="M2 4v3h2l3 2.5v-8L4 4H2z" fill="var(--color-slate)"/>
    </svg>
  );
}
export function VoiceNoteGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 2v8M8 10c-1.5 0-3 1-3 3M8 10c1.5 0 3 1 3 3" stroke="var(--color-sage)" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}
export function FlameGlyph({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d="M7 1.5c.6 2 2.4 2.6 2.4 4.6S8.2 9 7 9s-2.4-.9-2.4-2.9C4.6 4.1 6.4 3.5 7 1.5z" fill="var(--color-amber)"/>
      <path d="M3.5 8.5c0 2.2 1.7 4 3.5 4s3.5-1.8 3.5-4c-1 1-2.1 1.4-3.5 1.4S4.5 9.5 3.5 8.5z" fill="#C2864E"/>
    </svg>
  );
}
export function CloseGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M1 1l12 12M13 1L1 13" stroke="var(--color-ink)" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}
