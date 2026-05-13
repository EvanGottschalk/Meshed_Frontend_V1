"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ACTIVATE, CTA } from "@/config/content";
import type { SectionProps } from "@/lib/types";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

export function ActivateSection({ standalone }: SectionProps) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<string>(ACTIVATE.form.roles[0]);
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || status === "submitting") return;
    setStatus("submitting");
    // Placeholder endpoint — see Tasks for Humans.md to wire a real one
    // eslint-disable-next-line no-console
    console.log("[Meshed early-access form]", { email, role });
    await new Promise((r) => setTimeout(r, 700));
    setStatus("success");
  }

  return (
    <section
      id="activate"
      className={cn(
        "relative isolate overflow-hidden bg-bg-base py-28 md:py-36",
        standalone && "pt-40 md:pt-48",
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid opacity-60"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 60% at 50% 50%, rgba(122,91,255,0.16) 0%, rgba(228,91,201,0.08) 35%, rgba(255,255,255,0) 70%)",
        }}
      />

      <Container size="default" className="relative">
        <div className="text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em]">
            <span className="bg-gradient-brand bg-clip-text text-transparent">
              {ACTIVATE.eyebrow}
            </span>
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-fg-primary sm:text-5xl md:text-6xl">
            {ACTIVATE.headline}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-fg-secondary md:text-lg">
            {ACTIVATE.subhead}
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-xl">
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl border border-border-subtle bg-bg-elevated p-8 text-center"
            >
              <span className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-fg-primary text-white">
                <Check className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-fg-primary">
                {ACTIVATE.form.successHeadline}
              </h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-fg-secondary">
                {ACTIVATE.form.successBody}
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="rounded-2xl border border-border-subtle bg-bg-elevated p-2 shadow-[0_24px_60px_-30px_rgba(11,13,20,0.18)]"
            >
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_auto_auto]">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={ACTIVATE.form.emailPlaceholder}
                  aria-label={ACTIVATE.form.emailLabel}
                  className="h-12 rounded-xl bg-bg-base px-4 text-sm text-fg-primary placeholder:text-fg-tertiary focus:outline-none focus:ring-2 focus:ring-accent-violet sm:h-14"
                />
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  aria-label={ACTIVATE.form.roleLabel}
                  className="h-12 rounded-xl bg-bg-base px-3 text-sm text-fg-primary focus:outline-none focus:ring-2 focus:ring-accent-violet sm:h-14"
                >
                  {ACTIVATE.form.roles.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={status === "submitting"}
                  className="h-12 sm:h-14"
                >
                  {status === "submitting"
                    ? "Submitting…"
                    : ACTIVATE.form.submit}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <p className="mt-3 px-2 text-[11px] text-fg-tertiary">
                We&apos;ll only use your email to coordinate early access. No
                marketing spam.
              </p>
            </form>
          )}

          <div className="mt-8 flex justify-center">
            <Button href="#hero" variant="ghost" size="md">
              {CTA.tertiary}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
