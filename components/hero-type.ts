export const HERO_MS_PER_CHAR = 50;
export const HERO_LINE_PAUSE = 120;
export const HERO_GROUP_PAUSE = 180;
export const HERO_CURSOR_HIDE_DELAY = 220;
export const HERO_GLASSES_DELAY = 140;

export function runHeroTyping(
  text: string,
  onChar: (count: number) => void,
  onComplete?: () => void,
): () => void {
  let count = 0;
  let timeoutId = 0;
  let cancelled = false;

  const tick = () => {
    if (cancelled) {
      return;
    }

    count += 1;
    onChar(count);

    if (count >= text.length) {
      onComplete?.();
      return;
    }

    const delay =
      text[count - 1] === "\n" ? HERO_LINE_PAUSE : HERO_MS_PER_CHAR;
    timeoutId = window.setTimeout(tick, delay);
  };

  timeoutId = window.setTimeout(tick, HERO_MS_PER_CHAR);

  return () => {
    cancelled = true;
    window.clearTimeout(timeoutId);
  };
}
