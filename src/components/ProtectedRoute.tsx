import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./auth-provider";
import { UNAUTHENTICATED_ROUTE } from "@/config/route";

export default function ProtectedRoute() {
  const { authed } = useAuth();
  const location = useLocation();
  return authed ? (
    <Outlet />
  ) : (
    <Navigate
      to={UNAUTHENTICATED_ROUTE}
      replace
      state={{ redirect: location.pathname }}
    />
  );
}
