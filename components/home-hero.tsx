"use client";

import Image from "next/image";
import {
  Fragment,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { HeroIntro } from "@/components/hero-intro";
import { useHomepageIntro } from "@/components/homepage-intro";
import {
  HERO_CURSOR_HIDE_DELAY,
  HERO_GLASSES_DELAY,
  HERO_PAUSE_AFTER_DESIGNS_COMMA,
  HERO_PAUSE_AFTER_GLASSES,
  HERO_PAUSE_AFTER_STRATEGIES,
  HERO_PAUSE_AFTER_UCLA,
  runHeroTyping,
} from "@/components/hero-type";

const heroTextClassName = "type-hero font-normal text-black";

const socialLinkClassName =
  "home-social-icon inline-flex size-11 shrink-0 items-center justify-center -mx-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black";

const TAG_LINE_ONE = "I create intuitive designs, ";
const TAG_LINE_TWO = "driving outcomes and shaping ";
const TAG_LINE_THREE = "strategies";
const TAG_TYPE = `${TAG_LINE_ONE}\n${TAG_LINE_TWO}\n${TAG_LINE_THREE}`;
const UCLA_LINE = "I study Anthro and DH at UCLA";
/** Index of the comma in “designs,” within TAG_TYPE. */
const DESIGNS_COMMA_INDEX = TAG_TYPE.indexOf(",");

function TaglineBreak() {
  return <br className="hidden min-[768px]:inline" />;
}

function TaglineCopy() {
  return (
    <>
      {TAG_LINE_ONE}
      <TaglineBreak />
      {TAG_LINE_TWO}
      <TaglineBreak />
      {TAG_LINE_THREE}
    </>
  );
}

function TypedTagline({
  typed,
  showCursor,
}: {
  typed: string;
  showCursor: boolean;
}) {
  const parts = typed.split("\n");

  return (
    <>
      {parts.map((part, index) => (
        <Fragment key={index}>
          {index > 0 ? <TaglineBreak /> : null}
          {part}
        </Fragment>
      ))}
      {showCursor ? <span className="hero-cursor" /> : null}
    </>
  );
}

export function HomeHero({ className }: { className: string }) {
  const {
    hasPlayedHomepageIntro,
    markHomepageIntroPlayed,
    scheduleMarkHomepageIntroPlayed,
    cancelScheduledHomepageIntroMark,
  } = useHomepageIntro();
  const [skip] = useState(hasPlayedHomepageIntro);
  const [entered, setEntered] = useState(skip);
  const [tagCount, setTagCount] = useState(skip ? TAG_TYPE.length : 0);
  const [uclaCount, setUclaCount] = useState(skip ? UCLA_LINE.length : 0);
  const [showTagCursor, setShowTagCursor] = useState(false);
  const [showUclaCursor, setShowUclaCursor] = useState(false);
  const timersRef = useRef<number[]>([]);
  const cancelTypingRef = useRef<(() => void) | null>(null);

  const clearTimers = useCallback(() => {
    cancelTypingRef.current?.();
    cancelTypingRef.current = null;
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  useLayoutEffect(() => {
    cancelScheduledHomepageIntroMark();
    return () => {
      scheduleMarkHomepageIntroPlayed();
    };
  }, [cancelScheduledHomepageIntroMark, scheduleMarkHomepageIntroPlayed]);

  useEffect(() => clearTimers, [clearTimers]);

  const handleTyped = useCallback(() => {
    if (skip) {
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      setTagCount(TAG_TYPE.length);
      setUclaCount(UCLA_LINE.length);
      setEntered(true);
      markHomepageIntroPlayed();
      return;
    }

    const startTagline = window.setTimeout(() => {
      setShowTagCursor(true);
      cancelTypingRef.current = runHeroTyping(
        TAG_TYPE,
        setTagCount,
        () => {
          const hideTag = window.setTimeout(
            () => setShowTagCursor(false),
            HERO_CURSOR_HIDE_DELAY,
          );
          timersRef.current.push(hideTag);

          const startUcla = window.setTimeout(() => {
            setShowTagCursor(false);
            setShowUclaCursor(true);
            cancelTypingRef.current = runHeroTyping(
              UCLA_LINE,
              setUclaCount,
              () => {
                const revealSocials = window.setTimeout(() => {
                  setEntered(true);
                  markHomepageIntroPlayed();
                }, HERO_PAUSE_AFTER_UCLA);
                timersRef.current.push(revealSocials);

                const hideUcla = window.setTimeout(
                  () => setShowUclaCursor(false),
                  HERO_CURSOR_HIDE_DELAY,
                );
                timersRef.current.push(hideUcla);
              },
            );
          }, HERO_PAUSE_AFTER_STRATEGIES);

          timersRef.current.push(startUcla);
        },
        { [DESIGNS_COMMA_INDEX]: HERO_PAUSE_AFTER_DESIGNS_COMMA },
      );
    }, HERO_GLASSES_DELAY + HERO_PAUSE_AFTER_GLASSES);

    timersRef.current.push(startTagline);
  }, [skip, markHomepageIntroPlayed]);

  const restClass = entered ? "hero-rest is-in" : "hero-rest";
  const typedTagline = TAG_TYPE.slice(0, tagCount);
  const typedUcla = UCLA_LINE.slice(0, uclaCount);
  const sectionClassName = `${className} mt-16 md:mt-20 min-[1200px]:mt-24${skip ? " hero-intro-static" : ""}`;

  return (
    <section
      className={sectionClassName}
      aria-label="Introduction"
    >
      <HeroIntro
        className={heroTextClassName}
        skip={skip}
        onComplete={handleTyped}
      />

      <p
        className={`hero-typed mt-4 min-[1200px]:mt-[16px] ${heroTextClassName}`}
      >
        <span className="sr-only">
          I create intuitive designs, driving outcomes and shaping strategies
        </span>
        <span aria-hidden="true" className="hero-typed-reserve">
          <TaglineCopy />
        </span>
        <span aria-hidden="true" className="hero-typed-copy">
          <TypedTagline typed={typedTagline} showCursor={showTagCursor} />
        </span>
      </p>

      <p
        className={`hero-typed mt-8 min-[1200px]:mt-[48px] ${heroTextClassName}`}
      >
        <span className="sr-only">{UCLA_LINE}</span>
        <span aria-hidden="true" className="hero-typed-reserve">
          {UCLA_LINE}
        </span>
        <span aria-hidden="true" className="hero-typed-copy">
          {typedUcla}
          {showUclaCursor ? <span className="hero-cursor" /> : null}
        </span>
      </p>

      <div className="mt-8 flex items-center gap-8 min-[768px]:mt-12 min-[1200px]:mt-[48px] min-[1200px]:gap-[56px]">
        <ul className={`${restClass} hero-socials flex items-center gap-5`}>
          <li>
            <a
              href="https://www.linkedin.com/in/tyler-johansen-95a915366"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Tyler Johansen on LinkedIn"
              className={socialLinkClassName}
            >
              <Image
                src="/images/Socials/linkedin.svg"
                alt=""
                width={25}
                height={25}
              />
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/titalo.johansen/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Tyler Johansen on Instagram"
              className={socialLinkClassName}
            >
              <Image
                src="/images/Socials/instagram.svg"
                alt=""
                width={25}
                height={25}
              />
            </a>
          </li>
          <li>
            <a
              href="mailto:tylerjohansenucla@gmail.com"
              aria-label="Email Tyler Johansen"
              className={socialLinkClassName}
            >
              <Image
                src="/images/Socials/send.svg"
                alt=""
                width={25}
                height={25}
              />
            </a>
          </li>
        </ul>
        <span className={`${restClass} hero-hand`}>
          <Image
            src="/images/pointing-hand.png"
            alt=""
            width={186}
            height={154}
            className="h-auto w-[72px] min-[768px]:w-[100px]"
          />
        </span>
      </div>
    </section>
  );
}
