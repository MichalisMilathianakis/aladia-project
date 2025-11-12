"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ id, label, error, helperText, className, ...props }, ref) => {
    const inputId =
      id ?? props.name ?? label.toLowerCase().replace(/\s+/g, "-");
    const describedByIds =
      [
        helperText ? `${inputId}-helper` : null,
        error ? `${inputId}-error` : null,
      ]
        .filter(Boolean)
        .join(" ") || undefined;

    return (
      <div className="flex w-full flex-col gap-1">
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-gray-800 dark:text-gray-200"
        >
          {label}
        </label>
        <input
          id={inputId}
          ref={ref}
          className={cn(
            "w-full rounded-md border px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus-visible:border-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500",
            error && "border-red-500 focus-visible:ring-red-500",
            className
          )}
          aria-invalid={!!error}
          aria-describedby={describedByIds}
          {...props}
        />
        {helperText && (
          <p
            id={`${inputId}-helper`}
            className="text-xs text-gray-500 dark:text-gray-400"
          >
            {helperText}
          </p>
        )}
        {error && (
          <p
            id={`${inputId}-error`}
            className="text-xs text-red-600 dark:text-red-400"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";
