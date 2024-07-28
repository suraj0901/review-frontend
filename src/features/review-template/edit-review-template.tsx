import LoadingAndErrorWrapper from "@/components/LoadingAndErrorWrapper";
import ReviewTemplateForm from "./review-template-form";
import { useEditReviewTemplate } from "./use-case/use-edit-review-template";
import useGetReviewTemplateById from "./use-case/use-get-review-template-by-id";

interface EditReviewTemplateFormProps {
  onSuccess: () => void;
  review_template_id: number;
}

export function EditReviewTemplate({
  onSuccess,
  review_template_id,
}: EditReviewTemplateFormProps) {
  const { review_template, isLoading, error } =
    useGetReviewTemplateById(review_template_id);

  const { isMutating, submit } = useEditReviewTemplate({
    onSuccess,
    review_template_id,
  });

  return (
    <LoadingAndErrorWrapper error={error} isLoading={isLoading}>
      <ReviewTemplateForm
        defaultValues={review_template}
        isMutating={isMutating}
        onSubmit={submit}
      />
    </LoadingAndErrorWrapper>
  );
}
