import { object, string } from "zod";
import validator from "validator";
import { requireMsg } from "@/lib/utils";

const user_login_schema = object({
  email: string({ message: requireMsg("Email") }).email(),
  password: string({ message: requireMsg("Password") }).refine(
    (value) => validator.isStrongPassword(value),
    {
      message: "Please provide an strong password",
    }
  ),
});

export default user_login_schema;
