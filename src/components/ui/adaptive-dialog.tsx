import { useMediaQueries } from "@/lib/useMediaQuery";
import { Sheet, SheetTrigger } from "./sheet";
import { PropsWithChildren } from "react";
import { Dialog, DialogTrigger } from "./dialog";

export function AdaptiveDialog({ children, ...rest }: PropsWithChildren) {
  const { sm } = useMediaQueries();
  if (sm) {
    return <Sheet {...rest}>{children}</Sheet>;
  }
  return <Dialog {...rest}>{children}</Dialog>;
}
export function AdaptiveDialogTrigger({
  children,
  ...rest
}: PropsWithChildren) {
  const { sm } = useMediaQueries();
  if (sm) {
    return <SheetTrigger {...rest}>{children}</SheetTrigger>;
  }
  return <DialogTrigger {...rest}>{children}</DialogTrigger>;
}
