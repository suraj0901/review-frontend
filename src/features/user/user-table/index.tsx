import LoadingAndErrorWrapper from "@/components/LoadingAndErrorWrapper";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Gender } from "../gender";
import { useUserList } from "../use-case";
import { CheckCircle, Edit, Trash2, XCircle } from "lucide-react";
import { DeleteUserDialog } from "../delete-user-dialog";
import { EditUser } from "./EditUser";
import { ColumnDef } from "@tanstack/react-table";
import { UserDTO } from "../user-dto";

const EMAIL_VERIFICATION_STATUS = {
  true: (
    <span className="text-green-100 bg-green-600/20 flex items-center gap-1 w-fit px-2 py-1 rounded font-semibold uppercase text-xs tracking-wider">
      <CheckCircle className="w-4 h-4 mr-1" />
      Verified
    </span>
  ),
  false: (
    <span className="text-red-100  bg-red-600/20 flex items-center gap-1 w-fit px-2 py-1 rounded font-semibold uppercase text-xs tracking-wider">
      <XCircle className="w-4 h-4" />
      Not Verified
    </span>
  ),
};

const columns: ColumnDef<UserDTO>[] = [
  {
    header: "Name",
    accessorKey: "name",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cell: (prop: any) => {
      return (
        <div className="flex items-center gap-x-1">
          <img
            src={prop.row.original.profile_image}
            alt="Profile Image"
            className="rounded-full w-8 h-8"
          />
          <p className="capitalize">{prop.getValue()}</p>
        </div>
      );
    },
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
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Verification Status",
    accessorKey: "isEmailVerified",
    cell(props) {
      return EMAIL_VERIFICATION_STATUS[
        props.row.original.isEmailVerified ? "true" : "false"
      ];
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
            <Button variant="secondary" size="sm">
              <Edit size={15} className="mr-2" /> Edit
            </Button>
          </EditUser>
          <DeleteUserDialog user_id={props?.row?.original?.id}>
            <Button variant="destructive" size="sm">
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
