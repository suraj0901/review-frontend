import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { PerformanceReviewListItem, usePerformanceFilter } from "../use-case";

interface Props {
  list: PerformanceReviewListItem[];
  columns?: ColumnDef<PerformanceReviewListItem>[];
  total: number;
}

export function PerformanceReviewTable({ columns = [], list, total }: Props) {
  const { pagination, updatePagination } = usePerformanceFilter();

  return (
    <DataTable
      columns={columns}
      data={list}
      manualPagination={true}
      state={{ pagination }}
      rowCount={total}
      onPaginationChange={updatePagination}
    />
  );
}
