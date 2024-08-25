import { REVIEW_TEMPLATE, get_default } from "@/config/api";
import { toast } from "sonner";
import useSWR from "swr";
import { ReviewTemplate } from "./use-get-review-template-by-id";

interface Filter {
  [k: string]: string;
}

export function useReviewTemplateList(filter: Filter) {
  const searchQuery = new URLSearchParams(filter);
  const { data, ...rest } = useSWR(
    REVIEW_TEMPLATE + `?${searchQuery.toString()}`,
    get_default,
    {
      onError(error) {
        const error_message =
          error?.response?.data?.message ?? error?.message ?? error.toString();
        toast.error(error_message);
      },
    }
  );

  const review_template = data?.data.rows as ReviewTemplate[];
  const total = data?.data.count as number;

  return { review_template, total, ...rest };
}
