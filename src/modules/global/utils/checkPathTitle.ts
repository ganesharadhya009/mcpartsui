export interface SubLink {
  icon?: React.ComponentType;
  text: string;
  path: string;
  subLinks?: SubLink[];
}

export interface NavItem {
  icon?: React.ComponentType;
  text: string;
  path: string;
  subLinks?: SubLink[];
}

const checkPath = (path: string, navItems: NavItem[]): string | null => {
  for (const item of navItems) {
    if (path === item.path || path.startsWith(item.path)) {
      if (item.subLinks) {
        const subLinkMatch = findSubLink(path, item.subLinks);
        if (subLinkMatch) {
          return subLinkMatch;
        }
      }
      return item.text;
    }
  }
  return null;
};

const findSubLink = (path: string, subLinks: SubLink[]): string | null => {
  for (const subLink of subLinks) {
    if (subLink.subLinks) {
      const nestedMatch = findSubLink(path, subLink.subLinks);
      if (nestedMatch) {
        return nestedMatch;
      }
    }
    if (path === subLink.path || path.startsWith(subLink.path)) {
      return subLink.text;
    }
  }
  return null;
};

export const resovlePathNameToTitle = (pathname: string) =>
  pathname.split("/")[1].split("-").join(" ");

export default checkPath;
