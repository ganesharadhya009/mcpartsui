import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useState } from "react";
import { logout } from "../redux/login/loginSlice";
import { useNavigate } from "react-router-dom";
import { routeNames } from "../constants/routesConstants";
import globalConstant from "../constants/globalConstants";

/**
 * ProfileMenuHeader
 * This component displays the user's avatar, name, and role with a dropdown menu for profile-related actions.
 *
 * The menu allows users to access their profile, account, reset their password, or log out.
 *
 * @returns JSX.Element - The rendered profile header with a dropdown menu.
 */
const ProfileMenuHeader = () => {
  const { userData } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  /**
   * handleClick
   * This function is triggered when the user clicks the profile dropdown icon.
   * It sets the anchor element to the button that was clicked, opening the dropdown menu.
   *
   * @param {React.MouseEvent<HTMLButtonElement>} event - The click event.
   */
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * handleClose
   * This function is triggered when the dropdown menu is closed.
   * It clears the anchor element, which results in closing the dropdown menu.
   */
  const handleClose = () => {
    setAnchorEl(null);
  };

  /**
   * handleLogout
   * This function logs the user out by dispatching the `logout` action from the Redux store.
   * It also closes the dropdown menu after logging out.
   */
  const handleLogout = () => {
    dispatch(logout());
    handleClose();
  };

  /**
   * handleResetPassword
   * This function navigates the user to the reset password page.
   * It closes the dropdown menu before navigating.
   */
  const handleResetPassword = () => {
    handleClose();
    navigate(routeNames.profileResetPassword);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" gap="12px">
      <Tooltip title={globalConstant.PROFILE_KEYWORD}>
        <Avatar
          alt={userData?.fullName}
          src={userData?.photo as string}
          sx={{ width: 36, height: 36, borderRadius: 200 }}
        />
      </Tooltip>
      <Box textAlign="left" display="flex" flexDirection="column">
        <Typography
          variant="body3"
          display="flex"
          alignItems="center"
          color="#344054"
          height="22px"
        >
          {userData?.fullName}
          <IconButton
            onClick={handleClick}
            aria-label="ArrowDropDown"
            color="iconColor"
          >
            <ArrowDropDownIcon width="24px" />
          </IconButton>
        </Typography>
        <Typography variant="body4" color="#667085">
          {userData?.roles[0].roleName}
        </Typography>
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleResetPassword}>Change Password</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export default ProfileMenuHeader;
