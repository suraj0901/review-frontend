import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  EditReviewTemplate,
  useEditReviewControl,
} from "@/features/review-template";

export default function EditTemplate() {
  const { isOpen, review_template_id, closeEditReview } =
    useEditReviewControl();
  return (
    <Sheet open={isOpen} onOpenChange={closeEditReview}>
      <SheetContent className="flex flex-col !max-w-screen-md w-full">
        <SheetHeader>
          <SheetTitle>Edit Review Template</SheetTitle>
        </SheetHeader>
        <ScrollArea className="py-4 flex-1 pr-4 -mr-4">
          {review_template_id && (
            <EditReviewTemplate
              review_template_id={+review_template_id}
              onSuccess={closeEditReview}
            />
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
