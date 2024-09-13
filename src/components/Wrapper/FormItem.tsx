import { useComposedRefs } from "@/lib/useComposedRefs";
import { useControllableState } from "@/lib/useControllableState";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, Loader2, X } from "lucide-react";
import {
  createContext,
  forwardRef,
  PropsWithChildren,
  ReactNode,
  useContext,
  useState,
} from "react";
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

type SearchSelectValueType = string | string[];
type ValueNodeType = ReactNode;

interface SearchSelectProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  value?: SearchSelectValueType;
  defaultValue?: SearchSelectValueType;
  onValueChange?: (value: SearchSelectValueType) => void;
  isLoading?: boolean;
}
interface SearchSelectContextProps {
  open?: boolean;
  onOpenChange: (open: boolean) => void;
  value?: SearchSelectValueType;
  onValueChange: (value?: SearchSelectValueType) => void;
  valueNodes: Map<string, ValueNodeType>;
  onValuNodesChange: (nodes: Map<string, ValueNodeType>) => void;
  isLoading?: boolean;
}

interface SearchSelectValueProps
  extends PropsWithChildren<Omit<HTMLDivElement, "placeholder">> {
  render?: ({
    value,
    open,
  }: {
    value?: SearchSelectValueType;
    open?: boolean;
  }) => ReactNode;
  placeholder?: string;
}

interface SearchSelectItemProps {
  value: string;
  children: ReactNode;
  icon?: ReactNode;
}

const SearchSelectContext = createContext<SearchSelectContextProps | null>(
  null
);

export function useSearchSelect() {
  const context = useContext(SearchSelectContext);
  if (!context) {
    throw new Error(
      "useSearchSelect must be used within a SearchSelectContext"
    );
  }
  return context;
}

export function SearchSelect({
  value: valueProp,
  onValueChange,
  children,
  defaultValue,
  open: openProp,
  defaultOpen,
  onOpenChange,
  isLoading,
}: SearchSelectProps & PropsWithChildren) {
  const [open, setOpen] = useControllableState({
    prop: openProp,
    onChange: onOpenChange,
    defaultProp: defaultOpen,
  });
  const [value, setValue] = useControllableState({
    prop: valueProp,
    onChange: onValueChange,
    defaultProp: defaultValue,
  });
  const [valueNodes, onValuNodesChange] = useState<Map<string, ValueNodeType>>(
    new Map()
  );

  return (
    <SearchSelectContext.Provider
      value={{
        open: open,
        onOpenChange: setOpen,
        value: value,
        onValueChange: setValue,
        valueNodes,
        onValuNodesChange,
        isLoading,
      }}
    >
      <Popover open={open} onOpenChange={setOpen}>
        {children}
      </Popover>
    </SearchSelectContext.Provider>
  );
}

export function SearchSelectTrigger({
  children,
  icon,
}: PropsWithChildren<{
  icon?: ({ isLoading }: { isLoading?: boolean }) => ReactNode;
}>) {
  const { open, isLoading } = useSearchSelect();
  return (
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={open}
        className="max-w-xs flex justify-between w-full !h-auto min-h-10"
      >
        {children}
        {icon ? (
          icon({ isLoading })
        ) : (
          <SearchSelectTriggerIcon isLoading={isLoading} />
        )}
      </Button>
    </PopoverTrigger>
  );
}

export function SearchSelectTriggerIcon({
  isLoading,
}: {
  isLoading?: boolean;
}) {
  return isLoading ? (
    <Loader2 className="ml-2 h-4 w-4 shrink-0 opacity-50 animate-spin" />
  ) : (
    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
  );
}

function shouldShowPlaceholder(value?: SearchSelectValueType) {
  if (Array.isArray(value)) return value.length === 0;
  return value === null || value === undefined || value === "";
}

export const SearchSelectValue = forwardRef(
  (
    { render, placeholder = "Select...", className }: SearchSelectValueProps,
    forwardedRef
  ) => {
    const { value, open } = useSearchSelect();
    const composedRefs = useComposedRefs(forwardedRef);
    if (render) {
      return render({ value, open });
    }

    return (
      <div
        className={cn("flex flex-row gap-1 flex-wrap", className)}
        ref={composedRefs}
      >
        {shouldShowPlaceholder(value) ? (
          <>{placeholder}</>
        ) : (
          <SearchSelectValueContent />
        )}
      </div>
    );
  }
);

function SearchSelectValueContent() {
  const { valueNodes, value, onValuNodesChange, onValueChange } =
    useSearchSelect();

  if (!Array.isArray(value))
    return <span>{valueNodes.values().next().value}</span>;

  const values = Array.from(valueNodes.entries());

  const onRemove = (key: string) => {
    const new_value_nodes = new Map(valueNodes);
    new_value_nodes.delete(key);
    onValuNodesChange(new_value_nodes);
    if (Array.isArray(value)) onValueChange(value.filter((v) => v !== key));
  };

  const content = values.map(([key, valueNode]) => (
    <span
      key={key}
      className="flex gap-1 items-center bg-primary-foreground py-1 px-2 rounded"
    >
      {valueNode}
      <Button
        variant="ghost"
        className="p-1 !h-auto"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(key);
        }}
      >
        <X size={16} />
      </Button>
    </span>
  ));
  return content;
}

export const SearchSelectInput = CommandInput;

export function SearchSelectContent({ children }: PropsWithChildren) {
  return (
    <PopoverContent className="w-full max-w-xs p-0">
      <Command>{children}</Command>
    </PopoverContent>
  );
}

export const SearchSelectEmpty = CommandEmpty;
export const SearchSelectList = CommandList;
export const SearchSelectGroup = CommandGroup;

function checkIsSelected(value: string, current_value?: SearchSelectValueType) {
  if (Array.isArray(current_value)) {
    return current_value.includes(value);
  }
  return current_value === value;
}

function updatedValue(
  isSelected: boolean,
  value: string,
  current_value?: SearchSelectValueType
) {
  if (!Array.isArray(current_value)) return isSelected ? undefined : value;
  if (isSelected) return current_value.filter((item) => item !== value);
  return [...current_value, value];
}

function updateValueNodes(
  isSelected: boolean,
  value: string,
  children: ReactNode,
  valueNodes: SearchSelectContextProps["valueNodes"],
  current_value?: SearchSelectValueType
) {
  const new_value_nodes = new Map(
    Array.isArray(current_value) ? valueNodes : []
  );
  if (isSelected) new_value_nodes.delete(value);
  else new_value_nodes.set(value, children);
  return new_value_nodes;
}

export function SearchSelectItem({
  value,
  children,
  icon,
}: SearchSelectItemProps) {
  const {
    value: current_value,
    onValueChange,
    onOpenChange,
    valueNodes,
    onValuNodesChange,
  } = useSearchSelect();

  const isSelected = checkIsSelected(value, current_value);
  function handleSelect() {
    const isSelected = checkIsSelected(value, current_value);
    const new_value = updatedValue(isSelected, value, current_value);
    const nodes = updateValueNodes(
      isSelected,
      value,
      children,
      valueNodes,
      current_value
    );
    console.log({ new_value, nodes });

    onValuNodesChange(nodes);
    onValueChange(new_value);
    onOpenChange(false);
  }

  return (
    <>
      <CommandItem value={value} onSelect={handleSelect}>
        {icon ? (
          icon
        ) : (
          <Check
            className={cn(
              "mr-2 h-4 w-4",
              isSelected ? "opacity-100" : "opacity-0"
            )}
          />
        )}
        {children}
      </CommandItem>
    </>
  );
}
