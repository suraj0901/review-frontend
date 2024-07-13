import { GET_USERS, post_default } from "@/config/api";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";

export function useAddUser(options: { onSuccess?: () => void }) {
  const { trigger, ...rest } = useSWRMutation(GET_USERS, post_default, options);

  function addUser(data: FieldValues) {
    toast.promise(trigger(data), {
      loading: "Adding User...",
      success: (response) => response.data.message ?? "User added successfully",
      error: (error) =>
        error?.response?.data?.message ?? error?.message ?? error.toString(),
    });
  }

  return { addUser, ...rest };
}
