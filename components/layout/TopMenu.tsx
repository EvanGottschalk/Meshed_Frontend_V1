"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { NAV_PRIMARY, NAV_CTA } from "@/config/nav";
import { cn } from "@/lib/utils";

export function TopMenu() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-base ease-out-expo",
          scrolled
            ? "bg-bg-base/85 backdrop-blur-xl border-b border-border-subtle"
            : "bg-bg-base/0 border-b border-transparent",
        )}
      >
        <Container size="wide">
          <div className="flex h-16 items-center justify-between md:h-20">
            <Logo />

            <nav className="hidden md:flex items-center gap-8">
              {NAV_PRIMARY.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded text-sm text-fg-secondary transition-colors duration-fast hover:text-fg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-violet focus-visible:ring-offset-4 focus-visible:ring-offset-bg-base"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <Link
                href={NAV_CTA.secondary.href}
                className="text-sm text-fg-secondary transition-colors duration-fast hover:text-fg-primary"
              >
                {NAV_CTA.secondary.label}
              </Link>
              <Button href={NAV_CTA.primary.href} variant="primary" size="sm">
                {NAV_CTA.primary.label}
              </Button>
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border-subtle bg-bg-elevated text-fg-primary transition-colors hover:border-border-strong"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </Container>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-bg-base md:hidden"
          >
            <Container size="wide">
              <div className="flex h-16 items-center justify-between">
                <Logo />
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border-subtle text-fg-primary"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </Container>
            <Container size="wide">
              <nav className="mt-8 flex flex-col gap-1">
                {NAV_PRIMARY.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      className="block py-3 font-display text-2xl font-medium text-fg-primary"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-10 flex flex-col gap-3">
                <Button href={NAV_CTA.primary.href} variant="primary" size="lg">
                  {NAV_CTA.primary.label}
                </Button>
                <Button href={NAV_CTA.secondary.href} variant="ghost" size="lg">
                  {NAV_CTA.secondary.label}
                </Button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
