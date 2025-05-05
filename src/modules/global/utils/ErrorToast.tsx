import { toast } from "react-toastify";
import GlobalConstant from "../constants/globalConstants";
import StyleConstant from "../constants/styleConstants";
import { ToastPosition } from "../types/globalTypes";

/**
 * Error toast message generic function
 * @param message
 */
interface InputProps {
  position?: ToastPosition;
  autoClose?: number;
  theme?: string;
  closeOnClick?: boolean;
  message?: string;
}

const errorToast = ({
  message = GlobalConstant.ERROR,
  autoClose = StyleConstant.TOAST_AUTO_CLOSE,
  theme = StyleConstant.THEME_LIGHT,
  closeOnClick = StyleConstant.TOAST_CLOSE_ON_CLICK,
}: InputProps) => {
  toast.error(message, {
    position: StyleConstant.BOTTOM_RIGHT as ToastPosition,
    autoClose: autoClose,
    hideProgressBar: StyleConstant.TOAST_HIDE_PROGRESS_BAR,
    closeOnClick: closeOnClick,
    pauseOnHover: StyleConstant.TOAST_PAUSE_ON_HOVER,
    draggable: StyleConstant.TOAST_DRAGGABLE,
    progress: StyleConstant.TOAST_PROGRESS,
    theme: theme,
  });
};

export default errorToast;
