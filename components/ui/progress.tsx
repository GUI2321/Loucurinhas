import * as React from "react";
import { cn } from "@/lib/utils";

export function Progress({
  value,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { value: number }) {
  return (
    <div
      className={cn("h-2 w-full overflow-hidden rounded-full bg-zinc-800", className)}
      {...props}
    >
      <div
        className="h-full bg-accent transition-all duration-300"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
