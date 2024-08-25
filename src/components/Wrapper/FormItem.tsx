import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { useState } from "react";
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  Form,
  useFormContext,
  UseFormReturn,
  UseFormStateReturn,
} from "react-hook-form";
import { Button } from "../ui/button";
import { CalendarProps } from "../ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { DatePicker } from "../ui/date-picker";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

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
  label: string;
  value: number | string;
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

interface SearchSelectProps extends SelectProps {
  no_item?: string;
  searchPlaceholder?: string;
  isLoading?: boolean;
  loading_text?: string;
}
export function SearchSelect({
  field,
  options,
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  no_item = "No item found.",
  isLoading = false,
  loading_text = "Loading...",
}: SearchSelectProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full max-w-xs flex justify-between"
        >
          {field.value
            ? options.find((item) => item.value === +field.value)?.label
            : placeholder}
          {isLoading ? (
            <Loader2 className="ml-2 h-4 w-4 shrink-0 opacity-50 animate-spin" />
          ) : (
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full max-w-xs p-0">
        <Command>
          <CommandInput disabled={isLoading} placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{isLoading ? loading_text : no_item}</CommandEmpty>
            <CommandGroup>
              {options.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.label}
                  onSelect={() => {
                    field.onChange(
                      field.value === item.value ? "" : item.value
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      +field.value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
