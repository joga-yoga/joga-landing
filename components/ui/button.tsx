// English-only comments
import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "ghost";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** When true, styles are applied to the single child element (e.g., <Link> or <a>) */
  asChild?: boolean;
  /** Visual variant */
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "inline-flex items-center justify-center rounded-full border border-transparent bg-accent px-5 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-accent-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
  ghost:
    "inline-flex items-center justify-center rounded-full border border-border px-5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
};

export function Button({
  children,
  className,
  variant = "primary",
  asChild = false,
  ...props
}: ButtonProps) {
  const classes = cn(variantStyles[variant], className);

  if (asChild) {
    // Apply button classes to the single child element (e.g., <Link> or <a>)
    const child = React.Children.only(children) as React.ReactElement<any>;
    return React.cloneElement(child, {
      className: cn(classes, child.props.className),
      // Preserve child's own props/handlers; do not pass button-only props
    });
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

/**
 * Optional helper: a styled anchor that matches Button styles without asChild.
 * Usage: <ButtonLink href="/en">Text</ButtonLink>
 */
export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
  ...rest
}: React.ComponentProps<typeof Link> & { variant?: ButtonVariant; className?: string }) {
  return (
    <Link href={href} className={cn(variantStyles[variant], className)} {...rest}>
      {children}
    </Link>
  );
}
