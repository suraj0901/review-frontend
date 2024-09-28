import { HomeIcon, LogOut, UserRoundPlus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { UserProfile, useUserStore } from "@/features/user";
import LogOutDialog from "@/pages/admin/LogOutDialog";
import { ReactNode } from "react";
import { useLogOutUser } from "@/features/auth";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const { logout, isMutating } = useLogOutUser();
  const [user] = useUserStore();
  return (
    <div className="flex flex-col h-svh">
      <header className="bg-muted/40">
        <div className="p-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold flex items-center gap-x-2">
            <HomeIcon /> Performance Reviews
          </h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" className="rounded-full">
                <Avatar>
                  <AvatarImage
                    src={
                      user?.profile_image ??
                      `https://avatar.iran.liara.run/username?username=${user?.name}`
                    }
                  />
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <UserProfile user={user}>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <UserRoundPlus size={15} className="mr-1" /> Profile
                </DropdownMenuItem>
              </UserProfile>
              <LogOutDialog onSubmit={logout}>
                <DropdownMenuItem
                  disabled={isMutating}
                  onSelect={(e) => e.preventDefault()}
                >
                  <LogOut size={15} className="mr-1" /> Logout
                </DropdownMenuItem>
              </LogOutDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <div className="flex flex-1">{children} </div>
    </div>
  );
}
