import { pushToast } from "@/components/use-cases";
import { FORGOT_PASSWORD, post_default } from "@/config/api";
import { AxiosResponse } from "axios";
import { FieldValues } from "react-hook-form";
import useSWRMutation, { SWRMutationConfiguration } from "swr/mutation";

export function useSendForgotEmail(
  config?: SWRMutationConfiguration<AxiosResponse, AxiosResponse>
) {
  const { trigger, ...rest } = useSWRMutation(
    FORGOT_PASSWORD,
    post_default,
    config
  );

  async function submit(data: FieldValues) {
    const promise = trigger(data);
    pushToast(promise, `Sending email....`, `Email sent successfully`);
    await promise;
  }
  return { submit, ...rest };
}
