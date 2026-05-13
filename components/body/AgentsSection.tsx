"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AGENTS, INTEGRATIONS } from "@/config/content";
import type { SectionProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export function AgentsSection({ standalone }: SectionProps) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.3, once: true });

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % AGENTS.exchanges.length);
    }, 5500);
    return () => clearInterval(t);
  }, [paused]);

  const exchange = AGENTS.exchanges[idx];

  return (
    <section
      id="agents"
      className={cn(
        "relative bg-bg-base py-28 md:py-36",
        standalone && "pt-40 md:pt-48",
      )}
      ref={ref}
    >
      <Container size="wide">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-tertiary">
          2.0 Meshed Agents &nbsp;→
        </p>
        <div className="mt-3 max-w-3xl">
          <SectionHeading
            headline={AGENTS.headline}
            subhead={AGENTS.subhead}
            align="left"
            as={standalone ? "h1" : "h2"}
          />
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <ul className="space-y-6">
              {AGENTS.pillars.map((p, i) => (
                <motion.li
                  key={p.title}
                  initial={{ opacity: 0, y: 14 }}
                  animate={
                    inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }
                  }
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                  className="group relative pl-8"
                >
                  <span
                    className="absolute left-0 top-1.5 h-3 w-3 rounded-full"
                    style={{
                      background: `linear-gradient(135deg, hsl(${
                        200 + i * 50
                      }, 70%, 60%), hsl(${260 + i * 40}, 70%, 60%))`,
                      boxShadow:
                        "0 0 0 4px rgba(122,91,255,0.06), 0 0 0 1px rgba(11,13,20,0.04)",
                    }}
                    aria-hidden
                  />
                  <h3 className="font-display text-lg font-semibold text-fg-primary">
                    <span className="font-bold">{p.title}.</span>{" "}
                    <span className="font-normal text-fg-secondary">
                      {p.body}
                    </span>
                  </h3>
                </motion.li>
              ))}
            </ul>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-7"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="overflow-hidden rounded-2xl border border-border-subtle bg-bg-elevated shadow-[0_24px_60px_-30px_rgba(11,13,20,0.18)]">
              <div className="flex items-center justify-between border-b border-border-subtle bg-bg-base/60 px-5 py-3">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-flex h-6 w-6 items-center justify-center rounded-full text-white"
                    style={{
                      background:
                        "conic-gradient(from 90deg, #3DC7E0, #7A5BFF, #E45BC9, #F58A3C, #F5C84A, #3DC7E0)",
                    }}
                  >
                    <Sparkles className="h-3 w-3" />
                  </span>
                  <p className="font-display text-sm font-semibold text-fg-primary">
                    Your Doppelgänger
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  {AGENTS.exchanges.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={`Show example ${i + 1}`}
                      onClick={() => setIdx(i)}
                      className={cn(
                        "h-1.5 w-1.5 rounded-full transition-colors",
                        i === idx ? "bg-fg-primary" : "bg-border-strong",
                      )}
                    />
                  ))}
                </div>
              </div>

              <div className="relative min-h-[260px] px-5 py-6 sm:px-7 sm:py-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35 }}
                    className="space-y-4"
                  >
                    <div className="max-w-[88%] rounded-2xl rounded-bl-md border border-border-subtle bg-bg-base px-4 py-3 text-sm leading-relaxed text-fg-primary">
                      {exchange.message}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {exchange.actions.map((action, i) => (
                        <button
                          key={action}
                          type="button"
                          className={cn(
                            "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                            i === 0
                              ? "border-fg-primary bg-fg-primary text-white hover:opacity-90"
                              : "border-border-strong bg-bg-base text-fg-primary hover:bg-bg-elevated",
                          )}
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="border-t border-border-subtle bg-bg-base/40 px-5 py-3">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-tertiary">
                    Sources
                  </p>
                  <div className="flex items-center gap-3">
                    {INTEGRATIONS.items.map((item) => (
                      <span
                        key={item.name}
                        title={item.note}
                        className="font-mono text-[11px] text-fg-secondary"
                      >
                        {item.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
