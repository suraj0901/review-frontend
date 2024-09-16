import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Edit3 } from "lucide-react";
import { useUpdateReview } from "../use-case";
import { EditReviewContent } from "./EditReviewContent";
import { useState } from "react";

export default function EditReview({ review_id }: { review_id: number }) {
  const [open, setOpen] = useState(false);
  const { submit } = useUpdateReview(review_id, {
    onSuccess() {
      setOpen(false);
    },
  });
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <Tooltip>
        <SheetTrigger asChild>
          <TooltipTrigger asChild>
            <Button size="icon">
              <Edit3 />
            </Button>
          </TooltipTrigger>
        </SheetTrigger>
        <TooltipContent>
          <p>Edit Review</p>
        </TooltipContent>
      </Tooltip>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Performance</SheetTitle>
        </SheetHeader>
        <ScrollArea className="py-4 flex-1 pr-4 -mr-4">
          <EditReviewContent onSubmit={submit} review_id={review_id} />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
