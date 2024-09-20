import { ROLE } from "../constant/role";

const AUTHENTICATED_ROUTE_MAP = {
  [ROLE.ADMIN]: "/admin",
  [ROLE.USER]: "/employee",
};

export const AUTHENTICATED_ROUTE = (role: ROLE) =>
  AUTHENTICATED_ROUTE_MAP[role];
export const UNAUTHENTICATED_ROUTE = "/login";
