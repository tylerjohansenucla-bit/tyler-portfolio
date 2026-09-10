import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
});

const navItems = [
  { href: "/", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
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

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={
                    isActive
                      ? "inline-flex items-center whitespace-nowrap text-base font-normal text-black underline decoration-1 underline-offset-[6px] max-md:min-h-11"
                      : "inline-flex items-center whitespace-nowrap text-base font-normal text-[#A0A0A0] max-md:min-h-11"
                  }
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
