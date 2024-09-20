import LoadingAndErrorWrapper from "@/components/LoadingAndErrorWrapper";
import { Card, CardHeader } from "@/components/ui/card";
import {
  PerformanceReviewListItem,
  PerformanceReviewTable,
  useMyPerformanceReviewList,
  usePerformanceFilter,
} from "@/features/performance-review";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

const column: ColumnDef<PerformanceReviewListItem>[] = [
  {
    header: "Sr.No.",
    accessorKey: "sr_no",
  },
  {
    header: "Start Date",
    accessorKey: "start_date",
    cell: (props) => format(props.getValue() as string, "dd MMM yyyy"),
  },
  {
    header: "End Date",
    accessorKey: "end_date",
    cell: (props) => format(props.getValue() as string, "dd MMM yyyy"),
  },
  {
    header: "Template",
    accessorKey: "ReviewTemplate.title",
  },
];

export default function MyReview() {
  const { serializedFilters } = usePerformanceFilter();
  const { isLoading, list, error, total } =
    useMyPerformanceReviewList(serializedFilters);
  return (
    <Card>
      <CardHeader>
        <LoadingAndErrorWrapper isLoading={isLoading} error={error}>
          <PerformanceReviewTable list={list} total={total} columns={column} />
        </LoadingAndErrorWrapper>
      </CardHeader>
    </Card>
  );
}
