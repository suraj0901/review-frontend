import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, XCircle } from "lucide-react";
import { FieldValues, useForm } from "react-hook-form";
import { object, string } from "zod";

const schema = object({
  title: string().min(1, { message: "Title is required" }),
});

interface FeedbackFormProps {
  defaultValues?: { title: string };
  onReset: () => void;
  onSubmit: (data: FieldValues) => Promise<void>;
}

export function FeedbackForm({
  defaultValues,
  onSubmit,
  onReset,
}: FeedbackFormProps) {
  const form = useForm({ defaultValues, resolver: zodResolver(schema) });
  return (
    <Form {...form}>
      <form
        className="space-y-2"
        onReset={onReset}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Write your feedback"
                  className="!w-full"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-1">
          <Button type="submit">
            <CheckCircle className="mr-1 w-4 h-4" />
            Submit
          </Button>
          <Button type="reset" variant="secondary">
            <XCircle className="mr-1 w-4 h-4" />
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
