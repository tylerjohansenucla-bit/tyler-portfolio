"use client";

import Link from "next/link";
import { useCallback, useEffect, useState, type MouseEvent } from "react";

export type CaseStudyNavItem = {
  id: string;
  label: string;
};

export const caseStudyNavItems: CaseStudyNavItem[] = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "solution-preview", label: "Solution preview" },
  { id: "research", label: "Research" },
  { id: "product-direction", label: "Product direction" },
  { id: "design-decisions", label: "Design decisions" },
  { id: "testing-and-iteration", label: "Testing and iteration" },
  { id: "final-designs", label: "Final Designs" },
  { id: "reflection", label: "Reflection" },
];

const ACTIVATION_OFFSET = 96;

function getActiveNavId(
  sections: HTMLElement[],
  sectionToNavId: Map<HTMLElement, string>,
  fallback: string,
) {
  let activeId = fallback;

  for (const section of sections) {
    if (section.getBoundingClientRect().top <= ACTIVATION_OFFSET + 8) {
      activeId = sectionToNavId.get(section) ?? activeId;
    }
  }

  return activeId;
}

export function CaseStudyNav({
  items = caseStudyNavItems,
}: {
  items?: readonly CaseStudyNavItem[];
}) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const navIds = items.map((item) => item.id);
    const navIdSet = new Set(navIds);
    const fallback = navIds[0] ?? "";
    const sections = [
      ...document.querySelectorAll<HTMLElement>("main section[id]"),
    ];

    if (sections.length === 0 || !fallback) {
      return;
    }

    const sectionToNavId = new Map<HTMLElement, string>();
    let currentNavId = fallback;

    for (const section of sections) {
      if (navIdSet.has(section.id)) {
        currentNavId = section.id;
      }
      sectionToNavId.set(section, currentNavId);
    }

    const updateActiveId = () => {
      setActiveId(getActiveNavId(sections, sectionToNavId, fallback));
    };

    const observer = new IntersectionObserver(updateActiveId, {
      rootMargin: `-${ACTIVATION_OFFSET}px 0px -55% 0px`,
      threshold: [0, 0.1, 0.25, 0.5, 1],
    });

    for (const section of sections) {
      observer.observe(section);
    }

    updateActiveId();

    return () => observer.disconnect();
  }, [items]);

  const handleNavClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, id: string) => {
      const section = document.getElementById(id);
      if (!section) {
        return;
      }

      event.preventDefault();
      setActiveId(id);

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      section.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });

      history.pushState(null, "", `#${id}`);

      window.addEventListener(
        "scrollend",
        () => {
          setActiveId(id);
        },
        { once: true },
      );
    },
    [],
  );

  return (
    <nav
      aria-label="Case study"
      className="pointer-events-none absolute top-0 bottom-0 right-full mr-40 hidden w-[148px] min-[1200px]:block"
    >
      <div className="sticky top-32">
        <Link
          href="/"
          className="pointer-events-auto inline-flex items-center gap-1 text-[14px] font-medium leading-[23.38px] text-[#777777]"
        >
          <span aria-hidden="true">‹</span>
          Back
        </Link>
        <ul className="mt-8 flex flex-col gap-2">
          {items.map((item) => {
            const isActive = activeId === item.id;

            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  data-section={item.id}
                  aria-current={isActive ? "location" : undefined}
                  onClick={(event) => handleNavClick(event, item.id)}
                  className={`pointer-events-auto text-[14px] font-medium leading-[23.38px] transition-colors duration-200 ease-out ${
                    isActive ? "text-black" : "text-[#777777]"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
