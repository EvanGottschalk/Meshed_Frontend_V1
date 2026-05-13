"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { BREAK_PASSIVE_TO_ACTIVE } from "@/config/content";
import type { SectionProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export function PassiveToActiveBreak({ standalone }: SectionProps) {
  const words = BREAK_PASSIVE_TO_ACTIVE.rotatingWords;
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % words.length);
    }, 3000);
    return () => clearInterval(t);
  }, [words.length]);

  return (
    <section
      className={cn(
        "relative flex min-h-[28vh] items-center overflow-hidden border-y border-border-subtle bg-bg-elevated",
        standalone && "min-h-[60vh]",
      )}
    >
      <Container size="wide" className="py-12 md:py-20">
        <p className="text-center font-display text-2xl font-semibold leading-tight tracking-tight text-fg-primary sm:text-3xl md:text-4xl lg:text-5xl">
          <span className="text-fg-tertiary">
            {BREAK_PASSIVE_TO_ACTIVE.prefix}{" "}
          </span>
          <span className="relative inline-block min-w-[5ch] text-left align-baseline">
            <AnimatePresence mode="wait">
              <motion.span
                key={words[idx]}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block text-fg-tertiary"
              >
                {words[idx]}
              </motion.span>
            </AnimatePresence>
          </span>
          <span className="text-fg-tertiary">
            {" "}{BREAK_PASSIVE_TO_ACTIVE.suffix}{" "}
          </span>
          <span className="bg-gradient-brand bg-clip-text text-transparent">
            {BREAK_PASSIVE_TO_ACTIVE.arrow} {BREAK_PASSIVE_TO_ACTIVE.destination}
          </span>
        </p>
      </Container>
    </section>
  );
}
