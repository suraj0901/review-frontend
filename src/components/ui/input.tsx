import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  start?: React.ReactNode;
  end?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, start, end, ...props }, ref) => {
    return (
      <div className="relative flex items-center">
        {start ? <div className="absolute left-0">{start}</div> : null}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
            start && "pl-8",
            end && "pr-8"
          )}
          ref={ref}
          {...props}
        />
        {end ? <div className="absolute right-0">{end}</div> : null}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
