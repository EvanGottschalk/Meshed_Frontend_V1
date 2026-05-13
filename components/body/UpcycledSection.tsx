"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { UPCYCLED } from "@/config/content";
import type { SectionProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export function UpcycledSection({ standalone }: SectionProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.3, once: true });

  return (
    <section
      id="upcycled"
      ref={ref}
      className={cn(
        "relative isolate overflow-hidden bg-bg-alt py-28 text-fg-onAlt md:py-36",
        standalone && "pt-40 md:pt-48",
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid-on-alt opacity-50"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-24 h-[640px]"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 30%, rgba(122,91,255,0.30) 0%, rgba(228,91,201,0.14) 35%, rgba(11,13,20,0) 70%)",
        }}
      />

      <Container size="wide" className="relative">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-onAltSecondary">
          4.0 Meshed Upcycled &nbsp;→
        </p>

        <div className="mt-3 max-w-3xl">
          <h2
            className={cn(
              "font-display font-semibold tracking-tight",
              standalone
                ? "text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05]"
                : "text-3xl sm:text-4xl md:text-5xl leading-[1.1]",
            )}
          >
            {UPCYCLED.headline}
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-fg-onAltSecondary md:text-lg">
            {UPCYCLED.subhead}
          </p>
        </div>

        <UpcycledFlow inView={inView} />

        <ul className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {UPCYCLED.bullets.map((b, i) => (
            <motion.li
              key={b.title}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              className="rounded-2xl border border-border-onAlt bg-bg-altElevated p-6"
            >
              <h3 className="font-display text-lg font-semibold">
                <span className="font-bold">{b.title}.</span>{" "}
                <span className="font-normal text-fg-onAltSecondary">
                  {b.body}
                </span>
              </h3>
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function UpcycledFlow({ inView }: { inView: boolean }) {
  // Source cluster on left, fans into Talent + Knowledge rivers, re-converges into ecosystem on right.
  const W = 900;
  const H = 320;

  const sourceX = 110;
  const splitX = 320;
  const mergeX = 580;
  const destX = 800;

  const talentY = 110;
  const knowledgeY = 210;
  const sourceY = H / 2;
  const destY = H / 2;

  const path1a = `M ${sourceX} ${sourceY} C ${(sourceX + splitX) / 2} ${sourceY}, ${(sourceX + splitX) / 2} ${talentY}, ${splitX} ${talentY}`;
  const path1b = `M ${splitX} ${talentY} L ${mergeX} ${talentY}`;
  const path1c = `M ${mergeX} ${talentY} C ${(mergeX + destX) / 2} ${talentY}, ${(mergeX + destX) / 2} ${destY}, ${destX} ${destY}`;

  const path2a = `M ${sourceX} ${sourceY} C ${(sourceX + splitX) / 2} ${sourceY}, ${(sourceX + splitX) / 2} ${knowledgeY}, ${splitX} ${knowledgeY}`;
  const path2b = `M ${splitX} ${knowledgeY} L ${mergeX} ${knowledgeY}`;
  const path2c = `M ${mergeX} ${knowledgeY} C ${(mergeX + destX) / 2} ${knowledgeY}, ${(mergeX + destX) / 2} ${destY}, ${destX} ${destY}`;

  return (
    <div className="relative mt-14 overflow-hidden rounded-2xl border border-border-onAlt bg-bg-altElevated p-4 md:mt-16 md:p-8">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Diagram showing how talent and knowledge from inactive startups are routed back into the active ecosystem."
      >
        <defs>
          <linearGradient id="upRiver1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3DC7E0" />
            <stop offset="100%" stopColor="#7A5BFF" />
          </linearGradient>
          <linearGradient id="upRiver2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E45BC9" />
            <stop offset="100%" stopColor="#F58A3C" />
          </linearGradient>
        </defs>

        {[path1a, path1b, path1c, path2a, path2b, path2c].map((d, i) => (
          <motion.path
            key={i}
            d={d}
            stroke={i < 3 ? "url(#upRiver1)" : "url(#upRiver2)"}
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={
              inView
                ? { pathLength: 1, opacity: 0.85 }
                : { pathLength: 0, opacity: 0 }
            }
            transition={{
              delay: 0.2 + (i % 3) * 0.2,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        ))}

        <NodeCluster cx={sourceX} cy={sourceY} label="Inactive startup" inView={inView} delay={0} />
        <RiverLabel x={splitX + 20} y={talentY} label="Talent" inView={inView} delay={0.6} />
        <RiverLabel x={splitX + 20} y={knowledgeY} label="Knowledge" inView={inView} delay={0.7} />
        <NodeCluster cx={destX} cy={destY} label="Active ecosystem" big inView={inView} delay={1.4} />
      </svg>
    </div>
  );
}

function NodeCluster({
  cx,
  cy,
  label,
  big = false,
  inView,
  delay,
}: {
  cx: number;
  cy: number;
  label: string;
  big?: boolean;
  inView: boolean;
  delay: number;
}) {
  const positions = big
    ? [
        [-26, -14], [-12, -28], [10, -24], [28, -8],
        [-22, 14], [-2, 18], [22, 12], [-32, 0],
        [16, -42], [-40, -28], [38, 20], [4, -2],
      ]
    : [
        [-18, -8], [-6, -18], [10, -14], [18, 4],
        [-14, 12], [2, 16], [16, 14], [-22, 2],
      ];
  return (
    <g>
      {positions.map(([dx, dy], i) => (
        <motion.circle
          key={i}
          cx={cx + dx}
          cy={cy + dy}
          r={big ? 4 : 3.5}
          fill={`hsl(${(i * 32 + (big ? 200 : 250)) % 360}, 75%, 60%)`}
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{
            delay: delay + i * 0.04,
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      ))}
      <motion.text
        x={cx}
        y={cy + (big ? 56 : 48)}
        textAnchor="middle"
        className="font-mono"
        fontSize={11}
        fill="#A8AEBE"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: delay + 0.4, duration: 0.4 }}
      >
        {label}
      </motion.text>
    </g>
  );
}

function RiverLabel({
  x,
  y,
  label,
  inView,
  delay,
}: {
  x: number;
  y: number;
  label: string;
  inView: boolean;
  delay: number;
}) {
  return (
    <motion.text
      x={x}
      y={y - 12}
      className="font-mono"
      fontSize={11}
      fill="#A8AEBE"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      {label}
    </motion.text>
  );
}
