import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Navbar } from "@/components/ui/Navbar";

export const metadata: Metadata = {
  title: "Aladia Project",
  description: "Full-stack application with Next.js & NestJS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 transition-colors dark:bg-gray-950 dark:text-gray-100">
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
