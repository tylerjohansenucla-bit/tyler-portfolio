import Image from "next/image";

type CaseStudyImageProps = {
  label: string;
  aspectRatio?: string;
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  background?: string;
  className?: string;
  roundedClassName?: string;
  sizes?: string;
  preload?: boolean;
};

export function CaseStudyImage({
  label,
  aspectRatio,
  src,
  alt,
  width,
  height,
  background = "#F3F3F3",
  className,
  roundedClassName,
  sizes,
  preload = false,
}: CaseStudyImageProps) {
  if (src && width && height) {
    return (
      <Image
        src={src}
        alt={alt ?? label}
        width={width}
        height={height}
        sizes={sizes}
        preload={preload}
        className={`h-auto max-w-full ${roundedClassName ?? ""} ${className ?? "w-full"}`}
      />
    );
  }

  return (
    <div
      className={`flex items-center justify-center px-4 text-center ${roundedClassName ?? "rounded-[24px]"} ${className ?? ""}`}
      style={{ aspectRatio, background }}
    >
      <p className="text-[14px] font-medium leading-[23.38px] text-[#818181]">
        {label}
      </p>
    </div>
  );
}
