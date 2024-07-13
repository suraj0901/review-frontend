import LoadingAndErrorWrapper from "@/components/LoadingAndErrorWrapper";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Gender } from "../gender";
import { useUserList } from "../use-case";
import { Edit, Trash2 } from "lucide-react";
import { DeleteUserDialog } from "../delete-user-dialog";
import { EditUser } from "./EditUser";

const columns = [
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Gender",
    accessorKey: "gender",
    cell: (row: unknown) => {
      const gender_value = (
        row as { getValue: () => string }
      )?.getValue() as keyof typeof Gender;
      return <>{Gender[gender_value]}</>;
    },
  },
  {
    header: "",
    accessorKey: "action",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cell: (props: any) => {
      return (
        <div className="flex items-center gap-x-2">
          <EditUser user={props?.row?.original}>
            <Button variant="secondary">
              <Edit size={15} className="mr-2" /> Edit
            </Button>
          </EditUser>
          <DeleteUserDialog user_id={props?.row?.original?.id}>
            <Button variant="destructive">
              <Trash2 size={15} className="mr-2" /> Delete
            </Button>
          </DeleteUserDialog>
        </div>
      );
    },
  },
];

export function UserTable() {
  const { users, error, isLoading } = useUserList();

  return (
    <LoadingAndErrorWrapper error={error} isLoading={isLoading}>
      <DataTable columns={columns} data={users} />
    </LoadingAndErrorWrapper>
  );
}
