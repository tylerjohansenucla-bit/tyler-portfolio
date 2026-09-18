import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Image from "next/image";
import { ArtworkGallery } from "@/components/artwork-gallery";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SiteNav } from "@/components/site-nav";

const inter = Inter({
  subsets: ["latin"],
  weight: "500",
});

export const metadata: Metadata = {
  title: "About — Tyler Johansen",
  description:
    "I draw people, study people, and design for them. Anthropology + Digital Humanities @ UCLA.",
};

const heroPhotos = [
  {
    src: "/images/about/car-tyler.png",
    alt: "Tyler smiling in a car wearing a hat and sunglasses",
    width: 492,
    height: 354,
  },
  {
    src: "/images/about/tyler-sunset.png",
    alt: "Tyler standing on a beach at sunset",
    width: 492,
    height: 480,
  },
] as const;

const experiences = [
  {
    logoSrc: "/images/about/pma-logo.svg",
    logoAlt: "PM Accelerator",
    company: "PM Accelerator",
    role: "AI UX Design Internship",
    date: "April - June 2026",
  },
  {
    logoSrc: "/images/about/complication-logo.svg",
    logoAlt: "Complication",
    company: "Complication",
    role: "Product Design Internship",
    date: "Current",
  },
] as const;

const lifestylePhotos = [
  {
    src: "/images/about/vinyl-single.png",
    alt: "The Rainbow Goblins vinyl record",
    width: 412,
    height: 410,
  },
  {
    src: "/images/about/tyler-dog.png",
    alt: "Tyler crouching beside a white dog",
    width: 362,
    height: 410,
  },
  {
    src: "/images/about/tyler-cave.png",
    alt: "Tyler walking between tall rock walls",
    width: 308,
    height: 410,
  },
  {
    src: "/images/about/vinyl-collection.png",
    alt: "A shelf of vinyl records",
    width: 306,
    height: 410,
  },
] as const;

const artworks = [
  {
    src: "/images/about/pencil-portrait2.png",
    alt: "Pencil portrait of a woman with glasses, mouth open",
    width: 514,
    height: 730,
  },
  {
    src: "/images/about/pencil-portrait1.png",
    alt: "Pencil portrait of a man wearing a cowboy hat",
    width: 514,
    height: 714,
  },
  {
    src: "/images/about/pencil-portrait3.png",
    alt: "Pencil portrait of a person with shoulder-length hair",
    width: 514,
    height: 756,
  },
  {
    src: "/images/about/painting-tyler.png",
    alt: "Painted portrait of a woman with red hair and a teal shirt",
    width: 514,
    height: 666,
  },
] as const;

const dividerClassName = "h-px w-full border-0 bg-[#E6E6E6]";

export default function AboutPage() {
  return (
    <div className="bg-white">
      <SiteNav active="About" />
      <div className="page-shell pb-24">

        <main className={inter.className}>
          <section
            className="mt-16 flex flex-col gap-8 md:mt-20 min-[768px]:flex-row min-[768px]:items-start min-[768px]:justify-between min-[768px]:gap-12 min-[1200px]:mt-24"
            aria-label="Introduction"
          >
            <ScrollReveal className="min-w-0 max-w-[428px]">
              <h1 className="text-[32px] font-medium leading-[1.25] tracking-normal text-black">
                I Draw People
                <br />
                Study People
                <br />
                and Design for Them
              </h1>
              <p className="mt-5 text-[20px] font-medium leading-[1.5] tracking-normal text-[#7B7B7B]">
                I’m a designer because I’m curious about why people do what they
                do. It’s what pulled me from Anthropology into product design.
              </p>
              <p className="mt-4 text-[20px] font-medium leading-[1.5] tracking-normal text-[#7B7B7B]">
                I gravitate toward design that makes everyday moments feel a
                little more thoughtful, focusing on the small stuff people
                interact with on repeat. The goal isn’t just making a product
                work, but ensuring people enjoy their experience.
              </p>
            </ScrollReveal>

            <ScrollReveal
              delay={70}
              className="flex w-full shrink-0 flex-col gap-4 min-[768px]:w-[220px]"
            >
              {heroPhotos.map((photo, index) => (
                <Image
                  key={photo.src}
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes="(min-width: 768px) 220px, 100vw"
                  preload={index === 0}
                  className="h-auto w-full"
                />
              ))}
            </ScrollReveal>
          </section>

          <hr className={`${dividerClassName} mt-[36px]`} />

          <section className="py-[66px]" aria-label="Experience">
            <ul className="flex flex-col gap-8 min-[768px]:flex-row min-[768px]:gap-16">
              {experiences.map((experience, index) => (
                <ScrollReveal
                  as="li"
                  key={experience.company}
                  delay={index * 70}
                  className="min-w-0"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={experience.logoSrc}
                      alt={experience.logoAlt}
                      width={40}
                      height={40}
                      className="h-10 w-10 shrink-0"
                    />
                    <p className="text-[20px] font-medium leading-[1.3] text-black">
                      {experience.company}
                    </p>
                  </div>
                  <p className="mt-4 text-[16px] font-medium leading-[1.4] text-black">
                    {experience.role}
                  </p>
                  <p className="mt-3 text-[16px] font-medium leading-[1.4] text-[#7B7B7B]">
                    {experience.date}
                  </p>
                </ScrollReveal>
              ))}
            </ul>
          </section>

          <hr className={dividerClassName} />

          <section className="py-[66px]" aria-label="Education">
            <ScrollReveal>
              <p className="text-[24px] font-medium leading-[1.4] tracking-normal text-black">
                B.A. Anthropology / Digital Humanities Minor at UCLA
              </p>
            </ScrollReveal>
          </section>

          <hr className={dividerClassName} />

          <section className="pt-[66px]" aria-label="Outside of design">
            <ScrollReveal>
              <h2 className="text-[24px] font-medium leading-[1.4] tracking-normal text-black">
                Outside of design I’m
              </h2>
              <ul className="mt-5 list-disc space-y-3 pl-6 text-[20px] font-medium leading-[1.5] text-[#7B7B7B]">
                <li>digging through a record store 💿</li>
                <li>camping somewhere with no service 🏕️</li>
                <li>
                  spending several hours into a portrait I’ve spent too long on
                  🖼️
                </li>
                <li>getting some exercise 🐐</li>
              </ul>
            </ScrollReveal>

            <ScrollReveal delay={70} className="about-lifestyle mt-8">
              {lifestylePhotos.map((photo) => (
                <Image
                  key={photo.src}
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes="(min-width: 768px) 190px, 45vw"
                  className="about-lifestyle-image"
                />
              ))}
            </ScrollReveal>
          </section>

          <p className="mt-[81px] text-center text-[20px] font-medium leading-[1.4] text-black">
            Artwork ↓
          </p>
          <hr className={`${dividerClassName} mt-[66px]`} />

          <section className="mt-[66px]" aria-label="Artwork">
            <ScrollReveal>
              <ArtworkGallery items={artworks} />
            </ScrollReveal>
          </section>
        </main>
      </div>
    </div>
  );
}
