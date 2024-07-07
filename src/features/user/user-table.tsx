import LoadingAndErrorWrapper from "@/components/LoadingAndErrorWrapper";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Edit, Trash2 } from "lucide-react";
import { useUserList } from "./use-case";

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
    header: "",
    accessorKey: "action",
    cell: () => (
      <div className="flex items-center gap-x-2">
        <Button variant="secondary">
          <Edit size={15} className="mr-2" /> Edit
        </Button>

        <Button variant="destructive">
          <Trash2 size={15} className="mr-2" /> Delete
        </Button>
      </div>
    ),
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
