"use client";

import { Inter } from "next/font/google";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const inter = Inter({
  subsets: ["latin"],
});

const RESUME_URL =
  "https://drive.google.com/file/d/1QZfZnhq4Gds8FkHP5jc41vYhUNDCYnfB/view?usp=sharing";

const TOP_THRESHOLD = 40;
const DIRECTION_THRESHOLD = 10;
const PILL_SAMPLE_TOP = 16;
const PILL_SAMPLE_HEIGHT = 58;

type Rgb = { r: number; g: number; b: number };

const WHITE: Rgb = { r: 255, g: 255, b: 255 };
const imageColorCache = new Map<string, Rgb>();
let sampleCanvas: HTMLCanvasElement | null = null;
let resamplePill: (() => void) | null = null;

function parseCssColor(input: string) {
  const match = input.match(
    /rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s/]+([\d.]+))?\s*\)/,
  );
  if (!match) return null;
  return {
    r: Number(match[1]),
    g: Number(match[2]),
    b: Number(match[3]),
    a: match[4] === undefined ? 1 : Number(match[4]),
  };
}

function lightness({ r, g, b }: Rgb) {
  return (Math.max(r, g, b) + Math.min(r, g, b)) / 2 / 255;
}

function toSubtleTint(color: Rgb): Rgb {
  const l = lightness(color);
  if (l >= 0.985) return WHITE;

  const keep = 0.2 + l * 0.5;
  const mix = (channel: number) => 255 * (1 - keep) + channel * keep;
  const mixed = {
    r: mix(color.r),
    g: mix(color.g),
    b: mix(color.b),
  };
  const average = (mixed.r + mixed.g + mixed.b) / 3;
  const chromaKeep = 0.88;

  return {
    r: mixed.r * chromaKeep + average * (1 - chromaKeep),
    g: mixed.g * chromaKeep + average * (1 - chromaKeep),
    b: mixed.b * chromaKeep + average * (1 - chromaKeep),
  };
}

function formatRgb(color: Rgb) {
  const quantize = (channel: number) => Math.round(channel / 2) * 2;
  return `rgb(${quantize(color.r)}, ${quantize(color.g)}, ${quantize(color.b)})`;
}

function averageImageColor(img: HTMLImageElement): Rgb | null {
  const key = img.currentSrc || img.src;
  const cached = imageColorCache.get(key);
  if (cached) return cached;
  if (!img.complete || img.naturalWidth === 0) {
    img.addEventListener("load", () => resamplePill?.(), { once: true });
    return null;
  }

  const canvas = sampleCanvas ?? document.createElement("canvas");
  sampleCanvas = canvas;
  const size = 24;
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) return null;

  try {
    context.drawImage(img, 0, 0, size, size);
    const { data } = context.getImageData(0, 0, size, size);
    const margin = 3;
    let r = 0;
    let g = 0;
    let b = 0;
    let count = 0;

    for (let y = 0; y < size; y += 1) {
      for (let x = 0; x < size; x += 1) {
        const onField =
          x < margin || y < margin || x >= size - margin || y >= size - margin;
        if (!onField) continue;
        const index = (y * size + x) * 4;
        if (data[index + 3] < 200) continue;
        r += data[index];
        g += data[index + 1];
        b += data[index + 2];
        count += 1;
      }
    }

    if (count === 0) return null;
    const color = { r: r / count, g: g / count, b: b / count };
    imageColorCache.set(key, color);
    return color;
  } catch {
    return null;
  }
}

function surfaceAt(x: number, y: number): Rgb {
  const stack = document.elementsFromPoint(x, y);
  for (const el of stack) {
    if (el.closest("header")) continue;
    if (el instanceof HTMLImageElement) {
      const bounds = el.getBoundingClientRect();
      if (bounds.width >= 80 && bounds.height >= 80) {
        const average = averageImageColor(el);
        if (average) return average;
      }
      continue;
    }
    const background = parseCssColor(getComputedStyle(el).backgroundColor);
    if (background && background.a >= 0.9) {
      return { r: background.r, g: background.g, b: background.b };
    }
  }
  return WHITE;
}

function sampleUnderPill(pill: HTMLElement) {
  const rect = pill.getBoundingClientRect();
  if (rect.width < 8) return formatRgb(WHITE);

  const xs = [0.28, 0.5, 0.72];
  const ys = [0.3, 0.5, 0.7];
  let r = 0;
  let g = 0;
  let b = 0;

  for (const y of ys) {
    for (const x of xs) {
      const tint = toSubtleTint(
        surfaceAt(
          rect.left + rect.width * x,
          PILL_SAMPLE_TOP + PILL_SAMPLE_HEIGHT * y,
        ),
      );
      r += tint.r;
      g += tint.g;
      b += tint.b;
    }
  }

  const samples = xs.length * ys.length;
  return formatRgb({ r: r / samples, g: g / samples, b: b / samples });
}

const navItems = [
  { href: "/", label: "Work" },
  { href: "/about", label: "About" },
  {
    href: RESUME_URL,
    label: "Resume",
    external: true,
  },
] as const;

type SiteNavProps = {
  active: (typeof navItems)[number]["label"];
};

function NavCluster({
  active,
  inactiveClass,
  listClassName,
}: {
  active: SiteNavProps["active"];
  inactiveClass: string;
  listClassName: string;
}) {
  return (
    <ul className={listClassName}>
      {navItems.map((item) => {
        const isActive = item.label === active;
        const className = isActive
          ? "inline-flex items-center whitespace-nowrap text-base font-normal text-black max-md:min-h-11"
          : `inline-flex items-center whitespace-nowrap text-base font-normal ${inactiveClass} max-md:min-h-11`;

        return (
          <li key={item.href}>
            {"external" in item && item.external ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
              >
                <span className={`text-link${isActive ? " is-active" : ""}`}>
                  {item.label}
                </span>
              </a>
            ) : (
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={className}
              >
                <span className={`text-link${isActive ? " is-active" : ""}`}>
                  {item.label}
                </span>
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function SiteNav({ active }: SiteNavProps) {
  const [atTop, setAtTop] = useState(true);
  const [floatingVisible, setFloatingVisible] = useState(false);
  const [pillBackground, setPillBackground] = useState("rgb(255, 255, 255)");
  const lastY = useRef(0);
  const accumulated = useRef(0);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    lastY.current = window.scrollY;

    if (window.scrollY > TOP_THRESHOLD) {
      setAtTop(false);
      setFloatingVisible(true);
    }

    const applyTop = () => {
      accumulated.current = 0;
      setAtTop(true);
      setFloatingVisible(false);
    };

    const onScroll = () => {
      const y = Math.max(0, window.scrollY);
      const delta = y - lastY.current;
      lastY.current = y;

      if (y <= TOP_THRESHOLD) {
        applyTop();
        return;
      }

      setAtTop(false);
      accumulated.current += delta;

      if (accumulated.current > DIRECTION_THRESHOLD) {
        accumulated.current = 0;
        setFloatingVisible(false);
      } else if (accumulated.current < -DIRECTION_THRESHOLD) {
        accumulated.current = 0;
        setFloatingVisible(true);
      }
    };

    const sentinel = sentinelRef.current;
    const observer =
      sentinel &&
      new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && window.scrollY <= TOP_THRESHOLD) {
            applyTop();
          }
        },
        { threshold: 0 },
      );

    observer?.observe(sentinel as Element);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const pill = pillRef.current;
      if (!pill) return;
      const next = sampleUnderPill(pill);
      setPillBackground((current) => (current === next ? current : next));
    };

    const requestUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    resamplePill = requestUpdate;
    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    window.addEventListener("load", requestUpdate);
    return () => {
      if (resamplePill === requestUpdate) resamplePill = null;
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      window.removeEventListener("load", requestUpdate);
    };
  }, []);

  const showFloating = !atTop && floatingVisible;

  return (
    <header className={inter.className}>
      <div ref={sentinelRef} className="site-nav-top-sentinel" />
      <div
        className={`site-nav-original${atTop ? "" : " is-faded"}`}
        aria-hidden={atTop ? undefined : true}
        inert={atTop ? undefined : true}
      >
        <div className="site-nav-original-inner">
          <Link
            href="/"
            className="inline-flex items-center text-base font-bold text-black max-md:min-h-11"
          >
            TJ
          </Link>
          <nav aria-label="Primary">
            <NavCluster
              active={active}
              inactiveClass="text-[#A0A0A0]"
              listClassName="flex items-center gap-5 min-[400px]:gap-8"
            />
          </nav>
        </div>
      </div>

      <div
        className={`site-nav-float-wrap${showFloating ? " is-visible" : ""}`}
        aria-hidden={showFloating ? undefined : true}
        inert={showFloating ? undefined : true}
      >
        <div
          ref={pillRef}
          className="site-nav-float"
          style={{ backgroundColor: pillBackground }}
        >
          <Link
            href="/"
            className="inline-flex items-center text-base font-bold text-black max-md:min-h-11"
            tabIndex={showFloating ? undefined : -1}
          >
            TJ
          </Link>
          <nav aria-label="Primary">
            <NavCluster
              active={active}
              inactiveClass="text-[#989898]"
              listClassName="flex items-center gap-7"
            />
          </nav>
        </div>
      </div>
    </header>
  );
}
