import { QueryClientConfig } from "@tanstack/react-query";
import { ReactNode } from "react";
import typeConstants from "../constants/typeConstants";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";
import { GridFilterModel, GridPaginationModel, GridSortModel } from "@mui/x-data-grid";

// Defining various types using constants from `typeConstants`.
export type ButtonVariant = (typeof typeConstants.buttonVariants)[number];
export type ButtonColor = (typeof typeConstants.buttonColors)[number];
export type ColorVariant = (typeof typeConstants.buttonColors)[number];
export type AlignItem = (typeof typeConstants.alignItems)[number];
export type ErrorConsole = (typeof typeConstants.errorConsoles)[number];

/**
 * Props for the GlobalQueryProvider component.
 * This interface defines the properties for configuring TanStack Query in a React app.
 *
 * @interface GlobalQueryProviderProps
 */
export interface GlobalQueryProviderProps {
  children: ReactNode;
  config?: QueryClientConfig;
}

/**
 * Role interface representing a user's role and associated permissions.
 *
 * @interface Role
 */
interface Role {
  roleName: string;
  permissions: string[];
}

/**
 * UserDataType
 * This interface defines the shape of a user object containing various user details.
 *
 * @interface UserDataType
 */
export interface UserDataType {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  phoneNumber: string;
  department: string | null;
  degree: string | null;
  gender: string | null;
  photo: string | null;
  isFirstTimeLogin: boolean;
  roles: Role[];
}

/**
 * LoginStateType
 * Represents the state of user login, including token and user data.
 *
 * @type LoginStateType
 */
export type LoginStateType = {
  token: string | null | string[];
  isLoggedIn: boolean;
  userData: UserDataType | null;
};

/**
 * LoginActionType
 * Represents the action type for login, used in a login reducer.
 *
 * @type LoginActionType
 */
export type LoginActionType = {
  payload: { token: string | null | string[] };
};

/**
 * SetUserActionType
 * Represents the action type for setting user data, used in a user reducer.
 *
 * @type SetUserActionType
 */
export type SetUserActionType = {
  payload: { userData: UserDataType };
};

// More type definitions for various UI components and themes.
export type SpinnerTheme = (typeof typeConstants.spinnerThemes)[number];
export type SpinnerVariant = (typeof typeConstants.spinnerVariants)[number];
export type SpinnerPosition = (typeof typeConstants.spinnerPositions)[number];
export type ToastPosition = (typeof typeConstants.toastPositions)[number];
export type IconButtonEdgeType =
  (typeof typeConstants.iconButtonEdgeTypes)[number];
export type InputAdnormentPositionType =
  (typeof typeConstants.inputAdornmentPositions)[number];
export type ForgotPasswordState = {
  email_auth: boolean;
}

export type ForgotPasswordAction = {
  payload: { email_auth: boolean };
}
export type TextVariantType = (typeof typeConstants.toastPositions)[number];

/**
 * NavType
 * Represents a navigation item with optional sub-links.
 *
 * @interface NavType
 */
export interface NavType {
  text: string;
  path: string;
  subLinks?: NavType[];
}

/**
 * NavItemGroupType
 * Represents a group of navigation items with icon and sub-links.
 *
 * @interface NavItemGroupType
 */
export interface NavItemGroupType {
  icon: OverridableComponent<SvgIconTypeMap<object, "svg">>;
  text: string;
  path: string;
  index: number;
  open: boolean;
  key: string;
  subLinks?: NavType[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * NavItemType
 * Represents a single navigation item with optional icon.
 *
 * @interface NavItemType
 */
export interface NavItemType {
  icon: OverridableComponent<SvgIconTypeMap<object, "svg">>;
  text: string;
  path: string;
  index?: number;
  open?: boolean;
  key?: string;
}

/**
 * NavSubItemGroupType
 * Represents a sub-navigation item group with optional nested sub-links.
 *
 * @interface NavSubItemGroupType
 */
export interface NavSubItemGroupType {
  icon?: OverridableComponent<SvgIconTypeMap<object, "svg">>;
  text: string;
  path: string;
  index: number;
  open: boolean;
  key: string;
  subLinks?: NavType[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sub?: boolean;
  portal?: boolean;
  menuOpen?: boolean;
}

/**
 * NavSubItemType
 * Represents a single sub-navigation item.
 *
 * @interface NavSubItemType
 */
export interface NavSubItemType {
  text: string;
  path: string;
  index?: number;
  open?: boolean;
  key?: string;
  sub?: boolean;
  menuOpen?: boolean;
  portal?: boolean
}

/**
 * TopNavBarPropsType
 * Represents the properties for the top navigation bar.
 *
 * @interface TopNavBarPropsType
 */
export interface TopNavBarPropsType {
  handleDrawerOpen: () => void;
  open: boolean;
}


export interface QueryOptionsType {
  filterModel?: GridFilterModel;
  sortModel?: GridSortModel;
  paginationModel?: GridPaginationModel;
}

export interface SuccessResponseType {

  code: number;
  message: string;
}

export interface ErrorResponseType {
  status: number;
  message: string;
  response: {
    data: {
      code: number;
      errors?: {
        code?: number;
        message?: string[];
      };
      message: string;
    };
  };
}