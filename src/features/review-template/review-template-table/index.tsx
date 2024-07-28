import LoadingAndErrorWrapper from "@/components/LoadingAndErrorWrapper";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
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
  limit: "2",
};

export function ReviewTemplateTable() {
  const { filter, updateFilter } = useSearchFilter(INITIAL_VALUES);
  const { review_template, total, isLoading, error } =
    useReviewTemplateList(filter);

  return (
    <LoadingAndErrorWrapper error={error} isLoading={isLoading}>
      <DataTable
        columns={review_template_column}
        data={review_template}
        rowCount={total}
        initialState={{
          pagination: {
            pageIndex: +filter.page - 1,
            pageSize: +filter.limit,
          },
        }}
        manualPagination={true}
        onPaginationChange={(table) => {
          const { pageIndex, pageSize } = table({
            pageIndex: +filter.page,
            pageSize: +filter.limit,
          });
          updateFilter({
            page: pageIndex + "",
            limit: pageSize + "",
          });
        }}

        // on={(page) => updateFilter({ page: page + "" })}
      />
    </LoadingAndErrorWrapper>
  );
}
