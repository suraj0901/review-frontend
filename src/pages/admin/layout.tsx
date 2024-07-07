import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogOutUser } from "@/features/auth";
import { UserProfile, useUserStore } from "@/features/user";
import { HomeIcon, LogOut, UserRoundPlus } from "lucide-react";
import { Outlet } from "react-router-dom";
import LogOutDialog from "./LogOutDialog";
import Sidebar from "./sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AdminLayout() {
  const { logout, isMutating } = useLogOutUser();
  const [user] = useUserStore();
  return (
    <div className="h-screen flex flex-col">
      <header className="border-b bg-muted/40">
        <div className="p-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">
            <HomeIcon />
          </h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon">
                <Avatar>
                  <AvatarImage
                    src={`https://avatar.iran.liara.run/username?username=${user?.name}`}
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
      <main className="flex flex-1">
        <Sidebar />
        <ScrollArea className="flex-1 h-[calc(100svh-73px)] p-4">
          <Outlet />
        </ScrollArea>
      </main>
    </div>
  );
}
