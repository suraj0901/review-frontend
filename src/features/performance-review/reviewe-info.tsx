import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { User } from "./performance-review-dto";

export function RevieweeeInfo({ reviewee }: { reviewee?: User }) {
  return (
    <Card>
      <CardHeader>Reviewee</CardHeader>
      <CardContent className="flex items-center gap-4">
        <Avatar>
          <AvatarImage
            src={
              reviewee?.profile_image ??
              `https://avatar.iran.liara.run/username?username=${reviewee?.name}`
            }
          />
        </Avatar>
        <span>{reviewee?.name}</span>
      </CardContent>
    </Card>
  );
}
