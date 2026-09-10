import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Image from "next/image";
import { SiteNav } from "@/components/site-nav";

const inter = Inter({
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  title: "About — Tyler Johansen",
  description:
    "I draw people, study people, and design for them. Anthropology + Digital Humanities @ UCLA.",
};

const personalPhotos = [
  {
    src: "/images/about/tyler-car.png",
    alt: "Tyler smiling in a car wearing a hat and sunglasses",
    width: 406,
    height: 230,
  },
  {
    src: "/images/about/tyler-camping.png",
    alt: "Two people leaning over a table outdoors",
    width: 406,
    height: 276,
  },
  {
    src: "/images/about/tyler-croatia.png",
    alt: "Coastal town buildings under a bright blue sky",
    width: 406,
    height: 246,
  },
] as const;

const portraits = [
  {
    src: "/images/about/tyler-painting.png",
    alt: "Painted portrait",
    width: 428,
    height: 554,
    caption: "1st portrait painting",
    objectPosition: "center center",
  },
  {
    src: "/images/about/portrait-tyler-1.png",
    alt: "Pencil portrait sketch of a woman wearing glasses",
    width: 392,
    height: 556,
    objectPosition: "center center",
  },
  {
    src: "/images/about/portrait-tyler-2.png",
    alt: "Pencil portrait sketch of a man in a cowboy hat",
    width: 400,
    height: 556,
    objectPosition: "center center",
  },
  {
    src: "/images/about/portrait-tyler-3.png",
    alt: "Pencil portrait sketch of a person with shoulder-length hair",
    width: 378,
    height: 556,
    objectPosition: "center 28%",
  },
  {
    src: "/images/about/portrait-tyler-4.png",
    alt: "Pencil portrait sketch of a person looking to the right",
    width: 406,
    height: 558,
    objectPosition: "center 42%",
  },
] as const;

const experiences = [
  {
    iconSrc: "/images/about/pm-icon.png",
    iconAlt: "Product Manager Accelerator",
    title: "Product Manager Accelerator",
    subtitle: "AI UX Designer Internship",
    year: "2026",
  },
  {
    iconSrc: "/images/about/google-icon.png",
    iconAlt: "Google",
    title: "Google UX Design Course",
    subtitle: "UX Designer Certificate",
    year: "2025",
  },
] as const;

const grayText = "text-[#797979]";

export default function AboutPage() {
  return (
    <div className={`${inter.className} bg-white`}>
      <div className="page-shell pt-10 pb-24">
        <SiteNav active="About" />

        <main>
          <section className="mt-16 md:mt-20 min-[1200px]:mt-24" aria-label="Introduction">
            <h1 className="type-hero-about font-medium tracking-normal text-black">
              <span className="block">I DRAW PEOPLE</span>
              <span className="mt-3 block">STUDY PEOPLE</span>
              <span className="mt-3 block">AND DESIGN FOR THEM</span>
            </h1>
            <p className={`mt-5 text-[16px] font-medium tracking-normal ${grayText}`}>
              Anthropology + Digital Humanities @ UCLA
            </p>
          </section>

          <section
            className="section-space flex flex-col items-start gap-10 min-[1024px]:flex-row min-[1024px]:gap-16 min-[1200px]:gap-[154px]"
            aria-label="About"
          >
            <div className={`min-w-0 flex-1 text-[16px] font-medium ${grayText}`}>
              <p>
                I’m a designer because{" "}
                <strong className={`font-bold ${grayText}`}>
                  I’m curious about why people do what they do.
                </strong>{" "}
                It’s what pulled me from Anthropology into product design.
              </p>
              <p className="mt-4">
                I gravitate toward design that makes everyday moments feel a
                little more thoughtful, focusing on the small stuff people
                interact with on repeat.{" "}
                <strong className={`font-bold ${grayText}`}>
                  The goal isn’t just making a product work, but ensuring people
                  enjoy their experience.
                </strong>
              </p>
              <p className="mt-6">Outside of design I’m</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>digging through a record store 💽</li>
                <li>camping somewhere with no service 🏕️</li>
                <li>
                  spending several hours into a portrait I’ve spent too long on
                  🖼️
                </li>
                <li>getting some exercise 🏋️</li>
              </ul>
            </div>

            <div className="flex w-full max-w-[280px] shrink-0 flex-col gap-5 min-[1024px]:w-[203px] min-[1024px]:max-w-none">
              {personalPhotos.map((photo) => (
                <Image
                  key={photo.src}
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                    sizes="(min-width: 1024px) 203px, 280px"
                  className="h-auto w-full"
                />
              ))}
            </div>
          </section>

          <section className="section-space" aria-label="Selected artwork">
            <h2 className="type-heading-md font-medium tracking-normal text-black">
              Selected Artwork
            </h2>

            <div
              className="mt-6 flex min-w-0 max-w-full items-start gap-[35px] overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              tabIndex={0}
              aria-label="Portrait artwork, scroll horizontally"
            >
              {portraits.map((portrait) => (
                <figure key={portrait.src} className="w-[196px] shrink-0">
                  <div className="about-artwork-frame">
                    <Image
                      src={portrait.src}
                      alt={portrait.alt}
                      fill
                      sizes="196px"
                      className="about-artwork object-cover"
                      style={{ objectPosition: portrait.objectPosition }}
                    />
                  </div>
                  {"caption" in portrait && portrait.caption ? (
                    <figcaption
                      className={`mt-2 text-left text-[14px] font-medium ${grayText}`}
                    >
                      {portrait.caption}
                    </figcaption>
                  ) : null}
                </figure>
              ))}
            </div>
          </section>

          <section className="section-space" aria-label="Experience">
            <h2 className="type-heading-md font-medium tracking-normal text-black">
              Experience
            </h2>

            <ul className="mt-6 flex flex-col gap-8">
              {experiences.map((experience) => (
                <li
                  key={experience.title}
                  className="flex items-center gap-3 min-[400px]:gap-4"
                >
                  <Image
                    src={experience.iconSrc}
                    alt={experience.iconAlt}
                    width={118}
                    height={112}
                    sizes="40px"
                    className="h-10 w-10 shrink-0 object-contain"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-[16px] font-medium text-black">
                      {experience.title}
                    </p>
                    <p className={`text-[16px] font-medium ${grayText}`}>
                      {experience.subtitle}
                    </p>
                  </div>
                  <p
                    className={`shrink-0 text-[16px] font-medium ${grayText}`}
                  >
                    {experience.year}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
}
