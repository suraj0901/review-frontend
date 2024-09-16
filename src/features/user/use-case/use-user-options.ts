import { useUserList } from "@/features/user";

export function useUserOptions() {
  const { users, ...rest } = useUserList({ select: "name,id" });
  const userOptions =
    users?.map((user) => ({
      label: user.name,
      value: user.id.toString(),
    })) ?? [];
  return { ...rest, userOptions };
}
