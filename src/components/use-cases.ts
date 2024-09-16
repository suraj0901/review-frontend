import {
  delete_default,
  get_default,
  post_default,
  put_default,
} from "@/config/api";
import { AxiosResponse } from "axios";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import useSWR from "swr";
import useSWRMutation, { SWRMutationConfiguration } from "swr/mutation";

export function pushToast(
  callback: Promise<AxiosResponse>,
  loading?: string,
  success?: string
) {
  return toast.promise(callback, {
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

export function useDefaultList(key: string, filter?: Record<string, string>) {
  let query = "";
  if (filter) {
    const searchParam = new URLSearchParams(filter);
    query = `?${searchParam.toString()}`;
  }
  const { data, ...rest } = useSWR(key + query, get_default, {
    onError(error) {
      const error_message =
        error?.response?.data?.message ?? error?.message ?? error.toString();
      toast.error(error_message);
    },
  });
  return {
    data: data?.data,
    ...rest,
  };
}

export function usePostMutation({ key, name, config }: MutationProps) {
  const { trigger, ...rest } = useSWRMutation(key, post_default, config);
  async function submit(data: FieldValues) {
    const promise = trigger(data);
    pushToast(promise, `Adding ${name}....`, `Added ${name} successfully`);
    await promise;
  }
  return { submit, ...rest };
}
export function usePutMutation({ key, name, config }: MutationProps) {
  const { trigger, ...rest } = useSWRMutation(key, put_default, config);
  async function submit(data: FieldValues) {
    const promise = trigger(data);
    pushToast(promise, `Upating ${name}....`, `Updated ${name} successfully`);
    return promise;
  }
  return { submit, ...rest };
}
export function useDeleteMutation({ key, config, name }: MutationProps) {
  const { trigger, ...rest } = useSWRMutation(key, delete_default, config);
  async function submit() {
    const promise = trigger();
    pushToast(promise, `Deleting ${name}....`, `Deleted ${name} successfully`);
    return promise;
  }
  return { submit, ...rest };
}
