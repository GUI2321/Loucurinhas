import * as React from "react";
import { cn } from "@/lib/utils";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "ghost" | "outline";
};

export function Button({ className, variant = "default", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md border border-transparent px-3 py-2 text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        variant === "default" &&
          "bg-zinc-900 text-white hover:bg-zinc-800 border-border",
        variant === "ghost" && "bg-transparent text-zinc-300 hover:bg-zinc-800",
        variant === "outline" &&
          "border-border bg-transparent text-zinc-200 hover:bg-zinc-800",
        className
      )}
      {...props}
    />
  );
}
