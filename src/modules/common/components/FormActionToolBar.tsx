import { AppBarOwnProps, Toolbar } from "@mui/material";
import { ReactNode } from "react";
import useSidebarSetting from "../../global/hooks/useSideBarSettings";
import { BottomAppBar, bottomAppBarStyles } from "../styles/styles";
import styleConstant from "../../global/constants/styleConstants";

/**
 * FormActionToolBar Component
 *
 * This component serves as a toolbar for form actions, providing a consistent
 * location for action buttons or controls related to form submissions. It adapts
 * its appearance based on the sidebar state and the screen size.
 *
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The content to be rendered inside the toolbar.
 *
 * @returns {JSX.Element} The rendered toolbar with children.
 */
const FormActionToolBar = ({ children }: { children: ReactNode }) => {
  const { open } = useSidebarSetting();

  return (
    <BottomAppBar
      color={styleConstant.COLOR_PRIMARY as AppBarOwnProps["color"]}
      position={styleConstant.POSITION_FIXED as AppBarOwnProps["position"]}
      sx={bottomAppBarStyles}
      open={open}
    >
      <Toolbar>{children}</Toolbar>
    </BottomAppBar>
  );
};

export default FormActionToolBar;
