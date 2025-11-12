"use client";

import { useTheme } from "@/components/theme/ThemeProvider";
import { Button } from "@/components/ui/Button";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      onClick={toggleTheme}
      variant="ghost"
      size="sm"
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
    >
      {theme === "light" ? "Dark" : "Light"}
    </Button>
  );
}
