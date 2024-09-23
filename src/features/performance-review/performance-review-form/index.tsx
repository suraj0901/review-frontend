import { DatePicker } from "@/components/ui/date-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DefaultFooter } from "@/components/Wrapper/DefaultFooter";
import {
  SearchSelect,
  SearchSelectClearAll,
  SearchSelectContent,
  SearchSelectEmpty,
  SearchSelectFooter,
  SearchSelectInput,
  SearchSelectOptions,
  SearchSelectSelectAll,
  SearchSelectTrigger,
  SearchSelectValue,
} from "@/components/Wrapper/SearchSelect";

import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { useReviewTemplateOptions } from "../../review-template";
import { useRevieweeAndReviewerOptions } from "../use-case";
import add_performance_review_schema, {
  PerformanceReviewSchema,
} from "./performance-review-schema";

interface AddPerformanceFormProps {
  onSubmit: (data: FieldValues) => Promise<void>;
  defaultValues?: PerformanceReviewSchema;
}

export function PerformanceReviewForm({
  defaultValues,
  onSubmit,
}: AddPerformanceFormProps) {
  const form = useForm({
    defaultValues,
    resolver: zodResolver(add_performance_review_schema),
  });

  const selected_reviewee = form.watch("reviewee");
  const selected_reviewer = form.watch("reviewer");

  const { revieweeOptions, reviewerOptions, isLoading } =
    useRevieweeAndReviewerOptions(selected_reviewee, selected_reviewer);
  const { isLoading: isLoadingReviewTemplate, reviewTemplateOptions } =
    useReviewTemplateOptions();

  async function handleSubmit(data: FieldValues) {
    return onSubmit({
      start_date: data.start_date,
      end_date: data.end_date,
      revieweeId: Number(data.reviewee),
      reviewerIds: data.reviewer.map(Number),
      reviewTemplateId: Number(data.review_template_id),
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
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
                  value={field.value}
                  onValueChange={field.onChange}
                  options={revieweeOptions}
                  isLoading={isLoading}
                >
                  <SearchSelectTrigger>
                    <FormControl>
                      <SearchSelectValue placeholder="Select Reviewee" />
                    </FormControl>
                  </SearchSelectTrigger>
                  <SearchSelectContent>
                    <SearchSelectInput />
                    <SearchSelectEmpty>No user found</SearchSelectEmpty>
                    <SearchSelectOptions />
                  </SearchSelectContent>
                </SearchSelect>
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
                value={field.value}
                onValueChange={field.onChange}
                defaultValue={[]}
                options={reviewerOptions}
                isLoading={isLoading}
              >
                <SearchSelectTrigger>
                  <FormControl>
                    <SearchSelectValue placeholder="Select Reviewer" />
                  </FormControl>
                </SearchSelectTrigger>
                <SearchSelectContent>
                  <SearchSelectInput />
                  <SearchSelectEmpty>No user found</SearchSelectEmpty>
                  <SearchSelectOptions />
                  <SearchSelectFooter>
                    <SearchSelectSelectAll />
                    <Separator orientation="vertical" className="h-5" />
                    <SearchSelectClearAll />
                  </SearchSelectFooter>
                </SearchSelectContent>
              </SearchSelect>
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
              <SearchSelect
                value={field.value}
                onValueChange={field.onChange}
                options={reviewTemplateOptions}
                isLoading={isLoadingReviewTemplate}
              >
                <SearchSelectTrigger>
                  <FormControl>
                    <SearchSelectValue placeholder="Select Review Template" />
                  </FormControl>
                </SearchSelectTrigger>
                <SearchSelectContent>
                  <SearchSelectInput />
                  <SearchSelectEmpty>
                    No Review Template found
                  </SearchSelectEmpty>
                  <SearchSelectOptions />
                </SearchSelectContent>
              </SearchSelect>
              <FormMessage />
            </FormItem>
          )}
        />
        <DefaultFooter />
      </form>
    </Form>
  );
}
