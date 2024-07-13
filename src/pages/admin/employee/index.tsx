import { UserTable } from "@/features/user";
import AddUser from "./AddUser";
import { Card, CardHeader } from "@/components/ui/card";

export default function Employee() {
  return (
    <main className="space-y-4">
      <div className="flex justify-end p-1">
        <AddUser />
      </div>
      <Card>
        <CardHeader>
          <UserTable />
        </CardHeader>
      </Card>
    </main>
  );
}
