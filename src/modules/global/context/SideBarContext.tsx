import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
  useEffect,
} from "react";
import useScreenSize from "../hooks/useScreenSize";
import styleConstant from "../constants/styleConstants";

interface SidebarContextType {
  open: boolean; // Indicates whether the sidebar is open
  setOpen: Dispatch<SetStateAction<boolean>>; // Function to update the open state of the sidebar
}

// Create a context for the sidebar
export const SidebarContext = createContext<SidebarContextType | undefined>(
  undefined
);

/**
 * SidebarProvider component that manages the state of the sidebar's visibility.
 * It provides the open state and a function to update it through the SidebarContext.
 * The sidebar's visibility is also adjusted based on the screen size.
 *
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components to be wrapped by the provider.
 *
 * @returns {JSX.Element} The rendered SidebarProvider component.
 */
const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState<boolean>(true); // Default state of the sidebar

  const { width } = useScreenSize(); // Get the current screen width

  useEffect(() => {
    // Adjust sidebar visibility based on screen width
    if (width <= styleConstant.RESPONSIVE_WIDTH && open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [width]);

  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
