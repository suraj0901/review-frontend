import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Answers, Feedback, QuestionDTO } from "@/features/performance-review";
import { FieldValues, useFieldArray, useForm } from "react-hook-form";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface QuestionListProps {
  element: React.MutableRefObject<HTMLButtonElement | null>;
  defaultValues: {
    reviewId: number;
    answers:
      | Answers[]
      | {
          Question: QuestionDTO;
          title: string;
          id: null;
          Feedbacks: never[];
        }[];
  };
  onSubmit: (data: FieldValues) => void;
}
export function QuestionsList({
  defaultValues,
  element,
  onSubmit,
}: QuestionListProps) {
  const form = useForm({
    defaultValues,
  });
  const { fields } = useFieldArray({
    name: "answers",
    control: form.control,
  });

  function handleSubmit(data: FieldValues) {
    const answers = (
      data.answers as QuestionListProps["defaultValues"]["answers"]
    ).map((item) => ({
      id: item.id,
      title: item.title,
      QuestionId: item.Question.id,
    }));
    onSubmit({ reviewId: data.reviewId, answers });
  }

  return (
    <>
      <Form {...form}>
        <form className="space-y-4 flex-1">
          {fields?.map((answer, index) => (
            <Card key={answer.id}>
              <CardHeader>{answer.Question.title}</CardHeader>
              <CardContent>
                <FormField
                  name={`answers.${index}.title`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea placeholder="Write answer..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <div className="space-y-2 w-full">
                  <h3>Feedbacks</h3>
                  <FeedbacksList feedbacks={answer.Feedbacks} />
                </div>
              </CardFooter>
            </Card>
          ))}
          <button
            ref={element}
            onClick={form.handleSubmit(handleSubmit)}
            className="sr-only"
          ></button>
        </form>
      </Form>
    </>
  );
}

function FeedbacksList({ feedbacks }: { feedbacks: Feedback[] }) {
  if (feedbacks.length === 0)
    return <i className="text-sm opacity-60">No feedbacks</i>;
  return feedbacks.map((feedback) => (
    <Card key={feedback.id}>
      <CardHeader>
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
      </CardHeader>
      <CardContent>{feedback.title}</CardContent>
    </Card>
  ));
}
