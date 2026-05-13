import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface PlanCardProps {
  name: string;
  audience: string;
  price: string;
  features: ReadonlyArray<string>;
  featured: boolean;
  cta: { label: string; href: string };
}

export function PlanCard({
  name,
  audience,
  price,
  features,
  featured,
  cta,
}: PlanCardProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl border p-6 md:p-7",
        featured
          ? "border-transparent bg-bg-alt text-fg-onAlt shadow-[0_24px_60px_-30px_rgba(122,91,255,0.4)]"
          : "border-border-subtle bg-bg-base",
      )}
    >
      {featured && (
        <span
          aria-hidden
          className="absolute inset-x-0 -top-px mx-auto h-px w-1/2"
          style={{
            background:
              "linear-gradient(90deg, transparent, #7A5BFF, #E45BC9, transparent)",
          }}
        />
      )}
      <div>
        <p
          className={cn(
            "font-mono text-[11px] uppercase tracking-[0.22em]",
            featured ? "text-fg-onAltSecondary" : "text-fg-tertiary",
          )}
        >
          {featured ? "Recommended" : " "}
        </p>
        <h3
          className={cn(
            "mt-2 font-display text-2xl font-semibold tracking-tight",
            featured ? "text-fg-onAlt" : "text-fg-primary",
          )}
        >
          {name}
        </h3>
        <p
          className={cn(
            "mt-2 text-sm leading-relaxed",
            featured ? "text-fg-onAltSecondary" : "text-fg-secondary",
          )}
        >
          {audience}
        </p>
      </div>

      <div className="mt-6">
        <p
          className={cn(
            "font-display text-3xl font-semibold tracking-tight",
            featured ? "text-fg-onAlt" : "text-fg-primary",
          )}
        >
          {price}
        </p>
      </div>

      <ul className="mt-6 flex-1 space-y-3">
        {features.map((f) => (
          <li
            key={f}
            className={cn(
              "flex items-start gap-2.5 text-sm leading-relaxed",
              featured ? "text-fg-onAlt" : "text-fg-primary",
            )}
          >
            <Check
              className={cn(
                "mt-0.5 h-4 w-4 shrink-0",
                featured ? "text-accent-cyan" : "text-fg-primary",
              )}
            />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <Button
          href={cta.href}
          variant={featured ? "primaryOnAlt" : "secondary"}
          size="md"
          className="w-full"
        >
          {cta.label}
        </Button>
      </div>
    </div>
  );
}
