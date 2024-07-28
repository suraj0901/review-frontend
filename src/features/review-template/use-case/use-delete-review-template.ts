import { useDeleteMutation } from "@/components/use-cases";
import { REVIEW_TEMPLATE } from "@/config/api";
import { useSWRConfig } from "swr";

export function useDeleteReviewTemplate(
  review_template_id: number,
  config: {
    onSuccess: () => void;
  }
) {
  const { mutate } = useSWRConfig();
  return useDeleteMutation({
    key: REVIEW_TEMPLATE + `/${review_template_id}`,
    name: "Review template",
    config: {
      ...config,
      onSuccess() {
        mutate((key: string) => key?.includes?.(REVIEW_TEMPLATE));
        config?.onSuccess?.();
      },
    },
  });
}
