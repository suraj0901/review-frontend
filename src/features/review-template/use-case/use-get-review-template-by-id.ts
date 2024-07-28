import { get_default, REVIEW_TEMPLATE } from "@/config/api";
import useSWR from "swr";

interface Question {
  title: string;
  id: number;
}

export interface ReviewTemplate {
  title: string;
  description: string;
  questions: Question[];
}

export default function useGetReviewTemplateById(review_template_id: number) {
  const query = new URLSearchParams({ populate: "Questions" });
  const { data, ...rest } = useSWR(
    review_template_id
      ? REVIEW_TEMPLATE + `/${review_template_id}?${query.toString()}`
      : null,
    get_default
  );
  const review_template_dto = data?.data;

  const review_template: ReviewTemplate = {
    title: review_template_dto?.title,
    description: review_template_dto?.description,
    questions: review_template_dto?.Questions?.map((item: Question) => ({
      id: item.id,
      title: item.title,
    })),
  };
  return { review_template, ...rest };
}
