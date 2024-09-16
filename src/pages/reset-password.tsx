import AuthLayout from "@/components/Layout/AuthLayout";
import { useResetPassword } from "@/features/auth";
import { ResetPasswordForm } from "@/features/auth/ResetPassword/ResetPasswordForm";
import { Link, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const navigate = useNavigate();
  const { submit } = useResetPassword({
    onSuccess() {
      navigate("/login");
    },
  });
  return (
    <AuthLayout
      title="Reset Password"
      description="Your new password must different to previous password"
    >
      <ResetPasswordForm onSubmit={submit} />
      <section className="text-center mt-3">
        <Link to="/login" className="text-sm underline text-muted-foreground">
          Back to Login
        </Link>
      </section>
    </AuthLayout>
  );
}
