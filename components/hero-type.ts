export const HERO_MS_PER_CHAR = 38;
export const HERO_CURSOR_HIDE_DELAY = 220;
export const HERO_GLASSES_DELAY = 140;

/** Pause after “Hey,” before the name continues. */
export const HERO_PAUSE_AFTER_HEY = 450;
/** Pause after the name finishes, before glasses enter. */
export const HERO_PAUSE_AFTER_NAME = 300;
/** Pause after glasses begin entering, before the design statement. */
export const HERO_PAUSE_AFTER_GLASSES = 175;
/** Extra pause after the comma in “designs,”. */
export const HERO_PAUSE_AFTER_DESIGNS_COMMA = 165;
/** Pause after “strategies” before the UCLA line. */
export const HERO_PAUSE_AFTER_STRATEGIES = 325;
/** Pause after the UCLA line before socials + hand. */
export const HERO_PAUSE_AFTER_UCLA = 225;

export function runHeroTyping(
  text: string,
  onChar: (count: number) => void,
  onComplete?: () => void,
  pauseAfterIndex?: Readonly<Record<number, number>>,
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

    const lastIndex = count - 1;
    const delay =
      pauseAfterIndex?.[lastIndex] ?? HERO_MS_PER_CHAR;
    timeoutId = window.setTimeout(tick, delay);
  };

  timeoutId = window.setTimeout(tick, HERO_MS_PER_CHAR);

  return () => {
    cancelled = true;
    window.clearTimeout(timeoutId);
  };
}
