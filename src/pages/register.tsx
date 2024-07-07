import { useAuth } from "@/components/auth-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AUTHENTICATED_ROUTE } from "@/config/route";
import { UserRegisterForm } from "@/features/auth/register-form";
import { Link, Navigate } from "react-router-dom";

export default function Register() {
  const { authed } = useAuth();
  if (authed) return <Navigate to={AUTHENTICATED_ROUTE} />;

  return (
    <main className="grid place-items-center h-svh bg-secondary">
      <Card className="max-w-sm w-full">
        <CardHeader>
          <CardTitle>Register</CardTitle>
        </CardHeader>
        <CardContent>
          <UserRegisterForm />
          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link to={"/login"} className="underline text-muted-foreground">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
