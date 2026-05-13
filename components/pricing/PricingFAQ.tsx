"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PRICING } from "@/config/content";
import { cn } from "@/lib/utils";

export function PricingFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="relative bg-bg-elevated py-20 md:py-28">
      <Container size="default">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-fg-primary md:text-4xl">
          Frequently asked
        </h2>

        <ul className="mt-10 divide-y divide-border-subtle border-y border-border-subtle">
          {PRICING.faq.map((item, i) => {
            const open = openIdx === i;
            return (
              <li key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpenIdx(open ? null : i)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="font-display text-base font-semibold text-fg-primary md:text-lg">
                    {item.q}
                  </span>
                  <Plus
                    className={cn(
                      "h-4 w-4 shrink-0 text-fg-tertiary transition-transform duration-base ease-out-expo",
                      open && "rotate-45",
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-10 text-sm leading-relaxed text-fg-secondary md:text-base">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
