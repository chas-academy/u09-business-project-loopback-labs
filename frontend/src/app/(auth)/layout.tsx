import { Metadata } from "next";
import "@/styles/auth.scss";

export const metadata: Metadata = {
  title: "Authentication - Mimir",
  description: "Login or register for Mimir",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="auth-layout">
      <div className="auth-container">
        <div className="auth-header">
          <h2>Welcome to Mimir</h2>
          <p>Your AI-powered learning companion</p>
        </div>
        {children}
      </div>
    </div>
  );
}
