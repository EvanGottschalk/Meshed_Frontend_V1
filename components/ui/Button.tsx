import { cn } from "@/lib/utils";
import Link from "next/link";

type Variant = "primary" | "secondary" | "ghost" | "primaryOnAlt";
type Size = "sm" | "md" | "lg";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
}

type AsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
    href?: undefined;
    children: React.ReactNode;
  };

type AsLink = CommonProps & {
  href: string;
  external?: boolean;
  children: React.ReactNode;
};

type ButtonProps = AsButton | AsLink;

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-fg-primary text-white border border-fg-primary hover:bg-bg-alt active:opacity-95",
  secondary:
    "bg-bg-base text-fg-primary border border-border-strong hover:bg-bg-elevated",
  ghost:
    "bg-transparent text-fg-primary border border-border-subtle hover:border-border-strong hover:bg-bg-elevated",
  primaryOnAlt:
    "bg-bg-base text-fg-primary border border-bg-base hover:bg-bg-elevated",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-base ease-out-expo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-violet focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base disabled:pointer-events-none disabled:opacity-60";

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    className,
  );

  if ("href" in props && props.href !== undefined) {
    if (props.external) {
      return (
        <a
          href={props.href}
          target="_blank"
          rel="noreferrer noopener"
          className={classes}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  const {
    variant: _v,
    size: _s,
    className: _c,
    children: _ch,
    href: _h,
    ...rest
  } = props as AsButton;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
