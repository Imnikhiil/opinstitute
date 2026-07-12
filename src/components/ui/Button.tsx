import { cn } from "@/lib/utils";
import { forwardRef, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "kids";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

const variants = {
  primary:
    "bg-brand-600 text-white hover:bg-brand-700 shadow-md shadow-brand-600/20 hover:shadow-brand-600/30",
  secondary:
    "bg-white text-brand-600 border border-gray-200 hover:bg-brand-50 hover:border-brand-200",
  outline:
    "border-2 border-brand-600 text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950/50",
  ghost:
    "text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950/30",
  kids: "bg-gradient-to-r from-kids-500 via-accent-pink to-accent-purple text-white hover:opacity-90 shadow-lg shadow-kids-500/30",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
