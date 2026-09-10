import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Link from "next/link";
import { CaseStudyImage } from "@/components/case-study-image";
import {
  CaseStudyNav,
  type CaseStudyNavItem,
} from "@/components/case-study-nav";
import { CaseStudySection } from "@/components/case-study-section";
import { CaseStudyVideo } from "@/components/case-study-video";
import { SiteNav } from "@/components/site-nav";

const inter = Inter({
  subsets: ["latin"],
});

const complyAiNavItems: readonly CaseStudyNavItem[] = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "solution", label: "Solution" },
  { id: "research", label: "Research" },
  { id: "design-decisions", label: "Design Decisions" },
  { id: "final-design", label: "Final Design" },
  { id: "designing-with-ai", label: "Designing with AI" },
  { id: "reflection", label: "Reflection" },
];

const bodyClassName =
  "mt-4 text-[16px] font-medium leading-[26.72px] text-[#777777]";
const captionClassName =
  "text-[14px] font-medium leading-[23.38px] text-[#818181]";
const subheadingClassName =
  "text-[14px] font-medium leading-[23.38px] text-black";
const metaValueClassName =
  "mt-1 text-[16px] font-medium leading-[26.72px] text-[#404040]";

export const metadata: Metadata = {
  title: "ComplyAI — Tyler Johansen",
  description: "Simplifying AI compliance for small businesses",
};

export default function ComplyAiPage() {
  return (
    <div id="top" className={`${inter.className} bg-white`}>
      <div className="page-shell pt-10">
        <SiteNav active="Work" />
      </div>

      <div className="page-shell relative pb-24">
        <CaseStudyNav items={complyAiNavItems} />

        <main>
          <p className={`mt-20 ${captionClassName}`}>
            <Link href="/">work</Link>
            {" < ComplyAI"}
          </p>
          <h1 className="type-hero-case mt-3 font-medium text-black">
            Simplifying AI compliance for small businesses
          </h1>

          <CaseStudyImage
            label="ComplyAI hero — Gap Analysis Dashboard on a laptop"
            src="/images/complyai/complyai-hero.png"
            alt="ComplyAI Gap Analysis Dashboard shown on a laptop"
            width={1520}
            height={960}
            sizes="(min-width: 1200px) 760px, 100vw"
            preload
            roundedClassName="rounded-[10px]"
            className="mt-8 w-full"
          />

          <div className="mt-10 grid w-full grid-cols-1 gap-6 min-[520px]:grid-cols-2 min-[900px]:grid-cols-4 min-[1200px]:gap-x-8">
            <div>
              <p className={`${captionClassName} m-0`}>Role</p>
              <p className={metaValueClassName}>Product Designer</p>
            </div>
            <div>
              <p className={`${captionClassName} m-0`}>Timeline</p>
              <p className={metaValueClassName}>April - June 2026</p>
            </div>
            <div>
              <p className={`${captionClassName} m-0`}>Collaborators</p>
              <p className={metaValueClassName}>
                3 Designers
                <br />
                1 PM
              </p>
            </div>
            <div>
              <p className={`${captionClassName} m-0`}>Tools</p>
              <p className={metaValueClassName}>
                Figma
                <br />
                Claude
              </p>
            </div>
          </div>

          <CaseStudySection
            id="overview"
            label="Overview"
            title="Making compliance risk easier to understand"
          >
            <p className={bodyClassName}>
              ComplyAI helps small and mid-sized businesses identify AI
              compliance gaps and prioritize what to fix. I focused on designing
              the dashboard so risk, severity, and next steps were easier to
              scan and act on.
            </p>
          </CaseStudySection>

          <CaseStudySection
            id="problem"
            label="The Problem"
            title="Small teams struggled to turn AI regulation into clear next steps"
          >
            <p className={bodyClassName}>
              As AI regulations expand, smaller teams without dedicated
              compliance expertise can struggle to translate legal requirements
              into clear and actionable priorities.
            </p>

            <div className="mt-12 grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-4">
              <figure>
                <CaseStudyImage
                  label="European Commission AI guidelines"
                  src="/images/complyai/problem-eu-guidelines.png"
                  alt="European Commission guidelines for providers of general-purpose AI models"
                  width={738}
                  height={492}
                  sizes="(min-width: 768px) 372px, 100vw"
                  roundedClassName="rounded-[10px]"
                  className="w-full"
                />
                <figcaption>
                  <p className={`mt-3 ${subheadingClassName}`}>
                    European Commission
                  </p>
                  <p className={`mt-1 ${captionClassName}`}>
                    Official guidance was created to clarify whether AI Act
                    obligations apply and what organizations are expected to
                    do.
                  </p>
                </figcaption>
              </figure>

              <figure>
                <CaseStudyImage
                  label="Reddit thread on the EU AI Act"
                  src="/images/complyai/problem-reddit.png"
                  alt="Reddit post in r/Entrepreneurs asking how small tech companies should approach the EU AI Act"
                  width={756}
                  height={492}
                  sizes="(min-width: 768px) 372px, 100vw"
                  roundedClassName="rounded-[10px]"
                  className="w-full"
                />
                <figcaption>
                  <p className={`mt-3 ${subheadingClassName}`}>
                    r/Entrepreneurs
                  </p>
                  <p className={`mt-1 ${captionClassName}`}>
                    Smaller teams were openly struggling with scope,
                    classification, and what compliances actually required of
                    them.
                  </p>
                </figcaption>
              </figure>
            </div>

            <Callout>
              The problem wasn’t access to regulation. It was knowing what
              applied and what to do next.
            </Callout>
          </CaseStudySection>

          <CaseStudySection
            id="solution"
            label="Solution preview"
            title="Turning compliance risk into a clearer hierarchy"
          >
            <p className={bodyClassName}>
              I designed a dashboard that brings compliance health, severity,
              and individual findings into one scannable experience.
            </p>
            <CaseStudyImage
              label="ComplyAI Gap Analysis Dashboard"
              src="/images/complyai/solution-preview.png"
              alt="ComplyAI Gap Analysis Dashboard with overall score, findings, and recommended tasks"
              width={1520}
              height={1840}
              sizes="(min-width: 1200px) 760px, 100vw"
              roundedClassName="rounded-[10px]"
              className="mt-12 w-full"
            />
          </CaseStudySection>

          <CaseStudySection
            id="research"
            label="Research"
            title="Finding where compliance breaks down"
          >
            <p className={bodyClassName}>
              With limited access to clients involved with compliance, we began
              with desk research across multiple startup and compliance
              communities, then mapped our riskiest assumptions around trust
              and applicability.
            </p>
            <div className="mt-12 grid grid-cols-1 gap-3 md:grid-cols-3">
              <ResearchCard
                quote="Does this apply to us?"
                title="Applicability came first"
                body="Teams often struggled to understand whether their use of AI created regulatory obligations in the first place."
                implication="Give users context before legal detail."
              />
              <ResearchCard
                quote="What do we do next?"
                title="Information wasn’t action"
                body="The bigger challenge was turning regulation into something a team could actually respond to."
                implication="Make priority visible through severity."
              />
              <ResearchCard
                quote="Can I trust this?"
                title="AI needed evidence"
                body="Automated compliance guidance was harder to trust when the reasoning behind it wasn’t visible."
                implication="Keep regulatory context attached to findings."
              />
            </div>
          </CaseStudySection>

          <CaseStudySection
            id="design-decisions"
            label="Design Decision #1"
            title="Reducing a dashboard of messy metrics into a readable compliance snapshot"
          >
            <p className={bodyClassName}>
              Early concepts had every compliance signal as its own metric,
              which made it difficult to quickly answer the most important
              question: How healthy is this system right now? I consolidated
              the summary into a focused status card while keeping the key
              context nearby.
            </p>
            <figure className="mt-12">
              <div className="comparison-scroll">
                <div className="comparison-scroll-inner">
                  <CaseStudyImage
                    label="Dashboard iterations from early concept to final snapshot"
                    src="/images/complyai/decision-1-iterations.png"
                    alt="Three dashboard iterations showing a messy metrics view, a mid-fidelity exploration, and the final compliance snapshot"
                    width={1516}
                    height={478}
                    sizes="(min-width: 768px) 760px, 760px"
                    roundedClassName="rounded-[10px]"
                    className="w-full"
                  />
                </div>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-6 min-[700px]:grid-cols-3 min-[700px]:gap-4">
                <CritiqueList
                  items={[
                    { type: "check", text: "Broad coverage of compliance info" },
                    { type: "cross", text: "Too many competing metrics" },
                    {
                      type: "cross",
                      text: "Important relationships were unclear",
                    },
                  ]}
                />
                <CritiqueList
                  items={[
                    { type: "check", text: "Stronger Hierarchy" },
                    {
                      type: "cross",
                      text: "Severity and health not connected",
                    },
                    {
                      type: "dash",
                      text: "Status still felt split across the cards",
                    },
                  ]}
                />
                <CritiqueList
                  items={[
                    { type: "check", text: "Scannable under 3 seconds" },
                    { type: "check", text: "Key context is not overwhelming" },
                    {
                      type: "check",
                      text: "Health status and severity are one",
                    },
                  ]}
                />
              </div>
            </figure>
          </CaseStudySection>

          <CaseStudySection
            id="diagnoses-to-next-steps"
            label="Design Decision #2"
            title="Turning diagnoses into next steps"
            grouped
          >
            <p className={bodyClassName}>
              Early findings explained what was wrong, but still left users to
              figure out what to do next. I added a recommended task to each
              finding so users could move from understanding the issue to taking
              action without leaving the dashboard.
            </p>
            <figure className="mt-10">
              <CaseStudyImage
                label="Finding card before a recommended task"
                src="/images/complyai/decision-2-before.png"
                alt="Compliance finding card that describes a missing human-in-the-loop interface without a next step"
                width={1520}
                height={275}
                sizes="(min-width: 1200px) 760px, 100vw"
                roundedClassName="rounded-[10px]"
                className="w-full"
              />
              <figcaption className={`mt-3 ${captionClassName}`}>
                Before - The issue is visible, but the next step is still left
                to the user.
              </figcaption>
            </figure>
            <figure className="mt-8">
              <div className="overflow-hidden rounded-[10px] border border-[#86EFAC]">
                <CaseStudyImage
                  label="Finding card after adding a recommended task"
                  src="/images/complyai/decision-2-after.png"
                  alt="Compliance finding card with a recommended task to add a reviewer checkpoint"
                  width={1466}
                  height={346}
                  sizes="(min-width: 1200px) 760px, 100vw"
                  className="w-full"
                />
              </div>
              <figcaption className={`mt-3 ${captionClassName}`}>
                After - A recommended task turns each finding into a clearer
                starting point.
              </figcaption>
            </figure>
          </CaseStudySection>

          <CaseStudySection
            id="final-design"
            label="Final Design"
            title="A clearer view of AI compliance risk"
          >
            <CaseStudyVideo
              src="/videos/complyai/complyai-video.mp4"
              label="Final ComplyAI dashboard on a laptop"
              width={1520}
              height={784}
              className="mt-12 w-full rounded-[10px]"
              backgroundClassName="bg-[#F2F2F6]"
              objectPosition="50% 71.36%"
            />
          </CaseStudySection>

          <CaseStudySection
            id="designing-with-ai"
            label="Designing with AI"
            title="Exploring faster with AI"
          >
            <p className={bodyClassName}>
              I used Claude to turn early research findings into rough layout
              directions and prototype ideas. It helped me compare different
              approaches quickly, while I used the research and team feedback to
              decide what was worth carrying forward.
            </p>
            <figure className="mt-12">
              <CaseStudyImage
                label="AI-generated layout explorations"
                src="/images/complyai/ai-exploration.png"
                alt="Two AI-assisted layout explorations comparing a broad compliance overview with a prioritized findings view"
                width={1514}
                height={478}
                sizes="(min-width: 1200px) 760px, 100vw"
                roundedClassName="rounded-[10px]"
                className="w-full"
              />
              <div className="mt-3 grid grid-cols-2 gap-4">
                <figcaption className={captionClassName}>
                  A) Broad compliance overview
                </figcaption>
                <figcaption className={captionClassName}>
                  B) Prioritizing risk and finding
                </figcaption>
              </div>
            </figure>
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-[12px] border border-[#E5E5E5] px-5 py-5">
                <p className={captionClassName}>Where AI Helped</p>
                <p className="mt-2 text-[16px] font-medium leading-[26.72px] text-black">
                  Quickly generating rough structures gave me more directions to
                  compare before committing to a layout
                </p>
              </div>
              <div className="rounded-[12px] border border-[#E5E5E5] px-5 py-5">
                <p className={captionClassName}>Where my judgement mattered</p>
                <p className="mt-2 text-[16px] font-medium leading-[26.72px] text-black">
                  I decided what information deserved priority, removed
                  competing metrics, and shaped the findings around clearer
                  evidence
                </p>
              </div>
            </div>
          </CaseStudySection>

          <CaseStudySection
            id="reflection"
            label="Reflection"
            title="What I learned beyond the interface"
          >
            <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-x-12 md:gap-y-12">
              <div>
                <h3 className="type-heading-md font-medium leading-[32px] text-black">
                  Designing through ambiguity
                </h3>
                <p className={bodyClassName}>
                  Feedback and direction weren’t always consistent, so I had to
                  get more comfortable making decisions without having every
                  question answered first. I learned to document my reasoning
                  and keep the work moving instead of waiting for perfect
                  alignment.
                </p>
              </div>
              <div>
                <h3 className="type-heading-md font-medium leading-[32px] text-black">
                  Taking ownership
                </h3>
                <p className={bodyClassName}>
                  My contribution went past the interface itself. I helped
                  clarify open questions, coordinate with teammates, and keep
                  design decisions connected to the broader product goals as the
                  project evolved.
                </p>
              </div>
              <div>
                <h3 className="type-heading-md font-medium leading-[32px] text-black">
                  Not every direction ships
                </h3>
                <p className={bodyClassName}>
                  The concept shown here wasn’t ultimately the direction used in
                  the final product. That was frustrating, but it taught me to
                  separate the value of the process from whether a specific
                  solution gets shipped.
                </p>
              </div>
              <div>
                <h3 className="type-heading-md font-medium leading-[32px] text-black">
                  What I’d do next time
                </h3>
                <p className={bodyClassName}>
                  With more time, I’d test the dashboard with compliance
                  practitioners to see whether the guidance feels credible
                  enough to act on.
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
    <div className="mt-10 flex items-start gap-4 rounded-[16px] bg-[#F5F5F5] px-4 py-4 md:px-6 md:py-5">
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

function ResearchCard({
  quote,
  title,
  body,
  implication,
}: {
  quote: string;
  title: string;
  body: string;
  implication: string;
}) {
  return (
    <div className="flex h-full flex-col rounded-[12px] border border-[#E5E5E5] px-4 py-4">
      <p className="text-[14px] font-medium leading-[23.38px] text-[#2563EB]">
        “{quote}”
      </p>
      <h3 className={`mt-2 ${subheadingClassName}`}>{title}</h3>
      <p className={`mt-2 ${captionClassName}`}>{body}</p>
      <div className="mt-4 border-t border-[#E5E5E5] pt-3">
        <p className={subheadingClassName}>Design implication →</p>
        <p className={`mt-1 ${captionClassName}`}>{implication}</p>
      </div>
    </div>
  );
}

function CritiqueList({
  items,
}: {
  items: { type: "check" | "cross" | "dash"; text: string }[];
}) {
  return (
    <ul className={`space-y-1 ${captionClassName}`}>
      {items.map((item) => (
        <li key={item.text} className="flex items-start gap-2">
          <span className="mt-[3px] shrink-0">
            {item.type === "check" ? (
              <CheckIcon />
            ) : item.type === "cross" ? (
              <CrossIcon />
            ) : (
              <DashIcon />
            )}
          </span>
          <span>{item.text}</span>
        </li>
      ))}
    </ul>
  );
}


function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 7.2 5.6 10 11 4"
        stroke="#22C55E"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 4 10 10M10 4 4 10"
        stroke="#EF4444"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DashIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path d="M3.5 7h7" stroke="#818181" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
