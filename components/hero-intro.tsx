"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import {
  HERO_CURSOR_HIDE_DELAY,
  runHeroTyping,
} from "@/components/hero-type";

const LINE_ONE = "Hey,";
const LINE_TWO = "I’m Tyler Johansen";
const FULL = `${LINE_ONE}\n${LINE_TWO}`;

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
      className={`hero-glasses h-auto origin-center${visible ? " is-in" : ""}`}
    />
  );
}

export function HeroIntro({
  className,
  skip = false,
  onComplete,
}: {
  className: string;
  skip?: boolean;
  onComplete?: () => void;
}) {
  const [charCount, setCharCount] = useState(skip ? FULL.length : 0);
  const [done, setDone] = useState(skip);
  const [showCursor, setShowCursor] = useState(!skip);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useLayoutEffect(() => {
    if (skip) {
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      setCharCount(FULL.length);
      setDone(true);
      setShowCursor(false);
      onCompleteRef.current?.();
      return;
    }

    let hideId = 0;
    const cancelTyping = runHeroTyping(FULL, setCharCount, () => {
      setDone(true);
      onCompleteRef.current?.();
      hideId = window.setTimeout(
        () => setShowCursor(false),
        HERO_CURSOR_HIDE_DELAY,
      );
    });

    return () => {
      cancelTyping();
      window.clearTimeout(hideId);
    };
  }, [skip]);

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
