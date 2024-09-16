import EmailInput from "@/components/EmailInput";
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
import { object, string } from "zod";

interface Props {
  isEmailSent: boolean;
  onSubmit: (data: FieldValues) => Promise<void>;
}
const schema = object({
  email: string({ message: "Email is required" }).email({
    message: "Invalid email",
  }),
});

export default function ForgotPasswordForm({ isEmailSent, onSubmit }: Props) {
  const form = useForm({
    resolver: zodResolver(schema),
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onReset={() => form.reset()}
        className="space-y-4"
      >
        <section className={isEmailSent ? "hidden" : "block"}>
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <EmailInput placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full"
        >
          {isEmailSent ? "Resend Email" : "Send Email"}
        </Button>
      </form>
    </Form>
  );
}
