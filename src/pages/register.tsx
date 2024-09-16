import { useAuth } from "@/components/auth-provider";
import AuthLayout from "@/components/Layout/AuthLayout";
import { AUTHENTICATED_ROUTE } from "@/config/route";
import { UserRegisterForm } from "@/features/auth/register-form";
import { Link, Navigate } from "react-router-dom";

export default function Register() {
  const { authed } = useAuth();
  if (authed) return <Navigate to={AUTHENTICATED_ROUTE} />;

  return (
    <AuthLayout title="Register">
      <UserRegisterForm />
      <p className="text-center text-sm mt-4">
        Already have an account?{" "}
        <Link to={"/login"} className="underline text-muted-foreground">
          Login
        </Link>
      </p>
    </AuthLayout>
  );
}
