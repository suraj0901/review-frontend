import { delete_default, post_default, put_default } from "@/config/api";
import { AxiosResponse } from "axios";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import useSWRMutation, { SWRMutationConfiguration } from "swr/mutation";

export async function pushToast(
  callback: Promise<AxiosResponse>,
  loading?: string,
  success?: string
) {
  toast.promise(callback, {
    loading,
    success: (response) => success ?? response.data.message,
    error: (error) =>
      error?.response?.data?.message ?? error?.message ?? error.toString(),
  });
}

export interface MutationProps {
  key: string | null;
  name?: string;
  config?: SWRMutationConfiguration<AxiosResponse, AxiosResponse>;
}

export function usePostMutation({ key, name, config }: MutationProps) {
  const { trigger, ...rest } = useSWRMutation(key, post_default, config);
  function submit(data: FieldValues) {
    pushToast(
      trigger(data),
      `Adding ${name}....`,
      `Added ${name} successfully`
    );
  }
  return { submit, ...rest };
}
export function usePutMutation({ key, name, config }: MutationProps) {
  const { trigger, ...rest } = useSWRMutation(key, put_default, config);
  function submit(data: FieldValues) {
    pushToast(
      trigger(data),
      `Upating ${name}....`,
      `Updated ${name} successfully`
    );
  }
  return { submit, ...rest };
}
export function useDeleteMutation({ key, config, name }: MutationProps) {
  const { trigger, ...rest } = useSWRMutation(key, delete_default, config);
  function submit() {
    return pushToast(
      trigger(),
      `Deleting ${name}....`,
      `Deleted ${name} successfully`
    );
  }
  return { submit, ...rest };
}
