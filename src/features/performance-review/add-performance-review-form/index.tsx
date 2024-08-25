import { DatePicker } from "@/components/ui/date-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SearchSelect } from "@/components/Wrapper/FormItem";
import { FieldValues, useForm } from "react-hook-form";
import { useReviewTemplateOptions } from "../../review-template";
import { useRevieweeAndReviewerOptions } from "../use-case";
import { DefaultFooter } from "@/components/Wrapper/DefaultFooter";
import { zodResolver } from "@hookform/resolvers/zod";
import add_performance_review_schema from "./add-performance-review-schema";

interface AddPerformanceFormProps {
  onSubmit: (data: FieldValues) => void;
}

export function AddPerformanceForm({ onSubmit }: AddPerformanceFormProps) {
  const form = useForm({
    resolver: zodResolver(add_performance_review_schema),
  });

  const selected_reviewee = form.watch("reviewee");
  const selected_reviewer = form.watch("reviewer");

  const { revieweeOptions, reviewerOptions, isLoading } =
    useRevieweeAndReviewerOptions(selected_reviewee, selected_reviewer);
  const { isLoading: isLoadingReviewTemplate, reviewTemplateOptions } =
    useReviewTemplateOptions();
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onReset={() => form.reset()}
        className="space-y-4 p-1"
      >
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
                  fromDate={new Date()}
                  toDate={form.watch("end_date")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="end_date"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date</FormLabel>
              <FormControl>
                <DatePicker
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={field.disabled}
                  fromDate={form.watch("start_date") ?? new Date()}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="reviewee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reviewee</FormLabel>
              <FormControl>
                <SearchSelect
                  field={field}
                  options={revieweeOptions}
                  placeholder="Select Reviewee"
                  isLoading={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="reviewer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reviewer</FormLabel>
              <SearchSelect
                field={field}
                options={reviewerOptions}
                placeholder="Select Reviewee"
                isLoading={isLoading}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="review_template_id"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Review Template</FormLabel>
              <FormControl>
                <SearchSelect
                  field={field}
                  options={reviewTemplateOptions}
                  placeholder="Select Review Template"
                  isLoading={isLoadingReviewTemplate}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DefaultFooter />
      </form>
    </Form>
  );
}
