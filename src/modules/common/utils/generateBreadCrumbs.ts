/* eslint-disable prefer-const */
import { useLocation } from "react-router-dom";

interface NavItem {
  icon?: React.ComponentType;
  text: string;
  path: string;
  subLinks?: NavItem[];
}

interface Breadcrumb {
  text: string;
  path: string;
}

const findNavItem = (path: string, items: NavItem[]): Breadcrumb[] | null => {
  for (const item of items) {
    if (item.path === path) {
      return [{ text: item.text, path: item.path }];
    } else if (item.subLinks) {
      const subItemBreadcrumbs = findNavItem(path, item.subLinks);
      if (subItemBreadcrumbs) {
        return [{ text: item.text, path: item.path }, ...subItemBreadcrumbs];
      }
    }
  }
  return null;
};

export const generateBreadcrumbs = (
  location: ReturnType<typeof useLocation>,
  items: NavItem[]
): Breadcrumb[] => {
  const pathnames = location.pathname.split("/").filter((x) => x);
  let breadcrumbs: Breadcrumb[] = [];
  let currentPath = "";

  pathnames.forEach((segment) => {
    currentPath += `/${segment}`;
    const foundNavItem = findNavItem(currentPath, items);

    if (foundNavItem) {
      // Only add unique breadcrumbs, avoiding duplicates
      foundNavItem.forEach((breadcrumb) => {
        if (!breadcrumbs.some((b) => b.path === breadcrumb.path)) {
          breadcrumbs.push(breadcrumb);
        }
      });
    } else {
      breadcrumbs.push({
        text: segment.split("-").join(" "),
        path: currentPath,
      });
    }
  });

  return breadcrumbs;
};
