import { useDefaultList, usePostMutation } from "@/components/use-cases";
import { ANSWER, MY_REVIEWS, TO_REVIEWS } from "@/config/api";
import { addSrNo } from "@/lib/utils";
import { ReviewDTO } from "../performance-review-dto";
import { PerformanceReviewListItem } from "./use-performace-review-list";

export function useMyPerformanceReviewList(filters: Record<string, unknown>) {
  const { data, ...rest } = useDefaultList(MY_REVIEWS, {
    ...filters,
    populate: "ReviewTemplate",
  });
  const performance_review: PerformanceReviewListItem[] = data?.rows ?? [];
  const total = data?.count as number;
  const list = addSrNo(performance_review);
  return { list, total, ...rest };
}

export function useToReviewPerformanceReviewList(
  filters: Record<string, unknown>
) {
  const { data, ...rest } = useDefaultList(TO_REVIEWS, {
    ...filters,
    populate: "ReviewTemplate,Reviewee",
  });
  const performance_review: PerformanceReviewListItem[] = data?.rows ?? [];
  const total = data?.count as number;
  const list = addSrNo(performance_review);
  return { list, total, ...rest };
}

export function useGetPerformanceReviewById(
  type: string,
  id: string | undefined
) {
  const { data, ...rest } = useDefaultList(id ? type + `/${id}` : null);
  return { review: data as ReviewDTO, ...rest };
}

export function useAddAnswerMutation() {
  return usePostMutation({ key: ANSWER, name: "Answer" });
}
