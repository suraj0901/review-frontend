import { Input } from "./ui/input";

export default function EmailInput(
  props: React.InputHTMLAttributes<HTMLInputElement>
) {
  return (
    <Input type="email" start={<span className="pl-2.5">@</span>} {...props} />
  );
}
