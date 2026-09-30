import type { ReactNode } from "react";
import { NotificationProvider } from "@/core/notifications";
import { AppRouterProvider } from "./router-provider";
import { AppThemeProvider } from "./theme-provider";
import { QueryProvider } from "./query-provider";

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryProvider>
      <AppThemeProvider>
        <NotificationProvider>
          <AppRouterProvider>{children}</AppRouterProvider>
        </NotificationProvider>
      </AppThemeProvider>
    </QueryProvider>
  );
}
