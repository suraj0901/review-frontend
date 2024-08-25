import { CheckCircle2, XCircleIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

export function DefaultFooter({ className }: { className?: string }) {
  const { formState } = useFormContext();
  const isMutating = formState.isSubmitting;
  return (
    <div className={cn("grid grid-cols-2 gap-2 mt-4", className)}>
      <Button disabled={isMutating} variant="secondary" type="reset">
        <XCircleIcon size={15} className="mr-1" /> Reset
      </Button>
      <Button disabled={isMutating} type="submit">
        <CheckCircle2 size={15} className="mr-1" /> Submit
      </Button>
    </div>
  );
}
