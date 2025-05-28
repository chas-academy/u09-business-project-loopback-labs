"use client";

import { useRouter } from "next/navigation";
import AuthForm from "@/components/AuthForm";
import { registerUser } from "@/utils/api";

export default function RegisterPage() {
  const router = useRouter();

  const handleRegister = async (email: string, password: string) => {
    try {
      await registerUser(email, password);
      router.push("/login?registered=true");
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Registration failed");
    }
  };

  return <AuthForm type="register" onSubmit={handleRegister} />;
}
