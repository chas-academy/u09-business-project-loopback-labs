import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/main.scss";
import "./globals.scss";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mimir - Feedback Intelligence",
  description: "Transform Swedish CRM notes into actionable insights",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
