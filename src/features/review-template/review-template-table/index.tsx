import LoadingAndErrorWrapper from "@/components/LoadingAndErrorWrapper";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import usePagination from "@/lib/usePagination";
import useSearchFilter from "@/lib/useSearchFilter";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2 } from "lucide-react";
import { useReviewTemplateList } from "../use-case";
import DeleteReviewTemplateDialog from "./delete-review-template-dialog";
import { EditReviewTemplateButton } from "./edit-review-template-dialog";

const review_template_column: ColumnDef<unknown, unknown>[] = [
  {
    header: "Title",
    accessorKey: "title",
  },
  {
    header: "Description",
    accessorKey: "description",
    cell: (props) => <>{props.getValue() ?? "---"}</>,
  },
  {
    header: "",
    accessorKey: "id",
    cell: (props) => (
      <div className="flex items-center gap-2">
        {/* <Button size="sm" onClick={() => props.getValue()}>
          <EyeIcon size={15} className="mr-1" /> View
        </Button> */}
        <EditReviewTemplateButton
          review_template_id={props.getValue() as number}
        >
          <Button
            variant="secondary"
            size="sm"
            onClick={() => props.getValue()}
          >
            <Edit size={15} className="mr-1" /> Edit
          </Button>
        </EditReviewTemplateButton>
        <DeleteReviewTemplateDialog
          review_template_id={props.getValue() as number}
        >
          <Button variant="destructive" size="sm">
            <Trash2 size={15} className="mr-1" /> Delete
          </Button>
        </DeleteReviewTemplateDialog>
      </div>
    ),
  },
];

const INITIAL_VALUES = {
  page: "1",
  limit: "10",
};

function useReviewTemplateFilter() {
  const { filter, updateFilter } = useSearchFilter(INITIAL_VALUES);
  const reviewFilter = {
    page: filter.page,
    limit: filter.limit,
  };
  const { pagination, updatePagination } = usePagination(
    reviewFilter,
    updateFilter
  );
  return {
    reviewFilter,
    pagination,
    updatePagination,
  };
}

export function ReviewTemplateTable() {
  const { reviewFilter, pagination, updatePagination } =
    useReviewTemplateFilter();
  const { review_template, total, isLoading, error } =
    useReviewTemplateList(reviewFilter);

  return (
    <LoadingAndErrorWrapper error={error} isLoading={isLoading}>
      <DataTable
        columns={review_template_column}
        data={review_template}
        manualPagination={true}
        rowCount={total}
        state={{ pagination }}
        onPaginationChange={updatePagination}
      />
    </LoadingAndErrorWrapper>
  );
}
