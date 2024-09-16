import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  Form,
  useFormContext,
  UseFormReturn,
  UseFormStateReturn,
} from "react-hook-form";
import { CalendarProps } from "../ui/calendar";

import { DatePicker } from "../ui/date-picker";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ReactNode } from "react";
export type DefaultFormProps = {
  form: UseFormReturn<FieldValues, unknown, undefined>;
  onSubmit: (data: FieldValues) => void;
  children: React.ReactNode;
};

export function DefaultForm({ form, onSubmit, children }: DefaultFormProps) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onReset={() => form.reset()}
        className="space-y-4"
      >
        {children}
      </form>
    </Form>
  );
}

interface RenderProps {
  field: ControllerRenderProps<FieldValues, string>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<FieldValues>;
  form: UseFormReturn<FieldValues, unknown, undefined>;
}

export type FormItemProps = {
  name: string;
  label: string;
  render: (props: RenderProps) => React.ReactNode;
};

export function DefultFormItem({ name, label, render }: FormItemProps) {
  const form = useFormContext();
  return (
    <FormField
      name={name}
      control={form.control}
      render={(props) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>{render({ ...props, form })}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function DefaultDatePicker({
  field,
  ...props
}: RenderProps & CalendarProps) {
  return (
    <DatePicker
      {...props}
      selected={field.value}
      onSelect={field.onChange}
      disabled={field.disabled}
    />
  );
}

export type SelectOptionType = {
  label: ReactNode | string;
  value: string;
};

export type SelectProps = {
  field: ControllerRenderProps<FieldValues, string>;
  options: SelectOptionType[];
  placeholder?: string;
};

export function DefaultSelect({ field, options }: SelectProps) {
  return (
    <Select value={field.value} onValueChange={field.onChange}>
      <SelectTrigger className="w-full max-w-xs">
        <SelectValue placeholder="Select Reviewee" />
      </SelectTrigger>
      <SelectContent>
        {options.map((item) => (
          <SelectItem key={item.value} value={item.value.toString()}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
