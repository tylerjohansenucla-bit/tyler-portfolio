"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

const HomepageIntroContext = createContext<{
  hasPlayedHomepageIntro: boolean;
  markHomepageIntroPlayed: () => void;
  scheduleMarkHomepageIntroPlayed: () => void;
  cancelScheduledHomepageIntroMark: () => void;
} | null>(null);

export function HomepageIntroProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hasPlayedHomepageIntro, setHasPlayedHomepageIntro] = useState(false);
  const pendingMarkRef = useRef(0);

  const markHomepageIntroPlayed = useCallback(() => {
    window.clearTimeout(pendingMarkRef.current);
    setHasPlayedHomepageIntro(true);
  }, []);

  const scheduleMarkHomepageIntroPlayed = useCallback(() => {
    window.clearTimeout(pendingMarkRef.current);
    pendingMarkRef.current = window.setTimeout(() => {
      setHasPlayedHomepageIntro(true);
    }, 0);
  }, []);

  const cancelScheduledHomepageIntroMark = useCallback(() => {
    window.clearTimeout(pendingMarkRef.current);
  }, []);

  return (
    <HomepageIntroContext.Provider
      value={{
        hasPlayedHomepageIntro,
        markHomepageIntroPlayed,
        scheduleMarkHomepageIntroPlayed,
        cancelScheduledHomepageIntroMark,
      }}
    >
      {children}
    </HomepageIntroContext.Provider>
  );
}

export function useHomepageIntro() {
  const context = useContext(HomepageIntroContext);

  if (!context) {
    throw new Error("useHomepageIntro must be used within HomepageIntroProvider");
  }

  return context;
}
