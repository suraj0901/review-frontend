import { GET_USERS, get_default } from "@/config/api";
import { toast } from "sonner";
import useSWR from "swr";

export function usePerformanceReviewList() {
  const { data, ...rest } = useSWR(GET_USERS, get_default, {
    onError(error) {
      const error_message =
        error?.response?.data?.message ?? error?.message ?? error.toString();
      toast.error(error_message);
    },
  });

  const performance_review = data?.data.rows;
  const total = data?.data.total as number;

  return { performance_review, total, ...rest };
}
