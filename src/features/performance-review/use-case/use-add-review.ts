import { usePostMutation } from "@/components/use-cases";
import { REVIEW } from "@/config/api";
import { AxiosResponse } from "axios";
import { useSWRConfig } from "swr";
import { SWRMutationConfiguration } from "swr/mutation";

export function useAddReview(
  config?: SWRMutationConfiguration<AxiosResponse, AxiosResponse>
) {
  const { mutate } = useSWRConfig();
  return usePostMutation({
    key: REVIEW,
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
