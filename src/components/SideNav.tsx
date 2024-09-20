import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export interface SideNavigation {
  value: string;
  label: React.ReactNode;
}

interface SideNavProps {
  navigations: SideNavigation[];
}
export default function SideNav({ navigations }: SideNavProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const current_nav = useMemo(
    () =>
      navigations.find((nav) => pathname.includes(nav.value)) ?? navigations[0],
    [pathname, navigations]
  );
  function handleNavigationChange(value: string) {
    if (!value?.trim?.()) return;
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
