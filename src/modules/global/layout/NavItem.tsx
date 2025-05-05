import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { NavItemType } from "../types/globalTypes";
import {
  getNavItemListButtonStyles,
  getNavItemListIconStyle,
  getNavItemTextStyles,
} from "../styles/styles";
import { isSubLinkMatch } from "../utils/isNavItemActive";
import navItems from "../constants/navItems";

/**
 * NavItem
 *
 * This component renders a navigation item for a sidebar or menu.
 * It supports dynamic styles based on whether the item is selected and whether the menu is open.
 *
 * @param {NavItemType} props - The properties for the navigation item.
 *
 * @param {React.ComponentType} icon - The icon component for the navigation item.
 * @param {string} text - The display text of the navigation item.
 * @param {string} path - The path the item navigates to when clicked.
 * @param {boolean} open - Whether the menu containing this item is open.
 *
 * @returns {JSX.Element} The rendered navigation item.
 */
const NavItem = ({ icon: Icon, text, path, open }: NavItemType) => {
  const { pathname } = useLocation(); // Get the current location path
  const selected = isSubLinkMatch(navItems, pathname, path); // Determine if the item is selected
  const navigate = useNavigate();

  /**
   * handleClick
   *
   * This function handles the click event for the navigation item.
   * It navigates to the provided `path`.
   */
  const handleClick = () => navigate(path);

  return (
    <ListItem disablePadding sx={{ display: "block" }}>
      <ListItemButton
        sx={getNavItemListButtonStyles()}
        onClick={handleClick}
        selected={selected}
      >
        <ListItemIcon sx={getNavItemListIconStyle(open, selected)}>
          <Icon />
        </ListItemIcon>
        <ListItemText primary={text} sx={getNavItemTextStyles(open)} />
      </ListItemButton>
    </ListItem>
  );
};

export default NavItem;
