import { Card, CardHeader } from "@/components/ui/card";
import AddPerformance from "./AddPerformance";
import { PerformanceReviewTable } from "@/features/performance-review";

export default function Performance() {
  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <AddPerformance />
      </div>
      <Card>
        <CardHeader>
          <PerformanceReviewTable />
        </CardHeader>
      </Card>
    </div>
  );
}
