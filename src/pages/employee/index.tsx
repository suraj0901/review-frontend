import ProtectedLayout from "@/components/Layout/ProtectedLayout";
import SideNav, { SideNavigation } from "@/components/SideNav";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ROLE } from "@/config/constant/role";
import { useUserStore } from "@/features/user";
import { BarChart4Icon, ListChecks } from "lucide-react";
import { Navigate, Outlet } from "react-router-dom";

const navigations: SideNavigation[] = [
  {
    value: "my-review",
    label: (
      <p className="flex items-center gap-x-2">
        <BarChart4Icon />
        My Review
      </p>
    ),
  },
  {
    value: "to-review",
    label: (
      <p className="flex items-center gap-x-2">
        <ListChecks />
        To Review
      </p>
    ),
  },
];

export default function Employee() {
  const [user] = useUserStore();
  if (user?.role !== ROLE.USER) return <Navigate to="/login" />;

  return (
    <ProtectedLayout>
      <SideNav navigations={navigations} />
      <ScrollArea className="p-4 flex-1 h-[calc(100svh-72px)]">
        <Outlet />
      </ScrollArea>
    </ProtectedLayout>
  );
}
