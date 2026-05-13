import { Check, Minus, Plus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PRICING } from "@/config/content";
import { cn } from "@/lib/utils";

type Cell = boolean | "add-on";

const cellFor = (v: Cell, featured: boolean) => {
  if (v === true) {
    return (
      <Check
        className={cn(
          "h-4 w-4",
          featured ? "text-accent-violet" : "text-fg-primary",
        )}
      />
    );
  }
  if (v === "add-on") {
    return (
      <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.18em] text-fg-tertiary">
        <Plus className="h-3 w-3" /> add-on
      </span>
    );
  }
  return <Minus className="h-4 w-4 text-fg-tertiary/60" />;
};

export function ComparisonTable() {
  return (
    <section className="relative bg-bg-base py-20 md:py-24">
      <Container size="wide">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-fg-primary md:text-4xl">
          {PRICING.comparison.headline}
        </h2>

        <div className="mt-10 overflow-hidden rounded-2xl border border-border-subtle">
          <div className="grid grid-cols-[1.7fr_1fr_1fr_1fr] border-b border-border-subtle bg-bg-elevated">
            <div className="px-5 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-fg-tertiary">
              Feature
            </div>
            {PRICING.plans.map((p) => (
              <div
                key={p.key}
                className={cn(
                  "px-5 py-4 font-display text-sm font-semibold",
                  p.featured ? "text-fg-primary" : "text-fg-secondary",
                )}
              >
                {p.name}
              </div>
            ))}
          </div>

          <ul className="divide-y divide-border-subtle bg-bg-base">
            {PRICING.comparison.rows.map((row, i) => (
              <li
                key={i}
                className="grid grid-cols-[1.7fr_1fr_1fr_1fr] items-center"
              >
                <div className="px-5 py-4 text-sm text-fg-primary">
                  {row.feature}
                </div>
                <div className="px-5 py-4">
                  {cellFor(row.operator as Cell, false)}
                </div>
                <div className="px-5 py-4">
                  {cellFor(row.studio as Cell, true)}
                </div>
                <div className="px-5 py-4">
                  {cellFor(row.network as Cell, false)}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
