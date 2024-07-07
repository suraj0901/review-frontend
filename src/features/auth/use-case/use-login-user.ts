import { useAuth } from "@/components/auth-provider";
import { LOGIN_USER, post_default } from "@/config/api";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";
import { setLoggedInUser } from "../../user/user-store";

export function useLoginUser() {
  const auth = useAuth();
  const { trigger, ...rest } = useSWRMutation(LOGIN_USER, post_default, {
    onSuccess(data) {
      auth.login(data.data.token.token);
      setLoggedInUser(data.data.user);
    },
  });
  function login(data: unknown) {
    toast.promise(trigger(data), {
      loading: "Logging in",
      error: (error) =>
        error?.response?.data?.message ?? error?.message ?? error.toString(),
    });
  }
  return { login, ...rest };
}
