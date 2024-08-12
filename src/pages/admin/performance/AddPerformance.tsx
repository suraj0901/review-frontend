import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AddPerformanceForm } from "@/features/performance-review";
import { Plus } from "lucide-react";

export default function AddPerformance() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <Plus className="mr-1" size={15} /> Add Performance
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col !max-w-screen-md w-full">
        <SheetHeader>
          <SheetTitle>Add Performance</SheetTitle>
        </SheetHeader>
        <ScrollArea className="py-4 flex-1 pr-4 -mr-4">
          <AddPerformanceForm />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
