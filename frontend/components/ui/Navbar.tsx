"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <nav className="flex items-center space-x-4 sm:space-x-6">
          <Link
            href="/"
            className="text-base font-semibold text-gray-900 hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400"
          >
            Aladia
          </Link>
          <Link
            href="/auth/register"
            className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
          >
            Register
          </Link>
          <Link
            href="/auth/users"
            className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
          >
            Users
          </Link>
          <Link
            href="/test-ui"
            className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
          >
            Test UI
          </Link>
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}
