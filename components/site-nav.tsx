import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
});

const RESUME_URL =
  "https://drive.google.com/file/d/1QZfZnhq4Gds8FkHP5jc41vYhUNDCYnfB/view?usp=sharing";

const navItems = [
  { href: "/", label: "Work" },
  { href: "/about", label: "About" },
  {
    href: RESUME_URL,
    label: "Resume",
    external: true,
  },
] as const;

type SiteNavProps = {
  active: (typeof navItems)[number]["label"];
};

export function SiteNav({ active }: SiteNavProps) {
  return (
    <header className={`${inter.className} flex items-center justify-between gap-4`}>
      <Link
        href="/"
        className="inline-flex items-center text-base font-bold text-black max-md:min-h-11"
      >
        TJ
      </Link>
      <nav aria-label="Primary">
        <ul className="flex items-center gap-5 min-[400px]:gap-8">
          {navItems.map((item) => {
            const isActive = item.label === active;
            const className = isActive
              ? "inline-flex items-center whitespace-nowrap text-base font-normal text-black underline decoration-1 underline-offset-[6px] max-md:min-h-11"
              : "inline-flex items-center whitespace-nowrap text-base font-normal text-[#A0A0A0] max-md:min-h-11";

            return (
              <li key={item.href}>
                {"external" in item && item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={className}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={className}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
