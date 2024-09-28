import LoadingAndErrorWrapper from "@/components/LoadingAndErrorWrapper";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useUserStore } from "@/features/user";
import { Edit, PlusCircle } from "lucide-react";
import { useState } from "react";
import { Feedback } from "../performance-review-dto";
import { usePostFeedback, useUpdateFeedback } from "../use-case";
import { FeedbackForm } from "./feedback-form";

interface Props {
  feedbacks: Feedback[];
  answerId: number;
}
export function FeedbackList({ feedbacks, answerId }: Props) {
  const [user] = useUserStore();
  const hasCurrentUserFeedbak = feedbacks.some(
    (feedback) => feedback.User?.id === user?.id
  );
  return (
    <>
      {feedbacks.map((feedback) => (
        <FeedbackItem
          key={feedback?.id}
          answerId={answerId}
          feedback={feedback}
        />
      ))}
      {!hasCurrentUserFeedbak && <AddFeedback answerId={answerId} />}
    </>
  );
}

interface FeedbackItemProps {
  answerId: number;
  feedback: Feedback;
}

export function FeedbackItem({ feedback, answerId }: FeedbackItemProps) {
  const [user] = useUserStore();
  const [showForm, setShowForm] = useState(false);
  const canEdit = user?.id === feedback.User?.id;
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6">
              <AvatarImage
                src={
                  feedback.User?.profile_image ??
                  `https://avatar.iran.liara.run/username?username=${feedback.User?.name}`
                }
              />
            </Avatar>
            <span className="text-sm">{feedback.User?.name}</span>
          </div>
          {canEdit && (
            <Button
              size="icon"
              variant="secondary"
              onClick={() => setShowForm(true)}
            >
              <Edit className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {showForm ? (
          <UpdateFeedbackForm
            defaultValues={feedback}
            answerId={answerId}
            onReset={() => setShowForm(false)}
          />
        ) : (
          <h1>{feedback.title}</h1>
        )}
      </CardContent>
    </Card>
  );
}

function AddFeedback({ answerId }: { answerId: number }) {
  const [showForm, setShowForm] = useState(false);
  if (!showForm)
    return (
      <Button className="w-fit" onClick={() => setShowForm(true)}>
        <PlusCircle className="mr-1 w-4 h-4" />
        Add Feedback
      </Button>
    );
  return (
    <AddFeedbackForm onReset={() => setShowForm(false)} answerId={answerId} />
  );
}

interface UpdateFeedbackFormProps {
  onReset: () => void;
  answerId: number;
  defaultValues: Feedback;
}

function UpdateFeedbackForm({
  defaultValues,
  onReset,
  answerId,
}: UpdateFeedbackFormProps) {
  const { submitFeedback, isMutating } = useUpdateFeedback(
    defaultValues.id,
    answerId,
    {
      onSuccess: onReset,
    }
  );
  return (
    <LoadingAndErrorWrapper isLoading={isMutating}>
      <FeedbackForm
        defaultValues={defaultValues}
        onReset={onReset}
        onSubmit={submitFeedback}
      />
    </LoadingAndErrorWrapper>
  );
}

interface AddFeedbackFormProps {
  onReset: () => void;
  answerId: number;
}

function AddFeedbackForm({ onReset, answerId }: AddFeedbackFormProps) {
  const { submitFeedback, isMutating } = usePostFeedback(answerId, {
    onSuccess: onReset,
  });
  return (
    <LoadingAndErrorWrapper isLoading={isMutating}>
      <FeedbackForm onReset={onReset} onSubmit={submitFeedback} />
    </LoadingAndErrorWrapper>
  );
}
