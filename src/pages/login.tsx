import AuthLayout from "@/components/Layout/AuthLayout";
import { UserLoginForm } from "@/features/auth";
import { Link } from "react-router-dom";

export default function Login() {
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
