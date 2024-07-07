import { requireMsg } from "@/lib/utils";
import validator from "validator";
import { object, string } from "zod";

const user_register_schema = object({
  name: string({ message: requireMsg("Name") }),
  email: string({ message: requireMsg("Email") }).email(),
  password: string({ message: requireMsg("Password") }).refine(
    (value) => validator.isStrongPassword(value),
    {
      message: "Please provide an strong password",
    }
  ),
});

export default user_register_schema;
