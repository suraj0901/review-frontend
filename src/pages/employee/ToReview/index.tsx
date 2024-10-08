import LoadingAndErrorWrapper from "@/components/LoadingAndErrorWrapper";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import {
  PerformanceReviewListItem,
  PerformanceReviewTable,
  usePerformanceFilter,
  useToReviewPerformanceReviewList,
} from "@/features/performance-review";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

const column: ColumnDef<PerformanceReviewListItem>[] = [
  {
    header: "Sr.No.",
    accessorKey: "sr_no",
  },
  {
    header: "Reviewee",
    accessorKey: "Reviewee",
    cell: (props) => {
      return (
        <div className="flex items-center gap-x-1">
          <img
            src={props.row.original.Reviewee.profile_image}
            alt="Profile Image"
            className="rounded-full w-8 h-8"
          />
          <p className="capitalize">{props.row.original.Reviewee.name}</p>
        </div>
      );
    },
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
  {
    header: "",
    accessorKey: "id",
    cell: (props) => (
      <Link to={(props.getValue() as number).toString()}>
        <Button size="sm">
          <Eye className="mr-1 h-4 w-4" /> View
        </Button>
      </Link>
    ),
  },
];

export default function ToReview() {
  const { serializedFilters } = usePerformanceFilter();
  const { isLoading, list, error, total } =
    useToReviewPerformanceReviewList(serializedFilters);
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
