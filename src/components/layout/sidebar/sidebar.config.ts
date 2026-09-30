import { demoLabelPaths } from "@/features/demo-record/demo-label/routes";
import { demoRecordPaths } from "@/features/demo-record/routes";
import {
  DashboardOutlinedIcon,
  LocalOfferOutlinedIcon,
  type NavIcon,
} from "@/shared/icons";

export const SIDEBAR_WIDTH = 252;
export const SIDEBAR_COLLAPSED_WIDTH = 88;

export type SidebarNavLink = {
  label: string;
  to: string;
  icon: NavIcon;
  description?: string;
};

export type SidebarNavGroup = {
  label: string;
  icon: NavIcon;
  children: SidebarNavLink[];
};

export const sidebarNavGroups: SidebarNavGroup[] = [
  {
    label: "Esempi",
    icon: DashboardOutlinedIcon,
    children: [
      {
        label: "Record demo",
        to: demoRecordPaths.list,
        icon: DashboardOutlinedIcon,
        description:
          "CRUD completo: lista, dettaglio, form create/edit, api + hooks.",
      },
      {
        label: "Etichette demo",
        to: demoLabelPaths.list,
        icon: LocalOfferOutlinedIcon,
        description: "Sottomodulo: lista + dialog, store UI locale.",
      },
    ],
  },
];

export function flattenSidebarLinks(groups: SidebarNavGroup[]): SidebarNavLink[] {
  return groups.flatMap((group) => group.children);
}

export const allSidebarLinks = flattenSidebarLinks(sidebarNavGroups);

function matchesSidebarPath(pathname: string, to: string) {
  return pathname === to || pathname.startsWith(`${to}/`);
}

export function isSidebarLinkActive(
  pathname: string,
  to: string,
  links: readonly { to: string }[] = allSidebarLinks,
) {
  if (!matchesSidebarPath(pathname, to)) {
    return false;
  }

  const bestMatch = links
    .filter((link) => matchesSidebarPath(pathname, link.to))
    .reduce<{ to: string } | null>(
      (best, link) =>
        !best || link.to.length > best.to.length ? link : best,
      null,
    );

  return bestMatch?.to === to;
}

export function findSidebarLinkByPathname(
  groups: SidebarNavGroup[],
  pathname: string,
): SidebarNavLink | undefined {
  const links = flattenSidebarLinks(groups);

  return links.find((item) => isSidebarLinkActive(pathname, item.to, links));
}

export function isSidebarGroupActive(group: SidebarNavGroup, pathname: string) {
  return group.children.some((child) =>
    isSidebarLinkActive(pathname, child.to, allSidebarLinks),
  );
}
