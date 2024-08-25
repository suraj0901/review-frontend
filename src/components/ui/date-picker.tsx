import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "./button";
import { Calendar, CalendarProps } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { useState } from "react";

export function DatePicker({
  ...props
}: CalendarProps & { onSelect: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "flex max-w-xs w-full justify-start text-left font-normal",
            !props.selected && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {props.selected instanceof Date ? (
            format(props.selected, "PPP")
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          {...props}
          onSelect={(date) => {
            setOpen(false);
            props.onSelect(date);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
