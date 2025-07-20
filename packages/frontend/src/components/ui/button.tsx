import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/tailwind-utils";

const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center [&>svg]:shrink-0 relative transition-colors duration-200 disabled:cursor-not-allowed [&.loading]:animate-pulse",
  {
    variants: {
      variant: {
        primary:
          "border-2 bg-black border-black text-white bg-black [&>svg]:text-white font-bold after:pointer-events-none after:content-[''] after:absolute after:inset-0.25 after:border-2 after:border-white hover:bg-white active:bg-white hover:[&>svg]:text-black active:[&>svg]:text-black hover:text-black active:text-black hover:after:border-black active:after:border-black [&:not(.loading)]:disabled:opacity-50 disabled:hover:bg-black disabled:active:bg-black disabled:hover:[&>svg]:text-white disabled:active:[&>svg]:text-white disabled:hover:text-white disabled:active:text-white disabled:hover:after:border-white disabled:active:after:border-white",
        secondary:
          "border-2 bg-white border-black text-black hover:bg-black active:bg-black hover:[&>svg]:text-white active:[&>svg]:text-white hover:text-white active:text-white font-bold",
        ghost: "bg-transparent hover:bg-gray-50 font-bold hover:underline",
      },
      size: {
        default: "h-12 text-base px-4 py-2 gap-2.5 leading-4 [&>svg]:w-8",
        sm: "h-10 text-sm px-3 py-1.5 gap-2 leading-4 [&>svg]:w-4",
        lg: "h-16 text-lg px-5 py-3 gap-2.5 leading-4 [&>svg]:w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  disabled,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      disabled={disabled || loading}
      className={cn(
        buttonVariants({ variant, size, className }),
        loading && "loading",
      )}
      {...props}
    />
  );
}

export { Button, buttonVariants };
