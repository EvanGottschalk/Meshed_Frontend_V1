"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Lock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { BREAK_PRIVACY } from "@/config/content";
import type { SectionProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export function PrivacyBreak({ standalone }: SectionProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.5, once: true });

  return (
    <section
      ref={ref}
      className={cn(
        "relative flex min-h-[28vh] items-center overflow-hidden border-y border-border-subtle bg-bg-elevated",
        standalone && "min-h-[60vh]",
      )}
    >
      <Container size="default" className="py-12 md:py-20">
        <div className="flex flex-col items-center gap-6 text-center">
          <motion.span
            initial={{ scale: 0.6, opacity: 0 }}
            animate={
              inView
                ? { scale: 1, opacity: 1 }
                : { scale: 0.6, opacity: 0 }
            }
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative inline-flex h-12 w-12 items-center justify-center rounded-full"
            style={{
              background:
                "conic-gradient(from 90deg, #3DC7E0, #7A5BFF, #E45BC9, #F58A3C, #F5C84A, #3DC7E0)",
            }}
          >
            <span className="absolute inset-0.5 rounded-full bg-bg-elevated" />
            <Lock className="relative z-10 h-5 w-5 text-fg-primary" />
          </motion.span>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="max-w-3xl font-display text-xl font-semibold leading-snug tracking-tight text-fg-primary md:text-2xl lg:text-3xl"
          >
            {BREAK_PRIVACY.headline}
          </motion.p>
        </div>
      </Container>
    </section>
  );
}
