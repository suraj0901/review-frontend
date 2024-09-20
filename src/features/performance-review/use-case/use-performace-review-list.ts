import { useDefaultList } from "@/components/use-cases";
import { GET_PERFORMANCE_REVIEW } from "@/config/api";
import usePagination from "@/lib/usePagination";
import { useQueryFilter } from "@/lib/useSearchFilter";
import { addSrNo } from "@/lib/utils";
export interface PerformanceReviewListItem {
  id: number;
  sr_no: number;
  Reviewee: {
    profile_image: string;
    name: string;
  };
}
export function usePerformanceFilter() {
  const filters = useQueryFilter(
    {
      page: "1",
      limit: "10",
    },
    {
      serialize(value) {
        return value;
      },
      deserialize(value) {
        return value;
      },
    }
  );
  const { pagination, updatePagination } = usePagination(
    filters.filters,
    filters.updateFilters
  );
  return { pagination, updatePagination, ...filters };
}

export function usePerformanceReviewList(filters: Record<string, unknown>) {
  const { data, ...rest } = useDefaultList(GET_PERFORMANCE_REVIEW, {
    ...filters,
    populate: "Reviewee,ReviewTemplate",
  });
  const performance_review: PerformanceReviewListItem[] = data?.rows ?? [];
  const total = data?.count as number;
  const list = addSrNo(performance_review);
  return { list, total, ...rest };
}
