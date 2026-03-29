"use client";

import { forwardRef, useId } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  error?: string;
  as?: "input" | "textarea";
  rows?: number;
}

export const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  ({ label, error, as = "input", className, ...props }, ref) => {
    const id = useId();

    return (
      <div className="w-full">
        <label htmlFor={id} className="text-[10px] font-mono tracking-widest text-zinc-600 uppercase mb-2 block">
          {label}
        </label>
        {as === "textarea" ? (
          <textarea
            id={id}
            ref={ref as React.Ref<HTMLTextAreaElement>}
            className={cn(
              "w-full rounded-xl border border-white/5 bg-zinc-900/50 px-4 py-3 text-sm text-zinc-100 outline-none transition-colors focus:border-zinc-500 placeholder:text-zinc-700",
              error && "border-red-500/50 focus:border-red-500",
              className
            )}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            id={id}
            ref={ref as React.Ref<HTMLInputElement>}
            className={cn(
              "w-full rounded-xl border border-white/5 bg-zinc-900/50 px-4 py-3 text-sm text-zinc-100 outline-none transition-colors focus:border-zinc-500 placeholder:text-zinc-700",
              error && "border-red-500/50 focus:border-red-500",
              className
            )}
            {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
        {error && <p className="mt-2 text-xs text-red-500 font-mono">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
