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

export function ResetPasswordForm() {
  const form = useForm({
    // resolver: zodResolver(),
  });

  //   const { isMutating, login } = useResetPassword();

  function onSubmit(data: FieldValues) {
    // login(data);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

        <Button className="w-full" disabled={isMutating}>
          Login
        </Button>
      </form>
    </Form>
  );
}
