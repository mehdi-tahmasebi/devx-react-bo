import type { RouteObject } from "react-router-dom";
import { createResourceRoutes } from "@/shared/routing/create-resource-routes";
import { DemoRecordForm } from "./components/DemoRecordForm";
import { DemoRecordPage } from "./DemoRecordPage";
import { DemoRecordView } from "./DemoRecordView";

export const DEMO_RECORD_ROUTE_BASE = "demo-records";

export const demoRecordPaths = {
  list: `/${DEMO_RECORD_ROUTE_BASE}`,
  new: `/${DEMO_RECORD_ROUTE_BASE}/new`,
  detail: (id: string | number) => `/${DEMO_RECORD_ROUTE_BASE}/${id}`,
  edit: (id: string | number) => `/${DEMO_RECORD_ROUTE_BASE}/${id}/edit`,
} as const;

export const demoRecordRoutes: RouteObject[] = createResourceRoutes(
  DEMO_RECORD_ROUTE_BASE,
  {
    list: DemoRecordPage,
    form: DemoRecordForm,
    detail: DemoRecordView,
  },
);
