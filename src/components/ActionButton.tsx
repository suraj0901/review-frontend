import { LucideProps } from "lucide-react";
import { Button, ButtonProps } from "./ui/button";

interface ActionButtonProps extends React.PropsWithChildren<ButtonProps> {
  icon: React.FC<LucideProps>;
}
export default function ActionButton({
  icon,
  children,
  ...rest
}: ActionButtonProps) {
  const Icon = icon;
  return (
    <Button type="button" {...rest}>
      <Icon size={15} className="mr-1" /> {children}
    </Button>
  );
}
