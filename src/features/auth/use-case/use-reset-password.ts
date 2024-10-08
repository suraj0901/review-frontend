import { pushToast } from "@/components/use-cases";
import { post_default, RESET_PASSWORD } from "@/config/api";
import { AxiosResponse } from "axios";
import { FieldValues } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import useSWRMutation, { SWRMutationConfiguration } from "swr/mutation";

export function useResetPassword(
  config?: SWRMutationConfiguration<AxiosResponse, AxiosResponse>
) {
  const [searchParams] = useSearchParams();
  const { trigger, ...rest } = useSWRMutation(
    RESET_PASSWORD + `?${searchParams.toString()}`,
    post_default,
    config
  );

  async function submit(data: FieldValues) {
    const promise = trigger({
      password: data.password,
    });
    pushToast(promise, `Resetting password....`, `Password reset successfully`);
    await promise;
  }
  return { submit, ...rest };
}
