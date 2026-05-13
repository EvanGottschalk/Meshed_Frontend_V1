import Link from "next/link";
import { Linkedin, Twitter, Github } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";
import { NAV_FOOTER_GROUPS } from "@/config/nav";
import { FOOTER } from "@/config/content";
import { LEGAL } from "@/config/legal";
import { SITE } from "@/config/site";

const socials = [
  { label: "LinkedIn", href: SITE.social.linkedin || "#", Icon: Linkedin },
  { label: "X", href: SITE.social.x || "#", Icon: Twitter },
  { label: "GitHub", href: SITE.social.github || "#", Icon: Github },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-bg-elevated">
      <Container size="wide" className="py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-fg-secondary">
              {FOOTER.blurb}
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle bg-bg-base text-fg-secondary transition-colors hover:border-border-strong hover:text-fg-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 md:col-span-7 md:grid-cols-3">
            {NAV_FOOTER_GROUPS.map((group) => (
              <div key={group.heading}>
                <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-fg-tertiary">
                  {group.heading}
                </h3>
                <ul className="mt-4 space-y-3">
                  {group.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="rounded text-sm text-fg-secondary transition-colors duration-fast hover:text-fg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-violet focus-visible:ring-offset-2 focus-visible:ring-offset-bg-elevated"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-border-subtle pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-fg-tertiary">{LEGAL.copyright()}</p>
          <p className="text-xs text-fg-tertiary">{FOOTER.madeWith}</p>
        </div>
      </Container>
    </footer>
  );
}
