import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { REVIEW } from "@/config/api";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useSWRConfig } from "swr";
import { useDeleteReview } from "../use-case";

export function DeleteReview({ review_id }: { review_id: number }) {
  const [open, setOpen] = useState(false);
  const { mutate } = useSWRConfig();
  const { isMutating, submit } = useDeleteReview(review_id, {
    onSuccess() {
      mutate((key: string) => key?.includes?.(REVIEW));
      setOpen(false);
    },
  });
  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <Tooltip>
          <AlertDialogTrigger asChild>
            <TooltipTrigger asChild>
              <Button size="icon" variant="destructive">
                <Trash2 />
              </Button>
            </TooltipTrigger>
          </AlertDialogTrigger>
          <TooltipContent>
            <p>Delete Review</p>
          </TooltipContent>
        </Tooltip>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Review</AlertDialogTitle>
            <AlertDialogDescription>Are you sure?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              variant="destructive"
              disabled={isMutating}
              onClick={submit}
            >
              Continue
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
