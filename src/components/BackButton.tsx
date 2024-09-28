import { useNavigate } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";
import { ChevronLeft } from "lucide-react";

export function BackButton({ title = "Back" }) {
  const dispatch = useNavigate();
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={() => dispatch(-1)}
          size="icon"
          variant="secondary"
          className="rounded-full"
        >
          <ChevronLeft />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{title}</p>
      </TooltipContent>
    </Tooltip>
  );
}
