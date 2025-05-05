import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { NavSubItemType } from "../types/globalTypes";
import {
  getNavSubItemButtonStyles,
  getNavSubItenTextStyles,
} from "../styles/styles";
import navItems from "../constants/navItems";
import { isSubLinkMatch } from "../utils/isNavItemActive";

/**
 * NavSubItems
 *
 * This component renders a navigation sub-item for a sidebar or dropdown menu.
 * It supports styling based on whether the item is a sub-item, part of a portal, and whether the menu is open.
 *
 * @param {NavSubItemType} props - The sub-item properties.
 *
 * @param {string} text - The display text of the sub-item.
 * @param {string} path - The path the sub-item navigates to when clicked.
 * @param {boolean} open - Whether the parent menu is open.
 * @param {boolean} sub - Indicates if this item is a sub-item.
 * @param {boolean} menuOpen - Whether the menu is open.
 * @param {boolean} portal - Indicates if this item is part of a portal navigation.
 *
 * @returns {JSX.Element} The rendered navigation sub-item.
 */
const NavSubItems = ({
  text,
  path,
  open,
  sub,
  menuOpen,
  portal,
}: NavSubItemType) => {
  const { pathname } = useLocation(); // Get the current path
  const selected = isSubLinkMatch(navItems, pathname, path); // Determine if the item is selected
  const navigate = useNavigate();

  /**
   * handleClick
   *
   * This function handles the click event for the navigation sub-item.
   * It navigates to the provided `path`.
   */
  const handleClick = () => navigate(path);

  return (
    <ListItem disablePadding sx={{ display: "block" }}>
      <ListItemButton
        onClick={handleClick}
        selected={selected}
        sx={getNavSubItemButtonStyles(sub, portal)}
      >
        <ListItemText
          primary={text}
          sx={getNavSubItenTextStyles(open, menuOpen, sub, portal)}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default NavSubItems;
