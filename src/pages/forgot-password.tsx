import AuthLayout from "@/components/Layout/AuthLayout";
import { useSendForgotEmail } from "@/features/auth";
import ForgotPasswordForm from "@/features/auth/forgot-password-form";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const { submit } = useSendForgotEmail({
    onSuccess() {
      setIsEmailSent(true);
    },
  });
  return (
    <AuthLayout
      title={isEmailSent ? "Check your email" : "Forgot Password"}
      description={
        isEmailSent
          ? "We have sent a password recovery instruction to your email"
          : "Enter your email to recieve password recovery instruction"
      }
    >
      <ForgotPasswordForm isEmailSent={isEmailSent} onSubmit={submit} />
      <section className="text-center mt-3">
        <Link to="/login" className="text-sm underline text-muted-foreground">
          Back to Login
        </Link>
      </section>
    </AuthLayout>
  );
}
