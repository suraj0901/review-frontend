import { DatePicker } from "@/components/ui/date-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FieldValues, useForm } from "react-hook-form";

interface AddPerformanceFormProps {
  onSubmit: (data: FieldValues) => void;
}

export function AddPerformanceForm({ onSubmit }: AddPerformanceFormProps) {
  const form = useForm();
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} onReset={() => form.reset}>
        <FormField
          name="start_date"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <DatePicker
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={field.disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
