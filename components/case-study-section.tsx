import type { ReactNode } from "react";

type CaseStudySectionProps = {
  id: string;
  label?: string;
  title?: string;
  children?: ReactNode;
  className?: string;
  grouped?: boolean;
};

export function CaseStudySection({
  id,
  label,
  title,
  children,
  className,
  grouped = false,
}: CaseStudySectionProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 ${grouped ? "pt-10 md:pt-12 min-[1200px]:pt-16" : "pt-[72px] md:pt-24 min-[1200px]:pt-32"} ${className ?? ""}`}
    >
      {label ? (
        <p className="text-[14px] font-medium leading-[23.38px] text-[#818181]">
          {label}
        </p>
      ) : null}
      {title ? (
        <h2 className="type-heading-lg mt-2 font-medium text-black">
          {title}
        </h2>
      ) : null}
      {children}
    </section>
  );
}
