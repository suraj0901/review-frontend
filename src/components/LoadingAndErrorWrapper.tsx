import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";

interface Props {
  error?: { message?: string };
  isLoading?: boolean;
  children: React.ReactNode;
}
export default function LoadingAndErrorWrapper({
  children,
  error,
  isLoading,
}: Props) {
  if (error) {
    return (
      <div className="mx-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error?.message?.toString()}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (isLoading)
    return (
      <div className="grid place-items-center">
        <div className="flex items-center gap-1">
          <Loader2 className="animate-spin w-5 h-5" size={30} /> Loading...
        </div>
      </div>
    );

  return children;
}
