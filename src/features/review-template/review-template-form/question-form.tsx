import ActionButton from "@/components/ActionButton";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MinusCircle, PlusCircle } from "lucide-react";
import { useRef } from "react";
import { useFieldArray, UseFieldArrayProps } from "react-hook-form";

export interface QuestionFormProps extends UseFieldArrayProps {
  disabled?: boolean;
  onRemove?: (id: number) => void;
}

export default function QuestionForm(props: QuestionFormProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { fields, append, remove } = useFieldArray(props);

  function handleAddQuestion() {
    append({ title: null, id: null });
    ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
  function handleRemoveQuestion(index: number, id: number | undefined | null) {
    remove(index);
    if (id) props?.onRemove?.(id);
  }

  const question_input_list = fields.map((field, index) => (
    <Card key={field.id}>
      <CardHeader>
        <FormField
          name={`${props.name}.${index}.id`}
          control={props.control}
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-row items-center justify-between">
                <span>{index + 1}</span>
                <Button
                  type="button"
                  onClick={() => handleRemoveQuestion(index, field.value)}
                  size="icon"
                  className="rounded-full w-7 h-7"
                >
                  <MinusCircle size={14} />
                </Button>
              </div>
              <FormControl>
                <Input className="opacity-0 !m-0 !p-0 !w-0 !h-0" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          disabled={props.disabled ?? false}
          name={`${props.name}.${index}.title`}
          control={props.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea {...field} value={field.value ?? ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardHeader>
    </Card>
  ));

  return (
    <div className="space-y-2">
      <FormLabel>Questions</FormLabel>
      {question_input_list}
      <ActionButton
        className="w-full"
        disabled={props.disabled}
        onClick={handleAddQuestion}
        icon={PlusCircle}
      >
        Add Question
      </ActionButton>
      <div ref={ref}></div>
    </div>
  );
}
