import LoadingAndErrorWrapper from "@/components/LoadingAndErrorWrapper";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { FormField } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  QuestionDTO,
  useAddAnswerMutation,
  useGetPerformanceReviewById,
  User,
} from "@/features/performance-review";
import { CheckCircle, ChevronLeft } from "lucide-react";
import { title } from "process";
import { useRef } from "react";
import { FieldValues, useFieldArray, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

interface Props {
  type: string;
}
export default function FeedbackForm({ type }: Props) {
  const { id } = useParams();
  const ref = useRef<HTMLButtonElement>(null);
  const { review, error, isLoading } = useGetPerformanceReviewById(type, id);
  const { submit, isMutating } = useAddAnswerMutation();
  const questions =
    review?.ReviewTemplate?.Questions?.map((item) => ({
      ...item,
      answer: review?.Answers?.find((answer) => answer.QuestionId === item.id)
        ?.title,
    })) ?? [];

  return (
    <LoadingAndErrorWrapper error={error} isLoading={isLoading}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <BackButton />
          <Button disabled={isMutating} onClick={() => ref.current?.click()}>
            <CheckCircle className="mr-1 w-4 h-4" /> Save
          </Button>
        </div>
        <div className="flex items-start gap-4">
          <QuestionsList
            element={ref}
            onSubmit={submit}
            defaultValues={{ questions, reviewId: review?.id }}
          />
          <div className="shrink-0 max-w-sm w-full space-y-4">
            <RevieweeeInfo reviewee={review?.Reviewee} />
            <ReviewersInfo reviewers={review?.Reviewers} />
          </div>
        </div>
      </div>
    </LoadingAndErrorWrapper>
  );
}

function BackButton() {
  const dispatch = useNavigate();
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={() => dispatch(-1)}
          size="icon"
          variant="secondary"
          className="rounded-full"
        >
          <ChevronLeft />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Back</p>
      </TooltipContent>
    </Tooltip>
  );
}

function RevieweeeInfo({ reviewee }: { reviewee?: User }) {
  return (
    <Card>
      <CardHeader>Reviewee</CardHeader>
      <CardContent className="flex items-center gap-4">
        <Avatar>
          <AvatarImage
            src={
              reviewee?.profile_image ??
              `https://avatar.iran.liara.run/username?username=${reviewee?.name}`
            }
          />
        </Avatar>
        <span>{reviewee?.name}</span>
      </CardContent>
    </Card>
  );
}

function ReviewersInfo({ reviewers }: { reviewers?: User[] }) {
  return (
    <Card>
      <CardHeader>Reviewer</CardHeader>
      <CardContent className="space-y-2">
        {reviewers?.map((reviewer) => (
          <div key={reviewer.id} className="flex items-center gap-4">
            <Avatar>
              <AvatarImage
                src={
                  reviewer?.profile_image ??
                  `https://avatar.iran.liara.run/username?username=${reviewer?.name}`
                }
              />
            </Avatar>
            <span>{reviewer?.name}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

interface QuestionListProps {
  element: React.MutableRefObject<HTMLButtonElement | null>;
  defaultValues: {
    reviewId: number;
    questions: (QuestionDTO & { answer?: string })[];
  };
  onSubmit: (data: FieldValues) => void;
}
function QuestionsList({
  defaultValues,
  element,
  onSubmit,
}: QuestionListProps) {
  const form = useForm({
    defaultValues,
  });
  const { fields } = useFieldArray({
    name: "questions",
    control: form.control,
  });

  function handleSubmit(data: FieldValues) {
    const answers = (
      data.questions as QuestionListProps["defaultValues"]["questions"]
    ).map((item) => ({
      title: item.answer,
      QuestionId: item.id,
    }));
    onSubmit({ ReviewId: defaultValues.reviewId, answers });
  }

  return (
    <>
      <form className="space-y-4 flex-1">
        {fields?.map((question, index) => (
          <Card key={question.id}>
            <CardHeader>{question.title}</CardHeader>
            <CardContent>
              <FormField
                name={`questions.${index}.answer`}
                control={form.control}
                render={({ field }) => (
                  <Textarea placeholder="Write answer..." {...field} />
                )}
              />
            </CardContent>
            <CardFooter>
              <h3>Feedback</h3>
            </CardFooter>
          </Card>
        ))}
        <button
          ref={element}
          onClick={form.handleSubmit(handleSubmit)}
          className="sr-only"
        ></button>
      </form>
    </>
  );
}
