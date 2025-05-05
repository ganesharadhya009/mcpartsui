import styleConstant from "../constants/styleConstants";
import { styled, Theme, CSSObject } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

const drawerWidth = styleConstant.DRAWER_WIDTH;

export const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

export const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(66px)`,
  [theme.breakpoints.up("sm")]: {
    width: `66px})`,
  },
});

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export const DrawerFooter = styled("div")(() => ({
  marginTop: "auto",
  bottom: 0,
  left: 0,
  width: "100%",
  height: "121.84px",
  padding: "40px 20px 40px 20px",
  gap: "12px",
  border: "1px 0px 0px 0px",
  opacity: "0px",
}));

export const getDrawerFooterProps = (mobile: boolean, open: boolean) => ({
  sx: {
    display: "flex",
    justifyContent: mobile && open ? "center" : !open ? "center" : "flex-start",
  },
});

export const LogoHolder = styled("img")(() => ({
  width: "auto",
  height: "auto",
}));

export const getLogoHolderProps = (
  mobile: boolean,
  open: boolean,
  JeevLogoSideBar: string,
  JeevLogoNavBar: string
) => ({
  src:
    mobile && open ? JeevLogoSideBar : !open ? JeevLogoSideBar : JeevLogoNavBar,
  sx: {
    width: mobile && open ? "35.83px" : !open ? "35.83px" : "auto",
    height: mobile && open ? "35.83px" : !open ? "35.83px" : "auto",
  },
  alt: "jeev-logo",
});

export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  borderRight: "1px solid #EAECF0",
  boxSizing: "border-box",
  backgroundColor: "#FFFFFF",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

export const getNavGroupItemButtonStyles = (open: boolean) => ({
  color: "#667085",
  backgroundColor: "#FFFFFF",
  height: "40px",
  borderRadius: "6px",
  justifyContent: "initial",
  paddingLeft: "15px",
  paddingRight: "15px",
  marginLeft: "5px",
  marginRight: "5px",
  marginTop: "4px",
  marginBottom: "4px",
  width: !open ? "auto" : "97%",
  "&.Mui-selected": {
    color: "#FFFFFF",
    backgroundColor: "#397F7B",
  },
  "&.Mui-selected:hover": {
    color: "#FFFFFF",
    backgroundColor: "rgb(39, 88, 86)",
  },
});

export const getNavGroupItemIconStyles = (open: boolean, selected: boolean) => [
  {
    minWidth: 0,
    justifyContent: "center",
    width: "24px",
    height: "24px",
  },
  open
    ? {
        mr: "12px",
      }
    : {
        mr: "auto",
      },
  selected && { color: "#FFFFFF" },
];

export const getNavGroupListTextStyles = (open: boolean) => [
  open
    ? {
        opacity: 1,
      }
    : {
        opacity: 0,
      },
  { display: !open ? "none" : "block" },
];

export const getNavGroupToggleIconStyle = (
  open: boolean,
  selected: boolean
) => [
  open
    ? {
        opacity: 1,
      }
    : {
        opacity: 0,
      },
  selected && { color: "#FFFFFF" },
  { marginRight: "-35px" },
  { display: !open ? "none" : "block" },
];

export const getNavGroupMenuListStyles = (open: boolean) => ({
  backgroundColor: !open ? "#FFFFFF" : "#EEFAF7",
  width: !open ? "212px" : "100%",
  marginLeft: !open ? "0px" : "5px",
  marginRight: !open ? "0px" : "5px",
  paddingInline: "0px",
});

export const getNavItemListButtonStyles = () => ({
  color: "#667085",
  backgroundColor: "#FFFFFF",
  height: "40px",
  borderRadius: "6px",
  justifyContent: "initial",
  paddingLeft: "15px",
  paddingRight: "15px",
  marginLeft: "5px",
  marginRight: "5px",
  marginTop: "4px",
  marginBottom: "4px",
  "&.Mui-selected": {
    color: "#FFFFFF",
    backgroundColor: "#397F7B",
  },
  "&.Mui-selected:hover": {
    color: "#FFFFFF",
    backgroundColor: "rgb(39, 88, 86)",
  },
});

export const getNavItemListIconStyle = (
  open: boolean | undefined,
  selected: boolean
) => [
  {
    minWidth: 0,
    justifyContent: "center",
    width: "24px",
    height: "24px",
  },
  open
    ? {
        mr: "12px",
      }
    : {
        mr: "auto",
      },
  selected && { color: "#FFFFFF" },
];

export const getNavItemTextStyles = (open: boolean | undefined) => [
  open
    ? {
        opacity: 1,
      }
    : {
        opacity: 0,
      },
];

export const getNavSubGroupListButtonStyles = (
  selected: boolean,
  portal: boolean | undefined
) => ({
  color: "#667085",
  backgroundColor: selected ? "#EEFAF7" : "#FFFFF",
  height: "40px",
  borderRadius: "6px 6px 0px 0px",
  justifyContent: "initial",
  paddingLeft: portal ? "8px" : "15px",
  paddingRight: portal ? "0px" : "15px",
  marginLeft: portal ? "0px" : "8px",
  marginRight: portal ? "0px" : "5px",
  marginTop: portal ? "0px" : "4px",
  "&.Mui-selected": {
    color: "#344054",
    fontFamily: "Inter",
    fontSize: "16px",
    fontWeight: "600",
    lineHeight: "24px",
    textAlign: "left",
    backgroundColor: "#DFF2EE",
  },
  "&.Mui-selected:hover": {
    backgroundColor: "#DFF2EE",
  },
});

export const getNavSubGroupListIconStyles = (
  open: boolean,
  selected: boolean,
  portal: boolean | undefined
) => [
  {
    minWidth: 0,
    justifyContent: "center",
    width: "24px",
    height: "24px",
  },
  open
    ? {
        mr: portal ? "4px" : "12px",
      }
    : {
        mr: portal ? "0px" : "auto",
      },
  selected && { color: "#FFFFFF" },
];

export const getNavSubGroupTextStyles = (open: boolean) => [
  open
    ? {
        opacity: 1,
      }
    : {
        opacity: 1,
      },
];

export const getNavSubGroupToggleIconStyles = (
  open: boolean,
  selected: boolean,
  portal: boolean | undefined
) => [
  open
    ? {
        opacity: 1,
      }
    : {
        opacity: 1,
      },
  selected && { color: "#344054" },
  {
    marginRight: portal ? "0px" : "-35px",
    marginLeft: portal ? "9px" : "0px",
  },
];

export const getNavSubGroupListStyles = (portal: boolean | undefined) => ({
  backgroundColor: "#EEFAF7",
  marginLeft: portal ? "0px" : "5px",
  marginRight: portal ? "0px" : "5px",
});

export const getNavSubItemButtonStyles = (
  sub: boolean | undefined,
  portal: boolean | undefined
) => ({
  color: "#667085",
  backgroundColor: sub ? "#EEFAF7" : "#FFFFFF",
  height: "40px",
  borderRadius: "6px",
  justifyContent: "initial",
  paddingLeft: "31px",
  paddingRight: "31px",
  marginRight: portal ? "0px" : "5px",
  marginLeft: portal ? "0px" : "5px",
  marginTop: sub ? (portal ? "0px" : "0px") : "4px",
  marginBottom: portal ? "0px" : "4px",
  "&.Mui-selected": {
    color: "#344054",
    backgroundColor: sub ? "#EEFAF7" : "#DFF2EE",
    borderLeft: sub ? "4px solid #397F7B" : "",
    borderRadius: sub ? "0px" : "6px",
  },
  "&.Mui-selected:hover": {
    color: "#344054",
    backgroundColor: "#EEFAF7",
    borderRadius: "0px",
  },
  padding: portal ? "8px 12px 8px 8px" : "8px 12px 8px 48px",
});

export const getNavSubItenTextStyles = (
  open: boolean | undefined,
  menuOpen: boolean | undefined,
  sub: boolean | undefined,
  portal: boolean | undefined
) => [
  open
    ? {
        opacity: 1,
      }
    : {
        opacity: menuOpen ? 1 : 1,
      },
  { marginLeft: sub ? (portal ? "0px" : "16px") : portal ? "0px" : "8px" },
];

export const mainHeaderStyles = {
  flexGrow: 1,
  p: "24px",
  backgroundColor: "#F9FAFB",
  minHeight: "100vh",
  paddingTop: "88px",
  minWidth: 0,
};

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  boxShadow: "0px 0px 0px 0px #0000000D",
  backgroundColor: "#FFFFFF",

  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        marginLeft: drawerWidth,
        width: open
          ? `calc(100% - 66px) !important`
          : `calc(100% - 66px) !important`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

export const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.default,
}));

export const getIconButtonTopNavbarProps = (handleDrawerOpen: () => void) => ({
  color: "inherit",
  "aria-label": "open drawer",
  onClick: handleDrawerOpen,
  edge: "start",
  sx: [
    {
      marginRight: "20px",
    },
  ],
});

export const getBoxPropsNavBar = () => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
});

export const getTypographyProps = () => ({
  variant: "h6",
  noWrap: true,
  component: "div",
  textTransform: "capitalize",
});

export const getLoaderFullScreenProps = () => ({
  alignItems: "center",
  height: "75vh",
  display: "flex",
  justifyContent: "center",
});

export const getMenuListProps = (
  id: string,
  anchorEl: HTMLElement | null,
  handleClose: () => void,
  open: boolean,
  placement: string | undefined
) => ({
  id: id,
  anchorEl: anchorEl,
  open: open,
  onClose: handleClose,
  MenuListProps: {
    "aria-labelledby": "basic-button",
    sx: {
      py: 0,
      boxShadow: "0px 4px 18px 0px #00000026",
      position: "relative",
    },
  },
  anchorOrigin: {
    vertical: placement ? "top" : "bottom",
    horizontal: placement ? "right" : "left",
  },
});

export const sideBarListStyles = { marginTop: "8px" };
