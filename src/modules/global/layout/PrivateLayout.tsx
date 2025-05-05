import { ReactNode } from "react";
import SideBar from "./SideBar";
import SidebarProvider from "../context/SideBarContext";

/**
 * PrivateLayout component serves as a wrapper for components that require
 * a sidebar navigation layout. It provides context for the sidebar
 * and renders the sidebar along with any child components passed to it.
 *
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The content to be displayed within the layout.
 *
 * @returns {JSX.Element} The rendered PrivateLayout component.
 */
const PrivateLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <SideBar>{children}</SideBar>
    </SidebarProvider>
  );
};

export default PrivateLayout;
