/* eslint-disable no-empty-pattern */

import {
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
  Box,
  styled,
  FormLabel,
  InputBase,
} from "@mui/material";
import styleConstant from "../../global/constants/styleConstants";
import { DataGrid } from "@mui/x-data-grid";
import { DataGridProps as DataGridPropsWithDefaultValues } from "@mui/x-data-grid/internals";
import { TabsList as BaseTabsList } from '@mui/base/TabsList';
import { TabPanel as BaseTabPanel } from '@mui/base/TabPanel';
import { buttonClasses } from '@mui/base/Button';
import { Tab as BaseTab, tabClasses } from '@mui/base/Tab';
import { theme } from "../../global/styles/theme";


export const SectionHeadingWrapper = styled(Box)(({ }) => ({
  height: "48px",
  borderRadius: "4px",
  background: "#FFFFFF",
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  paddingLeft: "16px",
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

interface DataGridProps extends DataGridPropsWithDefaultValues {
  headerColor: string;
  headerTextColor: string;
}

const drawerWidth = styleConstant.DRAWER_WIDTH;
export const BottomAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop: string) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  boxShadow: "0px 2px 4px 0px #0000000D",
  backgroundColor: "#FFFFFF",
  color: theme.palette.primary.main,

  variants: [
    {
      props: ({ open }: { open: boolean }) => open,
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
        width: open ? 0 : `calc(100% - 66px)`,
        [theme.breakpoints.up("sm")]: {
          width: open ? 0 : `calc(100% - 66px)`,
        },
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

export const bottomAppBarStyles = { top: "auto", bottom: 0 };

export const breadCrumbsIconButtonStyles = {
  alignSelf: "center",
  marginRight: "8px",
  cursor: "pointer",
  color: "#397F7B",
  width: "20px",
  height: "20px",
  paddingBottom: "3.25px",
  paddingTop: "3.25px",
};

export const BreadCrumbsWrapper = styled(Box)(() => ({
  display: "flex",
}));


export const StyledFormLabel = styled(FormLabel)(() => ({
  fontFamily: "Inter",
  fontSize: "14px",
  fontWeight: "500",
  lineHeight: "21px",
  textAlign: "left",
  color: "#344054",
}));


export const secondaryDatagridStyles = {
  "--DataGrid-containerBackground": "unset",
  "& .MuiDataGrid-iconSeparator": {
    display: "none",
  },
  "--DataGrid-rowBorderColor": "unset",
  "& .MuiDataGrid-cell": {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
  },
  "&.MuiDataGrid-root .MuiDataGrid-columnHeaders": {
    marginBottom: "8px",
    backgroundColor: "#D0D5DD",
    borderBottomLeftRadius: "4px",
    borderBottomRightRadius: "4px",
    border: "1px solid #91959D",
  },
  "&.MuiDataGrid-root ": {
    border: "unset",
  },
  "&.MuiDataGrid-root .MuiDataGrid-columnHeaders .MuiDataGrid-columnHeader": {
    borderRight: "1px solid #91959D",
  },
  "&.MuiDataGrid-root .MuiDataGrid-row ": {
    borderBottom: "1px solid #EAECF0",
  },
  "&.MuiDataGrid-root .MuiDataGrid-cell": {
    borderRight: "1px solid #EAECF0",
    padding: "8px",
  },
  "&.MuiDataGrid-root .MuiDataGrid-virtualScrollerContent": {
    border: "1px solid #EAECF0",
    borderRadius: "4px",
  },
  "&.MuiDataGrid-columnHeaderTitleContainer": {
    fontFamily: "Inter",
    fontSize: "14px",
    fontWeight: "600",
    lineHeight: "21px",
    textAlign: "left",
    textUnderlinePosition: "from-font",
    textDecorationSkipInk: "none",
  },
};

export const StyledDataGrid = styled(DataGrid)<DataGridProps>(({ headerColor, headerTextColor }) => ({
  WebkitFontSmoothing: "auto",
  letterSpacing: "normal",
  // padding: "16px",
  "--DataGrid-containerBackground": "unset",
  "--DataGrid-rowBorderColor": "unset",
  "& .MuiDataGrid-cell": {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "left",
    borderRight: "1px solid #EAECF0",
    borderBottom: "1px solid #EAECF0",
    fontFamily: "inter",
    fontSize: "14px",
  },
  "& .MuiDataGrid-iconSeparator": {
    display: "none",
  },
  "& .MuiDataGrid-columnHeaders": {
    display: "flex",
    border: "1px solid #91959D",
    marginBottom: "8px",
    backgroundColor: headerColor,
    WebkitTextFillColor: headerTextColor,
    borderTopLeftRadius: "4px",
    borderTopRightRadius: "4px",
    borderBottomLeftRadius: "4px",
    borderBottomRightRadius: "4px",
  },
  [`& .MuiDataGrid-columnHeader[data-field="facilities"]`]: {
    borderRight: "none",
  },
  "& .MuiDataGrid-columnHeader": {
    borderRight: "1px solid #91959D",
  },
  // "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
  //   ...theme.applyStyles("light", {}),
  // },
  "&.MuiDataGrid-root ": {
    border: "unset",
  },

  "& .MuiPaginationItem-root": {
    borderRadius: 0,
  },
  "& .MuiDataGrid-virtualScrollerContent": {
    border: "1px solid #EAECF0",
    borderRadius: "4px",
  },
}));

export const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "8px",
  // backgroundColor: "#91959D",
  border: "1px solid",
  borderColor: "#91959D",
  marginLeft: 0,
  width: "100%",
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  color: theme.palette.primary.main,
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "100%",
    },
  },
}));

const blue = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#80BFFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
  800: '#004C99',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

export const StyledTab = styled(BaseTab)`
  color: #344054;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  background-color: #F3F6FF ;
  width: fit-content;
  padding: 8px 12px 8px 12px;
  border-radius: 8px;
  border: none;
  display: flex;
  justify-content: center;
  height: 40px;
  font-family: Inter;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  text-align: center;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  

  &:focus {
    color: #fff;
  }

  &.${tabClasses.selected} {
    background-color: ${theme.palette.primary.main};
    color: #FFFFFF;
  }

  &.${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const TabPanel = styled(BaseTabPanel)(
  ({ theme }) => `
  width: 100%;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  padding: 20px 12px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  border-radius: 12px;
  opacity: 0.6;
  `,
);

export const TabsList = styled(BaseTabsList)(
  ({ theme }) => `
  min-width: 400px;
  background-color: "#FFFFFF";
  border-radius: 12px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  align-content: space-between;
  box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
  padding: 8px;
  gap: 8px;
  `,
);
