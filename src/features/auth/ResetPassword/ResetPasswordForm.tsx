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
import { requireMsg } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import validator from "validator";
import { object, string } from "zod";

const schema = object({
  password: string({ message: requireMsg("Password") }).refine(
    (value) => validator.isStrongPassword(value),
    {
      message: "Please provide an strong password",
    }
  ),
  confirm_password: string({ message: "Confirm Password is required" }).min(6, {
    message: "Confirm Password must be at least 6 characters",
  }),
}).refine((data) => data.password === data.confirm_password, {
  message: "Passwords must match!",
  path: ["confirm_password"], // This will attach the error to the confirmPassword field
});

export function ResetPasswordForm({
  onSubmit,
}: {
  onSubmit: (data: FieldValues) => Promise<void>;
}) {
  const form = useForm({
    resolver: zodResolver(schema),
  });

  const isMutating = form.formState.isSubmitting;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Passowrd</FormLabel>
              <FormControl>
                <PasswordInput disabled={isMutating} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="confirm_password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Passowrd</FormLabel>
              <FormControl>
                <PasswordInput disabled={isMutating} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" disabled={isMutating}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
