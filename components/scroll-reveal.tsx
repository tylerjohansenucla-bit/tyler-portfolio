"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type ScrollRevealTag = "div" | "section" | "article" | "li" | "figure";

type ScrollRevealProps = {
  as?: ScrollRevealTag;
  delay?: number;
  className?: string;
  children: ReactNode;
};

export function ScrollReveal({
  as: Tag = "div",
  delay = 0,
  className,
  children,
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const reveal = () => {
      setVisible(true);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reveal();
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        reveal();
        observer.disconnect();
      },
      {
        threshold: 0,
        rootMargin: "9999px 0px -8% 0px",
      },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Tag
      ref={(node: HTMLElement | null) => {
        ref.current = node;
      }}
      className={["scroll-reveal", visible ? "is-visible" : null, className]
        .filter(Boolean)
        .join(" ")}
      style={
        delay > 0
          ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties)
          : undefined
      }
    >
      {children}
    </Tag>
  );
}
