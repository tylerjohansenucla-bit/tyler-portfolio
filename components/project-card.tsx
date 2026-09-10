import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  weight: "500",
});

type ProjectCardProps = {
  href: string;
  imageSrc: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  title: string;
  role: string;
  preload?: boolean;
};

export function ProjectCard({
  href,
  imageSrc,
  imageAlt,
  imageWidth,
  imageHeight,
  title,
  role,
  preload = false,
}: ProjectCardProps) {
  return (
    <article>
      <Link
        href={href}
        className={`${inter.className} group -m-2 block cursor-pointer rounded-[12px] p-2 transition-colors duration-200 ease-out [@media(hover:hover)]:hover:bg-[#F7F7F7]`}
      >
        <span className="relative block overflow-hidden rounded-2xl">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={imageWidth}
            height={imageHeight}
            preload={preload}
            sizes="(min-width: 1200px) 760px, 100vw"
            className="h-auto w-full rounded-2xl"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-2xl bg-[rgba(0,0,0,0)] transition-colors duration-200 ease-out [@media(hover:hover)]:group-hover:bg-[rgba(0,0,0,0.04)]"
          />
        </span>
        <div className="mt-[16px]">
          <h2 className="text-[20px] font-medium leading-[30px] tracking-normal text-black">
            {title}
          </h2>
          <p className="mt-1 text-[16px] font-medium leading-[24px] tracking-normal text-[#7B7B7B]">
            {role}
          </p>
        </div>
      </Link>
    </article>
  );
}
