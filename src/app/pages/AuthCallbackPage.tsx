import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AUTHENTICATED_ROOT } from "@/app/auth";
import { PageState } from "@/components/ui/page";
import { AUTH_ME_QUERY_KEY, getMe } from "@/core/api/auth";
import { consumeReturnUrl, handleSignInCallback } from "@/core/auth";
import { getErrorMessage, notify } from "@/core/notifications";

export function AuthCallbackPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    void (async () => {
      try {
        await handleSignInCallback();
        queryClient.removeQueries({ queryKey: AUTH_ME_QUERY_KEY });
        await queryClient.fetchQuery({
          queryKey: AUTH_ME_QUERY_KEY,
          queryFn: getMe,
        });

        const returnUrl = consumeReturnUrl();
        navigate(returnUrl || AUTHENTICATED_ROOT, { replace: true });
      } catch (error) {
        setFailed(true);
        notify.error(getErrorMessage(error, "Accesso non riuscito. Riprova."));
      }
    })();
  }, [navigate, queryClient]);

  if (failed) {
    return (
      <PageState
        isError
        errorMessage="Accesso non riuscito. Chiudi questa scheda e riprova dall'applicazione."
      />
    );
  }

  return <PageState isLoading />;
}
