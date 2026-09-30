import { Route, Routes } from "react-router-dom";
import {
  AUTH_CALLBACK_PATH,
  GOODBYE_PATH,
  LOGIN_PATH,
} from "@/app/auth";
import { RedirectIfAuthenticated, RequireAuth } from "@/app/auth-guard";
import { AuthCallbackPage } from "@/app/pages/AuthCallbackPage";
import { GoodbyePage } from "@/app/pages/GoodbyePage";
import { LoginRedirect } from "@/app/pages/LoginRedirect";
import { ProtectedRoutes } from "@/app/routes/protected-routes";

export function AppRoutes() {
  return (
    <Routes>
      <Route path={AUTH_CALLBACK_PATH} element={<AuthCallbackPage />} />
      <Route path={GOODBYE_PATH} element={<GoodbyePage />} />
      <Route
        path={LOGIN_PATH}
        element={
          <RedirectIfAuthenticated>
            <LoginRedirect />
          </RedirectIfAuthenticated>
        }
      />
      <Route
        path="/*"
        element={
          <RequireAuth>
            <ProtectedRoutes />
          </RequireAuth>
        }
      />
    </Routes>
  );
}
