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
import { useState } from "react";
import { useDeleteReviewTemplate } from "../use-case";

interface DeleteReviewTemplateDialogProps extends React.PropsWithChildren {
  review_template_id: number;
}

export default function DeleteReviewTemplateDialog({
  review_template_id,
  children,
}: DeleteReviewTemplateDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { submit, isMutating } = useDeleteReviewTemplate(review_template_id, {
    onSuccess() {
      setIsOpen(false);
    },
  });
  function handleContinue() {
    submit();
  }
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            template.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isMutating}>Cancel</AlertDialogCancel>
          <Button disabled={isMutating} onClick={handleContinue}>
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
