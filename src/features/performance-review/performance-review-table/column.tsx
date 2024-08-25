import { ColumnDef } from "@tanstack/react-table";
import { parse } from "date-fns";

interface RowData {
  srNo: number;
}

const performance_review_columns: ColumnDef<RowData>[] = [
  {
    header: "Sr.No.",
    accessorKey: "srNo",
  },
  {
    header: "Start Date",
    accessorKey: "start_date",
    cell: (props) =>
      parse(
        props.getValue() as string,
        "DD/MM/YYYY",
        new Date()
      ).toDateString(),
  },
  {
    header: "End Date",
    accessorKey: "end_date",
  },
  {
    header: "Reviewee",
    accessorKey: "reviewee",
  },
  {
    header: "Actions",
    accessorKey: "actions",
  },
];

export default performance_review_columns;
