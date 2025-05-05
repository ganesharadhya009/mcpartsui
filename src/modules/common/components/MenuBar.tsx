import { Menu, MenuProps } from "@mui/material";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { getMenuListProps } from "../../global/styles/styles";

interface MenuBarProps {
  /** The HTML element to which the menu is anchored */
  anchorEl: HTMLElement | null;
  /** A function to set the anchor element state */
  setAnchorEl: Dispatch<SetStateAction<HTMLElement | null>>;
  /** The unique identifier for the menu */
  id: string;
  /** The content to be displayed within the menu */
  children: ReactNode;
  /** Optional placement of the menu relative to the anchor element */
  placement?: string;
}

/**
 * MenuBar Component
 *
 * This component renders a Material-UI Menu that can be anchored
 * to a specific HTML element. It allows for customizable placement
 * and integrates with state management to control its visibility.
 *
 * @param {MenuBarProps} props - The props for the component.
 * @param {HTMLElement | null} props.anchorEl - The anchor element for the menu.
 * @param {Dispatch<SetStateAction<HTMLElement | null>>} props.setAnchorEl -
 * A function to set the anchor element state.
 * @param {string} props.id - The unique identifier for the menu.
 * @param {ReactNode} props.children - The content of the menu.
 * @param {string} [props.placement] - Optional placement of the menu.
 * @returns {JSX.Element} The rendered menu.
 */
const MenuBar = ({
  anchorEl,
  setAnchorEl,
  id,
  children,
  placement,
}: MenuBarProps) => {
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Menu
      {...(getMenuListProps(
        id,
        anchorEl,
        handleClose,
        open,
        placement
      ) as MenuProps)}
    >
      {children}
    </Menu>
  );
};

export default MenuBar;
