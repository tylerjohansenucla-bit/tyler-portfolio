import { Inter } from "next/font/google";
import { HomeHero } from "@/components/home-hero";
import { ProjectCard } from "@/components/project-card";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SiteNav } from "@/components/site-nav";

const inter = Inter({
  subsets: ["latin"],
  weight: "400",
});

export default function Home() {
  return (
    <div className="bg-white">
      <SiteNav active="Work" />
      <div className="page-shell pb-24">
        <main>
          <HomeHero className={inter.className} />

          <section
            className="mt-16 md:mt-20 min-[1200px]:mt-24"
            aria-label="Selected work"
          >
            <ScrollReveal>
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
            </ScrollReveal>

            <hr className="my-8 h-px w-full border-0 bg-[#E6E6E6] min-[1200px]:my-12" />

            <ScrollReveal delay={70}>
              <ProjectCard
                href="/complyai"
                imageSrc="/images/complyai-cover.png"
                imageAlt="ComplyAI gap analysis dashboard on a laptop"
                imageWidth={1520}
                imageHeight={1268}
                title="Simplifying AI compliance for small businesses"
                role="Researcher + Product Designer"
              />
            </ScrollReveal>
          </section>
        </main>
      </div>
    </div>
  );
}
