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
  const lastY = useRef(0);
  const accumulated = useRef(0);
  const sentinelRef = useRef<HTMLDivElement>(null);

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
        <div className="site-nav-float">
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
