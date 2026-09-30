import { useEffect, useRef, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { AUTHENTICATED_ROOT } from "@/app/auth";
import { PageState } from "@/components/ui/page";
import { useAuthMe } from "@/core/api/auth";
import { signInRedirect } from "@/core/auth";
import { config } from "@/core/config";

type AuthGuardProps = {
  children: ReactNode;
};

export function RequireAuth({ children }: AuthGuardProps) {
  const { data: user, isLoading } = useAuthMe();
  const redirectStarted = useRef(false);

  useEffect(() => {
    if (isLoading || user || redirectStarted.current) {
      return;
    }

    redirectStarted.current = true;

    if (config.hasKeycloak) {
      void signInRedirect();
      return;
    }

    redirectStarted.current = false;
  }, [isLoading, user]);

  if (isLoading || !user) {
    return <PageState isLoading />;
  }

  return children;
}

export function RedirectIfAuthenticated({ children }: AuthGuardProps) {
  const { data: user, isLoading } = useAuthMe();

  if (isLoading) {
    return <PageState isLoading />;
  }

  if (user) {
    return <Navigate to={AUTHENTICATED_ROOT} replace />;
  }

  return children;
}
