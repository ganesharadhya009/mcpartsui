import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import navItems from "../constants/navItems";
import NavItem from "./NavItem";
import HospitalInfoData from "./HospitalInfoHeaderLogo";
import NavGroup from "./NavGroup";
import TopNavBar from "./TopNavBar";
import {
  Drawer,
  DrawerFooter,
  DrawerHeader,
  getDrawerFooterProps,
  getLogoHolderProps,
  LogoHolder,
  mainHeaderStyles,
  sideBarListStyles,
} from "../styles/styles";
import useSidebarSetting from "../hooks/useSideBarSettings";
import mcPartsLogoNavBar from "../assets/icons/mcParts-edited-logo.png";
import mcPartsLogoSideBar from "../assets/icons/petalix3rounded.png";

/**
 * Sidebar component that renders a navigation drawer and a top navigation bar.
 * It handles the state for opening and closing the sidebar, and displays
 * navigation items based on the provided navItems constant.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be displayed alongside the sidebar.
 *
 * @returns {JSX.Element} The rendered Sidebar component.
 */
function SideBar({ children }: { children: React.ReactNode }) {
  const { open, setOpen } = useSidebarSetting();

  /**
   * Toggles the open state of the sidebar.
   */
  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  return (
    <Box display="flex">
      <CssBaseline />
      <TopNavBar
        handleDrawerOpen={handleDrawerOpen}
        open={open}
      />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <HospitalInfoData open={open} />
        </DrawerHeader>
        <List sx={sideBarListStyles}>
          {navItems.map((items, index) => {
            // Render NavItem if there are no subLinks, otherwise render NavGroup
            if (items.subLinks === undefined) {
              return (
                <NavItem
                  key={items.text}
                  {...items}
                  index={index}
                  open={open}
                />
              );
            } else {
              return (
                <NavGroup
                  key={items.text}
                  {...items}
                  index={index}
                  open={open}
                  setOpen={setOpen}
                />
              );
            }
          })}
        </List>
        <DrawerFooter {...getDrawerFooterProps(false, open)}>
          <LogoHolder
            {...getLogoHolderProps(
              false,
              open,
              mcPartsLogoNavBar,
              mcPartsLogoSideBar
            )}
          />
        </DrawerFooter>
      </Drawer>
      <Box component="main" sx={mainHeaderStyles}>
        {children}
      </Box>
    </Box>
  );
}

export default SideBar;
