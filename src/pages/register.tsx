import AuthLayout from "@/components/Layout/AuthLayout";
import { UserRegisterForm } from "@/features/auth/register-form";
import { Link } from "react-router-dom";

export default function Register() {
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
