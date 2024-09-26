import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { FieldValues, useForm } from "react-hook-form";
// import { Feedback } from "./performance-review-dto";

export default function Feedbacks() {
  return (
    <div className="flex-1 space-y-2">
      <h3>Feedbacks</h3>
      <FeedbackForm onSubmit={console.log} />
    </div>
  );
}

interface FeedbackFormProps {
  onSubmit: (data: FieldValues) => void; //Promise<void>;
}

function FeedbackForm({ onSubmit }: FeedbackFormProps) {
  const form = useForm();
  return (
    <Form {...form}>
      <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="feedback"
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
