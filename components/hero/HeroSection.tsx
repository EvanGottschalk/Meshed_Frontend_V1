"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { HERO, CTA } from "@/config/content";
import { NAV_CTA } from "@/config/nav";
import type { SectionProps } from "@/lib/types";
import { StaticMesh } from "./StaticMesh";

const LiveMesh = dynamic(
  () => import("./LiveMesh").then((m) => m.LiveMesh),
  {
    ssr: false,
    loading: () => <StaticMesh className="absolute inset-0" />,
  },
);

export function HeroSection({ standalone }: SectionProps) {
  const reduced = useReducedMotion();
  const headlineWords = HERO.headline.split(" ");

  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden bg-bg-base pt-32 md:pt-40"
      style={
        standalone ? { paddingTop: "8rem", paddingBottom: "6rem" } : undefined
      }
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid opacity-60"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-32 h-[640px] opacity-80"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 30%, rgba(122,91,255,0.18) 0%, rgba(228,91,201,0.10) 35%, rgba(255,255,255,0) 70%)",
        }}
      />

      <Container size="wide" className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="font-mono text-xs uppercase tracking-[0.24em]"
            >
              <span className="bg-gradient-brand bg-clip-text text-transparent">
                {HERO.eyebrow}
              </span>
            </motion.p>

            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-fg-primary sm:text-5xl md:text-6xl lg:text-[64px]">
              {headlineWords.map((word, i) => (
                <motion.span
                  key={i}
                  initial={reduced ? { opacity: 1 } : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.15 + i * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block"
                >
                  {word}
                  {i < headlineWords.length - 1 ? " " : ""}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-6 max-w-xl text-base leading-relaxed text-fg-secondary md:text-lg"
            >
              {HERO.subhead}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <Button href={NAV_CTA.primary.href} variant="primary" size="lg">
                {CTA.primary}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="#problem" variant="ghost" size="lg">
                {CTA.secondary}
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.9,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="lg:col-span-5"
          >
            <div className="relative aspect-[7/5] w-full overflow-hidden rounded-2xl border border-border-subtle bg-bg-elevated">
              <LiveMesh className="absolute inset-0" />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-20 md:mt-28"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-tertiary">
            {HERO.trustEyebrow}
          </p>
          <div className="mask-fade-x mt-5 flex flex-wrap items-center gap-x-10 gap-y-4">
            {HERO.trustLogos.map((logo) => (
              <div
                key={logo.name}
                aria-label={logo.name}
                className="h-7 w-28 rounded-md border border-border-subtle bg-bg-elevated"
              />
            ))}
          </div>
        </motion.div>

        <div className="h-20 md:h-28" />
      </Container>
    </section>
  );
}
