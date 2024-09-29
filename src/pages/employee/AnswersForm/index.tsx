import { BackButton } from "@/components/BackButton";
import LoadingAndErrorWrapper from "@/components/LoadingAndErrorWrapper";
import { Button } from "@/components/ui/button";
import { MY_REVIEW } from "@/config/api";
import {
  QuestionsList,
  useAddAnswerMutation,
  useGetPerformanceReviewById,
} from "@/features/performance-review";
import { RevieweeeInfo } from "@/features/performance-review/reviewe-info";
import { ReviewersInfo } from "@/features/performance-review/reviewers-info";
import { CheckCircle } from "lucide-react";
import { useRef } from "react";
import { useParams } from "react-router-dom";

export default function AnswersForm() {
  const { id } = useParams();
  const ref = useRef<HTMLButtonElement>(null);
  const { review, answers, error, isLoading } = useGetPerformanceReviewById(
    MY_REVIEW,
    id
  );

  const { submit, isMutating } = useAddAnswerMutation();

  return (
    <LoadingAndErrorWrapper error={error} isLoading={isLoading}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <BackButton />
          <Button disabled={isMutating} onClick={() => ref.current?.click()}>
            <CheckCircle className="mr-1 w-4 h-4" /> Save
          </Button>
        </div>
        <div className="flex items-start gap-4 w-full">
          {review && (
            <QuestionsList
              element={ref}
              onSubmit={submit}
              defaultValues={{ answers, reviewId: review?.id }}
            />
          )}
          <div className="shrink-0 max-w-sm w-full space-y-4">
            <RevieweeeInfo reviewee={review?.Reviewee} />
            <ReviewersInfo reviewers={review?.Reviewers} />
          </div>
        </div>
      </div>
    </LoadingAndErrorWrapper>
  );
}
