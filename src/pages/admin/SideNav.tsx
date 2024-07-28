import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { BarChart4Icon, LayoutTemplate, UserCircle2 } from "lucide-react";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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

export default function SideNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const current_nav = useMemo(
    () =>
      navigations.find((nav) => pathname.includes(nav.value)) ?? navigations[0],
    [pathname]
  );
  function handleNavigationChange(value: string) {
    navigate(value);
  }
  return (
    <div className="max-w-xs w-full bg-muted/20">
      <ToggleGroup
        type="single"
        className="flex flex-col p-4"
        value={current_nav.value}
        onValueChange={handleNavigationChange}
      >
        {navigations.map((item) => (
          <ToggleGroupItem
            key={item.value}
            value={item.value}
            className="w-full justify-start"
          >
            {item.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
