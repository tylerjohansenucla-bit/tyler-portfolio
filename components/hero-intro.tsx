"use client";

import Image from "next/image";
import { useLayoutEffect, useState } from "react";

const LINE_ONE = "Hey,";
const LINE_TWO = "I’m Tyler Johansen";
const FULL = `${LINE_ONE}\n${LINE_TWO}`;
const MS_PER_CHAR = 60;
const LINE_PAUSE = 120;
const CURSOR_HIDE_DELAY = 220;

const nameRowClassName =
  "inline-flex max-w-full flex-wrap items-center gap-1.5 min-[768px]:gap-3";

function Glasses({ visible }: { visible: boolean }) {
  return (
    <Image
      src="/images/glasses.png"
      alt=""
      width={160}
      height={80}
      preload
      className={`hero-glasses h-auto origin-center ${
        visible ? "opacity-100 scale-100" : "opacity-0 scale-[0.96]"
      }`}
    />
  );
}

export function HeroIntro({ className }: { className: string }) {
  const [charCount, setCharCount] = useState(0);
  const [done, setDone] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      setCharCount(FULL.length);
      setDone(true);
      setShowCursor(false);
      return;
    }

    let count = 0;
    let timeoutId = 0;

    const tick = () => {
      count += 1;
      setCharCount(count);

      if (count >= FULL.length) {
        setDone(true);
        timeoutId = window.setTimeout(
          () => setShowCursor(false),
          CURSOR_HIDE_DELAY,
        );
        return;
      }

      const delay = FULL[count - 1] === "\n" ? LINE_PAUSE : MS_PER_CHAR;
      timeoutId = window.setTimeout(tick, delay);
    };

    timeoutId = window.setTimeout(tick, MS_PER_CHAR);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const typed = FULL.slice(0, charCount);
  const newlineIndex = typed.indexOf("\n");
  const typedLineOne =
    newlineIndex === -1 ? typed : typed.slice(0, newlineIndex);
  const typedLineTwo = newlineIndex === -1 ? "" : typed.slice(newlineIndex + 1);
  const cursorOnFirstLine = showCursor && newlineIndex === -1;
  const cursorOnSecondLine = showCursor && newlineIndex !== -1;

  return (
    <h1 className={className}>
      <span className="sr-only">
        {LINE_ONE} {LINE_TWO}
      </span>
      <span aria-hidden="true">
        <span className="relative">
          <span className="invisible">{LINE_ONE}</span>
          <span className="absolute inset-0 overflow-hidden whitespace-pre">
            {typedLineOne}
            {cursorOnFirstLine ? <span className="hero-cursor" /> : null}
          </span>
        </span>
        <br />
        <span className={nameRowClassName}>
          <span className="relative">
            <span className="invisible">{LINE_TWO}</span>
            <span className="absolute inset-0 overflow-hidden">
              {typedLineTwo}
              {cursorOnSecondLine ? <span className="hero-cursor" /> : null}
            </span>
          </span>
          <Glasses visible={done} />
        </span>
      </span>
    </h1>
  );
}
