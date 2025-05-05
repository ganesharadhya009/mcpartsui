// TestToastComponent.js
import successToast from "../../utils/SuccessToast";
import errorToast from "../../utils/ErrorToast";
import { Button } from "@mui/material";
import GlobalConstant from "../../constants/globalConstants";

/**
 * test component for the toast messages
 * @returns successToast and errorToast message
 */

const TestToastComponent = () => {
  const showToast = () => {
    successToast({ message: GlobalConstant.SUCCESS_MESSAGE });
  };
  const showErrToast = () => {
    errorToast({ message: GlobalConstant.ERROR_MESSAGE_IN });
  };

  return (
    <div>
      <Button onClick={showToast}>{GlobalConstant.SUCCESS}</Button>
      <Button onClick={showErrToast}>{GlobalConstant.ERROR}</Button>
    </div>
  );
};

export default TestToastComponent;
