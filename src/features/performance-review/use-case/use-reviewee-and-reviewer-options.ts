import { useUserOptions } from "@/features/user";
import { useMemo } from "react";

export function useRevieweeAndReviewerOptions(
  selected_reviewee: string,
  selected_reviewer: string | string[]
) {
  const { userOptions, ...rest } = useUserOptions();

  const reviewerOptions = useMemo(
    () =>
      userOptions
        .filter((reviewee) => reviewee.value !== selected_reviewee)
        .map((item) => ({
          ...item,
          name: item.label,
        })),
    [selected_reviewee, userOptions]
  );

  const revieweeOptions = useMemo(
    () =>
      userOptions.filter((reviewee) => {
        if (Array.isArray(selected_reviewer))
          return !selected_reviewer.includes(reviewee.value);
        return reviewee.value !== selected_reviewer;
      }),
    [selected_reviewer, userOptions]
  );
  return { ...rest, reviewerOptions, revieweeOptions };
}
