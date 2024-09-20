import ProtectedLayout from "@/components/Layout/ProtectedLayout";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ROLE } from "@/config/constant/role";
import { useUserStore } from "@/features/user";
import { Navigate, Outlet } from "react-router-dom";
import { BarChart4Icon, LayoutTemplate, UserCircle2 } from "lucide-react";
import SideNav from "@/components/SideNav";

const navigations = [
  {
    value: "employee",
    label: (
      <p className="flex items-center gap-x-2">
        <UserCircle2 /> Employee
      </p>
    ),
  },
  {
    value: "performance",
    label: (
      <p className="flex items-center gap-x-2">
        <BarChart4Icon />
        Performance
      </p>
    ),
  },
  {
    value: "review-template",
    label: (
      <p className="flex items-center gap-x-2">
        <LayoutTemplate />
        Review Template
      </p>
    ),
  },
];

export default function AdminLayout() {
  const [user] = useUserStore();
  if (user?.role !== ROLE.ADMIN) return <Navigate to="/login" />;
  return (
    <ProtectedLayout>
      <SideNav navigations={navigations} />
      <ScrollArea className="p-4 flex-1 h-[calc(100svh-72px)]">
        <Outlet />
      </ScrollArea>
    </ProtectedLayout>
  );
}
