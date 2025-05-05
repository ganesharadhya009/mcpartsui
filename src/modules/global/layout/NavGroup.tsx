import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import NavSubItems from "./NavSubItems";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { ExpandMore } from "@mui/icons-material";
import NavSubGroup from "./NavSubGroup";
import { isSubLinkMatch } from "../utils/isNavItemActive";
import navItems from "../constants/navItems";
import MenuBar from "../../common/components/MenuBar";
import { NavItemGroupType } from "../types/globalTypes";
import {
  getNavGroupItemButtonStyles,
  getNavGroupItemIconStyles,
  getNavGroupListTextStyles,
  getNavGroupMenuListStyles,
  getNavGroupToggleIconStyle,
} from "../styles/styles";

/**
 * NavGroup
 *
 * This component renders a collapsible navigation group item,
 * displaying a list of sub-navigation items (either sub-items or
 * sub-groups) based on the current path. It supports toggling
 * the visibility of its sub-items.
 *
 * @param {NavItemGroupType} props - The properties for the navigation group.
 *
 * @param {React.ComponentType} icon - The icon component for the group.
 * @param {string} text - The display text for the navigation group.
 * @param {boolean} open - A boolean indicating if the navigation group is open.
 * @param {string} path - The path associated with the navigation group.
 * @param {NavSubItemType[]} subLinks - An array of sub-navigation items.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setOpen -
 * A function to set the open state of the navigation menu.
 *
 * @returns {JSX.Element} The rendered navigation group.
 */
const NavGroup = ({
  icon: Icon,
  text,
  open,
  path,
  subLinks,
  setOpen,
}: NavItemGroupType) => {
  const { pathname } = useLocation();
  const [toggle, setToggle] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  /**
   * handleClickMenu
   *
   * This function handles the click event for opening the menu.
   * It sets the anchor element for the menu position.
   *
   * @param {React.MouseEvent<HTMLButtonElement>} event - The click event.
   */
  const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const selected = isSubLinkMatch(navItems, pathname, path);

  useEffect(() => {
    const selected = isSubLinkMatch(navItems, pathname, path);
    setToggle(selected);
  }, [pathname]);

  useEffect(() => {
    if (!open) {
      const selected = isSubLinkMatch(navItems, pathname, path);
      setToggle(selected);
    }
  }, [open]);

  /**
   * handleClick
   *
   * This function toggles the collapse state of the navigation group.
   * It also sets the open state of the menu if it is not already open.
   */
  const handleClick = () => {
    setToggle(!toggle);
    if (!open) {
      setOpen(true);
    }
  };

  return (
    <>
      <ListItem disablePadding sx={{ display: "block" }}>
        <ListItemButton
          component="button"
          id={text}
          sx={getNavGroupItemButtonStyles(open)}
          onClick={!open ? handleClickMenu : handleClick}
          selected={selected}
        >
          <ListItemIcon sx={getNavGroupItemIconStyles(open, selected)}>
            <Icon />
          </ListItemIcon>
          <ListItemText primary={text} sx={getNavGroupListTextStyles(open)} />
          <ListItemIcon sx={getNavGroupToggleIconStyle(open, selected)}>
            {toggle ? <ExpandLessIcon /> : <ExpandMore />}
          </ListItemIcon>
        </ListItemButton>
      </ListItem>
      <Collapse in={!open ? false : toggle} timeout="auto" unmountOnExit>
        <List>
          {subLinks?.map((items, index) =>
            items.subLinks ? (
              <NavSubGroup
                setOpen={setOpen}
                key={items.text}
                open={open}
                index={index}
                {...items}
              />
            ) : (
              <NavSubItems
                key={items.text}
                open={open}
                index={index}
                {...items}
              />
            )
          )}
        </List>
      </Collapse>
      {!open && (
        <MenuBar setAnchorEl={setAnchorEl} anchorEl={anchorEl} id={text}>
          <List sx={getNavGroupMenuListStyles(open)}>
            {subLinks?.map((items, index) =>
              items.subLinks ? (
                <NavSubGroup
                  setOpen={setOpen}
                  key={items.text}
                  open={open}
                  index={index}
                  portal={true}
                  sub={true}
                  {...items}
                />
              ) : (
                <NavSubItems
                  key={items.text}
                  open={open}
                  index={index}
                  portal={true}
                  {...items}
                />
              )
            )}
          </List>
        </MenuBar>
      )}
    </>
  );
};

export default NavGroup;
