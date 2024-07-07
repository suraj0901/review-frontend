import { useAuth } from "@/components/auth-provider";
import { REGISTER_USER, post_default } from "@/config/api";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";
import { setLoggedInUser } from "../../user/user-store";

export function useRegisterUser() {
  const { login } = useAuth();
  const { trigger, ...rest } = useSWRMutation(REGISTER_USER, post_default, {
    onSuccess(data) {
      login(data.data.token.token);
      setLoggedInUser(data.data.user);
    },
  });
  function register(data: unknown) {
    toast.promise(trigger(data), {
      loading: "Registering...",
      error: (error) =>
        error?.response?.data?.message ?? error?.message ?? error.toString(),
    });
  }
  return { register, ...rest };
}
