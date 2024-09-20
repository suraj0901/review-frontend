import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useAuth } from "../auth-provider";
import { useUserStore } from "@/features/user";
import { AUTHENTICATED_ROUTE } from "@/config/route";
import { Navigate } from "react-router-dom";

export default function AuthLayout({
  title,
  children,
  description,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  const { authed } = useAuth();
  const [user] = useUserStore();

  if (authed && user?.role && AUTHENTICATED_ROUTE(user.role)) {
    return <Navigate to={AUTHENTICATED_ROUTE(user.role)} />;
  }

  return (
    <main className="grid place-items-center h-svh bg-secondary">
      <Card className="max-w-sm w-full">
        <CardHeader className="text-center">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </main>
  );
}
