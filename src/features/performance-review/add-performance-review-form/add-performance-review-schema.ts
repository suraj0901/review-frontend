import { requireMsg } from "@/lib/utils";
import { date, number, object } from "zod";

const add_performance_review_schema = object({
  start_date: date({ message: requireMsg("Start date") }),
  end_date: date({ message: requireMsg("End date") }),
  reviewee: number({ message: requireMsg("Reviewee") }),
  reviewer: number({ message: requireMsg("Reviewer") }),
  review_template_id: number({ message: requireMsg("Review Template") }),
});

export default add_performance_review_schema;
