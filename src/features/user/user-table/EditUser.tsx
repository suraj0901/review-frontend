import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ReactNode, useState } from "react";
import { EditUserForm } from "../edit-user-form";
import { UserDTO } from "../user-dto";

interface EditUserProps {
  user: UserDTO;
  children: ReactNode;
}

export function EditUser({ user, children }: EditUserProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit User</SheetTitle>
        </SheetHeader>
        <div className="mt-4">
          <EditUserForm user={user} onSuccess={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
