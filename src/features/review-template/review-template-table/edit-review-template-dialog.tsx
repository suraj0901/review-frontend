import { cloneElement, PropsWithChildren } from "react";
import { useSearchParams } from "react-router-dom";

interface EditReviewTemplateButtonProps extends PropsWithChildren {
  review_template_id: number;
}
export function EditReviewTemplateButton({
  review_template_id,
  children,
}: EditReviewTemplateButtonProps) {
  const { openEditReview } = useEditReviewControl();

  return cloneElement(children, {
    onClick: () => openEditReview(review_template_id),
  });
}

export function useEditReviewControl() {
  const [searchParams, setSearchParams] = useSearchParams();
  const isOpen = searchParams.has("edit");
  const review_template_id = searchParams.get("edit");

  function openEditReview(review_template_id: number) {
    searchParams.set("edit", review_template_id + "");
    setSearchParams(searchParams);
  }

  function closeEditReview() {
    window.history.back();
  }
  return { isOpen, review_template_id, openEditReview, closeEditReview };
}
