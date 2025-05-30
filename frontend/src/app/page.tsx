"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/utils/auth";
import { useEffect } from "react";
import { MessageSquare, Lightbulb, TrendingUp, Users } from "lucide-react";
import Navigation from "@/components/layout/Navigation";

export default function LandingPage() {
  const router = useRouter();

  // If user is already logged in, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated()) {
      router.push("/dashboard");
    }
  }, [router]);

  return (
    <>
      <Navigation />
      <div className="landing">
        {/* Hero Section */}
        <section className="landing__section landing__section--hero">
          <div className="landing__hero">
            <h1 className="landing__hero-title">
              Transform Customer Feedback into Valuable Insights
            </h1>
            <p className="landing__hero-subtitle">
              Mimir uses advanced AI to analyze your customer interactions,
              helping you uncover valuable patterns and insights that drive
              business growth.
            </p>
            <div className="landing__actions">
              <Link
                href="/register"
                className="landing__button landing__button--primary"
              >
                Start Free Trial
              </Link>
              <Link
                href="/login"
                className="landing__button landing__button--secondary"
              >
                Sign In
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="landing__section landing__section--features">
          <div className="landing__container">
            <h2 className="landing__section-title">Why Choose Mimir?</h2>
            <div className="landing__grid">
              <FeatureCard
                icon={<MessageSquare className="landing__card-icon" />}
                title="AI-Powered Analysis"
                description="Advanced natural language processing to extract meaningful insights from your customer conversations"
              />
              <FeatureCard
                icon={<Lightbulb className="landing__card-icon" />}
                title="Smart Recommendations"
                description="Get actionable suggestions to improve customer satisfaction and business outcomes"
              />
              <FeatureCard
                icon={<TrendingUp className="landing__card-icon" />}
                title="Trend Detection"
                description="Identify emerging patterns and trends in customer feedback before they become obvious"
              />
              <FeatureCard
                icon={<Users className="landing__card-icon" />}
                title="Team Collaboration"
                description="Share insights across your team and align everyone with customer needs"
              />
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="landing__section landing__section--steps">
          <div className="landing__container">
            <h2 className="landing__section-title">How It Works</h2>
            <div className="landing__steps-grid">
              <StepCard
                number="1"
                title="Input Your Data"
                description="Simply paste your customer interaction notes or connect your CRM"
              />
              <StepCard
                number="2"
                title="AI Analysis"
                description="Our advanced AI processes and analyzes your data in real-time"
              />
              <StepCard
                number="3"
                title="Get Insights"
                description="Access detailed reports, trends, and actionable recommendations"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="landing__section landing__section--cta">
          <div className="landing__container">
            <h2 className="landing__cta-title">Ready to Get Started?</h2>
            <p className="landing__cta-description">
              Join companies that use Mimir to understand and improve their
              customer experience.
            </p>
            <div className="landing__cta-actions">
              <Link
                href="/register"
                className="landing__button landing__button--primary"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="landing__card">
      <div className="landing__card-icon-wrapper">{icon}</div>
      <h3 className="landing__card-title">{title}</h3>
      <p className="landing__card-description">{description}</p>
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
    <div className="landing__step">
      <div className="landing__step-number">{number}</div>
      <h3 className="landing__step-title">{title}</h3>
      <p className="landing__step-description">{description}</p>
    </div>
  );
}
