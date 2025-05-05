import {
  Box,
  IconButton,
  IconButtonProps,
  Typography,
  TypographyProps,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ProfileMenuHeader from "./ProfileMenuHeader";
import {
  AppBar,
  getBoxPropsNavBar,
  getIconButtonTopNavbarProps,
  getTypographyProps,
  ToolbarStyled,
} from "../styles/styles";
import { TopNavBarPropsType } from "../types/globalTypes";
import navItems from "../constants/navItems";
import checkPath, { resovlePathNameToTitle } from "../utils/checkPathTitle";
import { useLocation } from "react-router-dom";

/**
 * TopNavBar
 * This component renders the top navigation bar for the application.
 * It includes a menu icon for opening the drawer, a title, and the profile menu header.
 *
 * @param {TopNavBarPropsType} props - Props include `handleDrawerOpen`, a function to open the side drawer, and `open`, a boolean that indicates if the drawer is open.
 */

const TopNavBar = ({ handleDrawerOpen, open }: TopNavBarPropsType) => {
  const { pathname } = useLocation();
  const pageTitle =
    checkPath(pathname, navItems) || resovlePathNameToTitle(pathname);

  return (
    <div>
      <AppBar open={open}>
        <ToolbarStyled>
          <IconButton
            {...(getIconButtonTopNavbarProps(
              handleDrawerOpen
            ) as IconButtonProps)}
          >
            <MenuIcon />
          </IconButton>
          <Box {...getBoxPropsNavBar()}>
            <Typography {...(getTypographyProps() as TypographyProps)}>
              {pageTitle}
            </Typography>
            <ProfileMenuHeader />
          </Box>
        </ToolbarStyled>
      </AppBar>
    </div>
  );
};

export default TopNavBar;
