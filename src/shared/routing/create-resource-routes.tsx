import { createElement, type ComponentType } from "react";
import type { RouteObject } from "react-router-dom";
import { withPageShell } from "@/components/ui/page";

type ResourceRouteComponents = {
  list: ComponentType;
  form: ComponentType;
  detail?: ComponentType;
};

/**
 * Standard route-per-view CRUD slice for one resource.
 * Order is fixed so `new` and `:id/edit` match before `:id`.
 * List pages use a fill shell (table scrolls); form/detail scroll the page.
 */
export function createResourceRoutes(
  basePath: string,
  components: ResourceRouteComponents,
): RouteObject[] {
  const routes: RouteObject[] = [
    {
      path: basePath,
      element: createElement(withPageShell(components.list, "fill")),
    },
    {
      path: `${basePath}/new`,
      element: createElement(withPageShell(components.form)),
    },
    {
      path: `${basePath}/:id/edit`,
      element: createElement(withPageShell(components.form)),
    },
  ];

  if (components.detail) {
    routes.push({
      path: `${basePath}/:id`,
      element: createElement(withPageShell(components.detail)),
    });
  }

  return routes;
}
