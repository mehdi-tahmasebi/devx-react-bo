import { useEffect } from "react";
import { PageState } from "@/components/ui/page";
import { signInRedirect } from "@/core/auth";

export function LoginRedirect() {
  useEffect(() => {
    void signInRedirect();
  }, []);

  return <PageState isLoading />;
}
