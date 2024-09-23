import { get_default, REVIEW } from "@/config/api";
import useSWR from "swr";
import { Review } from "../performance-review-dto";

export function useGetReviewById(review_id: number) {
  const searchParams = new URLSearchParams({ populate: "Reviewers,Reviewee" });
  const { data, ...rest } = useSWR(
    review_id ? REVIEW + `/${review_id}` + `?${searchParams.toString()}` : null,
    get_default
  );
  const review: Review | null = data?.data;
  return { review, ...rest };
}
