import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Edit2 } from "lucide-react";
import { useState } from "react";
import { EditUserForm } from "./edit-user-form";
import { useUpdateProfile } from "./use-case";
import { UserDTO } from "./user-dto";

interface UserProfileProps {
  children: React.ReactNode;
  user: UserDTO | null;
}

export function UserProfile({ children, user }: UserProfileProps) {
  const [showEditForm, setShowEditForm] = useState(false);
  const { submit } = useUpdateProfile(() => {
    setShowEditForm(false);
  });

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-xl font-bold uppercase">
            Profile
          </SheetTitle>
        </SheetHeader>
        <div className="my-4 space-y-4">
          {user && !showEditForm ? <Profile user={user} /> : null}
          {user && showEditForm ? (
            <EditUserForm user={user} onSubmit={submit} />
          ) : null}
        </div>
        <SheetFooter>
          {!showEditForm ? (
            <Button onClick={() => setShowEditForm(true)} className="w-full">
              <Edit2 className="mr-2" size={15} /> Edit
            </Button>
          ) : (
            <Button
              onClick={() => setShowEditForm(false)}
              variant="secondary"
              className="w-full"
            >
              Cancel
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

function Profile({ user }: { user: UserDTO }) {
  console.log({ user });

  return (
    <>
      <img
        src={user.profile_image}
        className="w-40 h-40 rounded-full mx-auto"
      />
      <div>
        <p className="text-xs">Name</p>
        <p className="font-semibold text-base">{user?.name}</p>
      </div>
      <div>
        <p className="text-sm">Email</p>
        <p className="font-semibold text-base">{user?.email}</p>
      </div>
      <div>
        <p className="text-sm">Gender</p>
        <p className="font-semibold text-base">{user?.gender}</p>
      </div>
      <div>
        <p className="text-sm">Role</p>
        <p className="font-semibold text-base">{user?.role}</p>
      </div>
    </>
  );
}
