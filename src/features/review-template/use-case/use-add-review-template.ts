import { usePostMutation } from "@/components/use-cases";
import { REVIEW_TEMPLATE } from "@/config/api";
import { AxiosResponse } from "axios";
import { useSWRConfig } from "swr";

export interface AddReviewTemplateProps {
  onSuccess: (data: AxiosResponse<unknown, unknown>) => void;
}

export function useAddReviewTemplate(options: AddReviewTemplateProps) {
  const { mutate } = useSWRConfig();
  return usePostMutation({
    key: REVIEW_TEMPLATE,
    name: "Review template",
    config: {
      ...options,
      onSuccess(data) {
        mutate((key: string) => key?.includes?.(REVIEW_TEMPLATE));
        options?.onSuccess?.(data);
      },
    },
  });
}
