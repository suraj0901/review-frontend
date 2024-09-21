import { useDefaultList } from "@/components/use-cases";
import { PerformanceReviewListItem } from "./use-performace-review-list";
import { addSrNo } from "@/lib/utils";
import { MY_REVIEW, TO_REVIEW } from "@/config/api";

export function useMyPerformanceReviewList(filters: Record<string, unknown>) {
  const { data, ...rest } = useDefaultList(MY_REVIEW, {
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
  const { data, ...rest } = useDefaultList(TO_REVIEW, {
    ...filters,
    populate: "ReviewTemplate,Reviewee",
  });
  const performance_review: PerformanceReviewListItem[] = data?.rows ?? [];
  const total = data?.count as number;
  const list = addSrNo(performance_review);
  return { list, total, ...rest };
}
