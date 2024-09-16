import { DataTable } from "@/components/ui/data-table";
import performance_review_columns from "./column";
import { usePerformanceReviewList } from "../use-case";
import LoadingAndErrorWrapper from "@/components/LoadingAndErrorWrapper";
import { useQueryFilter } from "@/lib/useSearchFilter";
import usePagination from "@/lib/usePagination";

export function PerformanceReviewTable() {
  const { filters, serializedFilters, updateFilters } = useQueryFilter(
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
  const { isLoading, list, error, total } =
    usePerformanceReviewList(serializedFilters);

  const { pagination, updatePagination } = usePagination(
    filters,
    updateFilters
  );

  return (
    <LoadingAndErrorWrapper isLoading={isLoading} error={error}>
      <DataTable
        columns={performance_review_columns}
        data={list}
        manualPagination={true}
        state={{
          pagination,
        }}
        rowCount={total}
        onPaginationChange={updatePagination}
      />
    </LoadingAndErrorWrapper>
  );
}
