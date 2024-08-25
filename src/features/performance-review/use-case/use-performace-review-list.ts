import { useDefaultList } from "@/components/use-cases";
import { GET_PERFORMANCE_REVIEW } from "@/config/api";

const filter = {
  populate: "Reviewers",
};
export function usePerformanceReviewList() {
  const { data, ...rest } = useDefaultList(GET_PERFORMANCE_REVIEW, filter);
  const performance_review = data?.rows;
  const total = data?.total as number;

  return { performance_review, total, ...rest };
}
