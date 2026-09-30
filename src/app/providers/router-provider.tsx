import type { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";

type AppRouterProviderProps = {
  children: ReactNode;
};

export function AppRouterProvider({ children }: AppRouterProviderProps) {
  return <BrowserRouter>{children}</BrowserRouter>;
}
