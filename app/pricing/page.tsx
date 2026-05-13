import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PricingHero } from "@/components/pricing/PricingHero";
import { PlanCard } from "@/components/pricing/PlanCard";
import { ComparisonTable } from "@/components/pricing/ComparisonTable";
import { PricingFAQ } from "@/components/pricing/PricingFAQ";
import { PRICING } from "@/config/content";

export const metadata: Metadata = {
  title: "Pricing",
  description: PRICING.hero.subhead,
};

export default function PricingPage() {
  return (
    <main>
      <PricingHero />

      <section className="bg-bg-base py-12 md:py-16">
        <Container size="wide">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
            {PRICING.plans.map((plan) => (
              <PlanCard
                key={plan.key}
                name={plan.name}
                audience={plan.audience}
                price={plan.price}
                features={plan.features}
                featured={plan.featured}
                cta={plan.cta}
              />
            ))}
          </div>
        </Container>
      </section>

      <ComparisonTable />
      <PricingFAQ />
    </main>
  );
}
