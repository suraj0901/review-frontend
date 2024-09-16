import { useControllableState } from "@/lib/useControllableState";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, Loader2, X } from "lucide-react";
import { createContext, PropsWithChildren, ReactNode, useContext } from "react";
import { Button, ButtonProps } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";

export type SelectOptionType = {
  label: ReactNode | string;
  value: string;
};
type SearchSelectValueType = string | string[];

interface SearchSelectProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  value: SearchSelectValueType;
  defaultValue?: SearchSelectValueType;
  onValueChange?: (value: SearchSelectValueType) => void;
  isLoading?: boolean;
  options: SelectOptionType[];
}

interface SearchSelectProvider {
  open?: boolean;
  onOpenChange: (open: boolean) => void;
  value?: SearchSelectValueType;
  onValueChange: (value: SearchSelectValueType) => void;
  isLoading?: boolean;
  options: SelectOptionType[];
}

interface SearchSelectTriggerProps {
  children: React.ReactNode;
  className?: string;
  icon?: (props: { isLoading?: boolean }) => ReactNode;
}

interface SearchSelectValueProps {
  placeholder: string;
  render?: (props: { value?: SearchSelectValueType }) => ReactNode;
  className?: string;
}

interface SearchSelectItemProps {
  value: string;
  children: ReactNode;
  icon?: ReactNode;
}

const SearchSelectContext = createContext<SearchSelectProvider | null>(null);
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
  options,
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
  return (
    <SearchSelectContext.Provider
      value={{
        open: open,
        onOpenChange: setOpen,
        value: value,
        onValueChange: setValue,
        isLoading,
        options,
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
  className,
  icon,
}: SearchSelectTriggerProps) {
  const { open } = useSearchSelect();
  return (
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={open}
        className={cn("flex w-full justify-between !h-auto", className)}
      >
        {children}
        <SearchSelectTriggerIcon icon={icon} />
      </Button>
    </PopoverTrigger>
  );
}

function SearchSelectTriggerIcon({
  icon,
}: Pick<SearchSelectTriggerProps, "icon">) {
  const { isLoading } = useSearchSelect();
  if (icon) return icon({ isLoading });
  return isLoading ? (
    <Loader2 className="ml-2 h-4 w-4 shrink-0 opacity-50 animate-spin" />
  ) : (
    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
  );
}

function shouldShowPlaceholder(value?: SearchSelectValueType) {
  if (Array.isArray(value)) {
    return value.length === 0;
  }
  return value === undefined || value === null || value === "";
}
export function SearchSelectValue({
  placeholder,
  render,
  className,
}: SearchSelectValueProps) {
  const { value, options, onValueChange } = useSearchSelect();
  if (shouldShowPlaceholder(value)) return placeholder;
  if (render) return render({ value });
  if (!Array.isArray(value))
    return options.find((option) => option.value === value)?.label;
  function onRemove(key: string) {
    if (Array.isArray(value))
      onValueChange(value.filter((item) => item !== key));
    else onValueChange("");
  }
  return (
    <div className={cn("flex gap-1 flex-wrap", className)}>
      {options
        .filter((option) => value.includes(option.value))
        .map((item) => (
          <div
            key={item.value}
            className="flex items-center gap-1 rounded bg-primary-foreground py-1 px-2"
          >
            {item.label}
            <Button
              variant="ghost"
              className="p-1 !h-auto"
              onClick={(e) => {
                e.stopPropagation();
                onRemove(item.value);
              }}
            >
              <X size={16} />
            </Button>
          </div>
        ))}
    </div>
  );
}

export function SearchSelectContent({ children }: PropsWithChildren) {
  return (
    <PopoverContent className="w-full max-w-xs p-0">
      <Command>{children}</Command>
    </PopoverContent>
  );
}

export function SearchSelectClearAll(props: ButtonProps) {
  const { onValueChange } = useSearchSelect();
  function handleClear() {
    onValueChange([]);
  }
  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={handleClear}
      {...props}
      className={cn("w-full", props.className)}
    >
      <X className="mr-1 h-4 w-4" />
      Clear
    </Button>
  );
}

export function SearchSelectSelectAll(props: ButtonProps) {
  const { value, onValueChange, options } = useSearchSelect();
  function handleSelectAll() {
    onValueChange(Array.from(options.map((option) => option.value)));
  }
  return (
    <Button
      size="sm"
      variant={value?.length === options.length ? "default" : "ghost"}
      onClick={handleSelectAll}
      {...props}
      className={cn("w-full", props.className)}
    >
      <Check className="mr-2 h-4 w-4 " />
      Select All
    </Button>
  );
}

export const SearchSelectEmpty = CommandEmpty;
export const SearchSelectList = CommandList;
export const SearchSelectGroup = CommandGroup;
export const SearchSelectInput = CommandInput;

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
  if (!Array.isArray(current_value)) return isSelected ? "" : value;
  if (isSelected) return current_value.filter((item) => item !== value);
  return [...current_value, value];
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
  } = useSearchSelect();

  const isSelected = checkIsSelected(value, current_value);

  function handleSelect() {
    const isSelected = checkIsSelected(value, current_value);
    const new_value = updatedValue(isSelected, value, current_value);
    onValueChange(new_value);
    onOpenChange(false);
  }
  const checkIcon = icon ? icon : <Check className="h-4 w-4" />;

  return (
    <CommandItem onSelect={handleSelect}>
      <span className="w-5 h-5">{isSelected ? checkIcon : null}</span>
      {children}
    </CommandItem>
  );
}

export function SearchSelectOptions() {
  const { options } = useSearchSelect();

  return (
    <SearchSelectList>
      <SearchSelectGroup>
        {options.map((item) => (
          <SearchSelectItem key={item.value} value={item.value}>
            {item.label}
          </SearchSelectItem>
        ))}
      </SearchSelectGroup>
    </SearchSelectList>
  );
}

export function SearchSelectFooter({ children }: { children: ReactNode }) {
  return (
    <>
      <Separator />
      <div className="flex items-center p-1 gap-x-1">{children}</div>
    </>
  );
}
