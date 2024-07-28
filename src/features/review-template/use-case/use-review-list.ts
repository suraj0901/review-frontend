import { REVIEW_TEMPLATE, get_default } from "@/config/api";
import { toast } from "sonner";
import useSWR from "swr";

export function useReviewTemplateList() {
  const { data, ...rest } = useSWR(REVIEW_TEMPLATE, get_default, {
    onError(error) {
      const error_message =
        error?.response?.data?.message ?? error?.message ?? error.toString();
      toast.error(error_message);
    },
  });

  const review_template = data?.data.rows;
  const total = data?.data.total as number;

  return { review_template, total, ...rest };
}
