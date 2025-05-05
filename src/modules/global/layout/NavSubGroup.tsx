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
import navItems from "../constants/navItems";
import { isSubLinkMatch } from "../utils/isNavItemActive";
import { NavSubItemGroupType } from "../types/globalTypes";
import {
  getNavSubGroupListButtonStyles,
  getNavSubGroupListIconStyles,
  getNavSubGroupListStyles,
  getNavSubGroupTextStyles,
  getNavSubGroupToggleIconStyles,
} from "../styles/styles";

const NavSubGroup = ({
  icon: Icon,
  text,
  open,
  subLinks,
  path,
  portal,
}: NavSubItemGroupType) => {
  const { pathname } = useLocation();
  const [toggle, setToggle] = useState(false);

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

  const handleClick = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <ListItem disablePadding sx={{ display: "block" }}>
        <ListItemButton
          id={text}
          sx={getNavSubGroupListButtonStyles(selected, portal)}
          onClick={handleClick}
          selected={selected}
        >
          {!portal && (
            <ListItemIcon
              sx={getNavSubGroupListIconStyles(open, selected, portal)}
            >
              {Icon && <Icon />}
            </ListItemIcon>
          )}
          <ListItemText primary={text} sx={getNavSubGroupTextStyles(open)} />
          <ListItemIcon
            sx={getNavSubGroupToggleIconStyles(open, selected, portal)}
          >
            {toggle && <ExpandLessIcon />}
            {!toggle && <ExpandMore />}
          </ListItemIcon>
        </ListItemButton>
      </ListItem>
      <Collapse in={toggle} timeout="auto" unmountOnExit>
        <List sx={getNavSubGroupListStyles(portal)}>
          {subLinks?.map((items, index) => (
            <NavSubItems
              sub={true}
              key={items.text}
              open={open}
              index={index}
              portal={open ? false : true}
              {...items}
            />
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default NavSubGroup;
