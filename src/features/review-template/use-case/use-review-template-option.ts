import { useReviewTemplateList } from "./use-review-template-list";

export function useReviewTemplateOptions() {
  const { review_template, ...rest } = useReviewTemplateList({
    select: "title,id",
  });

  const reviewTemplateOptions =
    review_template?.map((review_template) => ({
      label: review_template.title,
      value: review_template.id,
    })) ?? [];

  return { ...rest, reviewTemplateOptions };
}
