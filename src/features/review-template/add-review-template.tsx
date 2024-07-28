import ReviewTemplateForm from "./review-template-form";
import { useAddReviewTemplate } from "./use-case";

interface AddReviewTemplateFormProps {
  onSuccess: () => void;
}
export function AddReviewTemplateForm({
  onSuccess,
}: AddReviewTemplateFormProps) {
  const { isMutating, submit } = useAddReviewTemplate({
    onSuccess,
  });

  return <ReviewTemplateForm isMutating={isMutating} onSubmit={submit} />;
}
