"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/utils/auth";
import { useEffect } from "react";

export default function LandingPage() {
  const router = useRouter();

  // If user is already logged in, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated()) {
      router.push("/dashboard");
    }
  }, [router]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-6 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Förvandla Kundernas Feedback till Värdefulla Insikter
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Mimir analyserar dina CRM-anteckningar med AI för att upptäcka
          mönster, trender och förbättringsmöjligheter i din kundkommunikation.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/auth/register"
            className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90"
          >
            Kom igång gratis
          </Link>
          <Link
            href="/auth/login"
            className="bg-secondary px-6 py-3 rounded-lg font-medium hover:bg-secondary/90"
          >
            Logga in
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Kraftfulla funktioner
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              title="AI-Driven Analys"
              description="Automatisk analys av svensk text med hjälp av Google Gemini AI"
            />
            <FeatureCard
              title="Temaidentifiering"
              description="Upptäck återkommande teman och mönster i kundfeedback"
            />
            <FeatureCard
              title="Handlingsbara Insikter"
              description="Få konkreta förslag på förbättringsområden"
            />
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Hur det fungerar
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <StepCard
              number="1"
              title="Kopiera & Klistra in"
              description="Klistra in dina CRM-anteckningar direkt i systemet"
            />
            <StepCard
              number="2"
              title="AI Analys"
              description="Vår AI analyserar texten och identifierar nyckelinsikter"
            />
            <StepCard
              number="3"
              title="Få Insikter"
              description="Se trender, sentiment och förbättringsförslag"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function StepCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
