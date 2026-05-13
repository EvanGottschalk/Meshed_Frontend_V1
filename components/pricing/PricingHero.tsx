import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PRICING } from "@/config/content";

export function PricingHero() {
  return (
    <section className="relative isolate overflow-hidden bg-bg-base pt-32 pb-16 md:pt-40 md:pb-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid opacity-60"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-32 h-[500px]"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 30%, rgba(122,91,255,0.18) 0%, rgba(228,91,201,0.08) 35%, rgba(255,255,255,0) 70%)",
        }}
      />
      <Container size="default" className="relative text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em]">
          <span className="bg-gradient-brand bg-clip-text text-transparent">
            {PRICING.hero.eyebrow}
          </span>
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-fg-primary sm:text-5xl md:text-6xl">
          {PRICING.hero.headline}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-fg-secondary md:text-lg">
          {PRICING.hero.subhead}
        </p>
        <div className="mt-10 flex justify-center">
          <Button href={PRICING.hero.cta.href} variant="primary" size="lg">
            {PRICING.hero.cta.label}
          </Button>
        </div>
      </Container>
    </section>
  );
}
