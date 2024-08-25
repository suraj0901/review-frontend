import { usePostMutation } from "@/components/use-cases";
import { REVIEW } from "@/config/api";
import { AxiosResponse } from "axios";
import { SWRMutationConfiguration } from "swr/mutation";

export function useAddReview(
  config?: SWRMutationConfiguration<AxiosResponse, AxiosResponse>
) {
  return usePostMutation({
    key: REVIEW,
    name: "Review",
    config,
  });
}
