import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SITE } from "@/config/site";

interface LogoProps {
  className?: string;
  inverted?: boolean;
  size?: number;
}

export function Logo({ className, inverted = false, size = 32 }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label={`${SITE.businessName} home`}
      className={cn(
        "inline-flex items-center gap-2.5 font-display font-semibold tracking-tight",
        inverted ? "text-fg-onAlt" : "text-fg-primary",
        className,
      )}
    >
      <Image
        src="/brand/meshed-logo.png"
        alt=""
        width={size}
        height={size}
        priority
        className="rounded-md"
      />
      <span className="text-lg">{SITE.businessName}</span>
    </Link>
  );
}
