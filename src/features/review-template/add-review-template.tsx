import ReviewTemplateForm from "./review-template-form";
import { AddReviewTemplateProps, useAddReviewTemplate } from "./use-case";

export function AddReviewTemplateForm({ onSuccess }: AddReviewTemplateProps) {
  const { isMutating, submit } = useAddReviewTemplate({
    onSuccess,
  });

  return <ReviewTemplateForm isMutating={isMutating} onSubmit={submit} />;
}
