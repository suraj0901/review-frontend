import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

export interface SideNavigation {
  value: string;
  label: React.ReactNode;
}

interface SideNavProps {
  navigations: SideNavigation[];
}
export default function SideNav({ navigations }: SideNavProps) {
  const { pathname } = useLocation();

  const current_nav = useMemo(
    () =>
      navigations.find((nav) => pathname.includes(nav.value)) ?? navigations[0],
    [pathname, navigations]
  );

  return (
    <div className="max-w-xs w-full bg-muted/20">
      <ToggleGroup
        type="single"
        className="flex flex-col p-4"
        value={current_nav.value}
      >
        {navigations.map((item) => (
          <Link
            key={item.value}
            to={item.value}
            className="w-full justify-start"
          >
            <ToggleGroupItem
              key={item.value}
              value={item.value}
              className="w-full justify-start"
            >
              {item.label}
            </ToggleGroupItem>
          </Link>
        ))}
      </ToggleGroup>
    </div>
  );
}
