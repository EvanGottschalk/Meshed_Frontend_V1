import { SECTIONS } from "@/config/sections";
import type { SectionProps } from "@/lib/types";
import { HeroSection } from "@/components/hero/HeroSection";
import { ProblemSection } from "@/components/body/ProblemSection";
import { PassiveToActiveBreak } from "@/components/break/PassiveToActiveBreak";
import { AgentsSection } from "@/components/body/AgentsSection";
import { IntegrationsBreak } from "@/components/break/IntegrationsBreak";
import { RolesSection } from "@/components/body/RolesSection";
import { PrivacyBreak } from "@/components/break/PrivacyBreak";
import { UpcycledSection } from "@/components/body/UpcycledSection";
import { ProofBreak } from "@/components/break/ProofBreak";
import { ActivateSection } from "@/components/body/ActivateSection";

type RegistryKey = keyof typeof SECTIONS;

type SectionRenderer = (props: SectionProps) => JSX.Element;

export const SECTION_COMPONENTS: Record<RegistryKey, SectionRenderer> = {
  hero: (props) => <HeroSection {...props} />,
  problem: (props) => <ProblemSection {...props} />,
  passiveToActive: (props) => <PassiveToActiveBreak {...props} />,
  agents: (props) => <AgentsSection {...props} />,
  integrations: (props) => <IntegrationsBreak {...props} />,
  roles: (props) => <RolesSection {...props} />,
  privacy: (props) => <PrivacyBreak {...props} />,
  upcycled: (props) => <UpcycledSection {...props} />,
  proof: (props) => <ProofBreak {...props} />,
  activate: (props) => <ActivateSection {...props} />,
};
