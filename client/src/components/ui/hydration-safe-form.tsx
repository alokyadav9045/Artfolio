"use client";

import * as React from "react";

/**
 * Wrapper component for form elements that commonly get modified by browser extensions
 * (password managers, form fillers, etc.) causing hydration mismatches.
 * Adds suppressHydrationWarning to prevent hydration errors.
 */
export function HydrationSafeInput({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      suppressHydrationWarning
      className={className}
      {...props}
    />
  );
}

export function HydrationSafeTextarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      suppressHydrationWarning
      className={className}
      {...props}
    />
  );
}

export function HydrationSafeSelect({ className, ...props }: React.ComponentProps<"select">) {
  return (
    <select
      suppressHydrationWarning
      className={className}
      {...props}
    />
  );
}