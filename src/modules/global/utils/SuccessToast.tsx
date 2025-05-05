import { toast, ToastPosition } from "react-toastify";
import styleConstant from "../constants/styleConstants";
import globalConstant from "../constants/globalConstants";

/**
 * success toast message generic function
 * @param message
 *
 */

interface InputProps {
  position?: ToastPosition;
  autoClose?: number;
  theme?: string;
  closeOnClick?: boolean;
  message?: string;
}

const successToast = ({
  message = globalConstant.ERROR,
  autoClose = styleConstant.TOAST_AUTO_CLOSE,
  theme = styleConstant.THEME_LIGHT,
  closeOnClick = styleConstant.TOAST_CLOSE_ON_CLICK,
}: InputProps) => {
  toast.success(message, {
    position: styleConstant.BOTTOM_RIGHT as ToastPosition,
    autoClose: autoClose,
    hideProgressBar: styleConstant.TOAST_HIDE_PROGRESS_BAR,
    closeOnClick: closeOnClick,
    pauseOnHover: styleConstant.TOAST_PAUSE_ON_HOVER,
    draggable: styleConstant.TOAST_DRAGGABLE,
    progress: styleConstant.TOAST_PROGRESS,
    theme: theme,
  });
};

export default successToast;
