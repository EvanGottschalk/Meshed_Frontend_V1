"use client";

import { Container } from "@/components/ui/Container";
import { INTEGRATIONS } from "@/config/content";
import type { SectionProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export function IntegrationsBreak({ standalone }: SectionProps) {
  // duplicate items so the marquee loops seamlessly
  const items = [...INTEGRATIONS.items, ...INTEGRATIONS.items];

  return (
    <section
      className={cn(
        "relative overflow-hidden border-y border-border-subtle bg-bg-elevated",
        standalone ? "py-24 md:py-32" : "py-16 md:py-20",
      )}
    >
      <Container size="wide">
        <p className="text-center font-display text-xl font-semibold tracking-tight text-fg-primary sm:text-2xl md:text-3xl">
          <span className="bg-gradient-brand bg-clip-text text-transparent">
            {INTEGRATIONS.headline}
          </span>
        </p>
      </Container>

      <div className="mask-fade-x relative mt-10 overflow-hidden">
        <div className="flex animate-[marquee_28s_linear_infinite] gap-8 whitespace-nowrap will-change-transform hover:[animation-play-state:paused]">
          {items.map((item, i) => (
            <div
              key={`${item.name}-${i}`}
              className="flex shrink-0 items-center gap-3 rounded-full border border-border-subtle bg-bg-base px-5 py-2.5"
            >
              <span className="font-display text-sm font-semibold text-fg-primary">
                {item.name}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-tertiary">
                {item.note}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
