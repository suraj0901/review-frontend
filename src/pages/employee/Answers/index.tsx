import { BackButton } from "@/components/BackButton";
import LoadingAndErrorWrapper from "@/components/LoadingAndErrorWrapper";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { TO_REVIEW } from "@/config/api";
import {
  type Answers,
  QuestionDTO,
  useGetPerformanceReviewById,
} from "@/features/performance-review";
import { FeedbackList } from "@/features/performance-review/feedback/feedback-list";
import { RevieweeeInfo } from "@/features/performance-review/reviewe-info";
import { ReviewersInfo } from "@/features/performance-review/reviewers-info";
import { useParams } from "react-router-dom";

export default function Answers() {
  const { id } = useParams();

  const { review, answers, error, isLoading } = useGetPerformanceReviewById(
    TO_REVIEW,
    id
  );

  return (
    <LoadingAndErrorWrapper error={error} isLoading={isLoading}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <BackButton />
        </div>
        <div className="flex items-start gap-4">
          <div className="space-y-4 flex-1 w-full">
            {answers?.map((answer) => (
              <AnswerCard key={answer.id} answer={answer} />
            ))}
          </div>
          <div className="shrink-0 max-w-sm w-full space-y-4">
            <RevieweeeInfo reviewee={review?.Reviewee} />
            <ReviewersInfo reviewers={review?.Reviewers} />
          </div>
        </div>
      </div>
    </LoadingAndErrorWrapper>
  );
}

interface AnswerCardProps {
  answer:
    | Answers
    | {
        Question: QuestionDTO;
        title: string;
        id: null;
        Feedbacks: never[];
      };
}

function AnswerCard({ answer }: AnswerCardProps) {
  const hasAnswer = answer.title.trim() !== "";
  return (
    <Card key={answer.id}>
      <CardHeader>{answer.Question.title}</CardHeader>
      <CardContent>
        {hasAnswer ? <p>{answer.title}</p> : <i>No answer</i>}
      </CardContent>
      {hasAnswer && (
        <CardFooter className="flex-col items-stretch gap-2">
          <h3>Feedbacks</h3>
          <FeedbackList feedbacks={answer.Feedbacks} answerId={answer.id!} />
        </CardFooter>
      )}
    </Card>
  );
}
