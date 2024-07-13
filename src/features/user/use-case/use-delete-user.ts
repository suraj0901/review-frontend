import { delete_default, GET_USERS } from "@/config/api";
import { toast } from "sonner";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";

export function useDeleteUser(
  user_id: number,
  options?: { onSuccess?: () => void }
) {
  const { mutate } = useSWRConfig();
  const { trigger, ...rest } = useSWRMutation(
    user_id ? GET_USERS + `/${user_id}` : null,
    delete_default,
    {
      ...options,
      onSuccess() {
        mutate(GET_USERS);
        options?.onSuccess?.();
      },
    }
  );

  function deleteUser() {
    toast.promise(trigger(), {
      loading: "Deleting User...",
      success: (response) =>
        response.data.message ?? "Deleted user successfully",
      error: (error) =>
        error?.response?.data?.message ?? error?.message ?? error.toString(),
    });
  }

  return { deleteUser, ...rest };
}
