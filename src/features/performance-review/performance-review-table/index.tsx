import { DataTable } from "@/components/ui/data-table";
import performance_review_columns from "./column";
import { usePerformanceReviewList } from "../use-case";

export function PerformanceReviewTable() {
  const { performance_review } = usePerformanceReviewList();
  console.log({ performance_review });

  return (
    <>
      <DataTable columns={performance_review_columns} data={[]} />
    </>
  );
}
