import { usePutMutation } from "@/components/use-cases";
import { REVIEW } from "@/config/api";
import { AxiosResponse } from "axios";
import { useSWRConfig } from "swr";
import { SWRMutationConfiguration } from "swr/mutation";

export function useUpdateReview(
  review_id: number,
  config?: SWRMutationConfiguration<AxiosResponse, AxiosResponse>
) {
  const { mutate } = useSWRConfig();
  return usePutMutation({
    key: review_id ? REVIEW + `/${review_id}` : null,
    name: "Review",
    config: {
      ...config,
      onSuccess(...rest) {
        config?.onSuccess?.(...rest);
        mutate((key: string) => key?.includes?.(REVIEW));
      },
    },
  });
}
