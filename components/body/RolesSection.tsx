"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ROLES } from "@/config/content";
import type { SectionProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export function RolesSection({ standalone }: SectionProps) {
  const [activeKey, setActiveKey] = useState<string>(ROLES.tabs[0].key);
  const active = ROLES.tabs.find((t) => t.key === activeKey) ?? ROLES.tabs[0];

  return (
    <section
      id="roles"
      className={cn(
        "relative bg-bg-base py-28 md:py-36",
        standalone && "pt-40 md:pt-48",
      )}
    >
      <Container size="wide">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-tertiary">
          3.0 Built for &nbsp;→
        </p>
        <div className="mt-3">
          <SectionHeading
            headline={ROLES.headline}
            align="left"
            as={standalone ? "h1" : "h2"}
          />
        </div>

        {/* Desktop tabs */}
        <div className="mt-12 hidden md:block">
          <div
            role="tablist"
            aria-label="Operator modes"
            className="inline-flex rounded-full border border-border-strong bg-bg-elevated p-1"
          >
            {ROLES.tabs.map((tab) => (
              <button
                key={tab.key}
                role="tab"
                type="button"
                aria-selected={tab.key === activeKey}
                onClick={() => setActiveKey(tab.key)}
                className={cn(
                  "relative z-10 rounded-full px-5 py-2 text-sm font-medium transition-colors",
                  tab.key === activeKey
                    ? "text-white"
                    : "text-fg-secondary hover:text-fg-primary",
                )}
              >
                {tab.key === activeKey && (
                  <motion.span
                    layoutId="role-tab-pill"
                    transition={{ type: "spring", duration: 0.5, bounce: 0.18 }}
                    className="absolute inset-0 -z-10 rounded-full bg-fg-primary"
                  />
                )}
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mt-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.key}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-12 gap-12"
              >
                <div className="col-span-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-tertiary">
                    Outcome
                  </p>
                  <h3 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight text-fg-primary">
                    {active.outcome}
                  </h3>
                  <ul className="mt-8 space-y-5">
                    {active.features.map((f) => (
                      <li key={f.title} className="text-base leading-relaxed">
                        <span className="font-semibold text-fg-primary">
                          {f.title}.
                        </span>{" "}
                        <span className="text-fg-secondary">{f.body}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-span-7">
                  <RoleVisual roleKey={active.key} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile accordion */}
        <div className="mt-10 space-y-3 md:hidden">
          {ROLES.tabs.map((tab) => {
            const open = tab.key === activeKey;
            return (
              <div
                key={tab.key}
                className="overflow-hidden rounded-2xl border border-border-subtle bg-bg-elevated"
              >
                <button
                  type="button"
                  onClick={() => setActiveKey(open ? "" : tab.key)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between px-5 py-4 text-left"
                >
                  <span className="font-display text-lg font-semibold text-fg-primary">
                    {tab.label}
                  </span>
                  <ArrowRight
                    className={cn(
                      "h-4 w-4 text-fg-tertiary transition-transform",
                      open && "rotate-90",
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5">
                        <p className="font-display text-base font-semibold text-fg-primary">
                          {tab.outcome}
                        </p>
                        <ul className="mt-4 space-y-3 text-sm">
                          {tab.features.map((f) => (
                            <li key={f.title}>
                              <span className="font-semibold text-fg-primary">
                                {f.title}.
                              </span>{" "}
                              <span className="text-fg-secondary">
                                {f.body}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function RoleVisual({ roleKey }: { roleKey: string }) {
  const presets: Record<
    string,
    { headline: string; rows: Array<{ left: string; right: string }> }
  > = {
    "vc-lp": {
      headline: "Portfolio · this week",
      rows: [
        { left: "Match: PortCo A ↔ PortCo D", right: "post-Series-A hiring" },
        { left: "Activate LP", right: "Rivertown Capital → Acme" },
        { left: "Reroute talent", right: "3 ops candidates surfaced" },
        { left: "Auto-summary", right: "12 founder updates digested" },
      ],
    },
    business: {
      headline: "Today · for your team",
      rows: [
        { left: "Solved this already", right: "Latch.ai (2024 PMF playbook)" },
        { left: "Warm intro ready", right: "to Sarah K. — security" },
        { left: "Customer interview", right: "scheduled · Wednesday 2pm" },
        { left: "Updated context", right: "12 messages, 4 docs read" },
      ],
    },
    individual: {
      headline: "Your job search · this week",
      rows: [
        { left: "Top match", right: "Series-B fintech, Brooklyn" },
        { left: "Resume v3", right: "ready · sent to 4 firms" },
        { left: "Skill gap", right: "course recommended (8 hrs)" },
        { left: "Interview feedback", right: "communication: ↑ 18%" },
      ],
    },
  };
  const data = presets[roleKey] ?? presets["vc-lp"];

  return (
    <div className="overflow-hidden rounded-2xl border border-border-subtle bg-bg-elevated shadow-[0_24px_60px_-30px_rgba(11,13,20,0.18)]">
      <div className="flex items-center justify-between border-b border-border-subtle bg-bg-base/60 px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-accent-violet" />
          <p className="font-display text-sm font-semibold text-fg-primary">
            {data.headline}
          </p>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-tertiary">
          Live
        </span>
      </div>
      <ul className="divide-y divide-border-subtle">
        {data.rows.map((row, i) => (
          <li
            key={i}
            className="flex items-center justify-between gap-4 px-5 py-4 text-sm"
          >
            <span className="text-fg-primary">{row.left}</span>
            <span className="text-fg-tertiary">{row.right}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
