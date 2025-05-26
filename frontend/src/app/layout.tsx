import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/main.scss";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <body className={inter.className}>
        <main>{children}</main>
      </body>
    </html>
  );
}
