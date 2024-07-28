import { usePostMutation } from "@/components/use-cases";
import { REVIEW_TEMPLATE } from "@/config/api";

export interface UseAddReviewTemplateProps {
  onSuccess: () => void;
}

export function useAddReviewTemplate(options: UseAddReviewTemplateProps) {
  return usePostMutation({
    key: REVIEW_TEMPLATE,
    name: "Review template",
    config: options,
  });
}
