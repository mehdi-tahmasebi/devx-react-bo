import type { RouteObject } from "react-router-dom";
import { createPageShellElement } from "@/components/ui/page";
import { DemoLabelPage } from "./DemoLabelPage";

export const DEMO_LABEL_ROUTE_BASE = "demo-labels";

export const demoLabelPaths = {
  list: `/${DEMO_LABEL_ROUTE_BASE}`,
} as const;

export const demoLabelRoutes: RouteObject[] = [
  {
    path: DEMO_LABEL_ROUTE_BASE,
    element: createPageShellElement(DemoLabelPage, "fill"),
  },
];
