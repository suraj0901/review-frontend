import { useUserList } from "./use-case";
import { UserDTO } from "./user-dto";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LoadingAndErrorWrapper from "@/components/LoadingAndErrorWrapper";

interface UserListProps {
  onTap?: (user: UserDTO) => void;
}
export function UserList({ onTap }: UserListProps) {
  const { users, error, isLoading } = useUserList();
  const userCard = (user: UserDTO) => (
    <div
      role="button"
      onClick={() => onTap?.(user)}
      key={user.id}
      className="flex gap-x-2 items-center bg-secondary hover:bg-secondary/80 p-2"
    >
      <Avatar>
        <AvatarImage
          src={
            user.profile_image ??
            `https://avatar.iran.liara.run/username?username=${user.name}`
          }
          alt={user.name}
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div>
        <h1>{user.name}</h1>
        <p className="text-sm text-muted-foreground">{user.email}</p>
      </div>
    </div>
  );

  const content =
    users?.length > 0 ? (
      users?.map(userCard)
    ) : (
      <p className="italic px-4">No user available</p>
    );
  return (
    <div className="space-y-px">
      <LoadingAndErrorWrapper error={error} isLoading={isLoading}>
        {content}
      </LoadingAndErrorWrapper>
    </div>
  );
}
