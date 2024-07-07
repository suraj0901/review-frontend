import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { UserDTO } from "./user-dto";

interface UserProfileProps {
  children: React.ReactNode;
  user: UserDTO | null;
}

export function UserProfile({ children, user }: UserProfileProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Profile</SheetTitle>
        </SheetHeader>

        <div className="my-4 space-y-4">
          <p className="grid grid-cols-4">
            <span>Name</span>
            <span className="col-span-3">: {user?.name}</span>
          </p>
          <p className="grid grid-cols-4">
            <span>Email</span>
            <span className="col-span-3">: {user?.email}</span>
          </p>
          <p className="grid grid-cols-4">
            <span>Role</span>
            <span className="col-span-3">: {user?.role}</span>
          </p>
        </div>
        {/* <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Canel</Button>
          </SheetClose>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  );
}
