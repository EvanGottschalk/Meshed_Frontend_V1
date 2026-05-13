import { ENABLED_SECTIONS, SECTIONS } from "@/config/sections";
import { SECTION_COMPONENTS } from "@/components/sections/registry";

export default function HomePage() {
  return (
    <main>
      {ENABLED_SECTIONS.map((key) => {
        const Section = SECTION_COMPONENTS[key];
        return <Section key={SECTIONS[key].key} />;
      })}
    </main>
  );
}
