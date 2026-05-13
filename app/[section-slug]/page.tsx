import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  SECTIONS,
  SECTION_ORDER,
  getSectionBySlug,
} from "@/config/sections";
import { SECTION_COMPONENTS } from "@/components/sections/registry";

interface PageProps {
  params: { "section-slug": string };
}

export function generateStaticParams() {
  return SECTION_ORDER.flatMap((key) => {
    const section = SECTIONS[key];
    if (section.slug && section.enabled) {
      return [{ "section-slug": section.slug }];
    }
    return [];
  });
}

export function generateMetadata({ params }: PageProps): Metadata {
  const section = getSectionBySlug(params["section-slug"]);
  if (!section) return {};
  return {
    title: section.title,
  };
}

export default function SectionPage({ params }: PageProps) {
  const section = getSectionBySlug(params["section-slug"]);
  if (!section) notFound();

  const key = section.key as keyof typeof SECTIONS;
  const Section = SECTION_COMPONENTS[key];
  return (
    <main>
      <Section standalone />
    </main>
  );
}
