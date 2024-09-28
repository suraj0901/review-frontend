import { usePutMutation } from "@/components/use-cases";
import { GET_USERS, PROFILE, put_default } from "@/config/api";
import { AxiosResponse } from "axios";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";

export function useEditUser(
  user_id: number,
  options: { onSuccess?: (value?: AxiosResponse) => void }
) {
  const { mutate } = useSWRConfig();
  const { trigger, ...rest } = useSWRMutation(
    user_id ? GET_USERS + `/${user_id}` : null,
    put_default,
    {
      ...options,
      onSuccess(data) {
        mutate(GET_USERS);
        options?.onSuccess?.(data);
      },
    }
  );

  function updateUser(data: FieldValues) {
    toast.promise(trigger(data), {
      loading: "Updating User...",
      success: (response) =>
        response.data.message ?? "Updated user successfully",
      error: (error) =>
        error?.response?.data?.message ?? error?.message ?? error.toString(),
    });
  }

  return { updateUser, ...rest };
}

export function useUpdateProfile(onSuccess: () => void) {
  return usePutMutation({
    key: PROFILE,
    name: "Profile",
    config: { onSuccess },
  });
}
