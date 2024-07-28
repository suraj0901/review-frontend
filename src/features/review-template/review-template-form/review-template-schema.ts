import { requireMsg } from "@/lib/utils";
import { number, object, string } from "zod";

const reviewTemplateSchema = object({
  title: string({ message: requireMsg("Title") }),
  description: string({ message: requireMsg("Description") }),
  questions: object(
    {
      id: number({ message: requireMsg("Id") }).optional(),
      title: string({ message: requireMsg("Question") }),
    },
    { message: requireMsg("Question") }
  ).array(),
});

export default reviewTemplateSchema;
