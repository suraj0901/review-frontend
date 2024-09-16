import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function AuthLayout({
  title,
  children,
  description,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
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
