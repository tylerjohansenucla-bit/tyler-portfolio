"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

type Artwork = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type ArtworkGalleryProps = {
  items: readonly Artwork[];
};

const CLOSE_MS = 280;

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function ArtworkGallery({ items }: ArtworkGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [entered, setEntered] = useState(false);
  const isClient = useIsClient();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeTimeout = useRef<number>(0);
  const openIndexRef = useRef<number | null>(null);
  const closingRef = useRef(false);

  openIndexRef.current = openIndex;

  const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const closeViewer = useCallback(() => {
    if (closingRef.current) {
      return;
    }

    const dialog = dialogRef.current;
    if (!dialog?.open && openIndexRef.current === null) {
      return;
    }

    closingRef.current = true;
    window.clearTimeout(closeTimeout.current);
    setEntered(false);

    const finish = () => {
      dialog?.close();
      setOpenIndex(null);
      closingRef.current = false;
    };

    if (prefersReducedMotion()) {
      finish();
      return;
    }

    closeTimeout.current = window.setTimeout(finish, CLOSE_MS);
  }, []);

  useEffect(() => {
    return () => {
      window.clearTimeout(closeTimeout.current);
      dialogRef.current?.close();
      document.documentElement.classList.remove("artwork-lightbox-open");
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (openIndex === null || !isClient) {
      return;
    }

    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    closingRef.current = false;

    if (!dialog.open) {
      dialog.showModal();
    }

    const frame = window.requestAnimationFrame(() => {
      setEntered(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [openIndex, isClient]);

  useEffect(() => {
    if (openIndex === null) {
      return;
    }

    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;

    html.classList.add("artwork-lightbox-open");
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeViewer();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      html.classList.remove("artwork-lightbox-open");
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [openIndex, closeViewer]);

  const openViewer = (index: number) => {
    window.clearTimeout(closeTimeout.current);
    closingRef.current = false;
    setEntered(false);
    setOpenIndex(index);
  };

  const active = openIndex === null ? null : items[openIndex];

  const lightbox = (
    <dialog
      ref={dialogRef}
      className={`artwork-lightbox${entered ? " is-open" : ""}`}
      aria-label={active ? active.alt : "Artwork viewer"}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          closeViewer();
        }
      }}
      onCancel={(event) => {
        event.preventDefault();
        closeViewer();
      }}
    >
      <button
        type="button"
        className="artwork-lightbox-close"
        aria-label="Close artwork"
        onClick={closeViewer}
      >
        <span aria-hidden="true">×</span>
      </button>
        {active ? (
          <div
            className="artwork-lightbox-frame"
            style={{
              width: `min(80vw, calc(82vh * ${active.width} / ${active.height}))`,
              height: `min(82vh, calc(80vw * ${active.height} / ${active.width}))`,
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={active.src}
              alt={active.alt}
              fill
              sizes="80vw"
              className="artwork-lightbox-image"
            />
          </div>
        ) : null}
    </dialog>
  );

  return (
    <>
      <div className="artwork-deck">
        {items.map((item, index) => (
          <button
            key={item.src}
            type="button"
            className="artwork-card"
            aria-label={item.alt}
            onClick={() => openViewer(index)}
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={item.width}
              height={item.height}
              sizes="(min-width: 1200px) 220px, (min-width: 768px) 200px, 38vw"
              className="artwork-card-image"
            />
          </button>
        ))}
      </div>
      {isClient ? createPortal(lightbox, document.body) : null}
    </>
  );
}
