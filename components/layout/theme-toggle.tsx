"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={() => setTheme(nextTheme)}>
      <Sun className="size-4 dark:hidden" />
      <Moon className="hidden size-4 dark:block" />
    </Button>
  );
}
