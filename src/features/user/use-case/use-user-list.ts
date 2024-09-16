import { GET_USERS, get_default } from "@/config/api";
import { toast } from "sonner";
import useSWR from "swr";
import { UserDTO } from "../user-dto";

export function useUserList(filters?: Record<string, string> | undefined) {
  let searchQuery = "";
  if (filters) {
    const searchParam = new URLSearchParams(filters);
    searchQuery = `?${searchParam.toString()}`;
  }
  const { data, ...rest } = useSWR(GET_USERS + searchQuery, get_default, {
    onError(error) {
      const error_message =
        error?.response?.data?.message ?? error?.message ?? error.toString();
      toast.error(error_message);
    },
  });

  const users = data?.data.rows as UserDTO[];
  const total = data?.data.total as number;

  return { users, total, ...rest };
}
