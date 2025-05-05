import { useState } from "react";
import globalConstant from "../../global/constants/globalConstants";

const useShowHidePassword = () => {
  const [showPassword, setShowPassword] = useState(true);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const passwordVisible = showPassword
    ? globalConstant.PASSWORD_TYPE
    : globalConstant.TEXT_TYPE;
  return { handleClickShowPassword, passwordVisible, showPassword };
};

export default useShowHidePassword;
