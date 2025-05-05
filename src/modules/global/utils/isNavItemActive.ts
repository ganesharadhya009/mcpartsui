// Type definition for SubLink, representing a navigation sub-link.
type SubLink = {
  text: string; // Display text of the sub-link
  path: string; // URL path of the sub-link
  subLinks?: SubLink[]; // Optional array of nested sub-links
};

// Type definition for NavItem, representing a navigation item.
type NavItem = {
  icon?: React.ComponentType; // Optional icon component for the nav item
  text: string; // Display text of the navigation item
  path: string; // URL path of the navigation item
  subLinks?: SubLink[]; // Optional array of sub-links
};

// Type definition for an array of NavItems.
type NavItems = NavItem[];

/**
 * isSubLinkMatch
 * This function checks if the current path matches the parent navigation item's path
 * or any of its sub-links.
 *
 * @param {NavItems} navItems - Array of navigation items to search through.
 * @param {string} currentPath - The current URL path to match.
 * @param {string} parentPath - The parent path to search for in the navigation items.
 * @returns {boolean} - Returns true if the currentPath matches the parent path or any sub-link, otherwise false.
 */

export const isSubLinkMatch = (
  navItems: NavItems,
  currentPath: string,
  parentPath: string
): boolean => {
  // Function to find the parent navigation item by path.
  const findParentItem = (items: NavItems): NavItem | null => {
    for (const item of items) {
      if (item.path === parentPath) {
        return item; // Return the parent item if found.
      }
      if (item.subLinks) {
        const found = findParentItem(item.subLinks); // Recursively search through sub-links.
        if (found) return found;
      }
    }
    return null; // Return null if no parent item is found.
  };

  // Search for the parent item in the navigation items.
  const parentItem = findParentItem(navItems);

  if (parentItem) {
    // Check if the current path matches the parent item's path exactly or if it's a sub-path of it.
    if (parentItem.path === currentPath || currentPath.startsWith(parentPath)) {
      return true;
    }

    // Function to check if any sub-link matches the current path, considering sub-paths as well.
    const hasMatchingSubLink = (subLinks: SubLink[]): boolean => {
      return subLinks.some((subLink) => {
        if (
          subLink.path === currentPath ||
          currentPath.startsWith(subLink.path)
        ) {
          return true; // Return true if a sub-link path matches or is a sub-path.
        }
        // Recursively check nested sub-links.
        return subLink.subLinks ? hasMatchingSubLink(subLink.subLinks) : false;
      });
    };

    // If the parent item has sub-links, check if any sub-link matches the current path.
    return parentItem.subLinks
      ? hasMatchingSubLink(parentItem.subLinks)
      : false;
  }

  // Return false if no matching parent item or sub-link is found.
  return false;
};
