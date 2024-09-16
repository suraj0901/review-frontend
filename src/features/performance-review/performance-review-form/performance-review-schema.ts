import { requireMsg } from "@/lib/utils";
import { array, date, infer, object, string } from "zod";

const add_performance_review_schema = object({
  start_date: date({ message: requireMsg("Start date") }),
  end_date: date({ message: requireMsg("End date") }),
  reviewee: string({ message: requireMsg("Reviewee") }),
  reviewer: array(string({ message: requireMsg("Reviewer") })),
  review_template_id: string({ message: requireMsg("Review Template") }),
});

export default add_performance_review_schema;

export type PerformanceReviewSchema =
  typeof add_performance_review_schema._output;
