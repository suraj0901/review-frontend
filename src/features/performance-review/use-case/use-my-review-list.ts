import {
  useDefaultList,
  usePostMutation,
  usePutMutation,
} from "@/components/use-cases";
import { ANSWER, MY_REVIEWS, TO_REVIEWS } from "@/config/api";
import { addSrNo } from "@/lib/utils";
import { ReviewDTO } from "../performance-review-dto";
import { PerformanceReviewListItem } from "./use-performace-review-list";
import { useMemo } from "react";

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

  const review: ReviewDTO = data;
  const answers = useMemo(() => {
    if (!review) return [];
    return review?.Answers?.length > 0
      ? review.Answers
      : review.ReviewTemplate.Questions!.map((item) => ({
          Question: item,
          title: "",
          id: null,
          Feedbacks: [],
        }));
  }, [review]);
  return { review, answers, ...rest };
}

export function useAddAnswerMutation() {
  return usePutMutation({ key: ANSWER, name: "Answer" });
}
