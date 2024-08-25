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
  AddPerformanceForm,
  useAddReview,
} from "@/features/performance-review";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function AddPerformance() {
  const [open, setOpen] = useState(false);
  const { submit } = useAddReview();
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>
          <Plus className="mr-1" size={15} /> Add Performance
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col  w-full">
        <SheetHeader>
          <SheetTitle>Add Performance</SheetTitle>
        </SheetHeader>
        <ScrollArea className="py-4 flex-1 pr-4 -mr-4">
          <AddPerformanceForm onSubmit={submit} />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
