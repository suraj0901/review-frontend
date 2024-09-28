import { usePostMutation, usePutMutation } from "@/components/use-cases";
import { FEEDBACK, TO_REVIEW } from "@/config/api";
import { FieldValues } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useSWRConfig } from "swr";

interface Config {
  onSuccess: () => void;
}

function useRevalidateReview() {
  const { id } = useParams();
  const { mutate } = useSWRConfig();
  return () => mutate(`${TO_REVIEW}/${id}`);
}

export function usePostFeedback(answerId: number, options: Config) {
  const revalidate = useRevalidateReview();
  const { submit, ...rest } = usePostMutation({
    key: FEEDBACK,
    name: "Feedback",
    config: {
      onSuccess() {
        revalidate();
        options?.onSuccess();
      },
    },
  });

  async function submitFeedback(data: FieldValues) {
    await submit({ answerId, ...data });
  }
  return { submitFeedback, ...rest };
}

export function useUpdateFeedback(
  feedbackId: number,
  answerId: number,
  options: Config
) {
  const revalidate = useRevalidateReview();
  const { submit, ...rest } = usePutMutation({
    key: FEEDBACK + `/${feedbackId}`,
    name: "Feedback",
    config: {
      onSuccess() {
        revalidate();
        options?.onSuccess();
      },
    },
  });

  async function submitFeedback(data: FieldValues) {
    await submit({ answerId, ...data });
  }
  return { submitFeedback, ...rest };
}
