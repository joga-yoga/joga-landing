import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "ghost";

type CommonProps = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
};

type AnchorButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  asChild: true;
  href: string;
};

type NativeButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: false;
};

type ButtonProps = CommonProps & (AnchorButtonProps | NativeButtonProps);

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "inline-flex items-center justify-center rounded-full border border-transparent bg-accent px-5 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-accent-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
  ghost:
    "inline-flex items-center justify-center rounded-full border border-border px-5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
};

export function Button({
  children,
  className,
  variant = "primary",
  asChild,
  ...props
}: ButtonProps) {
  const classes = cn(variantStyles[variant], className);

  if (asChild) {
    const { href, ...rest } = props as AnchorButtonProps;
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as NativeButtonProps)}>
      {children}
    </button>
  );
}
