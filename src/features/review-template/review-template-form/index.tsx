import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, XCircleIcon } from "lucide-react";
import { FieldValues, useForm } from "react-hook-form";
import QuestionForm from "./question-form";
import reviewTemplateSchema from "./review-template-schema";

interface ReviewTemplateFormProps {
  onSubmit: (data: FieldValues) => Promise<void>;
  isMutating: boolean;
  defaultValues?: FieldValues;
}

export default function ReviewTemplateForm({
  onSubmit,
  isMutating,
  defaultValues,
}: ReviewTemplateFormProps) {
  const form = useForm({
    defaultValues,
    resolver: zodResolver(reviewTemplateSchema),
  });

  function onReset() {
    form.reset();
  }

  function handleDeleteQuestion(id: number) {
    const delete_questions_id = form.getValues("delete_questions_id") ?? [];
    form.setValue("delete_questions_id", [...delete_questions_id, id]);
  }

  async function handleSubmit(data: FieldValues) {
    console.log({ data });

    await onSubmit(data);
  }

  // console.log({ error: form.formState.errors });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} onReset={onReset}>
        <div className="space-y-2 p-1">
          <FormField
            control={form.control}
            name="title"
            disabled={isMutating}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            disabled={isMutating}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <QuestionForm
            name="questions"
            disabled={isMutating}
            control={form.control}
            onRemove={handleDeleteQuestion}
          />
          <p className="text-red-600/70 text-sm">
            {form.formState?.errors?.questions?.message?.toString()}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4">
          <Button disabled={isMutating} variant="secondary" type="reset">
            <XCircleIcon size={15} className="mr-1" /> Reset
          </Button>
          <Button disabled={isMutating} type="submit">
            <CheckCircle2 size={15} className="mr-1" /> Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
