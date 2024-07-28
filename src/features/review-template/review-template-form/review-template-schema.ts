import { requireMsg } from "@/lib/utils";
import { number, object, string } from "zod";

const reviewTemplateSchema = object({
  title: string({ message: requireMsg("Title") }),
  description: string({ message: requireMsg("Description") }),
  questions: object(
    {
      id: number({ message: requireMsg("Id") })
        .optional()
        .nullable(),
      title: string({ message: requireMsg("Question") }),
    },
    { message: "Atleast one question is required" }
  ).array(),
  delete_questions_id: number().array().optional(),
});

export default reviewTemplateSchema;
