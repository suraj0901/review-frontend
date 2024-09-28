import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { User } from "./performance-review-dto";

export function ReviewersInfo({ reviewers }: { reviewers?: User[] }) {
  return (
    <Card>
      <CardHeader>Reviewer</CardHeader>
      <CardContent className="space-y-2">
        {reviewers?.map((reviewer) => (
          <div key={reviewer.id} className="flex items-center gap-4">
            <Avatar>
              <AvatarImage
                src={
                  reviewer?.profile_image ??
                  `https://avatar.iran.liara.run/username?username=${reviewer?.name}`
                }
              />
            </Avatar>
            <span>{reviewer?.name}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
