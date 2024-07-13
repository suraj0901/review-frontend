import { GenderEnum } from "./gender";

export interface UserDTO {
  id: number;
  name: string;
  email: string;
  gender: GenderEnum;
  profile_image?: string;
  role: string;
}
