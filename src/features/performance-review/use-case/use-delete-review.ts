import { useDeleteMutation } from "@/components/use-cases";
import { REVIEW } from "@/config/api";
import { AxiosResponse } from "axios";
import { SWRMutationConfiguration } from "swr/mutation";

export function useDeleteReview(
  review_id: number,
  config?: SWRMutationConfiguration<AxiosResponse, AxiosResponse>
) {
  return useDeleteMutation({
    key: review_id ? REVIEW + `/${review_id}` : null,
    name: "Review",
    config,
  });
}
