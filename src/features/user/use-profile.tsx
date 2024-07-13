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
import { UserDTO } from "./user-dto";
import { useState } from "react";
import { EditUserForm } from "./edit-user-form";
import { setLoggedInUser } from "./user-store";
import { AxiosResponse } from "axios";

interface UserProfileProps {
  children: React.ReactNode;
  user: UserDTO | null;
}

export function UserProfile({ children, user }: UserProfileProps) {
  const [showEditForm, setShowEditForm] = useState(false);
  function handleUpdateSuccess(data?: AxiosResponse) {
    const user = data?.data as UserDTO & {
      profile_image: { type: string; buffer: Buffer };
    };
    console.log({ user });
    // user.profile_image = user.profile_image.buffer;
    setLoggedInUser(user);
    setShowEditForm(false);
  }
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
            <EditUserForm user={user} onSuccess={handleUpdateSuccess} />
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
  return (
    <>
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
