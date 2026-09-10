import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Link from "next/link";
import { CaseStudyImage } from "@/components/case-study-image";
import { CaseStudyNav } from "@/components/case-study-nav";
import { CaseStudySection } from "@/components/case-study-section";
import { CaseStudyVideo } from "@/components/case-study-video";
import { SiteNav } from "@/components/site-nav";

const inter = Inter({
  subsets: ["latin"],
});

const bodyClassName =
  "mt-4 text-[16px] font-medium leading-[26.72px] text-[#777777]";
const captionClassName =
  "text-[14px] font-medium leading-[23.38px] text-[#818181]";
const subheadingClassName =
  "text-[14px] font-medium leading-[23.38px] text-black";

export const metadata: Metadata = {
  title: "GreenCure — Tyler Johansen",
  description: "From plant diagnosis to confident recovery",
};

export default function GreenCurePage() {
  return (
    <div id="top" className={`${inter.className} bg-white`}>
      <div className="page-shell pt-10">
        <SiteNav active="Work" />
      </div>

      <div className="page-shell relative pb-24">
        <CaseStudyNav />

        <main>
          <p className={`mt-20 ${captionClassName}`}>
            <Link href="/">work</Link>
            {" < GreenCure"}
          </p>
          <h1 className="type-hero-case mt-3 font-medium text-black">
            From plant diagnosis to confident recovery
          </h1>

          <CaseStudyImage
            label="GreenCure hero — two phone mockups"
            src="/images/greencure/greencure-hero.png"
            alt="GreenCure home dashboard and plant alignment camera on two phones"
            width={1520}
            height={960}
            sizes="(min-width: 1200px) 760px, 100vw"
            preload
            roundedClassName="rounded-[24px]"
            className="mt-8 w-full"
          />

          <div className="mt-10 grid w-full grid-cols-1 gap-6 min-[600px]:grid-cols-3 min-[600px]:gap-4 min-[1200px]:gap-0">
            <div>
              <p className={`${captionClassName} m-0`}>Role</p>
              <p className="mt-1 text-[16px] font-medium leading-[26.72px] text-[#404040]">
                Product Designer
                <br />
                Researcher
              </p>
            </div>
            <div>
              <p className={`${captionClassName} m-0`}>Timeline</p>
              <p className="mt-1 text-[16px] font-medium leading-[26.72px] text-[#404040]">
                Nov 2025 – March 2026
              </p>
            </div>
            <div>
              <p className={`${captionClassName} m-0`}>Tools</p>
              <p className="mt-1 text-[16px] font-medium leading-[26.72px] text-[#404040]">
                Figma
                <br />
                Claude
              </p>
            </div>
          </div>

          <CaseStudySection
            id="overview"
            label="Overview"
            title="Helping plant owners move from diagnosis to recovery"
          >
            <p className={bodyClassName}>
              GreenCure is a mobile plant-care app that helps users identify
              what’s wrong with their plants and understand what to do next. I
              designed the experience around making plant health information
              easier to interpret and turning diagnoses into clearer recovery
              steps.
            </p>
          </CaseStudySection>

          <CaseStudySection
            id="problem"
            label="The Problem"
            title="Plant owners could tell something was wrong, but not what to do next"
          >
            <p className={bodyClassName}>
              Early research showed that identifying a struggling plant was only
              part of the problem. Users also needed help understanding the
              cause, deciding what action to take, and knowing whether their
              plant was actually improving.
            </p>

            <div className="mt-12 grid grid-cols-1 items-stretch gap-4 md:grid-cols-2">
              <figure className="flex h-full flex-col rounded-[16px] bg-[#F8F7F2] p-6">
                <blockquote className="flex flex-1 flex-col justify-center text-[16px] font-medium leading-[26.72px] text-black">
                  “The most challenging part is figuring out what’s wrong if
                  something comes along and how to make them better.”
                </blockquote>
                <figcaption className={`mt-4 flex items-center gap-2 border-t border-[#E5E5E5] pt-4 ${captionClassName}`}>
                  <PersonIcon />
                  Survey Participant
                </figcaption>
              </figure>

              <div className="grid grid-cols-1 rounded-[16px] border border-[#E5E5E5] min-[480px]:grid-cols-3">
                <StatColumn
                  icon={<GlobeIcon />}
                  heading="7/7"
                  body="Participants explicitly said they search symptoms online."
                />
                <StatColumn
                  icon={<ListIcon />}
                  heading="Multiple Users"
                  body="Wanted step-by-step recovery guidance after a diagnosis."
                  bordered
                />
                <StatColumn
                  icon={<ShieldIcon />}
                  heading="Trust Matters"
                  body="When users rely on reliable sources or community opinions to decide."
                />
              </div>
            </div>
          </CaseStudySection>

          <CaseStudySection
            id="solution-preview"
            label="Solution preview"
            title="Turning plant problems into clear recovery steps"
          >
            <p className={bodyClassName}>
              GreenCure brings diagnosis, personalized guidance, and ongoing
              care into one experience, helping plant owners understand what’s
              wrong and know what to do next.
            </p>
            <CaseStudyImage
              label="Home, New Scan, and Sprout screens"
              src="/images/greencure/solution-preview.png"
              alt="GreenCure Home, New Scan, and Sprout screens on three phones"
              width={1520}
              height={986}
              sizes="(min-width: 1200px) 760px, 100vw"
              className="mt-12 w-full"
            />
          </CaseStudySection>

          <CaseStudySection
            id="research"
            label="Research"
            title="I surveyed 7 plant owners to understand what happens when a plant starts struggling"
          >
            <p className={bodyClassName}>
              The survey included beginners and hobbyists, along with an
              in-person interview with an experienced houseplant owner. I wanted
              to understand how people identify plant problems, where they look
              for answers, and what they expect from a recovery experience.
            </p>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-0">
              <ResearchStat
                value="7/7"
                label="searched online for answers"
                body="Participants explicitly said they search for symptoms online."
              />
              <ResearchStat
                value="6/7"
                label="wanted actionable guidance"
                body="Step-by-step recovery guidance after a diagnosis."
                bordered
              />
              <ResearchStat
                value="6/7"
                label="preferred a mix of concise and detailed guidance"
                body="Participants preferred concise explanations supported by visuals."
              />
            </div>
          </CaseStudySection>

          <CaseStudySection
            id="plant-owner-input"
            label="In-person interview"
            title="Adding real-world context from an experienced plant owner"
          >
            <p className={bodyClassName}>
              To complement the survey, I interviewed an experienced houseplant
              owner to understand how plant problems are noticed and how care
              decisions are made.
            </p>
            <div className="mt-10 grid grid-cols-1 items-start gap-6 min-[800px]:grid-cols-[minmax(0,540px)_1fr]">
              <div>
                <CaseStudyImage
                  label="Plants from the participant’s home collection"
                  src="/images/greencure/plant-owner-research.png"
                  alt="Two houseplants from an experienced plant owner’s home collection"
                  width={1080}
                  height={502}
                  sizes="(min-width: 800px) 540px, 100vw"
                  className="w-full max-w-[540px]"
                />
                <p className={`mt-3 ${captionClassName}`}>
                  Plants from the participants home collections
                </p>
              </div>
              <blockquote className={`pt-1 ${bodyClassName} mt-0`}>
                “I usually notice something is off in the leaves or growth
                patten. I’ll look it up, then compare it to a few sources. It’s
                a bit of trial and error, but you learn over time”
                <footer className="mt-3">— Participant</footer>
              </blockquote>
            </div>
            <Callout>
              It wasn’t so much an issue of noticing when something was wrong,
              but understanding why it was happening and what to do next
            </Callout>
          </CaseStudySection>

          <CaseStudySection
            id="product-direction"
            label="Product direction"
            title="Turning research into a recovery-driven experience"
          >
            <p className={bodyClassName}>
              The research showed that GreenCure needed to go beyond identifying
              plant problems. It needed to guide users toward recovery with
              clear and useful guidance.
            </p>
            <p className="mt-8 text-[16px] font-medium leading-[26.72px] text-black">
              Scan → Diagnose → Recover → Maintain → Repeat
            </p>
          </CaseStudySection>

          <CaseStudySection
            id="design-decisions"
            label="Design Decision #1"
            title="Making progress photos easier to compare"
          >
            <p className={bodyClassName}>
              Early on, I planned for users to photograph their plant from
              multiple angles. But that added effort without helping them
              recreate a consistent view during future check-ins.
            </p>
            <figure className="mt-12">
              <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-[30px]">
                <div>
                  <CaseStudyVideo
                    src="/videos/greencure/video-four-snapshots.mp4"
                    label="Early multiple-angle capture"
                    width={596}
                    height={1114}
                    className="w-full"
                    objectPosition="center center"
                    scale={1.14}
                  />
                  <figcaption className={`mt-4 text-center ${captionClassName}`}>
                    Early Direction - Multiple-angle capture
                  </figcaption>
                </div>
                <div>
                  <CaseStudyVideo
                    src="/videos/greencure/video-ghost-overlay.mp4"
                    label="Guided plant alignment with ghost overlay"
                    width={595}
                    height={1114}
                    className="w-full"
                    objectPosition="center center"
                    scale={1.14}
                  />
                  <figcaption className={`mt-4 text-center ${captionClassName}`}>
                    Revised Direction - Guided alignment
                  </figcaption>
                </div>
              </div>
            </figure>
            <Callout>
              I replaced the multi-angle approach with a ghost overlay based on
              the plant’s previous photo. The live guide helps users recreate a
              more consistent view during future progress scans.
            </Callout>
          </CaseStudySection>

          <CaseStudySection
            id="recovery-task"
            label="Design Decision #2"
            title="Making recovery guidance easier to act on"
            grouped
          >
            <p className={bodyClassName}>
              My first concept treated the diagnosis like a health dashboard,
              with several signals competing for attention. Survey responses
              made me rethink that structure and focus the final screen around
              one question: what should the user do next?
            </p>
            <figure className="mt-10">
              <div className="comparison-scroll">
                <div className="comparison-scroll-inner">
                  <div className="comparison-pills mb-3">
                    <div />
                    <div />
                    <p className="flex justify-center">
                      <span className="inline-block rounded-full border border-[#E5E5E5] px-3 py-1 text-[14px] font-medium leading-[23.38px] text-black">
                        Understand the issue
                      </span>
                    </p>
                    <div />
                    <p className="flex justify-center">
                      <span className="inline-block rounded-full border border-[#E5E5E5] px-3 py-1 text-[14px] font-medium leading-[23.38px] text-black">
                        Take action
                      </span>
                    </p>
                  </div>
                  <CaseStudyImage
                    label="Diagnosis and recovery guidance screens"
                    src="/images/greencure/progress-comparison-2.png"
                    alt="Diagnosis dashboard, recovery score, and recovery guidance screens"
                    width={1060}
                    height={704}
                    sizes="(min-width: 768px) 760px, 760px"
                    className="w-full"
                  />
                  <div className="comparison-captions mt-4">
                    <figcaption className={`text-center ${captionClassName}`}>
                      Early direction
                    </figcaption>
                    <div />
                    <figcaption className={`text-center ${captionClassName}`}>
                      Final Direction
                    </figcaption>
                  </div>
                </div>
              </div>
            </figure>
            <Callout>
              I gave the diagnosis and recovery screen separate roles instead of
              forcing both into one long result
            </Callout>
          </CaseStudySection>

          <CaseStudySection
            id="testing-and-iteration"
            label="Testing and iteration"
            title="Making navigation easier to see and tap"
          >
            <p className={bodyClassName}>
              Testing showed that the original bottom navigation could blend
              into the interface and feel harder to tap. I increased its height,
              gave each destination a 48 px touch target, and made the active
              state more visually distinct.
            </p>
            <p className={`${bodyClassName} italic`}>
              “Maybe extend the clickable area so it’s not just the icon. I had
              to click a couple times each time.” — participant
            </p>
            <div className="mt-12 grid grid-cols-1 items-start gap-10 md:grid-cols-2 md:items-end">
              <div>
                <CaseStudyImage
                  label="Original bottom navigation"
                  src="/images/greencure/nav-original.png"
                  alt="Original GreenCure bottom navigation with Home, Diagnose, and Checklist"
                  width={670}
                  height={128}
                  sizes="(min-width: 768px) 360px, 100vw"
                  className="h-auto w-full"
                />
                <ul className={`mt-5 space-y-1 ${captionClassName}`}>
                  <NavSymbolItem icon="minus">Original Nav</NavSymbolItem>
                  <NavSymbolItem icon="minus">
                    Fixed label carrying visual weight
                  </NavSymbolItem>
                  <NavSymbolItem icon="minus">
                    Lower-profile navigation
                  </NavSymbolItem>
                  <NavSymbolItem icon="minus">
                    Smaller interaction areas
                  </NavSymbolItem>
                </ul>
              </div>
              <div>
                <CaseStudyImage
                  label="Redesigned bottom navigation"
                  src="/images/greencure/nav-reiteration.png"
                  alt="Redesigned GreenCure bottom navigation with a highlighted Home tab"
                  width={692}
                  height={160}
                  sizes="(min-width: 768px) 360px, 100vw"
                  className="h-auto w-full"
                />
                <ul className={`mt-5 space-y-1 ${captionClassName}`}>
                  <NavSymbolItem icon="minus">Redesigned Nav</NavSymbolItem>
                  <NavSymbolItem icon="check">
                    Active tab promotes visual hierarchy
                  </NavSymbolItem>
                  <NavSymbolItem icon="check">
                    More visible navigation
                  </NavSymbolItem>
                  <NavSymbolItem icon="check">48px touch targets</NavSymbolItem>
                </ul>
              </div>
            </div>
          </CaseStudySection>

          <CaseStudySection
            id="growth-section"
            label="Testing and iteration"
            title="Making growth easier to understand"
            grouped
          >
            <p className={bodyClassName}>
              Feedback on the original Growth screen was less consistent, with
              some participants unsure how to interpret their progress. I
              redesigned the section around a clearer Growth Score so users
              could understand plant progress more quickly.
            </p>
            <figure className="mx-auto mt-12 w-[620px] max-w-full">
              <CaseStudyImage
                label="Original and redesigned Growth screens"
                src="/images/greencure/growth-comparison.png"
                alt="Original Growth screen beside the redesigned Growth Score experience"
                width={992}
                height={932}
                sizes="(min-width: 1200px) 620px, 100vw"
                className="w-full"
              />
              <div className="mt-4 grid grid-cols-2 gap-8">
                <figcaption className={`text-center ${captionClassName}`}>
                  Original Growth Screen
                </figcaption>
                <figcaption className={`text-center ${captionClassName}`}>
                  Redesigned Growth Screen
                </figcaption>
              </div>
            </figure>
            <Callout>
              I simplified the Growth section around one clearer signal of plant
              progress.
            </Callout>
          </CaseStudySection>

          <CaseStudySection
            id="final-designs"
            label="Final Design"
            title="From diagnosis to recovery"
          >
            <div className="mx-auto mt-12 w-full max-w-[288px]">
              <CaseStudyVideo
                src="/videos/greencure/greencure-final-1.mp4"
                label="Final GreenCure home screen showing Good Morning, Tyler"
                width={576}
                height={1150}
                className="w-full"
                objectPosition="center center"
                scale={1.14}
              />
            </div>
          </CaseStudySection>

          <CaseStudySection
            id="supporting-recovery"
            label="Final Design"
            title="Supporting recovery over time"
            grouped
          >
            <div className="mx-auto mt-12 w-full max-w-[278px]">
              <CaseStudyVideo
                src="/videos/greencure/greencure-final-2.mp4"
                label="Final GreenCure home screen showing plant recovery"
                width={556}
                height={1120}
                className="w-full"
                objectPosition="center center"
                scale={1.14}
              />
            </div>
          </CaseStudySection>

          <CaseStudySection
            id="reflection"
            label="Reflection"
            title="What I learned"
          >
            <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
              <div>
                <h3 className="type-heading-md font-medium tracking-normal text-black">
                  Designing for clarity, not quantity
                </h3>
                <p className="mt-3 text-[16px] font-medium leading-[26.72px] text-[#777777]">
                  As GreenCure evolved, I learned that adding more information
                  did not always make the experience more useful. The strongest
                  improvements came from simplifying screens and giving each
                  part of the product a clearer purpose.
                </p>
              </div>
              <div>
                <h3 className="type-heading-md font-medium tracking-normal text-black">
                  What I’d do next time
                </h3>
                <p className="mt-3 text-[16px] font-medium leading-[26.72px] text-[#777777]">
                  If I started GreenCure again, I would define the purpose of
                  each major section before designing the screens in detail.
                  Some of my earlier concepts overlapped in what they
                  communicated, which led to more restructuring later.
                </p>
              </div>
            </div>
          </CaseStudySection>

          <p className="mt-20 text-center text-[20px] font-medium text-black min-[1200px]:mt-32">
            <a href="#top" className="back-to-top">
              Back to the top ↑
            </a>
          </p>
        </main>
      </div>
    </div>
  );
}

function Callout({ children }: { children: ReactNode }) {
  return (
    <div className="mt-10 flex items-start gap-4 rounded-[16px] bg-[#F8F7F2] px-4 py-4 md:px-6 md:py-5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/icons/lightbulb-symbol.svg"
        alt=""
        width={17}
        height={20}
        className="mt-0.5 shrink-0"
        aria-hidden="true"
      />
      <p className="text-[16px] font-medium leading-[26.72px] text-black">
        {children}
      </p>
    </div>
  );
}

function NavSymbolItem({
  icon,
  children,
}: {
  icon: "minus" | "check";
  children: ReactNode;
}) {
  return (
    <li className="flex items-center gap-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={
          icon === "check"
            ? "/images/icons/checkmark-symbol.svg"
            : "/images/icons/minus-symbol.svg"
        }
        alt=""
        width={19}
        height={19}
        className="shrink-0"
        aria-hidden="true"
      />
      <span>{children}</span>
    </li>
  );
}

function StatColumn({
  icon,
  heading,
  body,
  bordered = false,
}: {
  icon: ReactNode;
  heading: string;
  body: string;
  bordered?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center px-3 py-6 text-center ${
        bordered
          ? "border-[#E5E5E5] max-[479px]:border-y min-[480px]:border-x"
          : ""
      }`}
    >
      <span className="text-[#818181]">{icon}</span>
      <p className="mt-3 text-[16px] font-medium leading-[26.72px] text-black">
        {heading}
      </p>
      <p className={`mt-2 ${captionClassName}`}>{body}</p>
    </div>
  );
}

function ResearchStat({
  value,
  label,
  body,
  bordered = false,
}: {
  value: string;
  label: string;
  body: string;
  bordered?: boolean;
}) {
  return (
    <div
      className={`min-w-0 ${bordered ? "border-[#E5E5E5] max-md:border-y md:border-x" : ""} ${bordered ? "px-0 py-6 md:px-5 md:py-0" : "px-0 md:px-5"}`}
    >
      <p className="type-heading-lg font-medium text-black">
        {value}
      </p>
      <p className={`mt-1 ${subheadingClassName}`}>{label}</p>
      <p className={`mt-2 ${captionClassName}`}>{body}</p>
    </div>
  );
}


function PersonIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c1.2-3.5 3.7-5 7-5s5.8 1.5 7 5" strokeLinecap="round" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 3 3.8 6 3.8 9s-1.3 6-3.8 9c-2.5-3-3.8-6-3.8-9s1.3-6 3.8-9Z" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M8 7h12M8 12h12M8 17h12" strokeLinecap="round" />
      <circle cx="4" cy="7" r="1" fill="currentColor" stroke="none" />
      <circle cx="4" cy="12" r="1" fill="currentColor" stroke="none" />
      <circle cx="4" cy="17" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" />
    </svg>
  );
}
