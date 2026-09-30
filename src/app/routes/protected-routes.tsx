import { HomePage } from "@/app/pages/HomePage";
import { NotFoundPage } from "@/app/pages/NotFoundPage";
import { MainLayout } from "@/components/layout/main";
import { createPageShellElement } from "@/components/ui/page";
import { demoLabelRoutes } from "@/features/demo-record/demo-label/routes";
import { demoRecordRoutes } from "@/features/demo-record/routes";
import { useRoutes } from "react-router-dom";

export function ProtectedRoutes() {
  return useRoutes([
    {
      element: <MainLayout />,
      children: [
        { index: true, element: createPageShellElement(HomePage) },
        ...demoRecordRoutes,
        ...demoLabelRoutes,
        { path: "*", element: createPageShellElement(NotFoundPage) },
      ],
    },
  ]);
}
