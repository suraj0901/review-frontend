import LoadingAndErrorWrapper from "@/components/LoadingAndErrorWrapper";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { CellContext } from "@tanstack/react-table";
import { Edit, Trash2 } from "lucide-react";
import DeleteReviewTemplateDialog from "./delete-review-template-dialog";
import { useReviewTemplateList } from "../use-case";
import { EditReviewTemplateButton } from "./edit-review-template-dialog";

interface ColumnsType {
  header: string;
  accessorKey: string;
  cell?: (props: CellContext<never, never>) => React.ReactNode;
}

const review_template_column: ColumnsType[] = [
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
        <EditReviewTemplateButton review_template_id={props.getValue()}>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => props.getValue()}
          >
            <Edit size={15} className="mr-1" /> Edit
          </Button>
        </EditReviewTemplateButton>
        <DeleteReviewTemplateDialog review_template_id={props.getValue()}>
          <Button variant="destructive" size="sm">
            <Trash2 size={15} className="mr-1" /> Delete
          </Button>
        </DeleteReviewTemplateDialog>
      </div>
    ),
  },
];

export function ReviewTemplateTable() {
  const { review_template, isLoading, error } = useReviewTemplateList();
  return (
    <LoadingAndErrorWrapper error={error} isLoading={isLoading}>
      <DataTable columns={review_template_column} data={review_template} />
    </LoadingAndErrorWrapper>
  );
}
