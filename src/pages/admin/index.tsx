import { Card, CardHeader } from "@/components/ui/card";
import { UserTable } from "@/features/user";

export default function Home() {
  return (
    <main className="space-y-4">
      <Card>
        <CardHeader>
          <UserTable />
        </CardHeader>
      </Card>
      {/* <UserList onTap={console.log} /> */}
    </main>
  );
}
