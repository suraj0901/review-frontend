import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { DeleteReview } from "./DeleteReview";
import { PerformanceReviewListItem } from "../use-case";
import EditReview from "./EditReview";

const performance_review_columns: ColumnDef<PerformanceReviewListItem>[] = [
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
    header: "Actions",
    accessorKey: "actions",
    cell: (props) => {
      const review_id = props.row.original.id;

      return (
        <div className="flex items-center gap-2">
          <EditReview review_id={review_id} />
          <DeleteReview review_id={review_id} />
        </div>
      );
    },
  },
];

export default performance_review_columns;
