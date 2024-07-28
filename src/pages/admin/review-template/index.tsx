import { Card, CardHeader } from "@/components/ui/card";
import { ReviewTemplateTable } from "@/features/review-template";
import AddTemplate from "./AddTemplate";
import EditTemplate from "./EditTemplate";

export default function ReviewTemplate() {
  return (
    <main className="space-y-6">
      <div className="w-fit ml-auto">
        <AddTemplate />
      </div>
      <Card>
        <CardHeader>
          <ReviewTemplateTable />
        </CardHeader>
      </Card>
      <EditTemplate />
    </main>
  );
}
