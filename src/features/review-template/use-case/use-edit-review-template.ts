import { usePutMutation } from "@/components/use-cases";
import { REVIEW_TEMPLATE } from "@/config/api";
import { useSWRConfig } from "swr";

export interface UseEditReviewTemplateProps {
  review_template_id: number;
  onSuccess: () => void;
}

export function useEditReviewTemplate({
  review_template_id,
  onSuccess,
}: UseEditReviewTemplateProps) {
  const { mutate } = useSWRConfig();
  return usePutMutation({
    key: review_template_id ? REVIEW_TEMPLATE + `/${review_template_id}` : null,
    name: "Review template",
    config: {
      onSuccess() {
        onSuccess?.();
        mutate((key: string) => key?.includes(REVIEW_TEMPLATE));
      },
    },
  });
}
