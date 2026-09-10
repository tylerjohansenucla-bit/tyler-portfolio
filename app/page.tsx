import { Inter } from "next/font/google";
import Image from "next/image";
import { HeroIntro } from "@/components/hero-intro";
import { ProjectCard } from "@/components/project-card";
import { SiteNav } from "@/components/site-nav";

const inter = Inter({
  subsets: ["latin"],
  weight: "400",
});

const heroTextClassName = "type-hero font-normal text-black";

export default function Home() {
  return (
    <div className="bg-white">
      <div className="page-shell pt-10 pb-24">
        <SiteNav active="Work" />

        <main>
          <section
            className={`${inter.className} mt-16 md:mt-20 min-[1200px]:mt-24`}
            aria-label="Introduction"
          >
            <HeroIntro className={heroTextClassName} />

            <p className={`mt-4 min-[1200px]:mt-[16px] ${heroTextClassName}`}>
              I create intuitive designs,{" "}
              <br className="hidden min-[768px]:inline" />
              driving outcomes and shaping{" "}
              <br className="hidden min-[768px]:inline" />
              strategies
            </p>

            <p className={`mt-8 min-[1200px]:mt-[48px] ${heroTextClassName}`}>
              I study Anthro and DH at UCLA
            </p>

            <div className="mt-8 flex items-center gap-8 min-[768px]:mt-12 min-[1200px]:mt-[48px] min-[1200px]:gap-[56px]">
              <ul className="flex items-center gap-5">
                <li>
                  <a
                    href="https://www.linkedin.com/in/tyler-johansen-95a915366"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Tyler Johansen on LinkedIn"
                    className="inline-flex size-11 shrink-0 items-center justify-center -mx-2.5 opacity-100 transition-opacity duration-200 ease-out [@media(hover:hover)]:hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    <Image
                      src="/images/Socials/linkedin.svg"
                      alt=""
                      width={25}
                      height={25}
                    />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/titalo.johansen/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Tyler Johansen on Instagram"
                    className="inline-flex size-11 shrink-0 items-center justify-center -mx-2.5 opacity-100 transition-opacity duration-200 ease-out [@media(hover:hover)]:hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    <Image
                      src="/images/Socials/instagram.svg"
                      alt=""
                      width={25}
                      height={25}
                    />
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:tylerjohansenucla@gmail.com"
                    aria-label="Email Tyler Johansen"
                    className="inline-flex size-11 shrink-0 items-center justify-center -mx-2.5 opacity-100 transition-opacity duration-200 ease-out [@media(hover:hover)]:hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    <Image
                      src="/images/Socials/send.svg"
                      alt=""
                      width={25}
                      height={25}
                    />
                  </a>
                </li>
              </ul>
              <Image
                src="/images/pointing-hand.png"
                alt=""
                width={186}
                height={154}
                className="h-auto w-[72px] min-[768px]:w-[100px]"
              />
            </div>
          </section>

          <section
            className="mt-16 md:mt-20 min-[1200px]:mt-24"
            aria-label="Selected work"
          >
            <ProjectCard
              href="/greencure"
              imageSrc="/images/greencure-cover.png"
              imageAlt="GreenCure mobile app screens on two phones"
              imageWidth={1462}
              imageHeight={1268}
              title="Simplifying plant care and recovery"
              role="Researcher + Product Designer"
              preload
            />

            <hr className="my-8 h-px w-full border-0 bg-[#E6E6E6] min-[1200px]:my-12" />

            <ProjectCard
              href="/complyai"
              imageSrc="/images/complyai-cover.png"
              imageAlt="ComplyAI gap analysis dashboard on a laptop"
              imageWidth={1520}
              imageHeight={1268}
              title="Simplifying AI compliance for small businesses"
              role="Researcher + Product Designer"
            />
          </section>
        </main>
      </div>
    </div>
  );
}
