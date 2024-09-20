import { ROLE } from "@/config/constant/role";
import { GenderEnum } from "./gender";

export interface UserDTO {
  id: number;
  name: string;
  email: string;
  gender: GenderEnum;
  profile_image?: string;
  role: ROLE;
  isEmailVerified: boolean;
}
