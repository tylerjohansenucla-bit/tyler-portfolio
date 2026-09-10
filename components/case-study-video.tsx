"use client";

import { useEffect, useRef } from "react";

type CaseStudyVideoProps = {
  src: string;
  label: string;
  width: number;
  height: number;
  className?: string;
  backgroundClassName?: string;
  objectPosition?: string;
  scale?: number;
};

export function CaseStudyVideo({
  src,
  label,
  width,
  height,
  className,
  backgroundClassName = "bg-black",
  objectPosition = "center center",
  scale = 1,
}: CaseStudyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;

    const play = () => {
      void video.play().catch(() => {});
    };

    play();
    video.addEventListener("canplay", play);

    return () => {
      video.removeEventListener("canplay", play);
    };
  }, [src]);

  return (
    <div
      className={`relative max-w-full overflow-hidden ${backgroundClassName} ${className ?? ""}`}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
        aria-label={label}
        className="pointer-events-none absolute inset-0 h-full w-full max-w-none border-0 bg-transparent object-cover outline-none"
        style={{
          objectPosition,
          transform: scale === 1 ? undefined : `scale(${scale})`,
          transformOrigin: "center center",
          backgroundColor: "transparent",
        }}
      />
    </div>
  );
}
