import EmailInput from "@/components/EmailInput";
import PasswordInput from "@/components/Password";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import user_login_schema from "./login-schema";
import { useLoginUser } from "../use-case";
import { Link } from "react-router-dom";

export function UserLoginForm() {
  const form = useForm({
    resolver: zodResolver(user_login_schema),
  });

  const { isMutating, login } = useLoginUser();

  function onSubmit(data: FieldValues) {
    login(data);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <EmailInput {...field} disabled={isMutating} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Passowrd</FormLabel>
              <FormControl>
                <PasswordInput disabled={isMutating} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <section className="text-end w-full">
          <Link
            to="/forgot-password"
            className="underline text-sm text-muted-foreground"
          >
            Forgot password?
          </Link>
        </section>

        <Button className="w-full" disabled={isMutating}>
          Login
        </Button>
      </form>
    </Form>
  );
}
