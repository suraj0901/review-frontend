import { useAuth } from "@/components/auth-provider";
import AuthLayout from "@/components/Layout/AuthLayout";
import { AUTHENTICATED_ROUTE } from "@/config/route";
import { UserLoginForm } from "@/features/auth";
import { Link, Navigate } from "react-router-dom";

export default function Login() {
  const { authed } = useAuth();
  if (authed) return <Navigate to={AUTHENTICATED_ROUTE} />;
  return (
    <AuthLayout title="Login">
      <UserLoginForm />
      <p className="text-center text-sm mt-4">
        Don't have account?{" "}
        <Link to={"/register"} className="underline text-muted-foreground">
          Register
        </Link>
      </p>
    </AuthLayout>
  );
}
