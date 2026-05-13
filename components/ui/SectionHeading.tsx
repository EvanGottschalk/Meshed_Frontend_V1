import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  headline: string;
  subhead?: string;
  align?: "left" | "center";
  inverted?: boolean;
  className?: string;
  as?: "h1" | "h2";
}

export function SectionHeading({
  eyebrow,
  headline,
  subhead,
  align = "left",
  inverted = false,
  className,
  as: Heading = "h2",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        align === "center" ? "text-center" : "text-left",
        align === "center" && "mx-auto",
        "max-w-3xl",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "font-mono text-xs uppercase tracking-[0.22em]",
            inverted ? "text-fg-onAltSecondary" : "text-fg-secondary",
          )}
        >
          <span className="bg-gradient-brand bg-clip-text text-transparent">
            {eyebrow}
          </span>
        </p>
      )}
      <Heading
        className={cn(
          "mt-4 font-display font-semibold tracking-tight",
          inverted ? "text-fg-onAlt" : "text-fg-primary",
          Heading === "h1"
            ? "text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05]"
            : "text-3xl sm:text-4xl md:text-5xl leading-[1.1]",
        )}
      >
        {headline}
      </Heading>
      {subhead && (
        <p
          className={cn(
            "mt-6 text-base md:text-lg leading-relaxed",
            inverted ? "text-fg-onAltSecondary" : "text-fg-secondary",
          )}
        >
          {subhead}
        </p>
      )}
    </div>
  );
}
