import { requireMsg } from "@/lib/utils";
import { nativeEnum, object, string } from "zod";
import { GenderEnum } from "../gender";

const add_user_schema = object({
  name: string({ message: requireMsg("Name") }),
  email: string({ message: requireMsg("Email") }).email(),
  gender: nativeEnum(GenderEnum),
});

export default add_user_schema;
