import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AddReviewTemplateForm } from "@/features/review-template";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function AddTemplate() {
  const [open, setOpen] = useState(false);
  const closeSheet = () => setOpen(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>
          <Plus className="mr-1" size={15} /> Add Template
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col !max-w-screen-md w-full">
        <SheetHeader>
          <SheetTitle>Add Review Template</SheetTitle>
        </SheetHeader>
        <ScrollArea className="py-4 flex-1 pr-4 -mr-4">
          <AddReviewTemplateForm onSuccess={closeSheet} />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
