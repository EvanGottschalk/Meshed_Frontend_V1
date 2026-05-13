"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PROBLEM } from "@/config/content";
import type { SectionProps } from "@/lib/types";
import { cn } from "@/lib/utils";

const NODE_POS = [
  { x: 60, y: 80 },
  { x: 130, y: 30 },
  { x: 195, y: 110 },
  { x: 260, y: 50 },
  { x: 90, y: 170 },
  { x: 175, y: 190 },
  { x: 250, y: 150 },
  { x: 35, y: 230 },
  { x: 145, y: 250 },
  { x: 230, y: 240 },
];

const ACTIVE_EDGES: Array<[number, number]> = [
  [0, 1], [0, 4], [1, 2], [1, 3], [2, 3], [2, 5], [2, 6],
  [3, 6], [4, 5], [4, 7], [5, 6], [5, 8], [6, 9], [7, 8],
  [8, 9],
];

export function ProblemSection({ standalone }: SectionProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.4, once: true });

  return (
    <section
      id="problem"
      className={cn(
        "relative bg-bg-base py-28 md:py-36",
        standalone && "pt-40 md:pt-48",
      )}
    >
      <Container size="wide">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-tertiary">
          1.0 The problem &nbsp;→
        </p>
        <div className="mt-3">
          <SectionHeading
            headline={PROBLEM.headline}
            subhead={PROBLEM.subhead}
            align="left"
            as={standalone ? "h1" : "h2"}
          />
        </div>

        <div
          className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12"
          ref={ref}
        >
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-border-subtle bg-bg-elevated p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-tertiary">
                  Passive
                </p>
                <svg viewBox="0 0 320 290" className="mt-3 w-full">
                  {NODE_POS.map((n, i) => (
                    <motion.circle
                      key={i}
                      cx={n.x}
                      cy={n.y}
                      r={6}
                      fill="#C7CAD3"
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ delay: 0.04 * i, duration: 0.4 }}
                    />
                  ))}
                </svg>
              </div>

              <div className="rounded-2xl border border-border-subtle bg-bg-elevated p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em]">
                  <span className="bg-gradient-brand bg-clip-text text-transparent">
                    Active
                  </span>
                </p>
                <svg viewBox="0 0 320 290" className="mt-3 w-full">
                  <defs>
                    <linearGradient id="problemEdge" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#3DC7E0" />
                      <stop offset="50%" stopColor="#7A5BFF" />
                      <stop offset="100%" stopColor="#F58A3C" />
                    </linearGradient>
                  </defs>
                  {ACTIVE_EDGES.map(([a, b], i) => {
                    const na = NODE_POS[a];
                    const nb = NODE_POS[b];
                    return (
                      <motion.line
                        key={i}
                        x1={na.x}
                        y1={na.y}
                        x2={nb.x}
                        y2={nb.y}
                        stroke="url(#problemEdge)"
                        strokeWidth={1.4}
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={
                          inView
                            ? { pathLength: 1, opacity: 0.85 }
                            : { pathLength: 0, opacity: 0 }
                        }
                        transition={{
                          delay: 0.6 + 0.04 * i,
                          duration: 0.5,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      />
                    );
                  })}
                  {NODE_POS.map((n, i) => (
                    <motion.g
                      key={i}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={
                        inView
                          ? { opacity: 1, scale: 1 }
                          : { opacity: 0, scale: 0.5 }
                      }
                      transition={{ delay: 0.4 + 0.05 * i, duration: 0.4 }}
                    >
                      <circle
                        cx={n.x}
                        cy={n.y}
                        r={9}
                        fill={`hsl(${(i * 36) % 360}, 70%, 55%)`}
                        opacity={0.22}
                      />
                      <circle
                        cx={n.x}
                        cy={n.y}
                        r={5.5}
                        fill={`hsl(${(i * 36) % 360}, 70%, 55%)`}
                      />
                    </motion.g>
                  ))}
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-4 lg:col-span-5">
            {PROBLEM.pains.map((pain, i) => (
              <motion.div
                key={pain.audience}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                className="rounded-2xl border border-border-subtle bg-bg-base p-6"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-tertiary">
                  {pain.audience}
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold text-fg-primary">
                  <span className="font-bold">{pain.title}.</span>{" "}
                  <span className="font-normal text-fg-secondary">
                    {pain.body}
                  </span>
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
