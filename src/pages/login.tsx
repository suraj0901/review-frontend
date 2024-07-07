import { useAuth } from "@/components/auth-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AUTHENTICATED_ROUTE } from "@/config/route";
import { UserLoginForm } from "@/features/auth";
import { Link, Navigate } from "react-router-dom";

export default function Login() {
  const { authed } = useAuth();
  if (authed) return <Navigate to={AUTHENTICATED_ROUTE} />;
  return (
    <main className="grid place-items-center h-svh bg-secondary">
      <Card className="max-w-sm w-full">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <UserLoginForm />
          <p className="text-center text-sm mt-4">
            Don't have account?{" "}
            <Link to={"/register"} className="underline text-muted-foreground">
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
