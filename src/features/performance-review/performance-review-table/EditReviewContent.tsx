import LoadingAndErrorWrapper from "@/components/LoadingAndErrorWrapper";
import { parseISO } from "date-fns";
import { FieldValues } from "react-hook-form";
import { PerformanceReviewForm } from "../performance-review-form";
import { useGetReviewById } from "../use-case";
import { AxiosResponse } from "axios";

export function EditReviewContent({
  onSubmit,
  review_id,
}: {
  onSubmit: (data: FieldValues) => Promise<AxiosResponse>;
  review_id: number;
}) {
  const { review, isLoading, error } = useGetReviewById(review_id);

  const defaultValue = review && {
    start_date: parseISO(review?.start_date),
    end_date: parseISO(review?.end_date),
    reviewee: review?.revieweeId.toString(),
    reviewer: review?.Reviewers!.map((reviewer) => reviewer.id.toString()),
    review_template_id: review?.reviewTemplateId.toString(),
  };

  return (
    <LoadingAndErrorWrapper isLoading={isLoading} error={error}>
      {defaultValue && (
        <PerformanceReviewForm
          defaultValues={defaultValue}
          onSubmit={onSubmit}
        />
      )}
    </LoadingAndErrorWrapper>
  );
}
