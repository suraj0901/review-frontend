import { GET_USERS, get_default } from "@/config/api";
import { toast } from "sonner";
import useSWR from "swr";
import { UserDTO } from "../user-dto";
import { useUserStore } from "../user-store";

export function useUserList() {
  const [user] = useUserStore();
  const { data, ...rest } = useSWR(GET_USERS, get_default, {
    onError(error) {
      const error_message =
        error?.response?.data?.message ?? error?.message ?? error.toString();
      toast.error(error_message);
    },
  });

  const users = data?.data.rows?.filter(
    (row: UserDTO) => row.id !== user?.id
  ) as UserDTO[];
  const total = data?.data.total as number;

  return { users, total, ...rest };
}
