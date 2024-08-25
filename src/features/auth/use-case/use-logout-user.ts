import { useAuth } from "@/components/auth-provider";
import { base_api, LOGOUT_USER } from "@/config/api";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";

export function useLogOutUser() {
  const auth = useAuth();
  const navigate = useNavigate();

  const { trigger, ...rest } = useSWRMutation(
    LOGOUT_USER,
    () => base_api.post(LOGOUT_USER, null, { withCredentials: true }),
    {
      onSuccess() {
        auth.logout();
        navigate("/login");
      },
    }
  );

  function logout() {
    toast.promise(trigger(), {
      loading: "Logging out",
      error: (error) =>
        error?.response?.data?.message ?? error?.message ?? error.toString(),
    });
  }
  return { logout, ...rest };
}
