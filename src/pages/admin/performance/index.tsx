import { Card, CardHeader } from "@/components/ui/card";
import AddPerformance from "./AddPerformance";
import {
  performance_review_action_column,
  performance_review_columns,
  PerformanceReviewTable,
  usePerformanceFilter,
  usePerformanceReviewList,
} from "@/features/performance-review";
import LoadingAndErrorWrapper from "@/components/LoadingAndErrorWrapper";

export default function Performance() {
  const { serializedFilters } = usePerformanceFilter();
  const { isLoading, list, error, total } =
    usePerformanceReviewList(serializedFilters);

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <AddPerformance />
      </div>
      <Card>
        <CardHeader>
          <LoadingAndErrorWrapper isLoading={isLoading} error={error}>
            <PerformanceReviewTable
              list={list}
              total={total}
              columns={performance_review_columns.concat(
                performance_review_action_column
              )}
            />
          </LoadingAndErrorWrapper>
        </CardHeader>
      </Card>
    </div>
  );
}
