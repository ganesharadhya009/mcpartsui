import { Dispatch, SetStateAction, useContext } from "react";
import { SidebarContext } from "../context/SideBarContext";
import globalConstant from "../constants/globalConstants";

interface SidebarContextType {
  open: boolean; // Indicates whether the sidebar is open
  setOpen: Dispatch<SetStateAction<boolean>>; // Function to update the open state of the sidebar
}

/**
 * Custom hook to access the sidebar context.
 * It provides the current state of the sidebar (open/closed)
 * and a function to toggle this state.
 *
 * @throws {Error} If the SidebarContext is not available.
 *
 * @returns {SidebarContextType} The current sidebar state and setter function.
 */
const useSidebarSetting = (): SidebarContextType => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error(globalConstant.SIDEBAR_CONTEXT_ERROR);
  }
  return context;
};

export default useSidebarSetting;
