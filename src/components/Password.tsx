import { useState } from "react";
import { Input } from "./ui/input";
import { Eye, EyeOff, KeyRound } from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export default function PasswordInput(
  props: React.InputHTMLAttributes<HTMLInputElement>
) {
  const [show_password, set_show_password] = useState(false);
  function toggleShowPassword() {
    set_show_password((prev) => !prev);
  }
  return (
    <Input
      type={show_password ? "text" : "password"}
      start={<KeyRound className="pl-2.5 shrink-0" />}
      end={
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={toggleShowPassword}
            >
              {show_password ? <EyeOff size={15} /> : <Eye size={15} />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {show_password ? "Hide Password" : "Show Password"}
          </TooltipContent>
        </Tooltip>
      }
      {...props}
    />
  );
}
