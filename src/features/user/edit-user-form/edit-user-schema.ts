import { requireMsg } from "@/lib/utils";
import { any, nativeEnum, object, string } from "zod";
import { GenderEnum } from "../gender";

const edit_user_schema = object({
  name: string({ message: requireMsg("Name") }),
  email: string({ message: requireMsg("Email") }).email(),
  gender: nativeEnum(GenderEnum),
  profile_image: any().optional(),
});

export default edit_user_schema;
